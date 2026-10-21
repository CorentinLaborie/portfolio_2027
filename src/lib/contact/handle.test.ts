import { describe, expect, it, vi } from "vitest";
import { contactEmail } from "@/content/shared";
import { CONTACT_SUBJECT, handleContact } from "./handle";
import type { ContactMail, MailSender } from "./mail";

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.test",
  phone: "",
  message: "Bonjour, je suis intéressé.",
};

function post(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
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

describe("handleContact", () => {
  it("sends the message to the owner, with the visitor as reply-to, and answers 200", async () => {
    const { sender, sent } = fakeSender();

    const response = await handleContact(post(VALID), sender);

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

    const response = await handleContact(post({ ...VALID, email: "pas-une-adresse" }), sender);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ ok: false, field: "email" });
    expect(sent).toHaveLength(0);
  });

  it("answers 400 for a body that is not JSON", async () => {
    const { sender } = fakeSender();

    const response = await handleContact(post("{pas du json"), sender);

    expect(response.status).toBe(400);
  });

  it("answers 503 when no mail sender is configured, so the message is not lost silently", async () => {
    const response = await handleContact(post(VALID), null);

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, field: null });
  });

  it("accepts a filled honeypot field silently, and sends nothing", async () => {
    const { sender, sent } = fakeSender();

    const response = await handleContact(post({ ...VALID, website: "http://spam.example" }), sender);

    expect(response.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  it("lets a failing mail sender raise, so the route answers with a server error and not a success", async () => {
    const sender: MailSender = { send: vi.fn(async () => Promise.reject(new Error("panne"))) };

    await expect(handleContact(post(VALID), sender)).rejects.toThrow("panne");
  });
});
