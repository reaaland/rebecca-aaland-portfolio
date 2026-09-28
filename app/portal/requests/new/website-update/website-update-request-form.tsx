"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./website-update-request.module.css";

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

export function WebsiteUpdateRequestForm() {
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
      setPortalClient((clientResult.data?.[0] as PortalClient | undefined) ?? null);
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
      setError("Please tell me what you want changed.");
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
        request_type: "website_update",
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
            <p className={styles.eyebrow}>Website update request</p>
            <h1>
              {step === "success"
                ? "Request received."
                : "Update something on my website"}
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
              Tell me what you want changed. If you know where it belongs, add
              that too. You can keep this short.
            </p>

            {isAdmin && !portalClient ? (
              <div className={styles.adminNote}>
                <strong>Administrator preview</strong>
                <span>
                  You can review the form, but a real submission must be tested
                  from an approved client account so the request is tied to the
                  correct client.
                </span>
              </div>
            ) : null}

            <form className={styles.form} onSubmit={reviewRequest}>
              <label>
                <span>What do you want changed? *</span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Example: Change the paragraph under Services to mention our new Saturday hours."
                  rows={5}
                  required
                />
              </label>

              <label>
                <span>Where on the site is it?</span>
                <input
                  value={form.locationOnSite}
                  onChange={(event) => updateField("locationOnSite", event.target.value)}
                  placeholder="Example: Home page, Services section"
                />
              </label>

              <label>
                <span>Replacement text or instructions</span>
                <textarea
                  value={form.replacementText}
                  onChange={(event) => updateField("replacementText", event.target.value)}
                  placeholder="Paste exact wording here if you have it."
                  rows={4}
                />
              </label>

              <label>
                <span>Is there a timing need?</span>
                <input
                  value={form.desiredTiming}
                  onChange={(event) => updateField("desiredTiming", event.target.value)}
                  placeholder="Optional — for example, before Friday"
                />
              </label>

              <label>
                <span>Anything else I should know?</span>
                <textarea
                  value={form.additionalNotes}
                  onChange={(event) => updateField("additionalNotes", event.target.value)}
                  placeholder="Optional notes"
                  rows={3}
                />
              </label>

              {error ? <div className={styles.error}>{error}</div> : null}

              <div className={styles.actions}>
                <Link href="/portal/dashboard" className={styles.secondaryButton}>
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
              <ReviewRow label="What should change?" value={form.description} />
              <ReviewRow label="Where on the site?" value={form.locationOnSite} />
              <ReviewRow
                label="Replacement text / instructions"
                value={form.replacementText}
              />
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
                Administrator preview only — no client record is attached to
                this account, so a real request cannot be saved yet.
              </p>
            ) : null}
          </>
        ) : null}

        {step === "success" ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <p>
              Your update request has been saved with a status of{" "}
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
