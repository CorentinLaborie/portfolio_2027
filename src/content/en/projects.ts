import type { ProjectsContent } from "../fr/projects";

export const projectsContent: ProjectsContent = {
  title: "Projects",
  selectLabel: "Project",
  options: [
    { value: "y", label: "Y" },
    { value: "micro", label: "My Mock Micro Investor" },
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
};
