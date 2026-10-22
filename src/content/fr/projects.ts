import type { Carousel } from "@/ui";

export const projectIds = ["y", "micro", "empire"] as const;

export type ProjectId = (typeof projectIds)[number];

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
  empire: {
    title: string;
    description: string;
    url: string;
    linkLabel: string;
    stack: string[];
    carouselLabel: string;
    slides: CarouselSlide[];
  };
};

export const projectsContent: ProjectsContent = {
  title: "Projets",
  selectLabel: "Projet",
  options: [
    { value: "y", label: "Y" },
    { value: "micro", label: "My Mock Micro Investor" },
    { value: "empire", label: "L’Empire du Malt" },
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
  empire: {
    title: "L’Empire du Malt",
    description:
      "Site vitrine d’un réseau de bars et caves à bière indépendants, présent à Clermont-Ferrand, Mozac, Gerzat et Saint-Gaudens. Présentation de la marque, carte des établissements, et formulaire pour louer une tireuse. Un back-office relié aux caisses n’affiche sur la carte que les produits en stock, et permet de contrôler le contenu des pages du site. Vérification de majorité à l’entrée, version mobile et ordinateur.",
    url: "https://lempiredumalt.fr",
    linkLabel: "Voir le projet",
    stack: ["Bubble.io", "Node.js", "Express", "Vercel"],
    carouselLabel: "Captures d’écran de L’Empire du Malt",
    slides: [
      { src: "/images/empire-home.jpg", alt: "Accueil de L’Empire du Malt sur ordinateur", width: 800, height: 600 },
      { src: "/images/empire-about.jpg", alt: "Page Qui sommes-nous sur ordinateur", width: 800, height: 600 },
      { src: "/images/empire-gerzat-menu.jpg", alt: "Carte de l’établissement de Gerzat sur ordinateur", width: 800, height: 600 },
      { src: "/images/empire-mobile-home.jpg", alt: "Accueil de L’Empire du Malt sur mobile", width: 375, height: 812 },
      { src: "/images/empire-mobile-about.jpg", alt: "Page Qui sommes-nous sur mobile", width: 375, height: 812 },
    ],
  },
};
