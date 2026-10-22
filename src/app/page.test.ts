import { describe, expect, it } from "vitest";
import * as home from "./page";

describe("home page", () => {
  it("renders on each request, so the hero age is never frozen at build time", () => {
    expect(home.dynamic).toBe("force-dynamic");
  });

  it("is the English version, linked to the French one at /fr", () => {
    expect(home.metadata.title).toBe("Corentin Laborie");
    expect(home.metadata.alternates).toEqual({
      canonical: "/",
      languages: { en: "/", fr: "/fr" },
    });
  });
});
