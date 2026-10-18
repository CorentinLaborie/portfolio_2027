import { Fragment } from "react";
import styles from "./LanguageSwitch.module.css";

type LanguageOption = { code: string; label: string };

type LanguageSwitchProps = {
  locales: LanguageOption[];
  currentLocale: string;
  /** Called with the code of the language that was clicked. */
  onChange: (locale: string) => void;
  /** Accessible name of the language group. */
  languageLabel: string;
};

export function LanguageSwitch({ locales, currentLocale, onChange, languageLabel }: LanguageSwitchProps) {
  return (
    <div role="group" aria-label={languageLabel} className={styles.switch}>
      {locales.map((locale, index) => (
        <Fragment key={locale.code}>
          {index > 0 ? (
            <span aria-hidden="true" className={styles.separator}>
              |
            </span>
          ) : null}
          <button
            type="button"
            lang={locale.code}
            className={styles.button}
            aria-pressed={locale.code === currentLocale}
            onClick={() => onChange(locale.code)}
          >
            {locale.label}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
