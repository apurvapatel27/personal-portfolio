import type { Metadata } from "next";
import { SquiggleArrow } from "@/components/doodle/doodles";
import { Tape } from "@/components/doodle/Tape";
import { ButtonLink } from "@/components/ui/Button";
import { notFoundPage } from "@/content/site";

export const metadata: Metadata = {
  title: notFoundPage.title,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="page grid min-h-[60vh] place-items-center py-20">
      <div className="card-hard max-w-xl bg-white p-8 text-center sm:p-12" style={{ rotate: "-1.5deg" }}>
        <Tape tone="pink" angle={-6} className="-top-3.5 left-8" />
        <Tape tone="blue" angle={5} className="-top-3.5 right-8" />
        <p className="font-mono text-[0.8rem] font-semibold tracking-[0.2em] text-orange-deep uppercase">404</p>
        <h1 id="not-found-title" className="mt-2 font-display text-4xl leading-tight font-extrabold sm:text-5xl">
          {notFoundPage.heading}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{notFoundPage.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <SquiggleArrow className="hidden h-10 w-20 sm:block" />
          <ButtonLink href="/">{notFoundPage.cta}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
