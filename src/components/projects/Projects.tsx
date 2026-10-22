"use client";

import { useState } from "react";
import { Button, Carousel, Logo, Pill } from "@/ui";
import type { ProjectId, ProjectsContent } from "../../content/fr/projects";
import { anchors, sectionId } from "../../content/shared";
import styles from "./Projects.module.css";

type ProjectsProps = { content: ProjectsContent };

export function Projects({ content }: ProjectsProps) {
  const [selected, setSelected] = useState<ProjectId>("y");

  const slideLabel = (current: number, total: number) =>
    content.carousel.slideOf
      .replace("{current}", String(current))
      .replace("{total}", String(total));

  const counterLabel = (current: number, total: number) =>
    content.carousel.counterOf
      .replace("{current}", String(current))
      .replace("{total}", String(total));

  return (
    <section id={sectionId(anchors.projects)} className={styles.section}>
      <h2 className={styles.title}>{content.title}</h2>

      <div role="group" aria-label={content.selectLabel} className={styles.chips}>
        {content.options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.chip}
            aria-pressed={option.value === selected}
            onClick={() => setSelected(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.bento}>
        <article className={styles.tile}>
          {selected === "y" ? (
            <div className={styles.yContent}>
              <div className={styles.info}>
                <div className={styles.logo}>
                  <Logo size={180} />
                </div>
                <div className={styles.intro}>
                  <h3 className={styles.yTitle}>{content.y.title}</h3>
                  <p className={styles.description}>{content.y.description}</p>
                </div>
                <div className={styles.tags}>
                  {content.y.hashtags.map((tag) => (
                    <Pill key={tag} className={styles.hashtag}>
                      {tag}
                    </Pill>
                  ))}
                </div>
                <div className={styles.tags}>
                  {content.y.stack.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
                <Button href={content.y.url} className={styles.projectButton}>
                  {content.y.linkLabel}
                </Button>
              </div>
              <div className={styles.media}>
                <Carousel
                  slides={content.carousel.slides}
                  label={content.carousel.label}
                  previousLabel={content.carousel.previousLabel}
                  nextLabel={content.carousel.nextLabel}
                  roleLabel={content.carousel.roleLabel}
                  slideRoleLabel={content.carousel.slideRoleLabel}
                  dialogLabel={content.carousel.dialogLabel}
                  expandLabel={content.carousel.expandLabel}
                  closeLabel={content.carousel.closeLabel}
                  counterLabel={counterLabel}
                  slideLabel={slideLabel}
                />
              </div>
            </div>
          ) : selected === "empire" ? (
            <div className={styles.yContent}>
              <div className={styles.info}>
                <div className={styles.intro}>
                  <h3 className={styles.yTitle}>{content.empire.title}</h3>
                  <p className={styles.description}>{content.empire.description}</p>
                </div>
                <div className={styles.tags}>
                  {content.empire.stack.map((item) => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </div>
                <Button href={content.empire.url} className={styles.projectButton}>
                  {content.empire.linkLabel}
                </Button>
              </div>
              <div className={styles.media}>
                <Carousel
                  slides={content.empire.slides}
                  label={content.empire.carouselLabel}
                  previousLabel={content.carousel.previousLabel}
                  nextLabel={content.carousel.nextLabel}
                  roleLabel={content.carousel.roleLabel}
                  slideRoleLabel={content.carousel.slideRoleLabel}
                  dialogLabel={content.carousel.dialogLabel}
                  expandLabel={content.carousel.expandLabel}
                  closeLabel={content.carousel.closeLabel}
                  counterLabel={counterLabel}
                  slideLabel={slideLabel}
                />
              </div>
            </div>
          ) : (
            <div className={styles.microContent}>
              <h3 className={styles.microTitle}>{content.micro.title}</h3>
              <p className={styles.description}>{content.micro.description}</p>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
