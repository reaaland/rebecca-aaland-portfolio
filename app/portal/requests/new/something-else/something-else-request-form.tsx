"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import baseStyles from "../website-update/website-update-request.module.css";
import fileStyles from "../upload-photos/upload-photos-request.module.css";

type Step = "details" | "review" | "success";

type PortalClient = {
  id: string;
  contact_name: string;
  business_name: string | null;
};

type FormState = {
  description: string;
  desiredTiming: string;
  additionalNotes: string;
};

const emptyForm: FormState = {
  description: "",
  desiredTiming: "",
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

export function SomethingElseRequestForm() {
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
      setError("Please tell me what you need help with.");
      return;
    }

    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitRequest() {
    if (!supabase || !portalClient || !userId) return;

    if (requestId) {
      setError(
        "This request has already been saved. Return to the dashboard to start another request.",
      );
      return;
    }

    setSubmitting(true);
    setUploadProgress("Saving your request…");
    setError("");

    const { data: request, error: requestError } = await supabase
      .from("service_requests")
      .insert({
        client_id: portalClient.id,
        request_type: "something_else",
        description: form.description.trim(),
        desired_timing: form.desiredTiming.trim() || null,
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
          `The request was saved, but ${file.name} could not be uploaded. Please send the missing file in a new upload request.`,
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
            <p className={baseStyles.eyebrow}>General request</p>
            <h1>
              {step === "success" ? "Request received." : "Something else"}
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
              Not sure which request type fits? Just tell me what you need in
              your own words. You can also attach supporting photos or documents.
            </p>

            {isAdmin && !portalClient ? (
              <div className={baseStyles.adminNote}>
                <strong>Administrator preview</strong>
                <span>
                  You can review the form, but a real submission must come from
                  an approved client account.
                </span>
              </div>
            ) : null}

            <form className={baseStyles.form} onSubmit={reviewRequest}>
              <label>
                <span>What do you need help with? *</span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Example: I am not sure which request type fits, but I need help adding a new customer form to my site."
                  rows={6}
                  required
                />
              </label>

              <label>
                <span>Is there a timing need?</span>
                <input
                  value={form.desiredTiming}
                  onChange={(event) =>
                    updateField("desiredTiming", event.target.value)
                  }
                  placeholder="Optional — for example, before Friday"
                />
              </label>

              <label className={fileStyles.filePicker}>
                <span>Supporting photos or files</span>
                <input
                  className={fileStyles.fileInput}
                  type="file"
                  accept={ACCEPTED_FILES}
                  multiple
                  onChange={chooseFiles}
                />
                <small>
                  Optional. Up to {MAX_FILES} files, 15 MB each. JPG, PNG,
                  WebP, GIF, AVIF, HEIC/HEIF, or PDF.
                </small>
              </label>

              {files.length ? (
                <div className={fileStyles.selectedFiles} aria-live="polite">
                  {files.map((file) => (
                    <div
                      className={fileStyles.selectedFile}
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
                  Review request
                </button>
              </div>
            </form>
          </>
        ) : null}

        {step === "review" ? (
          <>
            <p className={baseStyles.intro}>
              Check the details before submitting. You can go back and make
              changes if anything looks off.
            </p>

            <div className={baseStyles.review}>
              <ReviewRow
                label="What do you need help with?"
                value={form.description}
              />
              <ReviewRow label="Timing" value={form.desiredTiming} />
              <ReviewRow
                label="Additional notes"
                value={form.additionalNotes}
              />
            </div>

            {files.length ? (
              <div className={fileStyles.reviewFiles}>
                <span>Supporting files</span>
                {files.map((file) => (
                  <div
                    className={fileStyles.reviewFile}
                    key={file.name + "-" + file.lastModified}
                  >
                    <strong>{file.name}</strong>
                    <span>{formatBytes(file.size)}</span>
                  </div>
                ))}
              </div>
            ) : null}

            {error ? <div className={baseStyles.error}>{error}</div> : null}
            {uploadProgress ? (
              <div className={fileStyles.progress} role="status">
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
                disabled={submitting || !portalClient || Boolean(requestId)}
                title={
                  !portalClient
                    ? "Use an approved client test account to submit"
                    : undefined
                }
              >
                {submitting
                  ? files.length
                    ? "Sending…"
                    : "Submitting…"
                  : requestId
                    ? "Request saved"
                    : portalClient
                      ? "Submit request"
                      : "Client test required"}
              </button>
            </div>

            {!portalClient ? (
              <p className={baseStyles.previewOnly}>
                Administrator preview only — a real request must come from an
                approved client account.
              </p>
            ) : null}
          </>
        ) : null}

        {step === "success" ? (
          <div className={baseStyles.success}>
            <div className={baseStyles.successIcon}>✓</div>
            <p>
              Your request{files.length ? " and files have" : " has"} been saved
              with a status of <strong>Received</strong>.
            </p>
            {requestId ? <small>Request ID: {requestId}</small> : null}
            <Link
              href="/portal/dashboard"
              className={baseStyles.primaryButton}
            >
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
