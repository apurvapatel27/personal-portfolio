import { journey } from "@/content/site";
import { cn } from "@/lib/ui";
import { SectionHeading } from "./ui/SectionHeading";

const dot = { work: "bg-yellow", study: "bg-blue" } as const;

export function Journey() {
  return (
    <section aria-labelledby="journey-title" id="journey" className="defer-render py-20 [--defer-h:1050px] md:py-28">
      <div className="page">
        <SectionHeading id="journey-title" eyebrow={journey.eyebrow} title={journey.heading} tone="blue" />

        <ul aria-hidden="true" className="-mt-6 mb-10 flex gap-6 font-mono text-[0.78rem] font-semibold tracking-wider uppercase">
          {(["work", "study"] as const).map((kind) => (
            <li key={kind} className="flex items-center gap-2">
              <span className={cn("size-3.5 rounded-full border-2 border-ink", dot[kind])} />
              {journey.legend[kind]}
            </li>
          ))}
        </ul>

        <ol className="relative ml-2 max-w-3xl border-l-[3px] border-ink">
          {journey.entries.map((entry) => (
            <li key={`${entry.when}-${entry.title}`} className="relative pb-8 pl-7 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-5 -left-[11px] size-[19px] rounded-full border-[2.5px] border-ink",
                  dot[entry.kind],
                )}
              />
              <div className="rounded-[6px] border-2 border-ink bg-white p-4 shadow-press sm:p-5">
                <p className="font-mono text-[0.8rem] font-semibold tracking-wider text-orange-deep uppercase">
                  {entry.when}
                </p>
                <h3 className="mt-1 font-display text-xl leading-tight font-extrabold sm:text-2xl">
                  <span className="sr-only">{journey.legend[entry.kind]}: </span>
                  {entry.title}
                </h3>
                <p className="mt-1 text-ink-soft">{entry.org}</p>
                {entry.note && <p className="mt-2 -rotate-1 font-hand text-lg text-blue-deep">{entry.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
