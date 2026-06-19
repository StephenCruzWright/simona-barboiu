/**
 * Contact form validation + mailto builder.
 *
 * Delivery is via the visitor's mail client (mailto) to a domain address that
 * is routed to Simona's inbox by Cloudflare Email Routing — so there is no
 * backend, no API key, and no secret to manage. Validation lives here as the
 * single source of truth (dependency-free; if a server route handler is added
 * later, port this to Zod and reuse the same rules).
 */

export type ContactValues = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — must stay empty. Bots fill it; real users never see it. */
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10)
    errors.message = "Please write a little more (at least 10 characters).";
  if (v.website && v.website.trim() !== "")
    errors.website = "Spam detected.";
  return errors;
}

export function isValidContact(v: ContactValues): boolean {
  return Object.keys(validateContact(v)).length === 0;
}

/** Build a mailto: URL from validated values. */
export function buildMailto(to: string, v: ContactValues): string {
  const subject = `Portfolio enquiry from ${v.name.trim()}`;
  const body = `${v.message.trim()}\n\n— ${v.name.trim()}\n${v.email.trim()}`;
  return `mailto:${to}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
