"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import styles from "./Select.module.css";

type SelectOption = { value: string; label: string };

type SelectProps = {
  /** Accessible name of the selector: the trigger and the listbox are both named with it. */
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export function Select({ label, options, value, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const labelId = useId();
  const triggerId = useId();
  const listId = useId();
  const current = options.find((option) => option.value === value);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.focus();
    }
  }, [open]);

  function choose(next: string) {
    onChange(next);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    const options = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    const index = options.indexOf(event.target as HTMLElement);
    const last = options.length - 1;
    const targets: Record<string, number> = {
      ArrowDown: Math.min(index + 1, last),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: last,
    };
    const target = targets[event.key];
    if (target !== undefined) {
      event.preventDefault();
      options[target]?.focus();
    }
  }

  return (
    <div className={styles.root} onBlur={handleBlur} onKeyDown={handleKeyDown}>
      <span id={labelId} className={styles.visuallyHidden}>
        {label}
      </span>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className={styles.trigger}
        aria-labelledby={`${labelId} ${triggerId}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((state) => !state)}
      >
        <span>{current?.label}</span>
        <svg
          className={styles.chevron}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div ref={listRef} id={listId} role="listbox" aria-label={label} className={styles.list}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={styles.option}
              onClick={() => choose(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
