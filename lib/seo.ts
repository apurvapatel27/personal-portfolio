import type { Metadata } from "next";
import { person, site } from "@/content/site";

export const defaultTitle = `${person.name} · ${person.title}`;

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/**
 * Next.js replaces (not merges) a parent's `openGraph` object when a page sets
 * its own, so every page builds the full object from these defaults.
 */
export function openGraph(overrides: OpenGraph = {}): OpenGraph {
  return {
    type: "website",
    locale: "en_IN",
    siteName: person.name,
    title: defaultTitle,
    description: site.description,
    ...overrides,
  };
}
