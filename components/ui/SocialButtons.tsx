import type { Social } from "@/content/site";
import { cn } from "@/lib/ui";
import { SocialIcon } from "./Icon";

const socialTone: Record<Social["id"], string> = {
  github: "bg-mint",
  linkedin: "bg-blue",
  x: "bg-pink",
  email: "bg-yellow",
};

/** Round, colourful social buttons. */
export function SocialButtons({ socials, label, className }: { socials: Social[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cn("flex items-center gap-2", className)}>
      {socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "grid size-10 place-items-center rounded-full border-2 border-ink text-ink shadow-press transition-[transform,box-shadow] duration-150",
              "hover:-translate-y-0.5 hover:rotate-6 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
              socialTone[social.id],
            )}
          >
            <SocialIcon id={social.id} />
            <span className="sr-only">
              {social.label} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
