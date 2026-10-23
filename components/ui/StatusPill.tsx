import { cn } from "@/lib/ui";

/** Green dot that blinks like a recording light. */
export function BlinkDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block size-2.5 shrink-0 animate-blink rounded-full border-[1.5px] border-ink bg-green", className)}
    />
  );
}

/** "● Open to new projects" pill. */
export function StatusPill({ text, className }: { text: string; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1 font-mono text-[0.78rem] font-semibold tracking-wide text-green-deep uppercase",
        className,
      )}
    >
      <BlinkDot />
      {text}
    </p>
  );
}

/** Plain one-line status, e.g. "● Currently: open to new projects…". */
export function StatusLine({ text, className }: { text: string; className?: string }) {
  return (
    <p className={cn("inline-flex items-baseline gap-2.5 font-mono text-[0.86rem] text-ink-soft", className)}>
      <BlinkDot className="translate-y-px" />
      <span>{text}</span>
    </p>
  );
}
