import { crmCaseStudy as study, person } from "@/content/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${study.title}, a case study by ${person.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: `${study.labels.eyebrow} · ${person.name}`,
    title: study.title,
    titleSize: 76,
    subtitle: study.description,
  });
}
