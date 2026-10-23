import type { MetadataRoute } from "next";
import { crmCaseStudy, explained } from "@/content/site";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl(`/work/${crmCaseStudy.slug}`), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl(explained.path), changeFrequency: "monthly", priority: 0.7 },
  ];
}
