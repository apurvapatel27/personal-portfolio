/**
 * Absolute site URL for metadata, Open Graph images, the sitemap and robots.txt.
 *
 * Order of preference:
 * 1. NEXT_PUBLIC_SITE_URL (set this once you have a custom domain)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (set automatically on Vercel)
 * 3. localhost for development
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}
