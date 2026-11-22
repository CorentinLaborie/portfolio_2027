import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
import { SECURITY_HEADERS } from "./security-headers";

function valueOf(key: string): string | undefined {
  return SECURITY_HEADERS.find((header) => header.key === key)?.value;
}

describe("SECURITY_HEADERS", () => {
  it("forbids framing of the site by other sites", () => {
    expect(valueOf("X-Frame-Options")).toBe("DENY");
    expect(valueOf("Content-Security-Policy")).toContain("frame-ancestors 'none'");
  });

  it("stops browsers from guessing content types and limits the referrer", () => {
    expect(valueOf("X-Content-Type-Options")).toBe("nosniff");
    expect(valueOf("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });

  it("turns off the camera, microphone and geolocation", () => {
    expect(valueOf("Permissions-Policy")).toBe("camera=(), microphone=(), geolocation=()");
  });

  it("asks browsers to use HTTPS for a year", () => {
    expect(valueOf("Strict-Transport-Security")).toBe("max-age=31536000");
  });

  it("is sent on every route by the Next.js configuration", async () => {
    const rules = await nextConfig.headers?.();
    expect(rules).toEqual([{ source: "/:path*", headers: SECURITY_HEADERS }]);
  });
});
