import type { Metadata } from "next";
import { ChapterAgents } from "@/components/explained/ChapterAgents";
import { ChapterBuild } from "@/components/explained/ChapterBuild";
import { InkFilters } from "@/components/explained/Chapter";
import { ChapterCrm } from "@/components/explained/ChapterCrm";
import { ChapterJourney } from "@/components/explained/ChapterJourney";
import { EndCard } from "@/components/explained/EndCard";
import { Explainer } from "@/components/explained/Explainer";
import { TitleCard } from "@/components/explained/TitleCard";
import { explained } from "@/content/site";
import { openGraph } from "@/lib/seo";
import "./explained.css";

const { meta, path } = explained;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: path },
  openGraph: openGraph({ url: path, title: meta.title, description: meta.description }),
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
};

export default function ExplainedPage() {
  return (
    <Explainer>
      <InkFilters />
      <TitleCard />
      <ChapterCrm />
      <ChapterBuild />
      <ChapterAgents />
      <ChapterJourney />
      <EndCard />
    </Explainer>
  );
}
