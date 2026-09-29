"use client";

import { FormEvent, useState } from "react";

import { inquiryLabels, inquiryDetails, inquiryFields, linkLabels, type InquiryType } from "@/lib/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  initialInquiryType = "general",
}: {
  initialInquiryType?: InquiryType;
}) {
  const [inquiryType, setInquiryType] =
    useState<InquiryType>(initialInquiryType);
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
          answers: Object.fromEntries(inquiryFields[inquiryType].map(({ name }) => [name, String(data.get(name) ?? "").trim()])),
          website: String(data.get("website") ?? "").trim(),
          companySite: String(data.get("companySite") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("The contact request could not be sent.");
      }

      form.reset();
      setInquiryType(initialInquiryType);
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
      <fieldset disabled={status === "submitting"}>
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
                  onChange={() => { setInquiryType(value); setStatus("idle"); }}
                />
                <span>{label}</span>
              </label>
            ),
          )}
        </div>
      </fieldset>

      <p className="form-note" aria-live="polite">{details.intro} Only your name, email, and message are required.</p>

      <fieldset className="contact-fields" disabled={status === "submitting"}>
        <legend className="sr-only">{inquiryLabels[inquiryType]}</legend>

        <div className="form-row">
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" maxLength={100} required />
          </label>
          <label>
            Your email
            <input name="email" type="email" autoComplete="email" maxLength={254} required />
          </label>
        </div>

        <div className="form-row">
          <label>
            Business or organization (optional)
            <input name="organization" type="text" autoComplete="organization" maxLength={150} />
          </label>
          <label>
            {linkLabels[inquiryType]} (optional)
            <input name="website" type="text" maxLength={500} />
          </label>
        </div>

        <div className="form-row" key={inquiryType}>
          {inquiryFields[inquiryType].map((field) => (
            <label key={field.name}>
              {field.label} (optional)
              {field.options ? (
                <select name={field.name} defaultValue="">
                  <option value="">Choose if you know</option>
                  {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : <input name={field.name} type="text" maxLength={300} placeholder={field.placeholder} />}
            </label>
          ))}
        </div>

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

      </fieldset>

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
