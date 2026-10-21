import { handleContact } from "@/lib/contact/handle";
import type { MailSender } from "@/lib/contact/mail";
import { createRateLimiter } from "@/lib/contact/rate-limit";

export const dynamic = "force-dynamic";

/** Five messages per client address in ten minutes. Kept in this server's memory. */
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** The real mail adapter is not configured yet (Brevo on hold): no sender, so the route answers 503. */
function configuredSender(): MailSender | null {
  return null;
}

export async function POST(request: Request): Promise<Response> {
  return handleContact(request, { sender: configuredSender(), limiter });
}
