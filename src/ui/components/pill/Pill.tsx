import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Pill.module.css";

type PillProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
};

export function Pill({ className, children, ...rest }: PillProps) {
  const classes = [styles.pill, className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
