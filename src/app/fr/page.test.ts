import { describe, expect, it } from "vitest";
import * as french from "./page";

describe("French home page at /fr", () => {
  it("renders on each request, so the hero age is never frozen at build time", () => {
    expect(french.dynamic).toBe("force-dynamic");
  });

  it("has French metadata and is linked to the English version at /", () => {
    expect(french.metadata.title).toBe("Corentin Laborie");
    expect(french.metadata.description).toBe("Portfolio de Corentin Laborie");
    expect(french.metadata.alternates).toEqual({
      canonical: "/fr",
      languages: { en: "/", fr: "/fr" },
    });
  });
});
