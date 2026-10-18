"use client";

import { useId, type ComponentPropsWithoutRef } from "react";
import styles from "./TextField.module.css";

type TextFieldProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "name" | "autoComplete" | "id" | "className"
> & {
  label: string;
  name: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
};

export function TextField({ label, name, type, autoComplete, ...rest }: TextFieldProps) {
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        {...rest}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className={styles.input}
      />
    </div>
  );
}
