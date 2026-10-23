import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { explained } from "@/content/site";
import { jitter, seededRandom } from "@/lib/seeded-random";
import { Chapter, win } from "./Chapter";

const { end } = explained;

/**
 * Rough left and right edges for a door. The torn strips give the top and
 * bottom their tear; this jitters the straight sides so no edge looks cut.
 */
function tornSides(seed: string): string {
  const rand = seededRandom(seed);
  const left: string[] = [];
  const right: string[] = [];
  for (let y = 0; y <= 100; y += 5) {
    left.push(`${(1.2 + jitter(rand, 1.2)).toFixed(2)}% ${y}%`);
    right.push(`${(98.8 + jitter(rand, 1.2)).toFixed(2)}% ${100 - y}%`);
  }
  return `polygon(${[...left, ...right].join(", ")})`;
}

export function EndCard() {
  return (
    <Chapter
      id="where-next"
      len={1.8}
      labelledBy="vx-end-title"
      cam={[
        [0, 0, 3, 1.04, 0.5],
        [0.6, 0, 0, 1, 0],
      ]}
    >
      <div className="vx-end">
        <h2 id="vx-end-title" className="vx-end-title vx-rise vx-t" style={win(0, 0.2)}>
          {end.heading}
        </h2>
        <ul className="vx-doors">
          {end.doors.map((door, i) => (
            <li key={door.href} className="vx-slap vx-t" style={win(0.1 + i * 0.1, 0.3 + i * 0.1, { "--rot": `${(i - 1) * 6}deg` })}>
              <Link
                href={door.href}
                className="vx-door"
                style={
                  {
                    "--door": `var(--vx-${door.tone})`,
                    "--sides": tornSides(door.label),
                    "--tear-x": `${i * 37}%`,
                  } as CSSProperties
                }
              >
                <span className="vx-door-paper" aria-hidden="true" />
                <span className="vx-door-label">{door.label}</span>
                <span className="vx-door-note">{door.note}</span>
                <Icon name="arrow" className="vx-door-icon" strokeWidth={2.5} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  );
}
