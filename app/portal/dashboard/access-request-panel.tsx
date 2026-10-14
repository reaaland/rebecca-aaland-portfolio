"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./portal-dashboard.module.css";

type AccessRequestRecord = {
  id: string;
  contact_name: string;
  business_name: string | null;
  email: string;
  reason: string | null;
  created_at: string;
};

export function AccessRequestPanel() {
  const supabase = useMemo(() => createClient(), []);
  const [requests, setRequests] = useState<AccessRequestRecord[]>([]);
  const [rejectionReasons, setRejectionReasons] = useState<Record<string, string>>({});
  const [actingId, setActingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadRequests = useCallback(async () => {
    if (!supabase) return;

    const { data, error: loadError } = await supabase
      .from("portal_access_requests")
      .select("id, contact_name, business_name, email, reason, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError("We could not load portal access requests.");
      return;
    }

    setError("");
    setRequests((data ?? []) as AccessRequestRecord[]);
  }, [supabase]);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  async function decide(requestId: string, approve: boolean) {
    if (!supabase) return;

    const reason = rejectionReasons[requestId]?.trim() ?? "";

    if (!approve && !reason) {
      setError("Enter a reason before rejecting an access request.");
      return;
    }

    setActingId(requestId);
    setError("");
    setMessage("");

    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData.session?.access_token;

    if (!accessToken) {
      setError("Your admin session expired. Please sign in again.");
      setActingId(null);
      return;
    }

    try {
      const response = await fetch("/api/portal/access-request/decision", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          requestId,
          approve,
          reason: reason || null,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        status?: "approved" | "rejected";
        emailSent?: boolean;
      };

      if (!response.ok) {
        setError(
          result.error ??
            "We could not save that access decision. Please try again.",
        );
        return;
      }

      setMessage(
        result.status === "approved"
          ? result.emailSent
            ? "Access approved. Supabase will now allow that email to sign in, and the client was emailed."
            : "Access approved. Supabase will now allow that email to sign in, but the decision email could not be sent."
          : result.emailSent
            ? "Access rejected and the requester was emailed the reason."
            : "Access rejected, but the decision email could not be sent.",
      );

      setRejectionReasons((current) => {
        const next = { ...current };
        delete next[requestId];
        return next;
      });

      await loadRequests();
    } catch {
      setError("We could not save that access decision. Please try again.");
    } finally {
      setActingId(null);
    }
  }

  return (
    <section
      className={`${styles.panel} ${styles.accessRequestsPanel}`}
      id="access-requests"
      aria-labelledby="access-requests-heading"
    >
      <div className={styles.panelHeading}>
        <div>
          <p className={styles.eyebrow}>Portal access</p>
          <h2 id="access-requests-heading">Access requests</h2>
        </div>
        <span className={styles.quietBadge}>
          {requests.length ? `${requests.length} pending` : "None pending"}
        </span>
      </div>

      <p className={styles.panelText}>
        Approving a request creates or reactivates the client in Supabase. That
        approved email can then sign in with Google or a secure email link.
      </p>

      {message ? (
        <div className={styles.adminSuccessNotice} role="status">
          {message}
        </div>
      ) : null}

      {error ? (
        <div className={styles.adminErrorNotice} role="alert">
          {error}
        </div>
      ) : null}

      {requests.length ? (
        <div className={styles.accessRequestList}>
          {requests.map((request) => {
            const busy = actingId === request.id;

            return (
              <article className={styles.accessRequestCard} key={request.id}>
                <div className={styles.accessRequestDetails}>
                  <div>
                    <strong>
                      {request.business_name || request.contact_name}
                    </strong>
                    <span>
                      {request.contact_name} • {request.email}
                    </span>
                  </div>
                  <time dateTime={request.created_at}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(request.created_at))}
                  </time>
                </div>

                <p>
                  {request.reason || "No reason was provided with this request."}
                </p>

                <label className={styles.rejectionReason}>
                  Rejection reason
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder="Required only if you reject the request."
                    value={rejectionReasons[request.id] ?? ""}
                    onChange={(event) =>
                      setRejectionReasons((current) => ({
                        ...current,
                        [request.id]: event.target.value,
                      }))
                    }
                    disabled={busy}
                  />
                </label>

                <div className={styles.accessDecisionActions}>
                  <button
                    type="button"
                    className={styles.approveAccessButton}
                    onClick={() => void decide(request.id, true)}
                    disabled={busy}
                  >
                    {busy ? "Saving…" : "Approve access"}
                  </button>
                  <button
                    type="button"
                    className={styles.rejectAccessButton}
                    onClick={() => void decide(request.id, false)}
                    disabled={busy}
                  >
                    Reject with reason
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <strong>No pending access requests.</strong>
          <p>New requests will appear here and also generate an email notice.</p>
        </div>
      )}
    </section>
  );
}
