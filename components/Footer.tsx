import Link from "next/link";
import { footer, nav, person, socials } from "@/content/site";
import { LogoMark } from "./Logo";
import { buttonClasses } from "./ui/Button";

export function Footer() {
  return (
    <footer className="defer-render mt-10 border-t-[3px] border-ink bg-paper-deep [--defer-h:900px] md:[--defer-h:480px]">
      <div className="page grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:py-16">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 rounded-md font-display text-xl font-extrabold">
            <LogoMark className="size-10 -rotate-6" />
            {person.name}
          </Link>
          <p className="mt-2 text-ink-soft">{person.title}</p>
          <p className="mt-4 max-w-xs -rotate-1 font-hand text-xl text-blue-deep">{footer.note}</p>
          {person.resumeUrl && (
            <a href={person.resumeUrl} className={buttonClasses("paper", "mt-6")}>
              {footer.resumeLabel}
            </a>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-[0.78rem] font-semibold tracking-[0.16em] text-orange-deep uppercase">
            {footer.navLabel}
          </h2>
          <ul className="mt-3 grid">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center font-medium hover:underline hover:decoration-wavy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[0.78rem] font-semibold tracking-[0.16em] text-orange-deep uppercase">
            {footer.socialLabel}
          </h2>
          <ul className="mt-3 grid">
            {socials.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-11 items-center gap-1.5 font-medium hover:underline hover:decoration-wavy"
                  >
                    {social.label}
                    {external && (
                      <>
                        <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="page flex flex-col gap-2 border-t-2 border-dashed border-ink/30 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {person.copyrightYear} {person.name} · {footer.credit}
        </p>
        <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[0.78rem] font-semibold tracking-wider uppercase">
          {footer.backToTop} <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
