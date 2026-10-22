import Image from "next/image";
import { Button, Pill } from "@/ui";
import type { HeroContent } from "../../content/fr/hero";
import { anchors, sectionId } from "../../content/shared";
import { fillAge } from "../../lib/age";
import styles from "./Hero.module.css";

type HeroProps = {
  content: HeroContent;
};

// Intrinsic size of public/images/portrait.jpg.
const portraitWidth = 1204;
const portraitHeight = 1600;

export function Hero({ content }: HeroProps) {
  const today = new Date();
  return (
    <section id={sectionId(anchors.home)} className={styles.hero}>
      <div className={styles.text}>
        <h1 className={styles.name}>{content.name}</h1>
        <h2 className={styles.headline}>{content.headline}</h2>
        <div className={styles.pills}>
          {content.pills.map((pill) => {
            const text = fillAge(pill, content.birthDate, today);
            return <Pill key={text}>{text}</Pill>;
          })}
        </div>
        <p className={styles.tagline}>{content.tagline}</p>
        <div className={styles.actions}>
          <Button href={content.primaryCta.href} variant="primary">
            {content.primaryCta.label}
          </Button>
          <Button href={content.secondaryCta.href} variant="ghost">
            {content.secondaryCta.label}
          </Button>
        </div>
      </div>
      <div className={styles.portrait}>
        <Image
          className={styles.image}
          src={content.portrait.src}
          alt={content.portrait.alt}
          width={portraitWidth}
          height={portraitHeight}
          sizes="(max-width: 1023px) calc(100vw - 72px), 440px"
          preload
        />
      </div>
    </section>
  );
}
