"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./admin-request-detail.module.css";

type RequestStatus = "received" | "working" | "complete";

type RequestDetail = {
  id: string;
  client_id: string;
  website_id: string | null;
  service_id: string | null;
  title: string | null;
  request_type: string;
  description: string;
  location_on_site: string | null;
  replacement_text: string | null;
  desired_timing: string | null;
  additional_notes: string | null;
  status: RequestStatus;
  client_visible_completion_note: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

type ClientDetail = {
  contact_name: string;
  business_name: string | null;
  email: string;
  phone: string | null;
};

type Attachment = {
  id: string;
  original_filename: string;
  mime_type: string | null;
  size_bytes: number | null;
  storage_path: string;
};

type HistoryItem = {
  id: number;
  status: RequestStatus;
  changed_at: string;
};

type LoadedData = {
  request: RequestDetail;
  client: ClientDetail;
  attachments: Attachment[];
  history: HistoryItem[];
  websiteName: string | null;
  serviceName: string | null;
};

function requestTypeLabel(type: string) {
  const labels: Record<string, string> = {
    website_update: "Website update",
    upload_photos: "Photo upload",
    change_business_information: "Business information",
    add_something_new: "Something new",
    something_else: "Other request",
  };

  return labels[type] ?? "Client request";
}

function statusLabel(status: RequestStatus) {
  if (status === "working") return "Working on it";
  if (status === "complete") return "Complete";
  return "Received";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatBytes(bytes: number | null) {
  if (bytes === null) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function AdminRequestDetail() {
  const params = useParams<{ id: string }>();
  const requestId = params?.id;
  const supabase = useMemo(() => createClient(), []);
  const [data, setData] = useState<LoadedData | null>(null);
  const [error, setError] = useState("");
  const [openingFile, setOpeningFile] = useState("");

  useEffect(() => {
    if (!supabase || !requestId) {
      setError("This request could not be loaded.");
      return;
    }

    const client = supabase;
    let active = true;

    async function loadRequest() {
      const { data: authData } = await client.auth.getUser();

      if (!active) return;

      if (!authData.user) {
        window.location.replace("/portal/login");
        return;
      }

      const { data: adminRows, error: adminError } = await client
        .from("portal_admins")
        .select("user_id")
        .eq("user_id", authData.user.id)
        .limit(1);

      if (!active) return;

      if (adminError || !adminRows?.length) {
        setError("Administrator access is required to view this request.");
        return;
      }

      const { data: requestRow, error: requestError } = await client
        .from("service_requests")
        .select(
          "id, client_id, website_id, service_id, title, request_type, description, location_on_site, replacement_text, desired_timing, additional_notes, status, client_visible_completion_note, created_at, updated_at, completed_at",
        )
        .eq("id", requestId)
        .maybeSingle();

      if (!active) return;

      if (requestError || !requestRow) {
        setError("We could not find that client request.");
        return;
      }

      const request = requestRow as RequestDetail;

      const [clientResult, attachmentResult, historyResult] = await Promise.all([
        client
          .from("clients")
          .select("contact_name, business_name, email, phone")
          .eq("id", request.client_id)
          .single(),
        client
          .from("request_attachments")
          .select("id, original_filename, mime_type, size_bytes, storage_path")
          .eq("request_id", request.id)
          .order("created_at", { ascending: true }),
        client
          .from("request_status_history")
          .select("id, status, changed_at")
          .eq("request_id", request.id)
          .order("changed_at", { ascending: true }),
      ]);

      if (!active) return;

      if (clientResult.error || !clientResult.data) {
        setError("We could not load the client information for this request.");
        return;
      }

      if (attachmentResult.error) {
        setError("We could not load the files attached to this request.");
        return;
      }

      if (historyResult.error) {
        setError("We could not load the status history for this request.");
        return;
      }

      let websiteName: string | null = null;
      let serviceName: string | null = null;

      if (request.website_id) {
        const websiteResult = await client
          .from("client_websites")
          .select("name")
          .eq("id", request.website_id)
          .maybeSingle();

        websiteName = websiteResult.data?.name ?? null;
      }

      if (request.service_id) {
        const serviceResult = await client
          .from("client_services")
          .select("service_name")
          .eq("id", request.service_id)
          .maybeSingle();

        serviceName = serviceResult.data?.service_name ?? null;
      }

      if (!active) return;

      setData({
        request,
        client: clientResult.data as ClientDetail,
        attachments: (attachmentResult.data ?? []) as Attachment[],
        history: (historyResult.data ?? []) as HistoryItem[],
        websiteName,
        serviceName,
      });
    }

    void loadRequest();

    return () => {
      active = false;
    };
  }, [requestId, supabase]);

  async function openAttachment(attachment: Attachment) {
    if (!supabase) return;

    setOpeningFile(attachment.id);
    setError("");

    const { data: signedData, error: signedError } = await supabase.storage
      .from("client-request-files")
      .createSignedUrl(attachment.storage_path, 60);

    setOpeningFile("");

    if (signedError || !signedData?.signedUrl) {
      setError("We could not open that file. Please try again.");
      return;
    }

    window.open(signedData.signedUrl, "_blank", "noopener,noreferrer");
  }

  if (error && !data) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p className={styles.eyebrow}>Aaland Client Portal</p>
          <h1>Request unavailable</h1>
          <p className={styles.intro}>{error}</p>
          <Link href="/portal/dashboard" className={styles.primaryLink}>
            Back to dashboard
          </Link>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.skeletonHeading} />
          <div className={styles.skeletonLine} />
          <div className={styles.skeletonBlock} />
        </section>
      </main>
    );
  }

  const { request, client, attachments, history } = data;
  const descriptionLabel =
    request.request_type === "upload_photos"
      ? "What are these files for?"
      : "What should change?";

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Link href="/portal/dashboard#requests" className={styles.backLink}>
          ← Back to client requests
        </Link>

        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Client request</p>
            <h1>{request.title || requestTypeLabel(request.request_type)}</h1>
            <p className={styles.intro}>
              {client.business_name || client.contact_name} • {client.contact_name}
            </p>
          </div>
          <span className={styles["status_" + request.status]}>
            {statusLabel(request.status)}
          </span>
        </header>

        <div className={styles.summaryGrid}>
          <section className={styles.summaryCard}>
            <span>Client</span>
            <strong>{client.business_name || client.contact_name}</strong>
            <small>{client.contact_name}</small>
            <small>{client.email}</small>
            {client.phone ? <small>{client.phone}</small> : null}
          </section>

          <section className={styles.summaryCard}>
            <span>Submitted</span>
            <strong>{formatDate(request.created_at)}</strong>
            <small>{requestTypeLabel(request.request_type)}</small>
            {data.websiteName ? <small>{data.websiteName}</small> : null}
            {data.serviceName ? <small>{data.serviceName}</small> : null}
          </section>
        </div>

        <section className={styles.details}>
          <h2>Request details</h2>
          <DetailRow label={descriptionLabel} value={request.description} />
          <DetailRow label="Where on the site?" value={request.location_on_site} />
          <DetailRow
            label="Replacement text / instructions"
            value={request.replacement_text}
          />
          <DetailRow label="Timing" value={request.desired_timing} />
          <DetailRow label="Additional notes" value={request.additional_notes} />
          {request.client_visible_completion_note ? (
            <DetailRow
              label="Completion note"
              value={request.client_visible_completion_note}
            />
          ) : null}
        </section>

        <section className={styles.files}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Files</p>
              <h2>Photos & attachments</h2>
            </div>
            <span>{attachments.length}</span>
          </div>

          {attachments.length ? (
            <div className={styles.fileList}>
              {attachments.map((attachment) => (
                <button
                  key={attachment.id}
                  type="button"
                  className={styles.fileButton}
                  onClick={() => openAttachment(attachment)}
                  disabled={openingFile === attachment.id}
                >
                  <div>
                    <strong>{attachment.original_filename}</strong>
                    <span>
                      {[attachment.mime_type, formatBytes(attachment.size_bytes)]
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  </div>
                  <span>
                    {openingFile === attachment.id ? "Opening…" : "Open file ↗"}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              No photos or files were attached to this request.
            </div>
          )}
        </section>

        <section className={styles.history}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>History</p>
              <h2>Status history</h2>
            </div>
          </div>

          <div className={styles.historyList}>
            {history.map((item) => (
              <div key={item.id} className={styles.historyRow}>
                <span className={styles.historyDot} />
                <div>
                  <strong>{statusLabel(item.status)}</strong>
                  <span>{formatDate(item.changed_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {error ? <div className={styles.error}>{error}</div> : null}
      </section>
    </main>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className={styles.detailRow}>
      <span>{label}</span>
      <strong>{value?.trim() || "Not provided"}</strong>
    </div>
  );
}
