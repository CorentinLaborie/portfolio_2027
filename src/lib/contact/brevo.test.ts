import { describe, expect, it, vi } from "vitest";
import { createBrevoSender } from "./brevo";
import type { ContactMail } from "./mail";

const MAIL: ContactMail = {
  to: "owner@example.test",
  replyTo: "visitor@example.test",
  subject: "Contact depuis le site",
  text: "Nom : Ada\n\nBonjour",
};

function fakeFetch(status: number) {
  return vi.fn(async () => new Response(null, { status }));
}

describe("createBrevoSender", () => {
  it("posts the message to the Brevo API with the key, the sender and the visitor as reply-to", async () => {
    const fetchImpl = fakeFetch(201);
    const sender = createBrevoSender({ apiKey: "xkeysib-test", fromAddress: "site@example.test", fetchImpl });

    await sender.send(MAIL);

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ "api-key": "xkeysib-test", "content-type": "application/json" });
    expect(JSON.parse(init.body as string)).toEqual({
      sender: { email: "site@example.test" },
      to: [{ email: "owner@example.test" }],
      replyTo: { email: "visitor@example.test" },
      subject: "Contact depuis le site",
      textContent: "Nom : Ada\n\nBonjour",
    });
  });

  it("throws with the HTTP status only when Brevo refuses the message", async () => {
    const sender = createBrevoSender({
      apiKey: "xkeysib-secret-value",
      fromAddress: "site@example.test",
      fetchImpl: fakeFetch(401),
    });

    const error = await sender.send(MAIL).then(
      () => undefined,
      (caught: unknown) => caught as Error,
    );

    expect(error?.message).toBe("Brevo refused the message with HTTP 401.");
    expect(error?.message).not.toContain("xkeysib-secret-value");
    expect(error?.message).not.toContain("visitor@example.test");
  });
});
