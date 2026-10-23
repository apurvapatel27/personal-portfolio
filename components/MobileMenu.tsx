"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconName, Social } from "@/content/site";
import { cn } from "@/lib/ui";
import { Icon } from "./ui/Icon";
import { SocialButtons } from "./ui/SocialButtons";

type MobileMenuProps = {
  items: { label: string; href: string; icon: IconName }[];
  socials: Social[];
  /** Id of the section being read, e.g. "work". */
  active: string | null;
  labels: { socials: string; menuOpen: string; menuClose: string };
};

export function MobileMenu({ items, socials, active, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes the menu and hands focus back to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center rounded-[6px] border-2 border-ink bg-white shadow-press active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <span className="sr-only">{open ? labels.menuClose : labels.menuOpen}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          {open ? (
            <path d="M6 6.5l11.5 11M17.5 6.2 6.3 17.6" />
          ) : (
            <path d="M4 7c5-.6 11-.5 16 .2M4 12.2c5.4-.4 10.6-.3 16 .1M4 17.3c5-.5 11-.4 16 .2" />
          )}
        </svg>
      </button>

      <div
        ref={panelRef}
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-3 top-[calc(var(--header-h)+8px)] rounded-[6px] border-[3px] border-ink bg-paper p-3 shadow-hard"
      >
        <nav aria-label="Mobile">
          <ul className="grid gap-1.5">
            {items.map((item) => {
              const current = active === item.href.split("#")[1];
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "true" : undefined}
                    className={cn(
                      "flex min-h-12 items-center gap-3 rounded-[5px] border-2 px-3 font-mono text-sm font-semibold tracking-[0.1em] uppercase",
                      current ? "border-ink bg-yellow" : "border-transparent hover:border-ink hover:bg-white",
                    )}
                  >
                    <Icon name={item.icon} className="size-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <SocialButtons socials={socials} label={labels.socials} className="mt-3 border-t-2 border-dashed border-ink/30 px-1 pt-3" />
      </div>
    </div>
  );
}
