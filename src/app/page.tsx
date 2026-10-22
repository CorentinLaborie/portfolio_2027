import type { Metadata } from "next";
import { Site } from "../components/site/Site";
import { homeContent } from "./home-content";

// The hero age is computed from the birth date on each request; a prerendered page would freeze it at build time.
export const dynamic = "force-dynamic";

// The root address is the English version. The French one is /fr.
export const metadata: Metadata = {
  title: homeContent.en.common.brandName,
  description: homeContent.en.common.metaDescription,
  alternates: { canonical: "/", languages: { en: "/", fr: "/fr" } },
};

export default function HomePage() {
  return <Site fr={homeContent.fr} en={homeContent.en} />;
}
