import type { CSSProperties } from "react";
import type { Tone } from "@/content/site";

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Sets the `--tilt` custom property used by stickers, tape and polaroids. */
export function tilt(degrees: number, style?: CSSProperties): CSSProperties {
  return { ...style, ["--tilt" as string]: `${degrees}deg` };
}

// Full class names (not built from strings) so Tailwind can find them.
export const toneBg: Record<Tone, string> = {
  yellow: "bg-yellow",
  orange: "bg-orange",
  pink: "bg-pink",
  blue: "bg-blue",
  green: "bg-green",
  mint: "bg-mint",
};

export const toneTint: Record<Tone, string> = {
  yellow: "bg-yellow-tint",
  orange: "bg-orange-tint",
  pink: "bg-pink-tint",
  blue: "bg-blue-tint",
  green: "bg-green-tint",
  mint: "bg-mint-tint",
};

export const toneText: Record<Tone, string> = {
  yellow: "text-yellow",
  orange: "text-orange",
  pink: "text-pink",
  blue: "text-blue",
  green: "text-green",
  mint: "text-mint",
};
