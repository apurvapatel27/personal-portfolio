/* eslint-disable @next/next/no-img-element -- decorative tape at its exact processed size */
import type { ReactNode } from "react";
import { explained } from "@/content/site";
import { Chapter, ChapterSticker, Highlight, MarkerCircle, tapeImage, win } from "./Chapter";

const { crm } = explained;
const { doc } = crm;

// Timing (chapter progress 0 → 1). The colour card leaves over 0.03–0.14.
const T = {
  doc: [0.1, 0.2],
  tape: [0.17, 0.23],
  lines: 0.18, // fields type in one after another from here
  highlights: [
    [0.33, 0.42],
    [0.47, 0.57],
  ],
  circle: [0.69, 0.79],
  sticker: [0.87, 0.94],
} as const;

/** Wraps the highlighted and circled phrases of the brief in their marks. */
function brief(): ReactNode[] {
  const circled = doc.circle || doc.circleFallback;
  const marks = [
    ...doc.highlights.map((phrase, i) => ({ phrase, kind: "hl" as const, i })),
    { phrase: circled, kind: "circle" as const, i: 0 },
  ]
    .map((m) => ({ ...m, at: doc.brief.indexOf(m.phrase) }))
    .filter((m) => m.phrase && m.at !== -1)
    .sort((x, y) => x.at - y.at);

  const out: ReactNode[] = [];
  let pos = 0;
  for (const m of marks) {
    if (m.at < pos) continue;
    out.push(doc.brief.slice(pos, m.at));
    if (m.kind === "hl") {
      const [a, b] = T.highlights[m.i] ?? T.highlights[1];
      out.push(
        <Highlight key={m.at} a={a} b={b} focus={`hl-${m.i}`}>
          {m.phrase}
        </Highlight>,
      );
    } else {
      out.push(
        <MarkerCircle key={m.at} a={T.circle[0]} b={T.circle[1]} focus="circle">
          {m.phrase}
        </MarkerCircle>,
      );
    }
    pos = m.at + m.phrase.length;
  }
  out.push(doc.brief.slice(pos));
  return out;
}

export function ChapterCrm() {
  return (
    <Chapter
      id="the-crm"
      len={6}
      card={{ number: crm.number, title: crm.title, tone: crm.tone }}
      cam={[
        [0, 0, 0, 1, 0],
        [0.22, 0, 0, 1, 0],
        [0.32, "hl-0", 1.5, -1.5],
        [0.45, "hl-0", 1.55, -1.5],
        [0.5, "hl-1", 1.5, 1],
        [0.63, "hl-1", 1.55, 1],
        [0.68, "circle", 1.7, 0],
        [0.81, "circle", 1.75, 0],
        [0.9, 0, 0, 1, 0],
      ]}
    >
      <div className="vx-doc-wrap">
        <article className="vx-doc vx-slap vx-t" style={win(T.doc[0], T.doc[1], { "--rot": "-5deg" })}>
          <img
            loading="lazy"
            {...tapeImage("/vox/tape-1.webp")}
            alt=""
            width={800}
            height={148}
            className="vx-tape vx-doc-tape vx-slap vx-t"
            style={win(T.tape[0], T.tape[1], { "--rot": "8deg" })}
          />
          <header className="vx-doc-head">
            <span>{doc.label}</span>
            <span>{doc.ref}</span>
          </header>
          <dl className="vx-doc-fields">
            {doc.fields.map((f, i) => (
              <div key={f.label} className="vx-type vx-t" style={win(T.lines + i * 0.025, T.lines + i * 0.025 + 0.04)}>
                <dt>{f.label}:</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="vx-rise vx-t" style={win(T.lines + 0.08, T.lines + 0.13)}>
            <h3 className="vx-doc-label">{doc.briefLabel}</h3>
            <p className="vx-doc-brief">{brief()}</p>
          </div>
        </article>

        <ChapterSticker sticker={crm.sticker} a={T.sticker[0]} b={T.sticker[1]} className="vx-doc-sticker" />
      </div>
    </Chapter>
  );
}
