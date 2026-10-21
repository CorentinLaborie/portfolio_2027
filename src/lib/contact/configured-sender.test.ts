import { describe, expect, it } from "vitest";
import { senderFromEnvironment } from "./configured-sender";

describe("senderFromEnvironment", () => {
  it("returns no sender while the key or the sender address is missing, so the route answers 503", () => {
    expect(senderFromEnvironment({})).toBeNull();
    expect(senderFromEnvironment({ BREVO_API_KEY: "xkeysib-test" })).toBeNull();
    expect(senderFromEnvironment({ MAIL_FROM_ADDRESS: "site@example.test" })).toBeNull();
    expect(senderFromEnvironment({ BREVO_API_KEY: "  ", MAIL_FROM_ADDRESS: "site@example.test" })).toBeNull();
  });

  it("returns the Brevo sender once both values are set", () => {
    const sender = senderFromEnvironment({ BREVO_API_KEY: "xkeysib-test", MAIL_FROM_ADDRESS: "site@example.test" });

    expect(sender).not.toBeNull();
    expect(typeof sender?.send).toBe("function");
  });
});
