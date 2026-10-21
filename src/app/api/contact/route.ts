import { handleContact } from "@/lib/contact/handle";
import type { MailSender } from "@/lib/contact/mail";

export const dynamic = "force-dynamic";

/** The real mail adapter is not configured yet (Brevo on hold): no sender, so the route answers 503. */
function configuredSender(): MailSender | null {
  return null;
}

export async function POST(request: Request): Promise<Response> {
  return handleContact(request, configuredSender());
}
