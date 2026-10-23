export type ContactDraft = {
  services: string[];
  message: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
};

export type ContactErrors = Partial<Record<keyof ContactDraft, string>>;

export const emptyDraft: ContactDraft = {
  services: [],
  message: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
};

// Deliberately simple: something@something.tld, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validates only the fields that belong to one form step. */
export function validateStep(
  step: number,
  draft: ContactDraft,
  limits: { minMessageLength: number; maxMessageLength: number },
): ContactErrors {
  const errors: ContactErrors = {};

  if (step === 0 && draft.services.length === 0) {
    errors.services = "Pick at least one option so I know where to start.";
  }

  if (step === 1) {
    const length = draft.message.trim().length;
    if (length < limits.minMessageLength) {
      errors.message = `A little more detail, please (at least ${limits.minMessageLength} characters).`;
    } else if (length > limits.maxMessageLength) {
      errors.message = `Please keep it under ${limits.maxMessageLength} characters.`;
    }
  }

  if (step === 2) {
    if (!draft.name.trim()) errors.name = "What should I call you?";
    if (!draft.email.trim()) {
      errors.email = "I need an email address to reply to.";
    } else if (!EMAIL_PATTERN.test(draft.email.trim())) {
      errors.email = "That email doesn't look right. Mind checking it?";
    }
  }

  return errors;
}

export function composeSubject(draft: ContactDraft): string {
  const who = draft.company.trim()
    ? `${draft.name.trim()} (${draft.company.trim()})`
    : draft.name.trim();
  return `Project enquiry from ${who}`;
}

export function composeBody(draft: ContactDraft): string {
  const lines = [
    `Hi Apurva,`,
    ``,
    draft.message.trim(),
    ``,
    `What I need: ${draft.services.join(", ")}`,
  ];
  if (draft.timeline) lines.push(`Timeline: ${draft.timeline}`);
  lines.push(
    ``,
    `${draft.name.trim()}`,
    ...(draft.company.trim() ? [draft.company.trim()] : []),
    draft.email.trim(),
  );
  return lines.join("\n");
}

export function buildMailto(to: string, draft: ContactDraft): string {
  const params = [
    `subject=${encodeURIComponent(composeSubject(draft))}`,
    `body=${encodeURIComponent(composeBody(draft))}`,
  ].join("&");
  return `mailto:${to}?${params}`;
}
