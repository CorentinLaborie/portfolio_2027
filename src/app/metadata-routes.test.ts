import { describe, expect, it } from "vitest";
import { siteUrl } from "@/lib/site";
import robots from "./robots";
import sitemap from "./sitemap";

describe("robots", () => {
  it("allows every page and points to the sitemap of the site", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: new URL("/sitemap.xml", siteUrl).href,
    });
  });
});

describe("sitemap", () => {
  it("lists the English and French addresses, each linked to the other", () => {
    const languages = {
      en: new URL("/", siteUrl).href,
      fr: new URL("/fr", siteUrl).href,
    };
    expect(sitemap()).toEqual([
      { url: languages.en, alternates: { languages } },
      { url: languages.fr, alternates: { languages } },
    ]);
  });
});
