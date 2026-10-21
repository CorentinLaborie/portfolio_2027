import { describe, expect, it } from "vitest";
import { validateContact } from "./validate";

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.test",
  phone: "+33 6 50 51 07 81",
  message: "Bonjour, je suis intéressé.",
};

describe("validateContact", () => {
  it("accepts a complete message and trims the values", () => {
    expect(validateContact({ ...VALID, name: "  Ada  " })).toEqual({
      ok: true,
      value: { ...VALID, name: "Ada" },
    });
  });

  it("accepts an empty phone number, which is optional", () => {
    expect(validateContact({ ...VALID, phone: "" })).toMatchObject({ ok: true });
  });

  it("refuses a body that is not an object, on the name field", () => {
    expect(validateContact("texte")).toEqual({ ok: false, field: "name" });
    expect(validateContact(null)).toEqual({ ok: false, field: "name" });
  });

  it("refuses an empty name and a name over 100 characters", () => {
    expect(validateContact({ ...VALID, name: "   " })).toEqual({ ok: false, field: "name" });
    expect(validateContact({ ...VALID, name: "a".repeat(101) })).toEqual({ ok: false, field: "name" });
  });

  it.each(["pas-une-adresse", "a@b", "a b@example.test", `${"a".repeat(246)}@example.test`])(
    "refuses the e-mail address %s",
    (email) => {
      expect(validateContact({ ...VALID, email })).toEqual({ ok: false, field: "email" });
    },
  );

  it("refuses a phone number with letters, or over 30 characters", () => {
    expect(validateContact({ ...VALID, phone: "06 50 abc" })).toEqual({ ok: false, field: "phone" });
    expect(validateContact({ ...VALID, phone: "1".repeat(31) })).toEqual({ ok: false, field: "phone" });
  });

  it("refuses an empty message and a message over 2000 characters", () => {
    expect(validateContact({ ...VALID, message: " " })).toEqual({ ok: false, field: "message" });
    expect(validateContact({ ...VALID, message: "a".repeat(2001) })).toEqual({ ok: false, field: "message" });
  });

  it("treats a field that is not a string as empty", () => {
    expect(validateContact({ ...VALID, message: 42 })).toEqual({ ok: false, field: "message" });
  });
});
