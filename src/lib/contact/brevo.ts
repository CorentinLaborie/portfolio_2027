import type { ContactMail, MailSender } from "./mail";

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";
const REQUEST_TIMEOUT_MS = 10_000;

export type BrevoOptions = {
  apiKey: string;
  /** The sender address, verified in Brevo. */
  fromAddress: string;
  /** Test seam: a fake HTTP client. Production uses the global fetch. */
  fetchImpl?: typeof fetch;
};

/**
 * Sender of the contact messages through the Brevo transactional API: one HTTP call per message. The visitor's address is
 * the reply-to, so answering the owner's mail replies to the visitor. Errors never carry the body, the addresses or the key.
 */
export function createBrevoSender(options: BrevoOptions): MailSender {
  return {
    async send(mail: ContactMail): Promise<void> {
      const fetchImpl = options.fetchImpl ?? fetch;
      const response = await fetchImpl(BREVO_SEND_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": options.apiKey,
        },
        body: JSON.stringify({
          sender: { email: options.fromAddress },
          to: [{ email: mail.to }],
          replyTo: { email: mail.replyTo },
          subject: mail.subject,
          textContent: mail.text,
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!response.ok) {
        throw new Error(`Brevo refused the message with HTTP ${response.status}.`);
      }
    },
  };
}
