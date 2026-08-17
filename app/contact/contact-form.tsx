"use client";

import { FormEvent, useState } from "react";

const inquiryLabels = {
  role: "Frontend opportunity",
  website: "Website project",
  general: "General inquiry",
} as const;

type InquiryType = keyof typeof inquiryLabels;

const inquiryDetails: Record<
  InquiryType,
  { intro: string; messageLabel: string; buttonLabel: string }
> = {
  role: {
    intro:
      "For frontend roles, internships, contract work, or conversations with a development team.",
    messageLabel: "What should I know about the opportunity?",
    buttonLabel: "Prepare opportunity email ↗",
  },
  website: {
    intro:
      "For a new website, an existing site that needs improvement, or a small web project.",
    messageLabel: "What would you like help with?",
    buttonLabel: "Prepare project email ↗",
  },
  general: {
    intro:
      "For anything that does not fit the other two options. A short note is completely fine.",
    messageLabel: "What would you like to discuss?",
    buttonLabel: "Prepare email ↗",
  },
};

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("role");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const roleTitle = String(data.get("roleTitle") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `${inquiryLabels[inquiryType]} from ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Company / organization: ${organization}` : "",
      inquiryType === "role" && roleTitle ? `Role: ${roleTitle}` : "",
      inquiryType === "website" && website ? `Current website: ${website}` : "",
      "",
      message,
    ].filter((line, index, lines) => line || index === lines.length - 2);

    window.location.href = `mailto:reaaland@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  }

  const details = inquiryDetails[inquiryType];

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
        <textarea name="message" rows={7} required />
      </label>

      <p className="form-note">
        Submitting opens your email application with this message prepared. No
        information is stored by this site.
      </p>
      <button className="button button-dark" type="submit">
        {details.buttonLabel}
      </button>
    </form>
  );
}
