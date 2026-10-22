export const contactEmail = "corentin.lab82@gmail.com";

export const anchors = {
  home: "#home",
  about: "#about",
  projects: "#projects",
  contact: "#contact",
} as const;

export const sectionId = (anchor: string) => anchor.slice(1);
