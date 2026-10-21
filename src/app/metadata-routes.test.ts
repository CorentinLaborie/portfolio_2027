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
  it("lists the single address of the site", () => {
    expect(sitemap()).toEqual([{ url: new URL("/", siteUrl).href }]);
  });
});
