"use client";

import { useId, type ComponentPropsWithoutRef } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = Omit<ComponentPropsWithoutRef<"textarea">, "name" | "id" | "className"> & {
  label: string;
  name: string;
};

export function TextArea({ label, name, rows = 5, ...rest }: TextAreaProps) {
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <textarea {...rest} id={id} name={name} rows={rows} className={styles.input} />
    </div>
  );
}
