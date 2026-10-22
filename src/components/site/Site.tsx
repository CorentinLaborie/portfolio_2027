"use client";

import { useEffect } from "react";
import { About } from "../about";
import { Contact } from "../contact";
import { Hero } from "../hero";
import { Projects } from "../projects";
import { Footer, LanguageSwitch, SiteHeader } from "@/ui";
import type { AboutContent } from "../../content/fr/about";
import type { CommonContent } from "../../content/fr/common";
import type { ContactContent } from "../../content/fr/contact";
import type { HeroContent } from "../../content/fr/hero";
import type { ProjectsContent } from "../../content/fr/projects";
import { anchors } from "../../content/shared";
import { localePath, locales, type Locale } from "../../lib/locales";

type SiteContent = {
  common: CommonContent;
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectsContent;
  contact: ContactContent;
};

type SiteProps = {
  fr: SiteContent;
  en: SiteContent;
  /** The language shown on the first render: English on "/", French on "/fr". */
  initialLocale?: Locale;
};

const switchOptions = locales.map((code) => ({ code, label: code.toUpperCase(), href: localePath(code) }));

export function Site({ fr, en, initialLocale = "en" }: SiteProps) {
  // The language is the one of the address: each switch option is a link to the other address.
  const locale = initialLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const content = locale === "fr" ? fr : en;
  const { common } = content;

  useEffect(() => {
    document.title = common.brandName;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = common.metaDescription;
  }, [common]);

  return (
    <>
      <SiteHeader
        brand={{ label: common.brandName, href: anchors.home }}
        links={[
          { label: common.nav.about, href: anchors.about },
          { label: common.nav.projects, href: anchors.projects },
          { label: common.nav.contact, href: anchors.contact },
        ]}
        languageSwitch={
          <LanguageSwitch
            locales={switchOptions}
            currentLocale={locale}
            languageLabel={common.languageLabel}
          />
        }
        navLabel={common.navLabel}
        menuLabel={common.menuLabel}
        closeLabel={common.closeLabel}
      />
      <main>
        <Hero content={content.hero} />
        <About content={content.about} />
        <Projects content={content.projects} />
        <Contact content={content.contact} />
      </main>
      <Footer>{common.footerText.replace("{year}", String(new Date().getFullYear()))}</Footer>
    </>
  );
}
