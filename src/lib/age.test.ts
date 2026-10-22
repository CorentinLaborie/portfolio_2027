import { describe, expect, it } from "vitest";
import { computeAge, fillAge } from "./age";

const BIRTH_DATE = "1994-11-22";

describe("computeAge", () => {
  it("does not count the birthday before it happens", () => {
    expect(computeAge(BIRTH_DATE, new Date(2026, 10, 21))).toBe(31);
  });

  it("counts the birthday on the day itself", () => {
    expect(computeAge(BIRTH_DATE, new Date(2026, 10, 22))).toBe(32);
  });

  it("counts the birthday after it happens", () => {
    expect(computeAge(BIRTH_DATE, new Date(2026, 11, 1))).toBe(32);
  });

  it("does not count the next birthday in the months before it", () => {
    expect(computeAge(BIRTH_DATE, new Date(2026, 0, 15))).toBe(31);
  });
});

describe("fillAge", () => {
  it("replaces the placeholder with the age on the given day", () => {
    expect(fillAge("{age} ans", BIRTH_DATE, new Date(2026, 10, 22))).toBe("32 ans");
    expect(fillAge("{age} years old", BIRTH_DATE, new Date(2026, 10, 21))).toBe("31 years old");
  });
});
