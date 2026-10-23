"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { IconName, Social } from "@/content/site";
import { cn } from "@/lib/ui";
import { MobileMenu } from "./MobileMenu";
import { buttonClasses } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { SocialButtons } from "./ui/SocialButtons";

type NavItem = { label: string; href: string; icon: IconName };

type HeaderNavProps = {
  items: NavItem[];
  socials: Social[];
  contact: { label: string; href: string };
  labels: { socials: string; menuOpen: string; menuClose: string };
};

/** "/#work" → "work" */
const sectionId = (href: string) => href.split("#")[1] ?? "";

/**
 * Which home-page section is under the reading line (a thin band about a
 * third of the way down the screen). Null when none is, e.g. in the hero.
 */
function useActiveSection(ids: string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const showing = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) showing.set(entry.target.id, entry.isIntersecting);
        setActive(ids.find((id) => showing.get(id)) ?? null);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}

/**
 * Desktop links, socials and the Contact button. The link for the section
 * you're reading turns into a yellow block; on a case study, "Work" does.
 */
export function HeaderNav({ items, socials, contact, labels }: HeaderNavProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const ids = useMemo(() => items.map((item) => sectionId(item.href)), [items]);
  const spied = useActiveSection(ids, onHome);
  const active = onHome ? spied : pathname.startsWith("/work/") ? "work" : null;

  const links = items.filter((item) => item.href !== contact.href);
  const web = socials.filter((social) => social.id !== "email");

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {links.map((item) => {
            const current = active === sectionId(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-10 items-center gap-1.5 rounded-[5px] border-2 px-2.5 font-mono text-[0.76rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-150",
                    current ? "border-ink bg-yellow shadow-press" : "border-transparent hover:border-ink hover:bg-white",
                  )}
                >
                  <Icon name={item.icon} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-3">
        <SocialButtons socials={web} label={labels.socials} className="hidden xl:flex" />
        <div className="hidden sm:block">
          <Link
            href={contact.href}
            aria-current={active === sectionId(contact.href) ? "true" : undefined}
            className={buttonClasses("outline")}
          >
            <Icon name="heart" strokeWidth={2.2} className="fill-pink" />
            {contact.label}
          </Link>
        </div>
        <MobileMenu items={items} socials={web} active={active} labels={labels} />
      </div>
    </>
  );
}
