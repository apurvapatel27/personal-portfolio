import { cn } from "@/lib/ui";

/** The hand-drawn "AP" mark (same drawing as app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" className={cn("shrink-0", className)}>
      <path
        d="M10 8.5c15-1.6 30-1.4 45 .3 1.8 15.5 1.6 31.4-.2 47-15 1.6-30 1.4-45-.2-1.6-15.6-1.6-31.4.2-47.1Z"
        fill="var(--color-yellow)"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 47 22.8 17.5 31 47M18 36.5h9.5M37.5 47.5V18c6.2-1 13.2.3 13.5 7.2.3 6.8-6.9 8.2-13.2 7.5"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
