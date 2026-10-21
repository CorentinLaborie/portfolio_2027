import { handleContact } from "@/lib/contact/handle";
import { senderFromEnvironment } from "@/lib/contact/configured-sender";
import { createRateLimiter } from "@/lib/contact/rate-limit";

export const dynamic = "force-dynamic";

/** Five messages per client address in ten minutes. Kept in this server's memory. */
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request): Promise<Response> {
  return handleContact(request, { sender: senderFromEnvironment(process.env), limiter });
}
