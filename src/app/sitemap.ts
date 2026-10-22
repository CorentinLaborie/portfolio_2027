import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** The site has two addresses: "/" in English and "/fr" in French, each linked to the other. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: new URL("/", siteUrl).href, fr: new URL("/fr", siteUrl).href };
  return [
    { url: languages.en, alternates: { languages } },
    { url: languages.fr, alternates: { languages } },
  ];
}
