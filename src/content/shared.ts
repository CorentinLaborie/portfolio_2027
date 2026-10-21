export const contactEmail = "corentin.laborie@epitech.eu";

export const anchors = {
  home: "#home",
  about: "#about",
  projects: "#projects",
  contact: "#contact",
} as const;

export const sectionId = (anchor: string) => anchor.slice(1);
