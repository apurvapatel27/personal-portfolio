import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Tone } from "@/content/site";
import { cn } from "@/lib/ui";
import type { CamKey } from "./Explainer";

/**
 * Inline style for a timed element: it plays while the chapter's progress
 * runs from `a` to `b`. Extra custom properties (e.g. "--rot") pass through.
 */
export function win(a: number, b: number, extra?: Record<string, string | number>): CSSProperties {
  return { "--a": a, "--b": b, ...extra } as CSSProperties;
}

/**
 * Image props for a tape strip. Tapes show at most ~120 CSS px wide on
 * phones and ~260px elsewhere, so the 400px copies cover phones and 1x
 * screens, and sharper screens get the 800px originals.
 */
export function tapeImage(src: string) {
  return {
    src,
    srcSet: `${src.replace(/\.webp$/, "-400.webp")} 400w, ${src} 800w`,
    sizes: "(max-width: 40rem) 30vw, 260px",
  };
}

type StickerLink = { label: string; href: string };

/** The sticker link that ends a chapter, pointing to its real page. */
export function ChapterSticker({
  sticker,
  a = 0.92,
  b = 0.98,
  className,
}: {
  sticker: StickerLink;
  a?: number;
  b?: number;
  className?: string;
}) {
  if (!sticker.href) return null;
  return (
    <Link
      href={sticker.href}
      className={cn("vx-sticker sticker bg-yellow vx-slap vx-t", className)}
      style={win(a, b, { "--rot": "-10deg" })}
    >
      {sticker.label} →
    </Link>
  );
}

type ChapterProps = {
  id: string;
  /** Scroll length in screens. */
  len: number;
  /** Camera keyframes for the stage content. */
  cam: CamKey[];
  /** Camera moves are pans across panels: phones keep them at full size. */
  pan?: boolean;
  /** Full-bleed colour card that opens the chapter. */
  card?: { number: string; title: string; tone: Tone };
  /** Sticker link pinned to the stage's corner at the end of the chapter. */
  sticker?: StickerLink;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A chapter: a tall section with a sticky, screen-sized stage inside it.
 * The engine in Explainer.tsx writes the chapter's progress to --p.
 */
export function Chapter({ id, len, cam, pan, card, sticker, labelledBy, className, children }: ChapterProps) {
  const headingId = card ? `${id}-title` : labelledBy;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-vx-chapter=""
      className="vx-chapter"
      style={{ "--len": len } as CSSProperties}
    >
      <div className="vx-stage">
        {card && (
          <div className="vx-card vx-t" style={win(0.03, 0.14, { "--card": `var(--vx-${card.tone})` })}>
            <h2 id={headingId} className="vx-card-title">
              <span className="vx-card-number">{card.number}</span>
              <span className="sr-only"> · </span>
              <span className="vx-card-name">{card.title}</span>
            </h2>
          </div>
        )}
        <div className={cn("vx-cam", className)} data-cam={JSON.stringify(cam)} data-cam-pan={pan ? "" : undefined}>
          {children}
        </div>
        {sticker && <ChapterSticker sticker={sticker} className="vx-stage-sticker" />}
        <div className="vx-grain" aria-hidden="true" />
      </div>
    </section>
  );
}

/** A phrase that gets a yellow highlighter swipe, drawn left to right. */
export function Highlight({ a, b, focus, children }: { a: number; b: number; focus?: string; children: ReactNode }) {
  return (
    <span className="vx-hl vx-t" style={win(a, b)} data-cam-focus={focus}>
      <span className="vx-ink" aria-hidden="true" />
      {children}
    </span>
  );
}

/** A phrase that gets a red marker circle, drawn in one sweep. */
export function MarkerCircle({ a, b, focus, children }: { a: number; b: number; focus?: string; children: ReactNode }) {
  return (
    <span className="vx-circle vx-t" style={win(a, b)} data-cam-focus={focus}>
      {children}
      <span className="vx-ink" aria-hidden="true" />
    </span>
  );
}

/** A red marker arrow (drawn pointing right) that draws itself from its tail. */
export function MarkerArrow({ a, b, className }: { a: number; b: number; className?: string }) {
  return (
    <span className={cn("vx-draw-arrow vx-t", className)} style={win(a, b)} aria-hidden="true">
      <span className="vx-ink" />
    </span>
  );
}

/** Shared SVG filters: three seeds of the same wobble, cycled on twos. */
export function InkFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      {[3, 11, 23].map((seed, i) => (
        <filter key={seed} id={`vx-boil-${i}`} x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      ))}
    </svg>
  );
}
