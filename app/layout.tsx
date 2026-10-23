import type { Metadata, Viewport } from "next";
import { Figtree, IBM_Plex_Mono, Kalam, Pixelify_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Splash } from "@/components/Splash";
import { footer, person, site, socials } from "@/content/site";
import { defaultTitle as title, openGraph } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// Every page on this site is fully static. The build fails if anything
// starts rendering per request.
export const ensureStatic = "navigation";

// Pixel font is only used for the name in the hero.
const pixel = Pixelify_Sans({ subsets: ["latin"], variable: "--font-pixelify", display: "swap" });
const hand = Kalam({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-kalam", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "600", variable: "--font-plex-mono", display: "swap" });
const sans = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

const xHandle = socials.find((s) => s.id === "x")?.handle;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${person.name}` },
  description: site.description,
  applicationName: person.name,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  keywords: [
    "AI product designer",
    "freelance product designer",
    "AI CRM",
    "AI agents",
    "AI automation",
    "internal tools",
    "UX/UI design",
    "Gujarat",
    "India",
  ],
  openGraph: openGraph(),
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    creator: xHandle,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ec",
  colorScheme: "light",
};

// Runs before paint: skip the splash after the first page view this session.
const splashScript = `try{if(sessionStorage.getItem('ap-splash'))document.documentElement.dataset.splash='seen';else sessionStorage.setItem('ap-splash','1')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${pixel.variable} ${hand.variable} ${mono.variable} ${sans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-md border-2 border-ink bg-yellow px-4 py-2 font-mono text-sm font-semibold uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {footer.skipLink}
        </a>
        <Splash />
        <Header />
        <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
