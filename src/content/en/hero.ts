import type { HeroContent } from "../fr/hero";
import { anchors, contactEmail } from "../shared";

export const heroContent: HeroContent = {
  name: "Corentin Laborie",
  headline: "Digital solutions, open to a long-term contract",
  birthDate: "1994-11-22",
  pills: ["{age} years old", "Based in Toulouse, France"],
  tagline: "A jack of all trades for any mission.",
  primaryCta: { label: "Contact me", href: `mailto:${contactEmail}` },
  secondaryCta: { label: "See projects", href: anchors.projects },
  portrait: { src: "/images/portrait.jpg", alt: "Portrait of Corentin Laborie" },
};
