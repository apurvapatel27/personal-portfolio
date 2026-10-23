import type { ReactNode } from "react";
import type { Tone } from "@/content/site";
import { cn, tilt, toneBg } from "@/lib/ui";

type SectionHeadingProps = {
  id: string;
  /** Small label above the title, e.g. "01 · work". */
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  /** Optional handwritten aside next to the title. */
  note?: string;
  /** Colour of the eyebrow tag. */
  tone?: Tone;
  /** Replaces the default bottom margin. */
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, intro, note, tone = "yellow", className }: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className ?? "mb-12 md:mb-16")}>
      <p className={cn("tag", toneBg[tone])} style={tilt(-3)}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-5 font-display text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.02em] text-balance"
      >
        {title}
      </h2>
      {note && (
        <p className="mt-2 -rotate-2 font-hand text-xl text-blue-deep" aria-hidden="true">
          {note}
        </p>
      )}
      {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </header>
  );
}
