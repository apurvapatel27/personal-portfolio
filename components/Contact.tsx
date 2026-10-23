import { contact, person, socials } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Tape } from "./doodle/Tape";
import { ButtonLink } from "./ui/Button";
import { SocialIcon } from "./ui/Icon";
import { SectionHeading } from "./ui/SectionHeading";
import { StatusPill } from "./ui/StatusPill";

export function Contact() {
  return (
    <section aria-labelledby="contact-title" id="contact" className="defer-render py-20 [--defer-h:1250px] md:py-28 md:[--defer-h:1000px]">
      <div className="page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow={contact.eyebrow}
            title={contact.heading}
            intro={contact.body}
            tone="orange"
            className="mb-8"
          />
          <StatusPill text={person.status} />

          {person.calendlyUrl && (
            <div className="mt-6">
              <ButtonLink href={person.calendlyUrl} variant="yellow">
                {contact.bookCallLabel}
              </ButtonLink>
            </div>
          )}

          <h3 className="mt-10 font-hand text-2xl font-bold text-blue-deep">{contact.directLabel}</h3>
          <ul className="mt-3 grid gap-1">
            {socials.map((social) => {
              const external = social.href.startsWith("http");
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex min-h-11 flex-wrap items-center gap-x-3 rounded-md py-1"
                  >
                    <span aria-hidden="true" className="grid size-8 place-items-center rounded-full border-2 border-ink bg-white">
                      <SocialIcon id={social.id} className="size-4" />
                    </span>
                    <span className="w-20 font-mono text-[0.78rem] font-semibold tracking-wider uppercase">
                      {social.label}
                    </span>
                    <span className="font-medium break-words text-orange-deep underline decoration-transparent decoration-wavy underline-offset-4 group-hover:decoration-current">
                      {social.handle}
                    </span>
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

        <div className="card-hard self-start bg-white p-6 pt-8 sm:p-8 sm:pt-10">
          <Tape tone="yellow" angle={-3} className="-top-3.5 left-8" />
          <Tape tone="pink" angle={6} className="-top-3.5 right-8" />
          <ContactForm email={person.email} form={contact.form} />
        </div>
      </div>
    </section>
  );
}
