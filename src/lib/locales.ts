export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

/** The address of a language's version of the site: English at "/", French at "/fr". */
export function localePath(locale: Locale): string {
  return locale === "fr" ? "/fr" : "/";
}
