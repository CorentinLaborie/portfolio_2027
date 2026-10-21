import { contactEmail } from "../../content/shared";
import { buildContactMail, type MailSender } from "./mail";
import type { RateLimiter } from "./rate-limit";
import { validateContact } from "./validate";

export const CONTACT_SUBJECT = "Contact depuis le site";

/** Largest body accepted, in bytes. Anything bigger is refused before it is parsed. */
export const MAX_BODY_BYTES = 10 * 1024;

/** Field a bot fills in. It is hidden from people and browsers do not autofill it. */
export const HONEYPOT_FIELD = "company_website";

export type ContactDependencies = {
  /** Null when no mail adapter is configured. */
  sender: MailSender | null;
  limiter: RateLimiter;
};

/** The client address: the first address of x-forwarded-for, then x-real-ip, then "unknown". */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) {
    return forwarded;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isJson(request: Request): boolean {
  const type = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  return type === "application/json";
}

function refuse(status: number, headers?: Record<string, string>): Response {
  return Response.json({ ok: false, field: null }, { status, headers });
}

/**
 * Handles a contact form submission. The sender and the limiter are passed in, so tests use fakes and the route uses
 * the real ones. A filled honeypot field is a bot: it is accepted silently and nothing is sent.
 */
export async function handleContact(request: Request, { sender, limiter }: ContactDependencies): Promise<Response> {
  const limit = limiter.hit(clientIp(request));
  if (!limit.allowed) {
    return refuse(429, { "Retry-After": String(limit.retryAfterSeconds) });
  }

  // Only JSON is accepted: a plain-text form sent from another site cannot reach the API with this header.
  if (!isJson(request)) {
    return refuse(415);
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null && Number(declaredLength) > MAX_BODY_BYTES) {
    return refuse(413);
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    return refuse(413);
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return refuse(400);
  }

  if (typeof body === "object" && body !== null && HONEYPOT_FIELD in body && body[HONEYPOT_FIELD] !== "") {
    return Response.json({ ok: true }, { status: 200 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return Response.json({ ok: false, field: result.field }, { status: 400 });
  }

  if (sender === null) {
    return refuse(503);
  }

  try {
    await sender.send(buildContactMail(result.value, contactEmail, CONTACT_SUBJECT));
  } catch (error) {
    // Only the error name is logged: the message, the address and the text of the visitor stay out of the logs.
    console.error("Contact mail sending failed:", error instanceof Error ? error.name : "UnknownError");
    return refuse(500);
  }

  return Response.json({ ok: true }, { status: 200 });
}
