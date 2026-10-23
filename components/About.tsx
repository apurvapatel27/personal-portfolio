import Image from "next/image";
import { about } from "@/content/site";
import { tilt } from "@/lib/ui";
import { Smiley } from "./doodle/doodles";
import { Tape } from "./doodle/Tape";
import { SectionHeading } from "./ui/SectionHeading";

const cardTilts = [-1, 0.8, -0.5, 1.2, -1.1, 0.6];

export function About() {
  const { photo } = about;

  return (
    <section aria-labelledby="about-title" id="about" className="defer-render py-20 [--defer-h:2200px] md:py-28 md:[--defer-h:1300px]">
      <div className="page">
        <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-center lg:gap-20">
          <div className="md:order-last">
            <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.heading} className="mb-6 md:mb-8" tone="mint" />
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <figure className="polaroid mx-auto w-full max-w-[21rem] pb-12" style={tilt(-3)}>
            <Tape tone="mint" angle={-8} className="-top-3 left-5" />
            <Tape tone="yellow" angle={7} className="-top-3 right-5" />
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              sizes="(min-width: 768px) 336px, 85vw"
              className="h-auto w-full"
            />
            <figcaption className="absolute inset-x-3 bottom-2.5 text-center font-hand text-2xl font-bold">
              {photo.caption}
            </figcaption>
            <Smiley className="absolute -right-1 -bottom-5 size-12 rotate-12 sm:-right-5" />
          </figure>
        </div>

        <h3 className="mt-20 font-hand text-3xl font-bold text-blue-deep md:mt-24">{about.skillsHeading}</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.skills.map((group, i) => (
            <li key={group.title} className="index-card p-5 pt-3" style={{ rotate: `${cardTilts[i % cardTilts.length]}deg` }}>
              <h4 className="font-mono text-[0.8rem] leading-8 font-semibold tracking-[0.16em] uppercase">
                {group.title}
              </h4>
              <ul aria-label={group.title} className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
