import type { Metadata } from "next";
import { Site } from "../../components/site/Site";
import { homeContent } from "../home-content";

// The hero age is computed from the birth date on each request; a prerendered page would freeze it at build time.
export const dynamic = "force-dynamic";

// The French version of the one-page site. "/" stays in English.
export const metadata: Metadata = {
  title: homeContent.fr.common.brandName,
  description: homeContent.fr.common.metaDescription,
  alternates: { canonical: "/fr", languages: { en: "/", fr: "/fr" } },
  openGraph: { locale: "fr_FR", alternateLocale: ["en_US"] },
};

export default function FrenchHomePage() {
  return <Site fr={homeContent.fr} en={homeContent.en} initialLocale="fr" />;
}
