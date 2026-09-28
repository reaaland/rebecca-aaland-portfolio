"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import baseStyles from "../website-update/website-update-request.module.css";
import styles from "./upload-photos-request.module.css";

type Step = "details" | "review" | "success";

type PortalClient = {
  id: string;
  contact_name: string;
  business_name: string | null;
};

type FormState = {
  description: string;
  locationOnSite: string;
  additionalNotes: string;
};

const emptyForm: FormState = {
  description: "",
  locationOnSite: "",
  additionalNotes: "",
};

const MAX_FILES = 10;
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
  "heic",
  "heif",
  "pdf",
]);
const ACCEPTED_FILES =
  ".jpg,.jpeg,.png,.webp,.gif,.avif,.heic,.heif,.pdf";

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function fileExtension(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function isAllowedFile(file: File) {
  return ALLOWED_EXTENSIONS.has(fileExtension(file.name));
}

function safeFilename(name: string) {
  const cleaned = name
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-120);

  return cleaned || "file";
}

export function UploadPhotosRequestForm() {
  const supabase = useMemo(() => createClient(), []);
  const [step, setStep] = useState<Step>("details");
  const [portalClient, setPortalClient] = useState<PortalClient | null>(null);
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingIdentity, setLoadingIdentity] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);

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

      setUserId(authData.user.id);
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

  function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    setError("");

    const selected = Array.from(event.target.files ?? []);

    if (selected.length > MAX_FILES) {
      setFiles([]);
      event.target.value = "";
      setError(`Please choose no more than ${MAX_FILES} files at a time.`);
      return;
    }

    const unsupported = selected.find((file) => !isAllowedFile(file));
    if (unsupported) {
      setFiles([]);
      event.target.value = "";
      setError(
        `${unsupported.name} is not a supported file type. Please use JPG, PNG, WebP, GIF, AVIF, HEIC/HEIF, or PDF.`,
      );
      return;
    }

    const tooLarge = selected.find((file) => file.size > MAX_FILE_SIZE);
    if (tooLarge) {
      setFiles([]);
      event.target.value = "";
      setError(`${tooLarge.name} is larger than 15 MB.`);
      return;
    }

    setFiles(selected);
  }

  function reviewRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Please tell me what the photos or files are for.");
      return;
    }

    if (!files.length) {
      setError("Please choose at least one photo or file.");
      return;
    }

    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitRequest() {
    if (!supabase || !portalClient || !userId || !files.length) return;

    setSubmitting(true);
    setUploadProgress("Saving your request…");
    setError("");

    const { data: request, error: requestError } = await supabase
      .from("service_requests")
      .insert({
        client_id: portalClient.id,
        request_type: "upload_photos",
        description: form.description.trim(),
        location_on_site: form.locationOnSite.trim() || null,
        additional_notes: form.additionalNotes.trim() || null,
        status: "received",
      })
      .select("id")
      .single();

    if (requestError || !request) {
      setError(requestError?.message ?? "Your request could not be saved.");
      setSubmitting(false);
      setUploadProgress("");
      return;
    }

    setRequestId(request.id);

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      setUploadProgress(`Uploading file ${index + 1} of ${files.length}…`);

      const storagePath =
        portalClient.id +
        "/" +
        request.id +
        "/" +
        crypto.randomUUID() +
        "-" +
        safeFilename(file.name);

      const uploadOptions = {
        cacheControl: "3600",
        upsert: false,
        ...(file.type ? { contentType: file.type } : {}),
      };

      const { error: uploadError } = await supabase.storage
        .from("client-request-files")
        .upload(storagePath, file, uploadOptions);

      if (uploadError) {
        setError(
          `The request was saved, but ${file.name} could not be uploaded. Please return to the dashboard and send the missing file in a new upload request.`,
        );
        setSubmitting(false);
        setUploadProgress("");
        return;
      }

      const { error: metadataError } = await supabase
        .from("request_attachments")
        .insert({
          request_id: request.id,
          client_id: portalClient.id,
          storage_path: storagePath,
          original_filename: file.name,
          mime_type: file.type || null,
          size_bytes: file.size,
          uploaded_by: userId,
        });

      if (metadataError) {
        setError(
          `The request was saved and ${file.name} reached secure storage, but its file record could not be completed. Please contact Rebecca before uploading it again.`,
        );
        setSubmitting(false);
        setUploadProgress("");
        return;
      }
    }

    setStep("success");
    setSubmitting(false);
    setUploadProgress("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loadingIdentity) {
    return (
      <main className={baseStyles.page}>
        <section className={baseStyles.card}>
          <div className={baseStyles.skeletonTitle} />
          <div className={baseStyles.skeletonLine} />
          <div className={baseStyles.skeletonBlock} />
        </section>
      </main>
    );
  }

  return (
    <main className={baseStyles.page}>
      <section className={baseStyles.card}>
        <div className={baseStyles.topline}>
          <div>
            <p className={baseStyles.eyebrow}>Photo & file request</p>
            <h1>
              {step === "success" ? "Files received." : "Upload photos or files"}
            </h1>
          </div>
          {step !== "success" ? (
            <span className={baseStyles.stepBadge}>
              {step === "details" ? "Step 1 of 2" : "Step 2 of 2"}
            </span>
          ) : null}
        </div>

        {step === "details" ? (
          <>
            <p className={baseStyles.intro}>
              Add the photos or documents you want me to use and tell me what
              they are for. Files stay in your private client request area.
            </p>

            {isAdmin && !portalClient ? (
              <div className={baseStyles.adminNote}>
                <strong>Administrator preview</strong>
                <span>
                  You can review the form, but a real upload must be tested from
                  an approved client account so the files are tied to the correct
                  client.
                </span>
              </div>
            ) : null}

            <form className={baseStyles.form} onSubmit={reviewRequest}>
              <label>
                <span>What are these photos or files for? *</span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Example: Replace the three photos in the gallery with these new project photos."
                  rows={4}
                  required
                />
              </label>

              <label>
                <span>Where should I use them?</span>
                <input
                  value={form.locationOnSite}
                  onChange={(event) =>
                    updateField("locationOnSite", event.target.value)
                  }
                  placeholder="Optional — for example, Gallery page or Home page"
                />
              </label>

              <label className={styles.filePicker}>
                <span>Choose photos or files *</span>
                <input
                  className={styles.fileInput}
                  type="file"
                  accept={ACCEPTED_FILES}
                  multiple
                  onChange={chooseFiles}
                  required
                />
                <small>
                  Up to {MAX_FILES} files, 15 MB each. JPG, PNG, WebP, GIF,
                  AVIF, HEIC/HEIF, or PDF.
                </small>
              </label>

              {files.length ? (
                <div className={styles.selectedFiles} aria-live="polite">
                  {files.map((file) => (
                    <div
                      className={styles.selectedFile}
                      key={file.name + "-" + file.lastModified}
                    >
                      <strong>{file.name}</strong>
                      <span>{formatBytes(file.size)}</span>
                    </div>
                  ))}
                </div>
              ) : null}

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

              {error ? <div className={baseStyles.error}>{error}</div> : null}

              <div className={baseStyles.actions}>
                <Link
                  href="/portal/dashboard"
                  className={baseStyles.secondaryButton}
                >
                  Cancel
                </Link>
                <button type="submit" className={baseStyles.primaryButton}>
                  Review upload
                </button>
              </div>
            </form>
          </>
        ) : null}

        {step === "review" ? (
          <>
            <p className={baseStyles.intro}>
              Check the request and file list before sending them.
            </p>

            <div className={baseStyles.review}>
              <ReviewRow
                label="What are the files for?"
                value={form.description}
              />
              <ReviewRow label="Where should I use them?" value={form.locationOnSite} />
              <ReviewRow label="Additional notes" value={form.additionalNotes} />
            </div>

            <div className={styles.reviewFiles}>
              <span>Files</span>
              {files.map((file) => (
                <div
                  className={styles.reviewFile}
                  key={file.name + "-" + file.lastModified}
                >
                  <strong>{file.name}</strong>
                  <span>{formatBytes(file.size)}</span>
                </div>
              ))}
            </div>

            {error ? <div className={baseStyles.error}>{error}</div> : null}
            {uploadProgress ? (
              <div className={styles.progress} role="status">
                {uploadProgress}
              </div>
            ) : null}

            <div className={baseStyles.actions}>
              <button
                type="button"
                className={baseStyles.secondaryButton}
                onClick={() => setStep("details")}
                disabled={submitting}
              >
                ← Edit request
              </button>
              <button
                type="button"
                className={baseStyles.primaryButton}
                onClick={submitRequest}
                disabled={submitting || !portalClient}
                title={
                  !portalClient
                    ? "Use an approved client test account to submit"
                    : undefined
                }
              >
                {submitting
                  ? "Uploading…"
                  : portalClient
                    ? "Send files"
                    : "Client test required"}
              </button>
            </div>

            {!portalClient ? (
              <p className={baseStyles.previewOnly}>
                Administrator preview only — a real upload must come from an
                approved client account.
              </p>
            ) : null}
          </>
        ) : null}

        {step === "success" ? (
          <div className={baseStyles.success}>
            <div className={baseStyles.successIcon}>✓</div>
            <p>
              Your files and request have been saved with a status of{" "}
              <strong>Received</strong>.
            </p>
            {requestId ? <small>Request ID: {requestId}</small> : null}
            <Link href="/portal/dashboard" className={baseStyles.primaryButton}>
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
    <div className={baseStyles.reviewRow}>
      <span>{label}</span>
      <strong>{value.trim() || "Not provided"}</strong>
    </div>
  );
}
