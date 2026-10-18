import { Site } from "../components/site/Site";
import { aboutContent as aboutFr } from "../content/fr/about";
import { commonFr } from "../content/fr/common";
import { contactContent as contactFr } from "../content/fr/contact";
import { heroContent as heroFr } from "../content/fr/hero";
import { projectsContent as projectsFr } from "../content/fr/projects";
import { commonEn } from "../content/en/common";
import { aboutContent as aboutEn } from "../content/en/about";
import { contactContent as contactEn } from "../content/en/contact";
import { heroContent as heroEn } from "../content/en/hero";
import { projectsContent as projectsEn } from "../content/en/projects";

export default function HomePage() {
  return (
    <Site
      fr={{ common: commonFr, hero: heroFr, about: aboutFr, projects: projectsFr, contact: contactFr }}
      en={{ common: commonEn, hero: heroEn, about: aboutEn, projects: projectsEn, contact: contactEn }}
    />
  );
}
