export type CommonContent = {
  brandName: string;
  metaDescription: string;
  nav: {
    about: string;
    projects: string;
    contact: string;
  };
  navLabel: string;
  languageLabel: string;
  menuLabel: string;
  closeLabel: string;
  footerText: string;
};

export const commonFr: CommonContent = {
  brandName: "Corentin Laborie",
  metaDescription: "Portfolio de Corentin Laborie",
  nav: {
    about: "À propos",
    projects: "Projets",
    contact: "Contact",
  },
  navLabel: "Menu principal",
  languageLabel: "Langue",
  menuLabel: "Menu",
  closeLabel: "Fermer",
  footerText: "© {year} Corentin Laborie",
};
