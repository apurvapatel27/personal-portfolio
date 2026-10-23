import { hero, person } from "@/content/site";
import { ogAlt, ogSize, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: `Freelance · ${person.status}`,
    hand: hero.hello,
    title: person.name,
    titleSize: 100,
    nameBox: true,
    sticker: person.title,
    subtitle: person.tagline,
  });
}
