import type { ReactNode } from "react";
import styles from "./Footer.module.css";

type FooterProps = {
  children: ReactNode;
};

export function Footer({ children }: FooterProps) {
  return <footer className={styles.footer}>{children}</footer>;
}
