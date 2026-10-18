"use client";

import type { FormEvent, ReactNode } from "react";
import { Button, TextArea, TextField } from "@/ui";
import type { ContactContent, ContactIcon } from "../../content/fr/contact";
import { anchors, sectionId } from "../../content/shared";
import styles from "./Contact.module.css";

const linkIcons: Record<ContactIcon, ReactNode> = {
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

type ContactProps = { content: ContactContent };

export function Contact({ content }: ContactProps) {
  const { email, fields } = content;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) ?? "");
    const body = [
      { label: fields.name, value: read("name") },
      { label: fields.email, value: read("email") },
      { label: fields.phone, value: read("phone") },
      { label: fields.message, value: read("message") },
    ]
      .map((entry) => `${entry.label}: ${entry.value}`)
      .join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(content.mailSubject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id={sectionId(anchors.contact)} className={styles.section}>
      <h2 className={styles.title}>{content.title}</h2>

      <div className={styles.layout}>
        <form aria-label={content.formLabel} className={styles.form} onSubmit={handleSubmit}>
          <TextField label={fields.name} name="name" type="text" autoComplete="name" required />
          <TextField label={fields.email} name="email" type="email" autoComplete="email" required />
          <TextField label={fields.phone} name="phone" type="tel" autoComplete="tel" />
          <TextArea label={fields.message} name="message" autoComplete="off" />
          <Button type="submit" className={styles.submit}>
            {content.submitLabel}
          </Button>
        </form>

        <div className={styles.links}>
          {content.links.map((link) => (
            <a
              key={link.href}
              className={styles.linkRow}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.linkIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {linkIcons[link.icon]}
              </svg>
              <span className={styles.linkLabel}>{link.label}</span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
