import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CrmIllustration, Spark } from "@/components/doodle/doodles";
import { Tape } from "@/components/doodle/Tape";
import { BlockButtonLink, ButtonLink } from "@/components/ui/Button";
import { contact, crmCaseStudy as study, hero, person, projects } from "@/content/site";
import { openGraph } from "@/lib/seo";
import { tilt } from "@/lib/ui";

const path = `/work/${study.slug}`;

export const metadata: Metadata = {
  title: study.shortTitle,
  description: study.description,
  alternates: { canonical: path },
  openGraph: openGraph({ type: "article", url: path, title: study.title, description: study.description }),
  twitter: { card: "summary_large_image", title: study.title, description: study.description },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-4 border-t-2 border-dashed border-ink/40 py-12 md:grid-cols-[14rem_1fr] md:gap-10 md:py-16">
      <h2 id={id} className="font-display text-2xl leading-tight font-extrabold md:text-3xl">
        {title}
      </h2>
      <div className="max-w-3xl text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function Checklist({ items, done }: { items: string[]; done: boolean }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`mt-1 grid size-6 shrink-0 place-items-center rounded-[6px] border-2 border-ink text-sm font-bold ${done ? "bg-green-deep text-white" : "bg-white"}`}
          >
            {done ? "✓" : ""}
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function CrmCaseStudy() {
  const { labels, ai } = study;
  const index = projects.findIndex((p) => p.slug === study.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article aria-labelledby="case-title" className="page pt-8 pb-16 md:pt-12">
      <Link
        href="/#work"
        className="inline-flex min-h-11 items-center gap-2 rounded-md font-mono text-[0.8rem] font-semibold tracking-wider uppercase hover:text-orange-deep"
      >
        <span aria-hidden="true">←</span> {labels.back}
      </Link>

      {/* Header */}
      <header className="mt-6 grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr] md:items-start md:pb-16">
        <div>
          <p className="tag bg-yellow" style={tilt(-3)}>
            {labels.eyebrow}
          </p>
          <h1
            id="case-title"
            className="mt-5 font-display text-[clamp(2.3rem,6.4vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.025em] text-balance"
          >
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft">{study.description}</p>
        </div>

        <div className="relative">
          <figure className="polaroid absolute -top-5 right-3 z-10 w-20 pb-7" style={tilt(6)}>
            <Tape tone="blue" angle={-6} className="-top-3 left-1/2 h-6 w-16 -translate-x-1/2" />
            <Image
              src={study.client.logo}
              width={study.client.width}
              height={study.client.height}
              alt={`${study.client.name} logo`}
              sizes="112px"
              loading="eager"
            />
            <figcaption className="absolute inset-x-1 bottom-1 text-center font-hand text-[0.8rem]">client</figcaption>
          </figure>
          <dl className="index-card grid gap-4 p-6 pt-14">
            {study.meta.map((row, i) => (
              <div key={row.label} className={i === 0 ? "pr-24" : undefined}>
                <dt className="font-mono text-[0.75rem] font-semibold tracking-[0.16em] text-orange-deep uppercase">
                  {row.label}
                </dt>
                <dd className="mt-0.5 leading-snug">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {study.problem.length > 0 && (
        <Section id="problem" title={labels.problem}>
          <div className="space-y-4">
            {study.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      <Section id="before-after" title={labels.beforeAfter}>
        <div className="relative rounded-[4px] border-2 border-ink bg-white p-4 shadow-press sm:p-8" style={{ rotate: "-0.8deg" }}>
          <Tape tone="yellow" angle={-4} className="-top-3 left-10" />
          <Tape tone="mint" angle={5} className="-top-3 right-10" />
          <div role="img" aria-label={labels.beforeAfterAlt}>
            <CrmIllustration className="h-auto w-full" />
          </div>
        </div>
      </Section>

      {study.process.length > 0 && (
        <Section id="process" title={labels.process}>
          <ol className="grid gap-4">
            {study.process.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-mono text-sm font-semibold text-orange-deep">{String(i + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {study.features.length > 0 && (
        <Section id="features" title={labels.features}>
          <Checklist items={study.features} done />
        </Section>
      )}

      <Section id="ai" title={labels.ai}>
        <ul aria-label={labels.ai} className="flex flex-wrap gap-4">
          <li className="stamp px-3 py-1 text-base text-green-deep" style={tilt(-3)}>
            {ai.live.length} {labels.live}
          </li>
          <li className="stamp px-3 py-1 text-base text-blue-deep" style={tilt(2)}>
            {ai.inProgress.length} {labels.inProgress}
          </li>
        </ul>
        {(ai.live.length > 0 || ai.inProgress.length > 0) && (
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {ai.live.length > 0 && (
              <div>
                <h3 className="font-hand text-2xl font-bold text-green-deep capitalize">{labels.live}</h3>
                <div className="mt-3">
                  <Checklist items={ai.live} done />
                </div>
              </div>
            )}
            {ai.inProgress.length > 0 && (
              <div>
                <h3 className="font-hand text-2xl font-bold text-blue-deep capitalize">{labels.inProgress}</h3>
                <div className="mt-3">
                  <Checklist items={ai.inProgress} done={false} />
                </div>
              </div>
            )}
          </div>
        )}
      </Section>

      {study.results && (
        <Section id="results" title={labels.results}>
          <p className="font-hand text-2xl leading-snug">{study.results}</p>
        </Section>
      )}

      {/* Next project + contact */}
      <div className="card-hard mt-6 grid gap-8 bg-yellow-tint p-6 sm:p-10 md:grid-cols-2 md:items-center">
        <Spark className="absolute -top-5 -right-3 size-10" />
        {next && next.slug !== study.slug && (
          <div>
            <p className="font-mono text-[0.78rem] font-semibold tracking-[0.16em] text-orange-deep uppercase">{labels.next}</p>
            <Link
              href={`/#${next.slug}`}
              className="mt-1 inline-flex min-h-11 items-center gap-2 font-display text-3xl font-extrabold underline decoration-wavy decoration-2 underline-offset-[6px] hover:text-orange-deep"
            >
              {next.title} <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
        <div>
          <p className="font-hand text-2xl font-bold">{labels.cta}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <BlockButtonLink href={hero.contactCta.href}>{hero.contactCta.label}</BlockButtonLink>
            {person.calendlyUrl && (
              <ButtonLink href={person.calendlyUrl} variant="paper">
                {contact.bookCallLabel}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
