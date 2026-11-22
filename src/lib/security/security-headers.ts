export type SecurityHeader = { key: string; value: string };

/**
 * Headers sent with every page. The Content-Security-Policy only sets frame-ancestors: a full policy would need
 * nonces for the scripts Next.js injects, and it is not needed to block framing.
 */
export const SECURITY_HEADERS: SecurityHeader[] = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];
