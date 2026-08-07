"use client";

import { FormEvent, useState } from "react";

const inquiryLabels = {
  role: "Employment or internship",
  website: "Website project",
  general: "General inquiry",
} as const;

type InquiryType = keyof typeof inquiryLabels;

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("website");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `${inquiryLabels[inquiryType]} from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    window.location.href = `mailto:reaaland@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>What would you like to discuss?</legend>
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

      <label>
        What are you working on?
        <textarea name="message" rows={7} required />
      </label>

      <p className="form-note">
        Submitting opens your email application with this message prepared. No
        information is stored by this site.
      </p>
      <button className="button button-dark" type="submit">
        Prepare email ↗
      </button>
    </form>
  );
}
