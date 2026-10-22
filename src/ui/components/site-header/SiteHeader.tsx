"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { cycleFocusIndex } from "./cycle-focus";
import styles from "./SiteHeader.module.css";

type HeaderLink = { label: string; href: string };

type SiteHeaderProps = {
  brand: HeaderLink;
  /** Rendered in place of the brand label (for example a BrandMark). The label stays the accessible name. */
  brandMark?: ReactNode;
  links: HeaderLink[];
  /** Rendered element for the language switch (for example a LanguageSwitch). Omit when the site has one language. */
  languageSwitch?: ReactNode;
  /** Accessible name of the navigation landmark. */
  navLabel: string;
  /** Accessible name of the burger button while the panel is closed. */
  menuLabel: string;
  /** Accessible name of the burger button while the panel is open. */
  closeLabel: string;
};

export function SiteHeader({ brand, brandMark, links, languageSwitch, navLabel, menuLabel, closeLabel }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const navId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector("a")?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }

      // Focus stays in the open panel: the links, then the close button (the burger), then back to the first link.
      if (event.key === "Tab") {
        const links = Array.from(navRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
        const items = burgerRef.current ? [...links, burgerRef.current] : links;
        const next = cycleFocusIndex(items.length, items.indexOf(document.activeElement as HTMLElement), event.shiftKey);
        if (next !== null) {
          event.preventDefault();
          items[next]?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <Link href={brand.href} className={styles.brand} aria-label={brandMark ? brand.label : undefined}>
        {brandMark ?? brand.label}
      </Link>

      <nav ref={navRef} id={navId} aria-label={navLabel} className={open ? `${styles.nav} ${styles.open}` : styles.nav}>
        <ul className={styles.list}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.link} onClick={() => setOpen(false)}>
                {link.label}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {languageSwitch ? <div className={styles.language}>{languageSwitch}</div> : null}
      </nav>

      <button
        ref={burgerRef}
        type="button"
        className={styles.burger}
        aria-expanded={open}
        aria-controls={navId}
        aria-label={open ? closeLabel : menuLabel}
        onClick={() => setOpen((current) => !current)}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}
