"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./portal-login.module.css";

type RequestState =
  | { kind: "idle"; message?: string }
  | { kind: "working"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function AccessRequestForm({ defaultEmail = "" }: { defaultEmail?: string }) {
  const [open, setOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [reason, setReason] = useState("");
  const [companySite, setCompanySite] = useState("");
  const [state, setState] = useState<RequestState>({ kind: "idle" });

  useEffect(() => {
    if (defaultEmail && !email) setEmail(defaultEmail);
  }, [defaultEmail, email]);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setState({
      kind: "working",
      message: "Sending your access request…",
    });

    try {
      const response = await fetch("/api/portal/access-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName,
          businessName,
          email,
          reason,
          companySite,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        status?: string;
      };

      if (!response.ok) {
        setState({
          kind: "error",
          message:
            result.error ??
            "We could not send your request. Please try again.",
        });
        return;
      }

      setState({
        kind: "success",
        message:
          result.status === "already_approved"
            ? "This email is already approved. You can sign in above with Google or a secure email link."
            : "Request sent. Rebecca will review it, and you’ll receive an email when it is approved or rejected.",
      });
    } catch {
      setState({
        kind: "error",
        message: "We could not send your request. Please try again.",
      });
    }
  }

  if (state.kind === "success") {
    return (
      <div className={styles.accessRequestBox}>
        <p className={styles.accessRequestTitle}>Portal access</p>
        <div
          className={`${styles.notice} ${styles.successNotice}`}
          role="status"
        >
          {state.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accessRequestBox}>
      <p className={styles.accessRequestTitle}>Need portal access?</p>
      <p className={styles.accessRequestCopy}>
        Request access here instead of trying to create an account. Rebecca
        reviews each request before Supabase allows the email to sign in.
      </p>

      {!open ? (
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() => setOpen(true)}
        >
          Request portal access
        </button>
      ) : (
        <form className={styles.accessRequestForm} onSubmit={submitRequest}>
          <label htmlFor="access-name">Your name</label>
          <input
            id="access-name"
            type="text"
            autoComplete="name"
            value={contactName}
            onChange={(event) => setContactName(event.target.value)}
            maxLength={100}
            required
          />

          <label htmlFor="access-business">Business name</label>
          <input
            id="access-business"
            type="text"
            autoComplete="organization"
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
            maxLength={150}
            placeholder="Optional"
          />

          <label htmlFor="access-email">Email</label>
          <input
            id="access-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={254}
            required
          />

          <label htmlFor="access-reason">Why do you need access?</label>
          <textarea
            id="access-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="For example: I’m an Aaland website client and need to submit an update."
          />

          <label className={styles.honeypot} aria-hidden="true">
            Company website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companySite}
              onChange={(event) => setCompanySite(event.target.value)}
            />
          </label>

          <div className={styles.accessRequestActions}>
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={state.kind === "working"}
            >
              {state.kind === "working" ? "Sending…" : "Send access request"}
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => {
                setOpen(false);
                setState({ kind: "idle" });
              }}
              disabled={state.kind === "working"}
            >
              Cancel
            </button>
          </div>

          {state.kind === "error" ? (
            <div
              className={`${styles.notice} ${styles.errorNotice}`}
              role="alert"
            >
              {state.message}
            </div>
          ) : null}
        </form>
      )}
    </div>
  );
}
