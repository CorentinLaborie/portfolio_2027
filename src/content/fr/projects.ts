import type { Carousel } from "@/ui";

export type ProjectId = "y" | "micro";

type CarouselSlide = Parameters<typeof Carousel>[0]["slides"][number];

type ProjectOption = { value: ProjectId; label: string };

export type ProjectsContent = {
  title: string;
  selectLabel: string;
  options: ProjectOption[];
  carousel: {
    label: string;
    previousLabel: string;
    nextLabel: string;
    roleLabel: string;
    slideRoleLabel: string;
    dialogLabel: string;
    expandLabel: string;
    closeLabel: string;
    slideOf: string;
    counterOf: string;
    slides: CarouselSlide[];
  };
  y: {
    title: string;
    description: string;
    url: string;
    linkLabel: string;
    hashtags: string[];
    stack: string[];
  };
  micro: {
    title: string;
    description: string;
  };
};

export const projectsContent: ProjectsContent = {
  title: "Projets",
  selectLabel: "Projet",
  options: [
    { value: "y", label: "Y" },
    { value: "micro", label: "My Mock Micro Investor" },
  ],
  carousel: {
    label: "Captures d’écran de Y",
    previousLabel: "Diapositive précédente",
    nextLabel: "Diapositive suivante",
    roleLabel: "carrousel",
    slideRoleLabel: "diapositive",
    dialogLabel: "Image agrandie",
    expandLabel: "Agrandir l’image : {alt}",
    closeLabel: "Fermer",
    slideOf: "{current} sur {total}",
    counterOf: "{current} / {total}",
    slides: [
      { src: "/images/y-screen-1.png", alt: "Écran d’accueil de Y sur mobile", width: 360, height: 667 },
      { src: "/images/y-screen-2.png", alt: "Accueil de Y sur ordinateur", width: 1440, height: 1073 },
      { src: "/images/y-screen-3.png", alt: "Messages de Y sur tablette", width: 768, height: 1024 },
      { src: "/images/y-screen-4.png", alt: "Signets de Y sur tablette", width: 768, height: 1024 },
      { src: "/images/y-screen-5.png", alt: "Menu Plus de Y sur mobile", width: 360, height: 667 },
    ],
  },
  y: {
    title: "Y, le réseau social qui vous fait réfléchir.",
    description:
      "Un fil de questions au lieu d’un fil de réactions. On pose une question, les autres réagissent (J’aime, Pas d’accord, Y), et la conversation ne s’ouvre qu’à 50 Y. Réservé aux adultes : l’âge déclaré à l’inscription, à partir de la date de naissance, écarte les mineurs.",
    url: "https://y.corentin-laborie.com",
    linkLabel: "Voir le projet",
    hashtags: ["#online_life", "#irl_vs_online"],
    stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma", "Docker"],
  },
  micro: {
    title: "My Mock Micro Investor",
    description: "Projet en cours de construction.",
  },
};
