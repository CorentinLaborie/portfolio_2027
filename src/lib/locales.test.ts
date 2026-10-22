import { describe, expect, it } from "vitest";
import { localePath, locales } from "./locales";

describe("localePath", () => {
  it("sends English to the root address and French to /fr", () => {
    expect(localePath("en")).toBe("/");
    expect(localePath("fr")).toBe("/fr");
  });

  it("has a path for every locale", () => {
    expect(locales.map(localePath)).toEqual(["/", "/fr"]);
  });
});
