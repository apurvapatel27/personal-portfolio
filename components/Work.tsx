import type { CSSProperties } from "react";
import { projects, work, type Project } from "@/content/site";
import { cn, tilt, toneBg, toneTint } from "@/lib/ui";
import { Tape } from "./doodle/Tape";
import { ProjectVisual } from "./ProjectVisual";
import { ButtonLink } from "./ui/Button";
import { SectionHeading } from "./ui/SectionHeading";

function ProjectLinks({ project }: { project: Project }) {
  const { demo, code, caseStudy } = project.links;
  return (
    <div className="flex flex-wrap gap-3">
      {caseStudy && <ButtonLink href={caseStudy}>{work.labels.caseStudy} →</ButtonLink>}
      {demo && <ButtonLink href={demo}>{work.labels.demo}</ButtonLink>}
      {code && (
        <ButtonLink href={code} variant="paper">
          {work.labels.code}
        </ButtonLink>
      )}
    </div>
  );
}

/** Tilted label on the card's top edge: number plus kicker. */
function CaptionTag({ project, index, className }: { project: Project; index: number; className?: string }) {
  return (
    <p className={cn("tag absolute -top-4 max-w-[calc(100%-2.5rem)]", toneBg[project.tone], className)} style={tilt(index % 2 ? 2 : -2.5)}>
      <span className="-my-0.5 -ml-1 rounded-[3px] bg-ink px-1.5 py-0.5 text-paper">{String(index + 1).padStart(2, "0")}</span>
      <span>{project.kicker}</span>
    </p>
  );
}

function ProjectText({ project, large }: { project: Project; large: boolean }) {
  return (
    <div>
      <h3
        id={`project-${project.slug}`}
        className={cn(
          "font-display leading-[1.02] font-extrabold tracking-[-0.02em]",
          large ? "text-[clamp(2rem,4.6vw,3.3rem)]" : "text-2xl md:text-3xl",
        )}
      >
        {project.title}
      </h3>
      <p className={cn("mt-4 leading-relaxed", large ? "text-[1.06rem]" : "text-base")}>{project.summary}</p>

      <ul aria-label="Built with" className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>

      {project.stamps && project.stamps.length > 0 && (
        <ul aria-label="Highlights" className="mt-5 flex flex-wrap gap-3">
          {project.stamps.map((stamp, i) => (
            <li
              key={stamp}
              className={cn("stamp", i % 2 ? "text-blue-deep" : "text-orange-deep")}
              style={tilt(i % 2 ? 2 : -3)}
            >
              {stamp}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-7">
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.size === "feature");
  const more = projects.filter((p) => p.size === "small");

  return (
    <section aria-labelledby="work-title" id="work" className="defer-render py-20 [--defer-h:3300px] md:py-28 md:[--defer-h:2700px]">
      <div className="page">
        <SectionHeading id="work-title" eyebrow={work.eyebrow} title={work.heading} intro={work.intro} tone="yellow" />

        {/* On large screens the cards stick under the header and pile up;
            the ones underneath shrink a little (see .stack in globals.css). */}
        <ol className="stack grid gap-14 lg:gap-24" style={{ "--n": featured.length } as CSSProperties}>
          {featured.map((project, i) => (
            <li key={project.slug} id={project.slug} style={{ "--i": i } as CSSProperties}>
              <article
                aria-labelledby={`project-${project.slug}`}
                className={cn(
                  "stack-card card-hard grid items-center gap-10 p-6 pt-12 sm:p-8 sm:pt-14 md:grid-cols-[1.05fr_1fr] md:p-10 md:pt-14 lg:gap-14",
                  toneTint[project.tone],
                )}
              >
                <CaptionTag project={project} index={i} className="left-5 sm:left-8" />
                <Tape tone={i % 2 ? "yellow" : "pink"} angle={i % 2 ? -5 : 4} className="-top-3.5 right-8 hidden h-8 w-28 sm:block" />
                <ProjectText project={project} large />
                <div className={cn(project.client && "pb-6 md:pb-0")}>
                  <ProjectVisual
                    project={project}
                    index={i}
                    sizes="(min-width: 1152px) 500px, (min-width: 768px) 44vw, 90vw"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>

        {more.length > 0 && (
          <div className="mt-20 md:mt-28">
            <h3 className="-rotate-1 font-hand text-3xl font-bold text-blue-deep">{work.moreLabel}</h3>
            <ul className={cn("mt-10 grid gap-12", more.length > 1 ? "lg:grid-cols-2" : "max-w-3xl")}>
              {more.map((project, i) => (
                <li key={project.slug} id={project.slug}>
                  <article
                    aria-labelledby={`project-${project.slug}`}
                    className={cn("card-hard grid gap-6 p-6 pt-11 sm:grid-cols-[1fr_11rem] sm:p-7 sm:pt-12", toneTint[project.tone])}
                  >
                    <CaptionTag project={project} index={featured.length + i} className="left-5" />
                    <ProjectText project={project} large={false} />
                    <div className="order-first mx-auto w-full max-w-[14rem] sm:order-none sm:max-w-none">
                      <ProjectVisual project={project} index={i + 1} sizes="176px" />
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
