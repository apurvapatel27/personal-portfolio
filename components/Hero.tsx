import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { hero, person } from "@/content/site";
import { cn, toneBg } from "@/lib/ui";
import { DraggableSticker } from "./doodle/DraggableSticker";
import { CurvyArrow, DoubleUnderline, Spark, Star } from "./doodle/doodles";
import { SketchFrame } from "./doodle/SketchFrame";
import { Tape } from "./doodle/Tape";
import { NameLens } from "./NameLens";
import { BlockButtonLink, ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { StatusLine } from "./ui/StatusPill";

// Where each pill sticker sits around the name box on large screens.
// On smaller screens they line up in a row under the name instead.
// Kept off the letters so the name always reads.
const stickerSpots = [
  "lg:absolute lg:-left-14 lg:top-[3%] xl:-left-4",
  "lg:absolute lg:-right-8 lg:-bottom-9",
  "lg:absolute lg:left-[10%] lg:-bottom-8",
];

/**
 * The headline with a highlighter swipe on `hero.highlight` and little
 * icon stickers dropped in after the words listed in `hero.accents`.
 */
function Headline({ text }: { text: string }) {
  const cuts = new Set([0, text.length]);
  const accentAt = new Map<number, (typeof hero.accents)[number]>();
  for (const accent of hero.accents) {
    const at = text.indexOf(accent.after);
    if (at === -1) continue;
    accentAt.set(at + accent.after.length, accent);
    cuts.add(at + accent.after.length);
  }
  const mark = hero.highlight ? text.indexOf(hero.highlight) : -1;
  if (mark !== -1) {
    cuts.add(mark);
    cuts.add(mark + hero.highlight.length);
  }

  const points = [...cuts].sort((a, b) => a - b);
  const parts: ReactNode[] = [];
  points.forEach((start, i) => {
    const accent = accentAt.get(start);
    if (accent) {
      parts.push(
        <span
          key={`icon-${start}`}
          aria-hidden="true"
          className={cn(
            "mx-[0.08em] inline-grid size-[1.02em] place-items-center rounded-[0.2em] border-[0.06em] border-ink align-[-0.16em] shadow-[0.07em_0.07em_0_0_var(--color-ink)]",
            toneBg[accent.tone],
            i % 2 ? "rotate-6" : "-rotate-6",
          )}
        >
          <Icon name={accent.icon} strokeWidth={2.4} className="size-[0.62em]" />
        </span>,
      );
    }
    const end = points[i + 1];
    if (end === undefined) return;
    const chunk = text.slice(start, end);
    const marked = mark !== -1 && start >= mark && end <= mark + hero.highlight.length;
    parts.push(
      marked ? (
        <span key={start} className="highlight">
          {chunk}
        </span>
      ) : (
        <Fragment key={start}>{chunk}</Fragment>
      ),
    );
  });
  return <>{parts}</>;
}

/** Handwritten note card with an arrow pointing at the name (arrow on large screens only). */
function NoteCard({ note, side }: { note: (typeof hero.noteCards)[number]; side: "left" | "right" }) {
  return (
    <p
      className="relative inline-block max-w-[9.5rem] rounded-[4px] border-2 border-ink bg-white px-3 pt-3 pb-2 text-center font-hand text-base leading-tight font-bold shadow-press sm:max-w-none sm:px-3.5 sm:text-lg lg:max-w-[11rem] lg:text-xl"
      style={{ rotate: side === "left" ? "-4deg" : "3deg" }}
    >
      <Tape tone={note.tone} angle={side === "left" ? -6 : 5} className="-top-3.5 left-1/2 h-6 w-16 -translate-x-1/2" />
      {note.text}
      <CurvyArrow
        className={cn(
          "absolute hidden w-16 lg:block",
          side === "left" ? "-top-14 -right-12" : "-bottom-14 -left-12 rotate-180",
        )}
      />
    </p>
  );
}

export function Hero() {
  const [leftNote, rightNote] = hero.noteCards;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="page relative">
        <Star className="absolute top-[52%] left-[6%] hidden size-12 animate-float lg:block" />
        <Spark className="absolute right-[7%] bottom-[18%] hidden size-10 animate-float [animation-delay:-2s] lg:block" />

        {/* The "canvas": name box in the middle, a note on either side */}
        <div className="relative flex flex-wrap items-start justify-center gap-x-3 gap-y-7 sm:gap-x-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-10">
          <div className="relative basis-full pt-4 text-center sm:pt-6 lg:col-start-2 lg:row-start-1 lg:pt-0">
            <h1 id="hero-title">
              <span className="sr-only">
                {person.name}, {person.title}
              </span>
              <span aria-hidden="true" className="relative mx-auto inline-block -rotate-2 px-2 font-hand text-[1.7rem] font-bold md:text-4xl">
                {hero.hello}
                <DoubleUnderline className="absolute -bottom-2.5 left-0 h-3.5 w-full text-orange md:-bottom-3" />
              </span>
              <span aria-hidden="true" className="relative mx-auto mt-6 block w-fit text-[clamp(3.25rem,16.5vw,6.25rem)] md:mt-8 lg:text-[clamp(5.5rem,9.6vw,8.75rem)]">
                {/* Rough crayon outline, slightly askew */}
                <span className="pointer-events-none absolute -inset-3 -rotate-[2.5deg] md:-inset-4">
                  <SketchFrame seed="hero-name" strokeWidth={3.5} className="text-pink" />
                </span>
                {/* Design-tool selection frame */}
                <span className="pointer-events-none absolute -inset-[7px] z-10 border-[1.5px] border-blue-deep">
                  <span className="handle -top-[7px] -left-[7px]" />
                  <span className="handle -top-[7px] -right-[7px]" />
                  <span className="handle -bottom-[7px] -left-[7px]" />
                  <span className="handle -right-[7px] -bottom-[7px]" />
                </span>
                <NameLens text={person.firstName} />
              </span>
            </h1>

            <ul aria-label="Quick facts" className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:mt-0">
              {hero.stickers.map((sticker, i) => (
                <li key={sticker.text} className={cn("z-20", stickerSpots[i % stickerSpots.length])}>
                  <DraggableSticker tone={sticker.tone} angle={sticker.tilt} index={i}>
                    {sticker.text}
                  </DraggableSticker>
                </li>
              ))}
            </ul>
          </div>

          {/* Left note sits low, right note sits high, both pointing at the name */}
          <div className="flex flex-col items-center lg:col-start-1 lg:row-start-1 lg:items-end lg:pt-40">
            {leftNote && <NoteCard note={leftNote} side="left" />}
          </div>
          <div className="flex flex-col items-center lg:col-start-3 lg:row-start-1 lg:items-start lg:pb-36">
            {rightNote && <NoteCard note={rightNote} side="right" />}
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-16">
          <StatusLine text={person.currently} className="text-left" />
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-center font-display text-[clamp(1.85rem,4.6vw,3.5rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance md:mt-10">
          <Headline text={hero.headline} />
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <BlockButtonLink href={hero.contactCta.href}>{hero.contactCta.label}</BlockButtonLink>
          <ButtonLink href={hero.primaryCta.href} variant="paper" className="min-h-12">
            {hero.primaryCta.label}
          </ButtonLink>
          {person.calendlyUrl && (
            <ButtonLink href={person.calendlyUrl} variant="yellow" className="min-h-12">
              Book a call
            </ButtonLink>
          )}
        </div>

        {hero.storyLink.href && (
          <div className="mt-9 flex justify-center">
            <Link
              href={hero.storyLink.href}
              className="sticker bg-pink font-hand text-lg tracking-normal normal-case transition-transform hover:-translate-y-0.5 hover:[--tilt:0deg]"
              style={{ "--tilt": "-4deg" } as CSSProperties}
            >
              {hero.storyLink.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

