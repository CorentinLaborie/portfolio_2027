import { contactEmail } from "../../content/shared";
import { buildContactMail, type MailSender } from "./mail";
import { validateContact } from "./validate";

export const CONTACT_SUBJECT = "Contact depuis le site";

/**
 * Handles a contact form submission. The sender is passed in, so tests use a fake one and the route uses the real one.
 * A filled "website" field is a bot: it is accepted silently and nothing is sent.
 */
export async function handleContact(request: Request, sender: MailSender | null): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, field: "name" }, { status: 400 });
  }

  if (typeof body === "object" && body !== null && "website" in body && (body as { website: unknown }).website !== "") {
    return Response.json({ ok: true }, { status: 200 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json({ ok: false, field: result.field }, { status: 400 });
  }

  if (sender === null) {
    return Response.json({ ok: false, field: null }, { status: 503 });
  }

  await sender.send(buildContactMail(result.value, contactEmail, CONTACT_SUBJECT));
  return Response.json({ ok: true }, { status: 200 });
}
