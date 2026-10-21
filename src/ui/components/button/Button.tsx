import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "ghost";

type ButtonCommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

// Without href it renders a <button>; with href it renders an <a>.
type ButtonProps =
  | (ButtonCommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined })
  | (ButtonCommonProps & ComponentPropsWithoutRef<"a"> & { href: string });

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (rest.href !== undefined) {
    // Same-page anchors use next/link and stay in this tab. Web addresses open in a new one.
    // mailto links stay in this tab: a new tab would open blank.
    if (rest.href.startsWith("#")) {
      return (
        <Link className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    if (rest.href.startsWith("https://")) {
      return (
        <a className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
