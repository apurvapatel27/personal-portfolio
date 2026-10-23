"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { contact as contactContent } from "@/content/site";
import {
  buildMailto,
  composeBody,
  composeSubject,
  emptyDraft,
  validateStep,
  type ContactDraft,
  type ContactErrors,
} from "@/lib/contact";
import { cn } from "@/lib/ui";
import { buttonClasses } from "./ui/Button";

type FormContent = (typeof contactContent)["form"];
type Field = keyof ContactDraft;

const fieldClasses =
  "mt-2 block w-full rounded-[10px_8px_11px_9px] border-2 border-ink bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-ink-soft/70 aria-[invalid=true]:border-orange-deep";
const labelClasses = "font-mono text-[0.8rem] font-semibold tracking-wider uppercase";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.95rem] font-medium text-orange-deep">
      <span aria-hidden="true">✗</span>
      {message}
    </p>
  );
}

export function ContactForm({ email, form }: { email: string; form: FormContent }) {
  const uid = useId();
  const ids = {
    heading: `${uid}-heading`,
    services: `${uid}-services`,
    message: `${uid}-message`,
    messageHint: `${uid}-message-hint`,
    timeline: `${uid}-timeline`,
    name: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    error: (field: Field) => `${uid}-${field}-error`,
  };

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const moveFocus = useRef(false);

  const lastStep = form.steps.length - 1;
  const limits = { minMessageLength: form.minMessageLength, maxMessageLength: form.maxMessageLength };

  // Move focus to the new step's heading after the user changes step,
  // so keyboard and screen reader users land at the top of the new content.
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    headingRef.current?.focus();
  }, [step, sent]);

  function goTo(next: number) {
    moveFocus.current = true;
    setErrors({});
    setStep(next);
  }

  function update<K extends Field>(field: K, value: ContactDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const rest = { ...current };
        delete rest[field];
        return rest;
      });
    }
  }

  function toggleService(value: string) {
    const services = draft.services.includes(value)
      ? draft.services.filter((s) => s !== value)
      : [...draft.services, value];
    update("services", services);
  }

  function focusFirstInvalid(found: ContactErrors) {
    const order: Field[] = ["services", "message", "name", "email"];
    const first = order.find((field) => found[field]);
    if (!first) return;
    const target = first === "services" ? `${ids.services}-0` : ids[first];
    document.getElementById(target)?.focus();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < lastStep) {
      const found = validateStep(step, draft, limits);
      setErrors(found);
      if (Object.keys(found).length > 0) {
        focusFirstInvalid(found);
        return;
      }
      goTo(step + 1);
      return;
    }

    // Final step: hand the message to the visitor's email app.
    window.location.href = buildMailto(email, draft);
    moveFocus.current = true;
    setSent(true);
  }

  async function copyMessage() {
    const text = `To: ${email}\nSubject: ${composeSubject(draft)}\n\n${composeBody(draft)}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(form.success.copied);
    } catch {
      setStatus(form.success.copyFailed);
    }
  }

  function restart() {
    setDraft(emptyDraft);
    setStatus("");
    setSent(false);
    goTo(0);
  }

  const describedBy = (...parts: Array<string | false | undefined>) =>
    parts.filter(Boolean).join(" ") || undefined;

  /* ---------------------------------------------------------------- */
  /* Success                                                           */
  /* ---------------------------------------------------------------- */

  if (sent) {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-extrabold">
          {form.success.heading}{" "}
          <svg aria-hidden="true" viewBox="0 0 40 30" className="inline-block h-7 w-9 -rotate-6 align-[-0.1em]" fill="none">
            <path d="M3 4.5c11-.9 23-.8 34 .2.7 7 .6 14 0 21-11.3.8-22.6.7-33.8-.1-.8-7-.8-14-.2-21.1Z" fill="var(--color-yellow)" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M4 5.5 20 17.5 36.5 5.2" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h3>
        <p className="mt-3 text-lg leading-relaxed">{form.success.body}</p>
        <p className="mt-5 leading-relaxed text-ink-soft">
          {form.success.fallback}{" "}
          <a href={`mailto:${email}`} className="font-semibold break-words text-orange-deep underline decoration-wavy underline-offset-4">
            {email}
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={copyMessage} className={buttonClasses("yellow")}>
            {form.success.copy}
          </button>
          <button type="button" onClick={restart} className={buttonClasses("paper")}>
            {form.success.restart}
          </button>
        </div>
        <p role="status" className="mt-3 min-h-6 font-hand text-lg text-green-deep">
          {status}
        </p>
        <details className="mt-3">
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-mono text-[0.8rem] font-semibold tracking-wider uppercase">
            <span aria-hidden="true" className="mr-2 inline-block transition-transform in-open:rotate-90">▸</span>
            {form.success.showMessage}
          </summary>
          <pre className="mt-2 max-h-72 overflow-auto rounded-md border-2 border-dashed border-ink/40 bg-white p-4 font-sans text-sm whitespace-pre-wrap">
            {`To: ${email}\nSubject: ${composeSubject(draft)}\n\n${composeBody(draft)}`}
          </pre>
        </details>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Steps                                                             */
  /* ---------------------------------------------------------------- */

  const messageLength = draft.message.trim().length;
  const timelineLabel = form.timelineOptions.find((o) => o.value === draft.timeline)?.label;

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby={ids.heading}>
      <ol aria-label="Progress" className="mb-6 flex gap-2">
        {form.steps.map((title, i) => (
          <li
            key={title}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "h-2.5 flex-1 rounded-full border-2 border-ink",
              i < step && "bg-green-deep",
              i === step && "bg-yellow",
              i > step && "bg-white",
            )}
          >
            <span className="sr-only">
              {title}
              {i < step ? " (done)" : ""}
            </span>
          </li>
        ))}
      </ol>

      <p className="font-mono text-[0.78rem] font-semibold tracking-[0.16em] text-orange-deep uppercase" aria-hidden="true">
        Step {step + 1} of {form.steps.length}
      </p>
      <h3 id={ids.heading} ref={headingRef} tabIndex={-1} className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
        <span className="sr-only">
          Step {step + 1} of {form.steps.length}:{" "}
        </span>
        {form.steps[step]}
      </h3>

      <div className="mt-6">
        {step === 0 && (
          <fieldset aria-describedby={describedBy(errors.services && ids.error("services"))}>
            <legend className={labelClasses}>{form.labels.services}</legend>
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {form.serviceOptions.map((option, i) => {
                const checked = draft.services.includes(option.value);
                return (
                  <li key={option.value}>
                    <label className="block cursor-pointer">
                      <input
                        id={`${ids.services}-${i}`}
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={() => toggleService(option.value)}
                        aria-describedby={describedBy(errors.services && ids.error("services"))}
                      />
                      <span
                        className={cn(
                          "inline-flex min-h-11 items-center gap-1.5 rounded-[12px_9px_13px_10px] border-2 border-ink px-3.5 py-2 text-[0.95rem] font-semibold transition-colors",
                          "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-deep",
                          checked ? "bg-yellow shadow-press" : "bg-white hover:bg-yellow-tint",
                        )}
                      >
                        <span aria-hidden="true" className="w-3.5 text-center">
                          {checked ? "✓" : "+"}
                        </span>
                        {option.label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <ErrorText id={ids.error("services")} message={errors.services} />
          </fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-6">
            <div>
              <label htmlFor={ids.message} className={labelClasses}>
                {form.labels.message}
              </label>
              <p id={ids.messageHint} className="mt-1 text-[0.95rem] text-ink-soft">
                {form.labels.messageHint}
              </p>
              <textarea
                id={ids.message}
                rows={6}
                value={draft.message}
                maxLength={form.maxMessageLength + 200}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={describedBy(ids.messageHint, `${ids.message}-count`, errors.message && ids.error("message"))}
                className={cn(fieldClasses, "resize-y leading-relaxed")}
              />
              <p
                id={`${ids.message}-count`}
                className={cn(
                  "mt-1.5 text-right font-mono text-[0.75rem]",
                  messageLength > form.maxMessageLength ? "text-orange-deep" : "text-ink-soft",
                )}
              >
                {messageLength} / {form.maxMessageLength}
              </p>
              <ErrorText id={ids.error("message")} message={errors.message} />
            </div>
            <div>
              <label htmlFor={ids.timeline} className={labelClasses}>
                {form.labels.timeline}
              </label>
              <select
                id={ids.timeline}
                value={draft.timeline}
                onChange={(e) => update("timeline", e.target.value)}
                className={cn(fieldClasses, "min-h-11")}
              >
                {form.timelineOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5">
            <div>
              <label htmlFor={ids.name} className={labelClasses}>
                {form.labels.name}
              </label>
              <input
                id={ids.name}
                type="text"
                autoComplete="name"
                value={draft.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy(errors.name && ids.error("name"))}
                className={fieldClasses}
              />
              <ErrorText id={ids.error("name")} message={errors.name} />
            </div>
            <div>
              <label htmlFor={ids.email} className={labelClasses}>
                {form.labels.email}
              </label>
              <input
                id={ids.email}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                value={draft.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy(errors.email && ids.error("email"))}
                className={fieldClasses}
              />
              <ErrorText id={ids.error("email")} message={errors.email} />
            </div>
            <div>
              <label htmlFor={ids.company} className={labelClasses}>
                {form.labels.company}
              </label>
              <input
                id={ids.company}
                type="text"
                autoComplete="organization"
                value={draft.company}
                onChange={(e) => update("company", e.target.value)}
                className={fieldClasses}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <dl className="grid gap-4 rounded-[4px] border-2 border-dashed border-ink/40 bg-white/70 p-4 sm:p-5">
              {[
                { label: form.steps[0], value: draft.services.join(", "), step: 0 },
                { label: form.labels.message, value: draft.message.trim(), step: 1 },
                ...(timelineLabel && draft.timeline ? [{ label: form.labels.reviewTimeline, value: timelineLabel, step: 1 }] : []),
                {
                  label: form.steps[2],
                  value: [draft.name.trim(), draft.company.trim(), draft.email.trim()].filter(Boolean).join(" · "),
                  step: 2,
                },
              ].map((row) => (
                <div key={row.label} className="grid gap-1">
                  <dt className="flex items-center justify-between gap-3">
                    <span className={labelClasses}>{row.label}</span>
                    <button
                      type="button"
                      onClick={() => goTo(row.step)}
                      className="min-h-11 rounded-md px-2 font-mono text-[0.78rem] font-semibold tracking-wider text-orange-deep uppercase underline decoration-wavy underline-offset-4"
                    >
                      {form.labels.edit}
                      <span className="sr-only">: {row.label}</span>
                    </button>
                  </dt>
                  <dd className="line-clamp-4 leading-relaxed break-words whitespace-pre-line">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[0.95rem] text-ink-soft">{form.labels.sendHint}</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => goTo(step - 1)} className={buttonClasses("paper")}>
            <span aria-hidden="true">←</span> {form.labels.back}
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className={buttonClasses(step === lastStep ? "yellow" : "ink")}>
          {step === lastStep ? form.labels.send : form.labels.next}
          <span aria-hidden="true">{step === lastStep ? "✉" : "→"}</span>
        </button>
      </div>
    </form>
  );
}
