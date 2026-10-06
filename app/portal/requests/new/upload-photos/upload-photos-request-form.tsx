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
const ACCEPTED_FILES = ".jpg,.jpeg,.png,.webp,.gif,.avif,.heic,.heif,.pdf";

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

function isPreviewableImage(file: File) {
  const extension = fileExtension(file.name);
  return file.type.startsWith("image/") && extension !== "heic" && extension !== "heif";
}

function safeFilename(name: string) {
  const cleaned = name
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-120);

  return cleaned || "file";
}

function isAlreadyExistsError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const value = error as {
    statusCode?: string | number;
    status?: string | number;
    message?: string;
  };

  return (
    String(value.statusCode ?? value.status ?? "") === "409" ||
    value.message?.toLowerCase().includes("already exists") === true
  );
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
      const { data: authData, error: authError } = await client.auth.getUser();

      if (!active) return;

      if (authError || !authData.user) {
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
          .eq("status", "active")
          .limit(1),
      ]);

      if (!active) return;

      if (adminResult.error || clientResult.error) {
        setError("We could not verify your portal access. Please try again.");
        setLoadingIdentity(false);
        return;
      }

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
      setError(`${tooLarge.name} is larger than 15 MB. Please choose a smaller file.`);
      return;
    }

    setFiles(selected);
  }

  function removeFile(indexToRemove: number) {
    setFiles((current) => current.filter((_, index) => index !== indexToRemove));
    setError("");
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
    setUploadProgress(requestId ? "Resuming your upload…" : "Saving your request…");
    setError("");

    let activeRequestId = requestId;

    if (!activeRequestId) {
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

      activeRequestId = request.id;
      setRequestId(request.id);
    }

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const storagePath =
        portalClient.id +
        "/" +
        activeRequestId +
        "/" +
        String(index + 1).padStart(2, "0") +
        "-" +
        safeFilename(file.name);

      setUploadProgress(`Checking file ${index + 1} of ${files.length}…`);

      const { data: existingMetadata, error: metadataLookupError } = await supabase
        .from("request_attachments")
        .select("id")
        .eq("request_id", activeRequestId)
        .eq("storage_path", storagePath)
        .maybeSingle();

      if (metadataLookupError) {
        setError(
          `Your request is saved, but I could not verify ${file.name}. Press Retry upload to continue without creating a second request.`,
        );
        setSubmitting(false);
        setUploadProgress("");
        return;
      }

      if (existingMetadata) continue;

      setUploadProgress(`Uploading file ${index + 1} of ${files.length}…`);

      const uploadOptions = {
        cacheControl: "3600",
        upsert: false,
        ...(file.type ? { contentType: file.type } : {}),
      };

      const { error: uploadError } = await supabase.storage
        .from("client-request-files")
        .upload(storagePath, file, uploadOptions);

      if (uploadError && !isAlreadyExistsError(uploadError)) {
        setError(
          `Your request is saved, but ${file.name} did not finish uploading. Press Retry upload to continue this same request.`,
        );
        setSubmitting(false);
        setUploadProgress("");
        return;
      }

      const { error: metadataError } = await supabase
        .from("request_attachments")
        .insert({
          request_id: activeRequestId,
          client_id: portalClient.id,
          storage_path: storagePath,
          original_filename: file.name,
          mime_type: file.type || null,
          size_bytes: file.size,
          uploaded_by: userId,
        });

      if (metadataError) {
        setError(
          `${file.name} reached secure storage, but its file record did not finish. Press Retry upload; the portal will reconnect it to this same request.`,
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
            <h1>{step === "success" ? "Files received." : "Upload photos or files"}</h1>
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
                  an approved active client account.
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
                  onChange={(event) => updateField("locationOnSite", event.target.value)}
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
                />
                <small>
                  Up to {MAX_FILES} files, 15 MB each. JPG, PNG, WebP, GIF,
                  AVIF, HEIC/HEIF, or PDF.
                </small>
              </label>

              {files.length ? (
                <div className={styles.selectedFiles} aria-live="polite">
                  {files.map((file, index) => (
                    <SelectedFile
                      key={file.name + "-" + file.lastModified + "-" + index}
                      file={file}
                      onRemove={() => removeFile(index)}
                    />
                  ))}
                </div>
              ) : null}

              <label>
                <span>Anything else I should know?</span>
                <textarea
                  value={form.additionalNotes}
                  onChange={(event) => updateField("additionalNotes", event.target.value)}
                  placeholder="Optional notes"
                  rows={3}
                />
              </label>

              {error ? <div className={baseStyles.error}>{error}</div> : null}

              <div className={baseStyles.actions}>
                <Link href="/portal/dashboard" className={baseStyles.secondaryButton}>
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
              Check the request and file list before sending them. If an upload
              is interrupted, you can retry without creating a duplicate request.
            </p>

            <div className={baseStyles.review}>
              <ReviewRow label="What are the files for?" value={form.description} />
              <ReviewRow label="Where should I use them?" value={form.locationOnSite} />
              <ReviewRow label="Additional notes" value={form.additionalNotes} />
            </div>

            <div className={styles.reviewFiles}>
              <span>Files</span>
              {files.map((file, index) => (
                <div
                  className={styles.reviewFile}
                  key={file.name + "-" + file.lastModified + "-" + index}
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
                disabled={submitting || Boolean(requestId)}
              >
                ← Edit request
              </button>
              <button
                type="button"
                className={baseStyles.primaryButton}
                onClick={submitRequest}
                disabled={submitting || !portalClient}
                title={!portalClient ? "Use an approved client test account to submit" : undefined}
              >
                {submitting
                  ? "Uploading…"
                  : requestId
                    ? "Retry upload"
                    : portalClient
                      ? "Send files"
                      : "Client test required"}
              </button>
            </div>

            {requestId ? (
              <p className={baseStyles.previewOnly}>
                This request is already saved. Retrying continues the same request and skips files already recorded.
              </p>
            ) : null}

            {!portalClient ? (
              <p className={baseStyles.previewOnly}>
                Administrator preview only — a real upload must come from an
                approved active client account.
              </p>
            ) : null}
          </>
        ) : null}

        {step === "success" ? (
          <div className={baseStyles.success}>
            <div className={baseStyles.successIcon}>✓</div>
            <p>
              Your files and request have been saved with a status of <strong>Received</strong>.
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

function SelectedFile({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!isPreviewableImage(file)) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className={styles.selectedFile}>
      <div className={styles.fileIdentity}>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className={styles.filePreview} />
        ) : (
          <span className={styles.fileTypeBadge}>
            {fileExtension(file.name).toUpperCase() || "FILE"}
          </span>
        )}
        <div>
          <strong>{file.name}</strong>
          <span>{formatBytes(file.size)}</span>
        </div>
      </div>
      <button type="button" className={styles.removeFile} onClick={onRemove}>
        Remove
      </button>
    </div>
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
