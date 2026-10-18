export const contactEmail = "corentin.laborie@epitech.eu";

export const anchors = {
  home: "#accueil",
  about: "#about",
  projects: "#projets",
  contact: "#contact",
} as const;

export const sectionId = (anchor: string) => anchor.slice(1);
