import { Fragment, type CSSProperties } from "react";
import { splash } from "@/content/site";

const NBSP = String.fromCharCode(160);

/**
 * Intro sheet on lined paper: the first line types in letter by letter,
 * swaps to the second line, then the sheet fades away. Pure CSS. A tiny
 * script in the layout skips it after the first visit in a session, and
 * it never shows with reduced motion. The page renders underneath from
 * the start, so it doesn't hold back the first paint of real content.
 */
export function Splash() {
  return (
    <div
      aria-hidden="true"
      className="splash pointer-events-none fixed inset-0 z-[100] grid place-items-center px-6 text-center"
    >
      <p className="splash-first col-start-1 row-start-1 font-display text-[clamp(3rem,12vw,8rem)] leading-none font-extrabold tracking-[-0.03em]">
        {Array.from(splash.first).map((char, i) => (
          <span key={i} className="splash-char" style={{ "--i": i } as CSSProperties}>
            {char === " " ? NBSP : char}
          </span>
        ))}
      </p>
      <p className="col-start-1 row-start-1 -rotate-2 font-hand text-[clamp(2.6rem,10vw,6.5rem)] leading-none font-bold text-orange-deep">
        {splash.second.split(" ").map((word, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="splash-word" style={{ "--i": i } as CSSProperties}>
              {word}
            </span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
