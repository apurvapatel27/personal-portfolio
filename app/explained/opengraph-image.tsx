import { explained, person } from "@/content/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${explained.titleCard.heading}: ${person.name}'s story as a scroll-through explainer`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: explained.titleCard.kicker,
    title: explained.titleCard.heading,
    titleSize: 62,
    subtitle: explained.meta.description,
    sticker: explained.titleCard.scrollHint,
  });
}
