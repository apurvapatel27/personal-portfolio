import Link from "next/link";
import { header, nav, person, socials } from "@/content/site";
import { HeaderNav } from "./HeaderNav";
import { LogoMark } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper">
      <div className="page flex h-(--header-h) items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-md font-display text-lg font-extrabold tracking-tight"
        >
          <LogoMark className="size-9 -rotate-6" />
          <span>{person.name}</span>
        </Link>

        <HeaderNav
          items={nav}
          socials={socials}
          contact={header.contact}
          labels={{ socials: header.socialsLabel, menuOpen: header.menuOpen, menuClose: header.menuClose }}
        />
      </div>
    </header>
  );
}
