"use client";

import { FormEvent, useState } from "react";

const inquiryLabels = {
  role: "Frontend opportunity",
  website: "Website project",
  general: "General inquiry",
} as const;

type InquiryType = keyof typeof inquiryLabels;
type FormStatus = "idle" | "submitting" | "success" | "error";

const inquiryDetails: Record<
  InquiryType,
  { intro: string; messageLabel: string; buttonLabel: string }
> = {
  role: {
    intro:
      "For frontend roles, internships, contract work, or conversations with a development team.",
    messageLabel: "What should I know about the opportunity?",
    buttonLabel: "Send opportunity message ↗",
  },
  website: {
    intro:
      "For a new website, an existing site that needs improvement, or a small web project.",
    messageLabel: "What would you like help with?",
    buttonLabel: "Send project message ↗",
  },
  general: {
    intro:
      "For anything that does not fit the other two options. A short note is completely fine.",
    messageLabel: "What would you like to discuss?",
    buttonLabel: "Send message ↗",
  },
};

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("role");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType,
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          organization: String(data.get("organization") ?? "").trim(),
          roleTitle: String(data.get("roleTitle") ?? "").trim(),
          website: String(data.get("website") ?? "").trim(),
          companySite: String(data.get("companySite") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("The contact request could not be sent.");
      }

      form.reset();
      setInquiryType("role");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const details = inquiryDetails[inquiryType];

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
    >
      <fieldset>
        <legend>What brings you here?</legend>
        <div className="inquiry-options">
          {(Object.entries(inquiryLabels) as [InquiryType, string][]).map(
            ([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="inquiryType"
                  value={value}
                  checked={inquiryType === value}
                  onChange={() => setInquiryType(value)}
                />
                <span>{label}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>

      <p className="form-note">{details.intro}</p>

      <div className="form-row">
        <label>
          Your name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Your email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      {inquiryType === "role" && (
        <div className="form-row">
          <label>
            Company or organization
            <input name="organization" type="text" autoComplete="organization" />
          </label>
          <label>
            Role or opportunity
            <input name="roleTitle" type="text" />
          </label>
        </div>
      )}

      {inquiryType === "website" && (
        <div className="form-row">
          <label>
            Business or organization
            <input name="organization" type="text" autoComplete="organization" />
          </label>
          <label>
            Current website, if you have one
            <input name="website" type="text" autoComplete="url" />
          </label>
        </div>
      )}

      <label>
        {details.messageLabel}
        <textarea name="message" rows={7} maxLength={5000} required />
      </label>

      <label className="form-honeypot" aria-hidden="true">
        Leave this field empty
        <input
          name="companySite"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </label>

      <p className="form-note">
        Your message will be sent directly to Rebecca. You can also use the
        direct email link on this page.
      </p>

      {status === "success" ? (
        <p className="form-status form-status-success" role="status">
          Thanks—your message was sent directly to Rebecca.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="form-status form-status-error" role="alert">
          The form could not send your message. Please email Rebecca directly at{" "}
          <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>.
        </p>
      ) : null}

      <button
        className="button button-dark"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : details.buttonLabel}
      </button>
    </form>
  );
}
