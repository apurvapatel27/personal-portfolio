/* eslint-disable @next/next/no-img-element -- decorative tape and pins at their exact processed size */
import { explained } from "@/content/site";
import { cn } from "@/lib/ui";
import { Chapter, MarkerArrow, win } from "./Chapter";

const { build } = explained;

type Project = (typeof build.projects)[number];

// Tape and pins take turns holding the screenshots up.
const fixings = [
  { src: "/vox/pin.webp", width: 367, height: 744, className: "vx-shot-pin" },
  { src: "/vox/tape-3.webp", width: 800, height: 119, className: "vx-tape vx-shot-tape" },
  { src: "/vox/pin.webp", width: 367, height: 744, className: "vx-shot-pin vx-shot-pin--right" },
  { src: "/vox/tape-1.webp", width: 800, height: 148, className: "vx-tape vx-shot-tape vx-shot-tape--tilt" },
];

/** A pinned or taped screenshot slot with a one-line caption. */
function ShotSlot({ project, index, a, b }: { project: Project; index: number; a: number; b: number }) {
  const fixing = fixings[index % fixings.length];
  return (
    <figure className="vx-shot vx-slap vx-t" style={win(a, b, { "--rot": index % 2 ? "6deg" : "-6deg" })}>
      <div className="vx-shot-frame">
        {project.shot ? (
          <img loading="lazy" src={project.shot} alt={`Screenshot of ${project.name}`} className="block h-full w-full object-cover" />
        ) : (
          <p className="vx-shot-empty">
            <span>{build.placeholder}</span>
            <span aria-hidden="true">{project.name}</span>
          </p>
        )}
      </div>
      <img loading="lazy" src={fixing.src} alt="" width={fixing.width} height={fixing.height} className={fixing.className} />
      <figcaption className="vx-shot-caption">
        <strong>{project.name}.</strong> {project.caption}
      </figcaption>
    </figure>
  );
}

// Timing (chapter progress 0 → 1): each panel lands as the camera reaches it.
const T = {
  stops: [
    [0.12, 0.22],
    [0.36, 0.44],
    [0.58, 0.65],
  ],
  arrows: [
    [0.25, 0.34],
    [0.48, 0.57],
    [0.72, 0.8],
  ],
  alongside: [0.64, 0.7],
  crmShot: [0.68, 0.74],
  projects: [0.82, 0.86],
} as const;

export function ChapterBuild() {
  const [crmShot, ...otherShots] = build.projects;
  return (
    <Chapter
      id="the-build"
      len={7}
      pan
      card={{ number: build.number, title: build.title, tone: build.tone }}
      sticker={build.sticker}
      cam={[
        [0, "stop-0", 1.15, 0],
        [0.24, "stop-0", 1.15, -0.6],
        [0.36, "stop-1", 1.15, 0.6],
        [0.5, "stop-1", 1.15, 0.6],
        [0.6, "stop-2", 1, -0.4],
        [0.73, "stop-2", 1, -0.4],
        [0.83, "projects", 1, 0],
      ]}
    >
      <ol className="vx-track">
        {build.stops.map((stop, i) => (
          <li key={stop.title} className="vx-stop" data-cam-focus={`stop-${i}`}>
            <div className={cn("vx-stop-body", stop.alongside && "vx-stop-body--wide")}>
              <article className="vx-stop-card index-card vx-slap vx-t" style={win(T.stops[i][0], T.stops[i][1], { "--rot": i % 2 ? "5deg" : "-5deg" })}>
                <p className="vx-stop-when">{stop.when}</p>
                <h3 className="vx-stop-title">{stop.title}</h3>
                <p className="vx-stop-org">{stop.org}</p>
                {stop.note && <p className="vx-stop-note">{stop.note}</p>}
              </article>
              {stop.alongside && (
                <div className="vx-stop-extra">
                  <article
                    className="vx-stop-card vx-stop-card--work vx-slap vx-t"
                    style={win(T.alongside[0], T.alongside[1], { "--rot": "4deg" })}
                  >
                    <p className="vx-stop-when">{stop.alongside.when}</p>
                    <h3 className="vx-stop-title">{stop.alongside.title}</h3>
                    <p className="vx-stop-org">{stop.alongside.org}</p>
                    <p className="vx-stop-note">{stop.alongside.note}</p>
                  </article>
                  <ShotSlot project={crmShot} index={0} a={T.crmShot[0]} b={T.crmShot[1]} />
                </div>
              )}
            </div>
            <MarkerArrow a={T.arrows[i][0]} b={T.arrows[i][1]} className="vx-stop-arrow" />
          </li>
        ))}
        <li className="vx-stop" data-cam-focus="projects">
          <div className="vx-stop-body vx-stop-body--wide">
            <h3 className="vx-projects-heading vx-rise vx-t" style={win(0.78, 0.84)}>
              {build.projectsHeading}
            </h3>
            <div className="vx-projects">
              {otherShots.map((project, i) => (
                <ShotSlot
                  key={project.slug}
                  project={project}
                  index={i + 1}
                  a={T.projects[0] + i * 0.03}
                  b={T.projects[1] + i * 0.03}
                />
              ))}
            </div>
          </div>
        </li>
      </ol>
    </Chapter>
  );
}
