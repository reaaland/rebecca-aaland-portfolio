"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "../website-update/website-update-request.module.css";

type Step = "details" | "review" | "success";

type PortalClient = {
  id: string;
  contact_name: string;
  business_name: string | null;
};

type FormState = {
  description: string;
  locationOnSite: string;
  replacementText: string;
  desiredTiming: string;
  additionalNotes: string;
};

const emptyForm: FormState = {
  description: "",
  locationOnSite: "",
  replacementText: "",
  desiredTiming: "",
  additionalNotes: "",
};

export function AddSomethingNewRequestForm() {
  const supabase = useMemo(() => createClient(), []);
  const [step, setStep] = useState<Step>("details");
  const [portalClient, setPortalClient] = useState<PortalClient | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingIdentity, setLoadingIdentity] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!supabase) {
      setError("Portal authentication is not configured in this environment.");
      setLoadingIdentity(false);
      return;
    }

    const client = supabase;
    let active = true;

    async function loadIdentity() {
      const { data: authData } = await client.auth.getUser();

      if (!active) return;

      if (!authData.user) {
        window.location.replace("/portal/login");
        return;
      }

      const [adminResult, clientResult] = await Promise.all([
        client
          .from("portal_admins")
          .select("user_id")
          .eq("user_id", authData.user.id)
          .limit(1),
        client
          .from("clients")
          .select("id, contact_name, business_name")
          .eq("auth_user_id", authData.user.id)
          .limit(1),
      ]);

      if (!active) return;

      setIsAdmin(Boolean(adminResult.data?.length));
      setPortalClient(
        (clientResult.data?.[0] as PortalClient | undefined) ?? null,
      );
      setLoadingIdentity(false);
    }

    void loadIdentity();

    return () => {
      active = false;
    };
  }, [supabase]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function reviewRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Please tell me what you would like added.");
      return;
    }

    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitRequest() {
    if (!supabase || !portalClient) return;

    setSubmitting(true);
    setError("");

    const { data, error: insertError } = await supabase
      .from("service_requests")
      .insert({
        client_id: portalClient.id,
        request_type: "add_something_new",
        description: form.description.trim(),
        location_on_site: form.locationOnSite.trim() || null,
        replacement_text: form.replacementText.trim() || null,
        desired_timing: form.desiredTiming.trim() || null,
        additional_notes: form.additionalNotes.trim() || null,
        status: "received",
      })
      .select("id")
      .single();

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    setRequestId(data.id);
    setStep("success");
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loadingIdentity) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonBlock} />
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.topline}>
          <div>
            <p className={styles.eyebrow}>New website addition</p>
            <h1>
              {step === "success" ? "Request received." : "Add something new"}
            </h1>
          </div>
          {step !== "success" ? (
            <span className={styles.stepBadge}>
              {step === "details" ? "Step 1 of 2" : "Step 2 of 2"}
            </span>
          ) : null}
        </div>

        {step === "details" ? (
          <>
            <p className={styles.intro}>
              Use this for a new page, section, feature, form, service area, or
              other addition that is not already on your website.
            </p>

            {isAdmin && !portalClient ? (
              <div className={styles.adminNote}>
                <strong>Administrator preview</strong>
                <span>
                  You can review the form, but a real submission must come from
                  an approved client account.
                </span>
              </div>
            ) : null}

            <form className={styles.form} onSubmit={reviewRequest}>
              <label>
                <span>What would you like to add? *</span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Example: Add a new FAQ section answering the five questions customers ask most often."
                  rows={5}
                  required
                />
              </label>

              <label>
                <span>Where should it go?</span>
                <input
                  value={form.locationOnSite}
                  onChange={(event) =>
                    updateField("locationOnSite", event.target.value)
                  }
                  placeholder="Optional — for example, Home page below Services"
                />
              </label>

              <label>
                <span>What should it include?</span>
                <textarea
                  value={form.replacementText}
                  onChange={(event) =>
                    updateField("replacementText", event.target.value)
                  }
                  placeholder="Add wording, ideas, links, features, or other details you already know you want included."
                  rows={5}
                />
              </label>

              <label>
                <span>Is there a timing need?</span>
                <input
                  value={form.desiredTiming}
                  onChange={(event) =>
                    updateField("desiredTiming", event.target.value)
                  }
                  placeholder="Optional — for example, before our October event"
                />
              </label>

              <label>
                <span>Anything else I should know?</span>
                <textarea
                  value={form.additionalNotes}
                  onChange={(event) =>
                    updateField("additionalNotes", event.target.value)
                  }
                  placeholder="Optional notes"
                  rows={3}
                />
              </label>

              {error ? <div className={styles.error}>{error}</div> : null}

              <div className={styles.actions}>
                <Link
                  href="/portal/dashboard"
                  className={styles.secondaryButton}
                >
                  Cancel
                </Link>
                <button type="submit" className={styles.primaryButton}>
                  Review request
                </button>
              </div>
            </form>
          </>
        ) : null}

        {step === "review" ? (
          <>
            <p className={styles.intro}>
              Check the details before submitting. You can go back and make
              changes if anything looks off.
            </p>

            <div className={styles.review}>
              <ReviewRow label="What should be added?" value={form.description} />
              <ReviewRow label="Where should it go?" value={form.locationOnSite} />
              <ReviewRow label="What should it include?" value={form.replacementText} />
              <ReviewRow label="Timing" value={form.desiredTiming} />
              <ReviewRow label="Additional notes" value={form.additionalNotes} />
            </div>

            {error ? <div className={styles.error}>{error}</div> : null}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setStep("details")}
              >
                ← Edit request
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={submitRequest}
                disabled={submitting || !portalClient}
                title={
                  !portalClient
                    ? "Use an approved client test account to submit"
                    : undefined
                }
              >
                {submitting
                  ? "Submitting…"
                  : portalClient
                    ? "Submit request"
                    : "Client test required"}
              </button>
            </div>

            {!portalClient ? (
              <p className={styles.previewOnly}>
                Administrator preview only — a real request must come from an
                approved client account.
              </p>
            ) : null}
          </>
        ) : null}

        {step === "success" ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <p>
              Your new addition request has been saved with a status of{" "}
              <strong>Received</strong>.
            </p>
            {requestId ? <small>Request ID: {requestId}</small> : null}
            <Link href="/portal/dashboard" className={styles.primaryButton}>
              Back to dashboard
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.reviewRow}>
      <span>{label}</span>
      <strong>{value.trim() || "Not provided"}</strong>
    </div>
  );
}
