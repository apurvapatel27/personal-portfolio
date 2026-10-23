import Link from "next/link";
import type { ReactNode } from "react";
import type { IconName, Tone } from "@/content/site";
import { cn, toneBg } from "@/lib/ui";
import { Icon } from "./Icon";

export type ButtonVariant = "ink" | "paper" | "yellow" | "outline";

const variants: Record<ButtonVariant, string> = {
  ink: "bg-ink text-paper hover:bg-[#35302b]",
  paper: "bg-white text-ink hover:bg-paper-deep",
  yellow: "bg-yellow text-ink hover:bg-[#ffdc66]",
  outline: "bg-paper text-ink hover:bg-yellow aria-[current=true]:bg-yellow",
};

const press = cn(
  "shadow-press transition-[transform,box-shadow,background-color] duration-150",
  "hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_0_var(--color-ink)]",
  "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
);

/** Shared look for links and real <button>s. */
export function buttonClasses(variant: ButtonVariant = "ink", className?: string): string {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] border-2 border-ink px-5 py-2",
    "font-mono text-[0.82rem] font-semibold tracking-wide uppercase",
    press,
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
}

/** Dark block with a coloured icon square on the left, e.g. "Contact me". */
export function blockButtonClasses(className?: string): string {
  return cn(
    "group inline-flex min-h-12 items-stretch overflow-hidden rounded-[6px] border-[3px] border-ink bg-ink text-paper",
    "font-mono text-[0.86rem] font-semibold tracking-[0.12em] uppercase",
    press,
    className,
  );
}

function ExternalHint() {
  return (
    <>
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

/**
 * A button-styled link. Internal paths use next/link; anything else
 * (https, mailto) is a plain <a>, and web links open in a new tab.
 */
export function ButtonLink({ href, children, variant = "ink", className }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {external && <ExternalHint />}
    </a>
  );
}

type BlockButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: IconName;
  tone?: Tone;
  className?: string;
};

/** The dark "Contact me" style button. */
export function BlockButtonLink({ href, children, icon = "arrow", tone = "yellow", className }: BlockButtonLinkProps) {
  const inner = (
    <>
      <span className={cn("grid w-12 place-items-center border-r-[3px] border-ink text-ink", toneBg[tone])}>
        <Icon name={icon} strokeWidth={2.6} className="size-5 transition-transform duration-150 group-hover:rotate-45" />
      </span>
      <span className="flex items-center px-5">{children}</span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={blockButtonClasses(className)}>
        {inner}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a href={href} className={blockButtonClasses(className)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
      {external && (
        <span className="flex items-center pr-4">
          <ExternalHint />
        </span>
      )}
    </a>
  );
}
