import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  size: number;
};

// Decorative mark: the link around it carries the accessible name.
export function BrandMark({ size }: BrandMarkProps) {
  return (
    <svg
      className={styles.mark}
      width={size}
      height={size}
      viewBox="0 0 140 140"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="brand-mark-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#312E81" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <rect width="140" height="140" rx="30" fill="url(#brand-mark-gradient)" />
      <rect x="7" y="7" width="126" height="126" rx="24" fill="none" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M79 51 A30 30 0 1 0 79 89" fill="none" stroke="#ffffff" strokeWidth="14" />
      <path d="M106 36 V100 H122" fill="none" stroke="#ffffff" strokeWidth="14" />
    </svg>
  );
}
