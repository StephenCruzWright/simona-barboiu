"use client";

import { useState } from "react";
import {
  validateContact,
  buildMailto,
  type ContactValues,
  type ContactErrors,
} from "@/lib/contact-schema";

const EMPTY: ContactValues = { name: "", email: "", message: "", website: "" };

const FIELD =
  "w-full rounded-lg border border-hairline bg-surface-1 px-4 py-3 text-body outline-none transition-colors focus-visible:border-accent";

export default function ContactForm({ to }: { to: string }) {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof ContactValues>(key: K, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // Honeypot caught? Silently no-op.
    if (values.website && values.website.trim() !== "") return;
    window.location.href = buildMailto(to, values);
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot — visually hidden, off the a11y tree, not tab-reachable. */}
      <div aria-hidden className="hidden">
        <label>
          Leave this empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-name" className="text-small">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className={FIELD}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
        />
        {errors.name && (
          <p id="cf-name-err" className="text-small text-accent">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-email" className="text-small">
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className={FIELD}
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
        />
        {errors.email && (
          <p id="cf-email-err" className="text-small text-accent">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-message" className="text-small">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          className={`${FIELD} resize-y`}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        {errors.message && (
          <p id="cf-message-err" className="text-small text-accent">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span data-magnetic-wrap className="inline-block">
          <button type="submit" className="btn">
            Send message ↪
          </button>
        </span>
        {sent && (
          <p className="text-small text-(--footer-foreground)" role="status">
            Opening your email app…
          </p>
        )}
      </div>
    </form>
  );
}
