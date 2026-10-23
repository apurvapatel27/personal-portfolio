import type { Metadata } from "next";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { HashJumps } from "@/components/HashJumps";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { LogoStrip } from "@/components/LogoStrip";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { about, person, site, socials } from "@/content/site";
import { openGraph } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: openGraph({ url: "/" }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.title,
  description: site.description,
  url: absoluteUrl("/"),
  image: absoluteUrl(about.photo.src),
  email: `mailto:${person.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Anand",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Work />
      <Services />
      <About />
      <Journey />
      <LogoStrip />
      <Contact />
      <HashJumps />
    </>
  );
}
