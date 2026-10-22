import { Fragment } from "react";
import styles from "./LanguageSwitch.module.css";

type LanguageOption = { code: string; label: string; href: string };

type LanguageSwitchProps = {
  locales: LanguageOption[];
  currentLocale: string;
  /** Accessible name of the language group. */
  languageLabel: string;
};

/** Each option is a link to that language's address, so the page itself changes language. */
export function LanguageSwitch({ locales, currentLocale, languageLabel }: LanguageSwitchProps) {
  return (
    <div role="group" aria-label={languageLabel} className={styles.switch}>
      {locales.map((locale, index) => (
        <Fragment key={locale.code}>
          {index > 0 ? (
            <span aria-hidden="true" className={styles.separator}>
              |
            </span>
          ) : null}
          <a
            href={locale.href}
            lang={locale.code}
            className={styles.button}
            aria-current={locale.code === currentLocale ? "page" : undefined}
          >
            {locale.label}
          </a>
        </Fragment>
      ))}
    </div>
  );
}
