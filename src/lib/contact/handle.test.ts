import { afterEach, describe, expect, it, vi } from "vitest";
import { contactEmail } from "@/content/shared";
import { clientIp, CONTACT_SUBJECT, handleContact, MAX_BODY_BYTES, type ContactDependencies } from "./handle";
import type { ContactMail, MailSender } from "./mail";
import { createRateLimiter } from "./rate-limit";

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.test",
  phone: "",
  message: "Bonjour, je suis intéressé.",
};

function post(body: unknown, headers: Record<string, string> = { "content-type": "application/json" }): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function fakeSender() {
  const sent: ContactMail[] = [];
  const sender: MailSender = {
    send: vi.fn(async (mail: ContactMail) => {
      sent.push(mail);
    }),
  };
  return { sender, sent };
}

function deps(sender: MailSender | null, limit = 1000): ContactDependencies {
  return { sender, limiter: createRateLimiter({ limit, windowMs: 10 * 60 * 1000, now: () => 0 }) };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("handleContact", () => {
  it("sends the message to the owner, with the visitor as reply-to, and answers 200", async () => {
    const { sender, sent } = fakeSender();

    const response = await handleContact(post(VALID), deps(sender));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      to: contactEmail,
      replyTo: "ada@example.test",
      subject: CONTACT_SUBJECT,
    });
    expect(sent[0]?.text).toContain("Nom : Ada Lovelace");
    expect(sent[0]?.text).toContain("Téléphone : non renseigné");
    expect(sent[0]?.text).toContain("Bonjour, je suis intéressé.");
  });

  it("answers 400 with the field to fix, and sends nothing, for an invalid message", async () => {
    const { sender, sent } = fakeSender();

    const response = await handleContact(post({ ...VALID, email: "pas-une-adresse" }), deps(sender));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, field: "email" });
    expect(sent).toHaveLength(0);
  });

  it("answers 400 with no field for a body that is not JSON", async () => {
    const { sender } = fakeSender();

    const response = await handleContact(post("{pas du json"), deps(sender));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, field: null });
  });

  it("answers 503 when no mail sender is configured, so the message is not lost silently", async () => {
    const response = await handleContact(post(VALID), deps(null));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, field: null });
  });

  it("accepts a filled honeypot field silently, and sends nothing", async () => {
    const { sender, sent } = fakeSender();

    const response = await handleContact(post({ ...VALID, company_website: "http://spam.example" }), deps(sender));

    expect(response.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("answers 500 with no field when the mail sender fails, and logs only the error name", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const sender: MailSender = {
      send: vi.fn(async () => {
        throw new TypeError("Adresse ada@example.test refusée, texte du message");
      }),
    };

    const response = await handleContact(post(VALID), deps(sender));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ ok: false, field: null });
    expect(errorLog).toHaveBeenCalledTimes(1);
    const logged = JSON.stringify(errorLog.mock.calls);
    expect(logged).toContain("TypeError");
    expect(logged).not.toContain("ada@example.test");
    expect(logged).not.toContain("texte du message");
    expect(logged).not.toContain("Ada Lovelace");
  });

  it("answers 429 with a retry delay once an address has sent five attempts in ten minutes", async () => {
    const { sender, sent } = fakeSender();
    const limiter = deps(sender, 5).limiter;
    const headers = { "content-type": "application/json", "x-forwarded-for": "203.0.113.7, 10.0.0.1" };

    for (let attempt = 0; attempt < 5; attempt++) {
      expect((await handleContact(post(VALID, headers), { sender, limiter })).status).toBe(200);
    }
    const refused = await handleContact(post(VALID, headers), { sender, limiter });

    expect(refused.status).toBe(429);
    expect(refused.headers.get("Retry-After")).toBe("600");
    expect(await refused.json()).toEqual({ ok: false, field: null });
    expect(sent).toHaveLength(5);
  });

  it("answers 415 for a body that is not declared as JSON, and sends nothing", async () => {
    const { sender, sent } = fakeSender();

    const response = await handleContact(post(VALID, { "content-type": "text/plain" }), deps(sender));

    expect(response.status).toBe(415);
    expect(await response.json()).toEqual({ ok: false, field: null });
    expect(sent).toHaveLength(0);
  });

  it("accepts a JSON content type with parameters, such as a charset", async () => {
    const { sender } = fakeSender();

    const response = await handleContact(
      post(VALID, { "content-type": "application/json; charset=utf-8" }),
      deps(sender),
    );

    expect(response.status).toBe(200);
  });

  it("answers 413 for a body over 10 KB, before parsing it", async () => {
    const { sender, sent } = fakeSender();
    const oversized = JSON.stringify({ ...VALID, message: "a".repeat(MAX_BODY_BYTES) });

    const response = await handleContact(post(oversized), deps(sender));

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ ok: false, field: null });
    expect(sent).toHaveLength(0);
  });

  it("answers 413 when the declared length is over 10 KB", async () => {
    const { sender } = fakeSender();

    const response = await handleContact(
      post(VALID, { "content-type": "application/json", "content-length": String(MAX_BODY_BYTES + 1) }),
      deps(sender),
    );

    expect(response.status).toBe(413);
  });
});

describe("clientIp", () => {
  it("uses the first address of x-forwarded-for", () => {
    expect(clientIp(post(VALID, { "x-forwarded-for": " 203.0.113.7 , 10.0.0.1" }))).toBe("203.0.113.7");
  });

  it("falls back to x-real-ip, then to unknown", () => {
    expect(clientIp(post(VALID, { "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(clientIp(post(VALID))).toBe("unknown");
  });
});
