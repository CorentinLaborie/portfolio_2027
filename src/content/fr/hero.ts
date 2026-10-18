import { anchors, contactEmail } from "../shared";

export type HeroContent = {
  name: string;
  headline: string;
  pills: string[];
  tagline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  portrait: { src: string; alt: string };
};

export const heroContent: HeroContent = {
  name: "Corentin Laborie",
  headline: "Solutions digitales, ouvert à un contrat long terme",
  pills: ["31 ans", "Basé à Toulouse, France"],
  tagline: "Touche-à-tout pour toutes les missions.",
  primaryCta: { label: "Me contacter", href: `mailto:${contactEmail}` },
  secondaryCta: { label: "Voir les projets", href: anchors.projects },
  portrait: { src: "/images/portrait.jpg", alt: "Portrait de Corentin Laborie" },
};
