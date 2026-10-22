import type { ProjectsContent } from "../fr/projects";

export const projectsContent: ProjectsContent = {
  title: "Projects",
  selectLabel: "Project",
  options: [
    { value: "y", label: "Y" },
    { value: "micro", label: "My Mock Micro Investor" },
    { value: "empire", label: "L’Empire du Malt" },
  ],
  carousel: {
    label: "Y screenshots",
    previousLabel: "Previous slide",
    nextLabel: "Next slide",
    roleLabel: "carousel",
    slideRoleLabel: "slide",
    dialogLabel: "Enlarged image",
    expandLabel: "Enlarge image: {alt}",
    closeLabel: "Close",
    slideOf: "{current} of {total}",
    counterOf: "{current} / {total}",
    slides: [
      { src: "/images/y-screen-1.png", alt: "Y welcome screen on mobile", width: 360, height: 667 },
      { src: "/images/y-screen-2.png", alt: "Y home screen on desktop", width: 1440, height: 1073 },
      { src: "/images/y-screen-3.png", alt: "Y messages on tablet", width: 768, height: 1024 },
      { src: "/images/y-screen-4.png", alt: "Y bookmarks on tablet", width: 768, height: 1024 },
      { src: "/images/y-screen-5.png", alt: "Y more menu on mobile", width: 360, height: 667 },
    ],
  },
  y: {
    title: "Y, the social network that makes you think.",
    description:
      "A feed of questions instead of a feed of reactions. Someone asks a question, others react (Like, Disagree, Y), and the conversation only opens at 50 Y. Adults only: the age declared at sign-up, from the birth date, keeps minors out.",
    url: "https://y.corentin-laborie.com",
    linkLabel: "View project",
    hashtags: ["#online_life", "#irl_vs_online"],
    stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma", "Docker"],
  },
  micro: {
    title: "My Mock Micro Investor",
    description: "Project under construction.",
  },
  empire: {
    title: "L’Empire du Malt",
    description:
      "Showcase website for a network of independent beer bars and shops in France (Clermont-Ferrand, Mozac, Gerzat and Saint-Gaudens). Brand story, locations map, and a form to rent a beer tap. A back-office connected to the cash registers shows only the products in stock on the menu, and lets the team control the content of the site’s pages. Age check on entry, responsive on mobile and desktop.",
    url: "https://lempiredumalt.fr",
    linkLabel: "View project",
    stack: ["Bubble.io", "Node.js", "Express", "Vercel"],
    carouselLabel: "L’Empire du Malt screenshots",
    slides: [
      { src: "/images/empire-home.jpg", alt: "Home page of L’Empire du Malt on desktop", width: 800, height: 600 },
      { src: "/images/empire-about.jpg", alt: "About us page on desktop", width: 800, height: 600 },
      { src: "/images/empire-gerzat-menu.jpg", alt: "Gerzat location menu on desktop", width: 800, height: 600 },
      { src: "/images/empire-mobile-home.jpg", alt: "Home page of L’Empire du Malt on mobile", width: 375, height: 812 },
      { src: "/images/empire-mobile-about.jpg", alt: "About us page on mobile", width: 375, height: 812 },
    ],
  },
};
