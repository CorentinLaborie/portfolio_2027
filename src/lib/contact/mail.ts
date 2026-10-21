import type { ContactInput } from "./validate";

export type ContactMail = {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

/**
 * Sends the mail of a contact message. The real adapter (Brevo, step 0.4 and DEC-018) is not wired yet: until it is,
 * the route answers that sending is unavailable, so no message is lost silently.
 */
export type MailSender = {
  send(mail: ContactMail): Promise<void>;
};

/** The message the owner receives: the visitor's details and text, and the visitor's address as reply-to. */
export function buildContactMail(input: ContactInput, to: string, subject: string): ContactMail {
  const lines = [
    `Nom : ${input.name}`,
    `E-mail : ${input.email}`,
    `Téléphone : ${input.phone || "non renseigné"}`,
    "",
    input.message,
  ];
  return { to, replyTo: input.email, subject, text: lines.join("\n") };
}
