import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardTag = "div" | "article";

type CardProps = {
  as?: CardTag;
  className?: string;
  children: ReactNode;
};

export function Card({ as: Tag = "div", className, children }: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return <Tag className={classes}>{children}</Tag>;
}
