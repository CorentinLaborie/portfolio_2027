import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/ui/components/site-header/SiteHeader";
import { BrandMark } from "./BrandMark";

describe("BrandMark", () => {
  it("renders the CL mark at the requested size and hides it from assistive technology", () => {
    const markup = renderToStaticMarkup(createElement(BrandMark, { size: 40 }));

    expect(markup).toContain('width="40"');
    expect(markup).toContain('height="40"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('fill="url(#brand-mark-gradient)"');
  });
});

describe("SiteHeader with a brand mark", () => {
  it("keeps the brand label as the accessible name of the home link", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteHeader, {
        brand: { label: "Corentin Laborie", href: "/" },
        brandMark: createElement(BrandMark, { size: 40 }),
        links: [],
        navLabel: "Main menu",
        menuLabel: "Menu",
        closeLabel: "Close",
      }),
    );

    expect(markup).toContain('aria-label="Corentin Laborie"');
    expect(markup).toContain("<svg");
  });

  it("shows the brand label as text when no mark is given", () => {
    const markup = renderToStaticMarkup(
      createElement(SiteHeader, {
        brand: { label: "Corentin Laborie", href: "/" },
        links: [],
        navLabel: "Main menu",
        menuLabel: "Menu",
        closeLabel: "Close",
      }),
    );

    expect(markup).toContain(">Corentin Laborie</a>");
    expect(markup).not.toContain("aria-label=\"Corentin Laborie\"");
  });
});
