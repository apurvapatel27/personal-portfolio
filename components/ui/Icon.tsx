import type { IconName, Social } from "@/content/site";
import { cn } from "@/lib/ui";

// 24×24 line icons, slightly wonky on purpose to match the doodles.
const paths: Record<IconName, string> = {
  work: "M3.6 7.6c0-1 .8-1.9 1.8-1.9h4.3l2 2.3h6.9c1 0 1.9.8 1.9 1.8v8.4c0 1-.9 1.9-1.9 1.9H5.4c-1 0-1.8-.9-1.8-1.9ZM3.8 11h16.4",
  services: "M4.2 19.8 14.3 9.7M12.6 8l3.4 3.4M17.6 3.6l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9ZM7 4.5l.6 1.3 1.3.6-1.3.6L7 8.3l-.6-1.3-1.3-.6 1.3-.6Z",
  about: "M12 12.2a3.7 3.7 0 1 0 0-7.4 3.7 3.7 0 0 0 0 7.4ZM4.8 20.2c1.2-3.5 3.9-5.3 7.2-5.3s6 1.8 7.2 5.3",
  journey: "M5.5 20.5V4.2M5.5 4.8c3-1.7 5.6 1.3 8.6-.1 2.3-1 4-.6 5 0v7.6c-1-.6-2.7-1-5 0-3 1.4-5.6-1.6-8.6.1",
  contact: "M4.8 6.2h14.4c.7 0 1.3.6 1.3 1.3v9.1c0 .7-.6 1.3-1.3 1.3H4.8c-.7 0-1.3-.6-1.3-1.3V7.5c0-.7.6-1.3 1.3-1.3ZM4 7.2l8 6.1 8-6.1",
  pencil: "M15.4 4.3l4.2 4.2L9.2 18.9l-5.4 1.2 1.2-5.4ZM13 6.8l4.2 4.2",
  spark: "M12 3c.8 4.8 2.8 7.2 7.6 8-4.8.8-6.8 3.2-7.6 8-.8-4.8-2.8-7.2-7.6-8 4.8-.8 6.8-3.2 7.6-8Z",
  heart: "M12 19.6s-7.6-4.5-7.6-9.9a4.2 4.2 0 0 1 7.6-2.5 4.2 4.2 0 0 1 7.6 2.5c0 5.4-7.6 9.9-7.6 9.9Z",
  arrow: "M6.5 17.5 17.2 6.8M9 6.6h8.4V15",
};

type IconProps = { name: IconName; className?: string; strokeWidth?: number };

/** Decorative line icon (hidden from screen readers). */
export function Icon({ name, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}

const socialPaths: Record<Social["id"], string> = {
  github: "M8.6 7.2 3.8 12l4.8 4.8M15.4 7.2l4.8 4.8-4.8 4.8M13.4 5.4l-2.8 13.2",
  linkedin: "M6.5 10.2v7.6M6.5 6.4v.2M10.6 17.8v-7.6M10.6 13.6c0-2 1.4-3.5 3.3-3.5 1.8 0 2.9 1.2 2.9 3.4v4.3",
  x: "M4.6 5h4.3l10.5 14h-4.3ZM18.9 5l-5.3 6M10.5 13.2 5.1 19",
  email: paths.contact,
};

/** Simple marks for the social buttons: </> for GitHub, "in", and an X. */
export function SocialIcon({ id, className }: { id: Social["id"]; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-5 shrink-0", className)}
    >
      <path d={socialPaths[id]} />
    </svg>
  );
}
