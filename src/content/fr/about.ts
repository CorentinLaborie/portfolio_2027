export type AboutContent = {
  title: string;
  intro: string;
  cards: { title: string; text: string }[];
  pills: string[];
};

export const aboutContent: AboutContent = {
  title: "À propos de moi",
  intro:
    "Développeur fullstack indépendant, je conçois des applications web performantes et centrées sur l’utilisateur. Depuis 2020, je mets mes compétences au service de projets variés.",
  cards: [
    {
      title: "Développement fullstack",
      text: "Des applications web performantes, pensées pour l’utilisateur.",
    },
    {
      title: "UX design",
      text: "Concevoir l’expérience et les parcours, du besoin au prototype.",
    },
    {
      title: "Produit et gestion de projet",
      text: "Cadrer le produit, prioriser et piloter le projet jusqu’à la mise en ligne.",
    },
  ],
  pills: ["Basé à Toulouse, France", "Ouvert à un contrat long terme", "Anglais : oral et écrit"],
};
