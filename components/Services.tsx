import Link from "next/link";
import { contact, hero, person, services, type Tone } from "@/content/site";
import { cn, tilt, toneBg, toneTint } from "@/lib/ui";
import { Doodle, Spark } from "./doodle/doodles";
import { Tape } from "./doodle/Tape";
import { BlockButtonLink, ButtonLink } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

const cardTilts = [-1.2, 0.8, -0.6, 1.1, -0.9];
const fitTones: Tone[] = ["yellow", "blue", "mint", "pink"];

export function Services() {
  return (
    <section aria-labelledby="services-title" id="services" className="defer-render py-20 [--defer-h:3250px] md:py-28 md:[--defer-h:1800px]">
      <div className="page">
        <SectionHeading
          id="services-title"
          eyebrow={services.eyebrow}
          title={services.heading}
          intro={services.intro}
          tone="pink"
        />

        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => (
            <li key={service.title} style={{ rotate: `${cardTilts[i % cardTilts.length]}deg` }}>
              <article className="card-hard h-full bg-white p-6 pt-8">
                <Tape tone={service.tone} angle={i % 2 ? 5 : -4} className="-top-3.5 left-6" />
                <span className={cn("grid size-16 place-items-center rounded-[6px] border-2 border-ink", toneTint[service.tone])}>
                  <Doodle name={service.doodle} className="size-12" />
                </span>
                <h3 className="mt-5 font-display text-xl leading-tight font-extrabold">{service.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{service.body}</p>
              </article>
            </li>
          ))}
          <li style={{ rotate: "0.7deg" }}>
            <div className="flex h-full flex-col items-start justify-center rounded-[6px] border-[3px] border-dashed border-ink/60 p-6">
              <Spark className="size-9" />
              <h3 className="mt-4 font-hand text-2xl leading-tight font-bold">{services.unsure.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{services.unsure.body}</p>
              <Link
                href={hero.contactCta.href}
                className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.8rem] font-semibold tracking-wider text-orange-deep uppercase underline decoration-wavy underline-offset-4"
              >
                {services.unsure.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        </ul>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h3 className="font-hand text-3xl font-bold text-blue-deep">{services.goodFitLabel}</h3>
            <ul className="mt-5 flex flex-wrap gap-3">
              {services.goodFit.map((item, i) => (
                <li
                  key={item}
                  className={cn("sticker normal-case", toneBg[fitTones[i % fitTones.length]])}
                  style={tilt(i % 2 ? 1.5 : -2)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-hand text-3xl font-bold text-blue-deep">{services.processLabel}</h3>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {services.process.map((step, i) => (
                <li key={step.title} className="relative rounded-[6px] border-2 border-ink bg-white p-4 shadow-press" style={tilt(i % 2 ? 1 : -1)}>
                  <span className="font-mono text-[0.75rem] font-semibold tracking-widest text-orange-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-display text-lg leading-tight font-extrabold">{step.title}</p>
                  <p className="mt-1 text-[0.95rem] leading-snug text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="card-hard mt-16 flex flex-col items-start gap-5 bg-yellow-tint p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl font-hand text-2xl leading-snug font-bold">{services.pricing}</p>
          <div className="flex flex-wrap gap-3">
            {person.calendlyUrl && (
              <ButtonLink href={person.calendlyUrl} variant="yellow">
                {contact.bookCallLabel}
              </ButtonLink>
            )}
            <BlockButtonLink href={hero.contactCta.href}>{hero.contactCta.label}</BlockButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
