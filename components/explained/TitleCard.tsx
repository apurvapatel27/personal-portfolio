/* eslint-disable @next/next/no-img-element -- <picture> serves the hand-tuned AVIF with a WebP fallback */
import { explained } from "@/content/site";
import { Chapter, Highlight, tapeImage, win } from "./Chapter";

const { titleCard } = explained;

// Matches .vx-title-photo: about 68vw on phones, under half the row above.
const PHOTO_SIZES = "(max-width: 40rem) 68vw, min(580px, 42vw)";
const srcSet = (small: string, full: string) =>
  `${small} ${titleCard.photo.small.width}w, ${full} ${titleCard.photo.width}w`;

/** Splits the heading around the highlighted phrase. */
function heading() {
  const at = titleCard.highlight ? titleCard.heading.indexOf(titleCard.highlight) : -1;
  if (at === -1) return titleCard.heading;
  const end = at + titleCard.highlight.length;
  return (
    <>
      {titleCard.heading.slice(0, at)}
      {/* Already drawn when the page opens. */}
      <Highlight a={-0.2} b={-0.1}>
        {titleCard.highlight}
      </Highlight>
      {titleCard.heading.slice(end)}
    </>
  );
}

export function TitleCard() {
  const { photo } = titleCard;
  return (
    <Chapter
      id="start"
      len={1.6}
      labelledBy="vx-title"
      cam={[
        [0, 0, 0, 1, 0],
        [1, -2, -6, 1.1, -1.5],
      ]}
    >
      <div className="vx-title-layout">
        <div className="vx-title-text">
          <p className="font-mono text-[0.8rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">{titleCard.kicker}</p>
          <h1 id="vx-title" className="vx-title-heading">
            {heading()}
          </h1>
        </div>

        <figure className="vx-title-photo">
          <img {...tapeImage("/vox/tape-2.webp")} alt="" width={800} height={164} className="vx-tape vx-title-tape" />
          <picture>
            <source srcSet={srcSet(photo.small.avif, photo.avif)} sizes={PHOTO_SIZES} type="image/avif" />
            <img
              src={photo.webp}
              srcSet={srcSet(photo.small.webp, photo.webp)}
              sizes={PHOTO_SIZES}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </picture>
          <figcaption className="vx-title-note">
            <span className="vx-arrow vx-ink-red" aria-hidden="true" />
            {titleCard.photoNote}
          </figcaption>
        </figure>

        <p className="vx-scroll-hint vx-t" style={win(0, 0.35)}>
          {titleCard.scrollHint}
        </p>
      </div>
    </Chapter>
  );
}
