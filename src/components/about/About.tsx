import { Card, Pill } from "@/ui";
import type { AboutContent } from "../../content/fr/about";
import { anchors, sectionId } from "../../content/shared";
import styles from "./About.module.css";

type AboutProps = {
  content: AboutContent;
};

export function About({ content }: AboutProps) {
  return (
    <section id={sectionId(anchors.about)} className={styles.about}>
      <h2 className={styles.title}>{content.title}</h2>
      <p className={styles.intro}>{content.intro}</p>
      <div className={styles.cards}>
        {content.cards.map((card) => (
          <Card key={card.title} as="article" className={styles.card}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardText}>{card.text}</p>
          </Card>
        ))}
      </div>
      <div className={styles.pills}>
        {content.pills.map((pill) => (
          <Pill key={pill}>{pill}</Pill>
        ))}
      </div>
    </section>
  );
}
