/* eslint-disable @next/next/no-img-element -- the map and pins are shown at their exact processed size */
import type { CSSProperties } from "react";
import { explained } from "@/content/site";
import { cn } from "@/lib/ui";
import { Chapter, tapeImage, win } from "./Chapter";

const { journey } = explained;
const { map, places } = journey;

// Pin artwork: the needle tip sits 41.7% across and at the very bottom;
// the head's centre is 50% across and 20% down. Width is 2.8% of the map.
const PIN_W = 2.8;
const PIN_RATIO = 744 / 367;
const MAP_RATIO = map.height / map.width;

/** Where the string ties on: the pin head, in map % (x of width, y of height). */
function headOf(place: (typeof places)[number]) {
  return {
    x: place.x + PIN_W * (0.5 - 0.417),
    y: place.y - (PIN_W * PIN_RATIO * 0.8) / MAP_RATIO,
  };
}

// Timing (chapter progress 0 → 1).
const T = {
  map: [0.1, 0.2],
  pins: [
    [0.26, 0.34],
    [0.5, 0.58],
  ],
  labels: [
    [0.33, 0.38],
    [0.57, 0.62],
  ],
  string: [0.7, 0.84],
  caption: [0.85, 0.91],
} as const;

export function ChapterJourney() {
  const [from, to] = places.map(headOf);
  // viewBox units: x 0–100 across the map, y 0–100·(height/width) down it.
  const vy = (y: number) => y * MAP_RATIO;
  const string = `M ${from.x} ${vy(from.y)} Q ${(from.x + to.x) / 2} ${Math.min(vy(from.y), vy(to.y)) - 14} ${to.x} ${vy(to.y)}`;

  return (
    <Chapter
      id="journey"
      len={6}
      pan
      card={{ number: journey.number, title: journey.title, tone: journey.tone }}
      sticker={journey.sticker}
      cam={[
        [0, 0, 0, 1, 0],
        [0.18, 0, 0, 1, 0],
        [0.28, places[0].id, 2, -1],
        [0.4, places[0].id, 2.1, -1],
        [0.5, places[1].id, 2, 1],
        [0.62, places[1].id, 2.1, 1],
        [0.72, "mid", 1, 0],
      ]}
    >
      <figure
        className="vx-map vx-rise vx-t"
        style={win(T.map[0], T.map[1], { "--mx": `${(from.x + to.x) / 2}%`, "--my": `${(from.y + to.y) / 2}%` })}
      >
        <img loading="lazy" {...tapeImage("/vox/tape-3.webp")} alt="" width={800} height={119} className="vx-tape vx-map-tape vx-map-tape--left" />
        <img loading="lazy" {...tapeImage("/vox/tape-2.webp")} alt="" width={800} height={164} className="vx-tape vx-map-tape vx-map-tape--right" />
        <img loading="lazy" src={map.src} alt={map.alt} width={map.width} height={map.height} className="vx-map-img" />

        {/* Centre of the wide shot: the map's middle, or between the pins on phones. */}
        <span className="vx-map-mid" data-cam-focus="mid" />

        <svg className="vx-string vx-t" style={win(T.string[0], T.string[1])} viewBox={`0 0 100 ${100 * MAP_RATIO}`} aria-hidden="true">
          <path d={string} pathLength={1} />
        </svg>

        {places.map((place, i) => (
          <div key={place.id} className={cn("vx-place", place.x > 50 && "vx-place--east")} style={{ "--x": place.x, "--y": place.y } as CSSProperties}>
            <span className="vx-place-focus" data-cam-focus={place.id} />
            <img
              loading="lazy"
              src="/vox/pin.webp"
              alt=""
              width={367}
              height={744}
              className="vx-pin vx-drop vx-t"
              style={win(T.pins[i][0], T.pins[i][1])}
            />
            <span className="vx-place-label vx-slap vx-t" style={win(T.labels[i][0], T.labels[i][1], { "--rot": i ? "8deg" : "-8deg" })}>
              {place.label}
            </span>
          </div>
        ))}

        <figcaption className="vx-map-caption vx-slap vx-t" style={win(T.caption[0], T.caption[1], { "--rot": "-6deg", "--rest": "-2deg" })}>
          {journey.caption}
        </figcaption>
      </figure>
    </Chapter>
  );
}
