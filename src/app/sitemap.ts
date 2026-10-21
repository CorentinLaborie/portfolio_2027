import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/** The site is one page, so the sitemap lists only its address. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", siteUrl).href }];
}
