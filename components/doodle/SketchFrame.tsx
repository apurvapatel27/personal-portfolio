import { jitter, seededRandom } from "@/lib/seeded-random";
import { cn } from "@/lib/ui";

/**
 * Builds a hand-drawn rectangle in a 100x100 viewBox: four slightly bowed
 * strokes whose ends overshoot the corners, like a quick pencil sketch.
 */
function sketchRectPath(seed: string, wobble: number): string {
  const r = seededRandom(seed);
  const j = (amount = wobble) => jitter(r, amount);
  const over = () => 0.6 + r() * 1.2;

  const corners = [
    [0 + j(), 0 + j()],
    [100 + j(), 0 + j()],
    [100 + j(), 100 + j()],
    [0 + j(), 100 + j()],
  ];

  const segments: string[] = [];
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = corners[i];
    const [x2, y2] = corners[(i + 1) % 4];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    // Start a little before the corner and end a little after it.
    const sx = x1 - ux * over();
    const sy = y1 - uy * over();
    const ex = x2 + ux * over();
    const ey = y2 + uy * over();
    // Bow the middle of the stroke sideways.
    const bow = j(wobble * 1.4);
    const cx = (sx + ex) / 2 - uy * bow;
    const cy = (sy + ey) / 2 + ux * bow;
    segments.push(
      `M${sx.toFixed(2)} ${sy.toFixed(2)}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`,
    );
  }
  return segments.join("");
}

type SketchFrameProps = {
  /** Same seed = same shape on every render. */
  seed: string;
  className?: string;
  /** How wobbly the outline is, in % of the box. */
  wobble?: number;
  /** Draw a lighter second pass for a pencil look. */
  double?: boolean;
  strokeWidth?: number;
};

/** Decorative hand-drawn outline. Place inside a `relative` element. */
export function SketchFrame({
  seed,
  className,
  wobble = 0.55,
  double = true,
  strokeWidth = 2.25,
}: SketchFrameProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible text-ink",
        className,
      )}
    >
      <path
        d={sketchRectPath(seed, wobble)}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {double && (
        <path
          d={sketchRectPath(`${seed}:second-pass`, wobble * 0.8)}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.55}
          strokeLinecap="round"
          opacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
