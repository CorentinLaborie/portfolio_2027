import { createBrevoSender } from "./brevo";
import type { MailSender } from "./mail";

/**
 * The sender of the contact form, read from the environment: Brevo when both BREVO_API_KEY and MAIL_FROM_ADDRESS are set,
 * otherwise null (the route then answers 503, and no message is lost silently).
 */
export function senderFromEnvironment(env: Record<string, string | undefined>): MailSender | null {
  const apiKey = env.BREVO_API_KEY?.trim();
  const fromAddress = env.MAIL_FROM_ADDRESS?.trim();
  if (!apiKey || !fromAddress) {
    return null;
  }

  return createBrevoSender({ apiKey, fromAddress });
}
