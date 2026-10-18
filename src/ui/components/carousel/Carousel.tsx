"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

type CarouselSlide = {
  src: string;
  alt: string;
  /** Intrinsic image width in pixels. */
  width: number;
  /** Intrinsic image height in pixels. */
  height: number;
};

type CarouselProps = {
  slides: CarouselSlide[];
  /** Accessible name of the carousel region. */
  label: string;
  previousLabel: string;
  nextLabel: string;
  /** Accessible role description of the carousel region. */
  roleLabel: string;
  /** Accessible role description of each slide. */
  slideRoleLabel: string;
  /** Accessible name of the full-size dialog. */
  dialogLabel: string;
  /** Accessible name template of the button that opens a slide full size; "{alt}" is replaced by the slide alt text. */
  expandLabel: string;
  /** Accessible name of the button that closes the full-size view. */
  closeLabel: string;
  /** Builds the visible "n / total" counter text. */
  counterLabel: (current: number, total: number) => string;
  /** Builds the accessible name of each slide. */
  slideLabel: (current: number, total: number) => string;
};

export function Carousel({
  slides,
  label,
  previousLabel,
  nextLabel,
  roleLabel,
  slideRoleLabel,
  dialogLabel,
  expandLabel,
  closeLabel,
  counterLabel,
  slideLabel,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const total = slides.length;
  const active = total === 0 ? 0 : index % total;
  const activeSlide = slides[active];
  const openSlide = openIndex === null ? undefined : slides[openIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (openIndex !== null && !dialog.open) {
      dialog.showModal();
    }
    if (openIndex === null && dialog.open) {
      dialog.close();
    }
  }, [openIndex]);

  if (!activeSlide) {
    return null;
  }

  const previous = () => setIndex((active - 1 + total) % total);
  const next = () => setIndex((active + 1) % total);

  return (
    <div role="region" aria-roledescription={roleLabel} aria-label={label} className={styles.root}>
      <div className={styles.stage}>
        <div
          className={styles.viewport}
          style={{ aspectRatio: `${activeSlide.width} / ${activeSlide.height}` }}
        >
          <div className={styles.track} style={{ transform: `translateX(${-active * 100}%)` }}>
            {slides.map((slide, i) => (
              <div
                key={slide.src}
                role="group"
                aria-roledescription={slideRoleLabel}
                aria-label={slideLabel(i + 1, total)}
                inert={i !== active}
                className={styles.slide}
              >
                <button
                  type="button"
                  className={styles.imageButton}
                  aria-label={expandLabel.replace("{alt}", slide.alt)}
                  onClick={() => setOpenIndex(i)}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={slide.width}
                    height={slide.height}
                    sizes="(max-width: 639px) calc(100vw - 82px), (max-width: 1439px) calc(100vw - 260px), 1200px"
                    loading={i === 0 ? "eager" : "lazy"}
                    className={styles.image}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.button} ${styles.previous}`}
          aria-label={previousLabel}
          onClick={previous}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <p className={styles.counter} aria-live="polite">
          {counterLabel(active + 1, total)}
        </p>
        <button
          type="button"
          className={`${styles.button} ${styles.next}`}
          aria-label={nextLabel}
          onClick={next}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={dialogLabel}
        className={styles.dialog}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setOpenIndex(null);
          }
        }}
      >
        {openSlide && (
          <Image
            src={openSlide.src}
            alt={openSlide.alt}
            width={openSlide.width}
            height={openSlide.height}
            sizes="100vw"
            className={styles.dialogImage}
          />
        )}
        <button
          type="button"
          className={`${styles.button} ${styles.closeButton}`}
          aria-label={closeLabel}
          onClick={() => setOpenIndex(null)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </dialog>
    </div>
  );
}
