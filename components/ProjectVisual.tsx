import Image from "next/image";
import type { Project } from "@/content/site";
import { tilt } from "@/lib/ui";
import { ProjectIllustration } from "./doodle/doodles";
import { Tape } from "./doodle/Tape";

/** Screenshot polaroid or doodle sheet for a project, plus an optional client logo. */
export function ProjectVisual({ project, index, sizes }: { project: Project; index: number; sizes: string }) {
  const { visual, client, tone } = project;
  const angle = index % 2 === 0 ? 2 : -2;

  return (
    <div className="relative mx-auto w-full max-w-[34rem] pt-3">
      {visual.kind === "image" ? (
        <figure className="polaroid" style={tilt(angle)}>
          <Tape tone={tone === "yellow" ? "orange" : "yellow"} angle={-5} className="-top-3.5 left-1/2 -translate-x-1/2" />
          <Image
            src={visual.src}
            width={visual.width}
            height={visual.height}
            alt={visual.alt}
            sizes={sizes}
            className="h-auto w-full border border-ink/15"
          />
          {visual.caption && (
            <figcaption className="absolute inset-x-3 bottom-2 text-center font-hand text-lg leading-tight text-ink">
              {visual.caption}
            </figcaption>
          )}
        </figure>
      ) : (
        <div className="relative rounded-[4px] border-2 border-ink bg-white p-4 shadow-press sm:p-6" style={{ rotate: `${angle}deg` }}>
          <Tape tone={tone === "yellow" ? "orange" : "yellow"} angle={4} className="-top-3.5 left-1/2 -translate-x-1/2" />
          <div role="img" aria-label={visual.label}>
            <ProjectIllustration name={visual.doodle} className="h-auto w-full" />
          </div>
        </div>
      )}

      {client && (
        <figure
          className="polaroid absolute -bottom-6 -left-2 w-20 pb-7 sm:-left-6 sm:w-28"
          style={tilt(-8)}
        >
          <Tape tone="blue" angle={8} className="-top-3 left-1/2 h-6 w-16 -translate-x-1/2" />
          <Image src={client.logo} width={client.width} height={client.height} alt={`${client.name} logo`} sizes="112px" />
          <figcaption className="absolute inset-x-1 bottom-1 text-center font-hand text-[0.8rem] leading-tight">
            {client.name.split(" ")[0]}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
