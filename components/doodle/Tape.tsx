import type { CSSProperties } from "react";
import type { Tone } from "@/content/site";
import { cn, tilt, toneBg } from "@/lib/ui";

type TapeProps = {
  tone?: Tone;
  /** Rotation in degrees. */
  angle?: number;
  className?: string;
  style?: CSSProperties;
};

/** A strip of washi tape. Position it with absolute utility classes. */
export function Tape({ tone = "yellow", angle = -4, className, style }: TapeProps) {
  return <span aria-hidden="true" className={cn("tape", toneBg[tone], className)} style={tilt(angle, style)} />;
}
