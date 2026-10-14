"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  loadDraft,
  removeDraft,
  saveDraft,
  type RequestDraft,
} from "@/lib/portal/drafts";
import {
  ACCEPTED_FILES,
  submitDraft,
  validateFiles,
} from "@/lib/portal/submission";
import styles from "./website-update/website-update-request.module.css";
import fileStyles from "./upload-photos/upload-photos-request.module.css";

type RequestType =
  | "website_update"
  | "upload_photos"
  | "change_business_information"
  | "add_something_new"
  | "something_else";
type Website = { id: string; name: string; is_primary: boolean };
type Field = {
  key: string;
  label: string;
  placeholder: string;
  required?: boolean;
  singleLine?: boolean;
};
const location: Field = {
  key: "locationOnSite",
  label: "Where on the website?",
  placeholder: "Optional — for example, Home page or Contact page",
};
const timing: Field = {
  key: "desiredTiming",
  label: "Is there a timing need?",
  placeholder: "Optional — for example, before Friday",
  singleLine: true,
};
const notes: Field = {
  key: "additionalNotes",
  label: "Anything else I should know?",
  placeholder: "Optional notes",
};
const configs: Record<
  RequestType,
  {
    title: string;
    description: string;
    fields: Field[];
    requiresFiles?: boolean;
  }
> = {
  website_update: {
    title: "Update something on my website",
    description:
      "Tell me what should change. You can include wording, photos, and files in this request.",
    fields: [
      {
        key: "description",
        label: "What would you like changed?",
        placeholder: "Example: Replace the introduction and gallery photos.",
        required: true,
      },
      location,
      {
        key: "replacementText",
        label: "Replacement text or instructions",
        placeholder: "Paste exact wording here if you have it.",
      },
      timing,
      notes,
    ],
  },
  upload_photos: {
    title: "Upload photos or files",
    description:
      "Add the photos or documents you want me to use and tell me what they are for.",
    requiresFiles: true,
    fields: [
      {
        key: "description",
        label: "What are these photos or files for?",
        placeholder:
          "Example: Replace the gallery photos with these new project photos.",
        required: true,
      },
      location,
      notes,
    ],
  },
  change_business_information: {
    title: "Change business information",
    description:
      "Update hours, contact details, services, pricing, or other business information on your website.",
    fields: [
      {
        key: "description",
        label: "What business information needs to change?",
        placeholder: "Example: Our Saturday hours and phone number changed.",
        required: true,
      },
      location,
      {
        key: "replacementText",
        label: "What should the new information say?",
        placeholder:
          "Enter the exact new hours, phone number, pricing, or wording.",
        required: true,
      },
      timing,
      notes,
    ],
  },
  add_something_new: {
    title: "Add something new",
    description:
      "Request a new page, section, testimonial, feature, or other addition to your website.",
    fields: [
      {
        key: "description",
        label: "What would you like to add?",
        placeholder: "Example: Add an FAQ section with these five questions.",
        required: true,
      },
      location,
      {
        key: "replacementText",
        label: "What should it include?",
        placeholder: "Add wording, ideas, links, or other details.",
      },
      timing,
      notes,
    ],
  },
  something_else: {
    title: "Something else",
    description:
      "Not sure which request type fits? Tell me what you need in your own words.",
    fields: [
      {
        key: "description",
        label: "What do you need help with?",
        placeholder: "Tell me what you need.",
        required: true,
      },
      timing,
      notes,
    ],
  },
};

export function RequestForm({ type }: { type: RequestType }) {
  const config = configs[type];
  const client = useMemo(() => createClient(), []);
  const [identity, setIdentity] = useState<{
    userId: string;
    clientId: string;
  } | null>(null);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [websiteId, setWebsiteId] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [draft, setDraft] = useState<RequestDraft | null>(null);
  const [step, setStep] = useState<"details" | "review" | "success">("details");
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [notice, setNotice] = useState("");
  const [recoveryBlocked, setRecoveryBlocked] = useState(false);

  useEffect(() => {
    let active = true;
    async function initialize() {
      try {
        if (!client)
          throw new Error(
            "Portal access is unavailable. Please contact Aaland for help.",
          );
        const auth = await client.auth.getUser();
        if (auth.error || !auth.data.user) {
          window.location.replace("/portal/login");
          return;
        }
        const userId = auth.data.user.id;
        const [access, administrator] = await Promise.all([
          client
            .from("clients")
            .select("id")
            .eq("auth_user_id", userId)
            .eq("status", "active")
            .maybeSingle(),
          client
            .from("portal_admins")
            .select("user_id")
            .eq("user_id", userId)
            .limit(1),
        ]);
        if (!active) return;
        if (access.error || administrator.error)
          throw new Error(
            "We could not verify your portal access. Please try again.",
          );
        setAdmin(Boolean(administrator.data?.length));
        if (!access.data) {
          if (!administrator.data?.length)
            throw new Error(
              "Your portal access is no longer active. Please contact Aaland for help.",
            );
          return;
        }
        const clientId = access.data.id as string;
        const sites = await client
          .from("client_websites")
          .select("id, name, is_primary")
          .eq("client_id", clientId)
          .order("is_primary", { ascending: false })
          .order("created_at");
        if (sites.error)
          throw new Error("We could not load your websites. Please try again.");
        if (!active) return;
        setIdentity({ userId, clientId });
        setWebsites(sites.data ?? []);
        setWebsiteId(sites.data?.[0]?.id ?? "");
        try {
          const saved = await loadDraft(userId, type);
          if (!active || !saved || saved.clientId !== clientId) return;
          const request = await client
            .from("service_requests")
            .select("id, upload_complete")
            .eq("id", saved.id)
            .maybeSingle();
          if (request.error)
            throw new Error(
              "Your saved request could not be checked. Please try again.",
            );
          if (!active) return;
          if (request.data?.upload_complete) {
            await removeDraft(userId, type);
            return;
          }
          setDraft(saved);
          setFields(saved.fields);
          setFiles(saved.files);
          setWebsiteId(saved.websiteId);
          setStep("review");
          setNotice(
            "Your unfinished request has been restored. Check the details and continue sending it.",
          );
        } catch {
          setRecoveryBlocked(true);
          setNotice(
            "We could not check saved requests on this device. Reload this page before sending so an unfinished request is not duplicated.",
          );
        }
      } catch (e) {
        if (active)
          setError(
            e instanceof Error ? e.message : "We could not open this form.",
          );
      } finally {
        if (active) setLoading(false);
      }
    }
    void initialize();
    return () => {
      active = false;
    };
  }, [client, type]);

  useEffect(() => {
    if (!draft || step === "success") return;
    function warn(event: BeforeUnloadEvent) {
      event.preventDefault();
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [draft, step]);

  function review(event: FormEvent) {
    event.preventDefault();
    setError("");
    for (const field of config.fields)
      if (field.required && !fields[field.key]?.trim()) {
        setError(`Please fill in: ${field.label}`);
        return;
      }
    if (config.requiresFiles && !files.length) {
      setError("Please choose at least one photo or file.");
      return;
    }
    const invalid = validateFiles(files);
    if (invalid) {
      setError(invalid);
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0 });
  }

  async function send() {
    if (!client || !identity || recoveryBlocked || submitting.current) return;
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const current = draft ?? {
        id: crypto.randomUUID(),
        userId: identity.userId,
        clientId: identity.clientId,
        type,
        fields,
        files,
        websiteId,
        savedAt: Date.now(),
      };
      // Commit recovery data before the first network write. A lost insert response
      // is retried with the same UUID instead of creating another request.
      try {
        await saveDraft(current);
      } catch {
        throw new Error(
          "This browser could not save your request for safe retry. Free some device storage or try another browser before sending.",
        );
      }
      setDraft(current);
      await submitDraft(client, current, setProgress);
      setStep("success");
      setNotice("");
      try {
        await removeDraft(identity.userId, type);
      } catch {
        /* Restored completed drafts are checked against the server and discarded. */
      }
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Sending was interrupted. Please retry.",
      );
    } finally {
      submitting.current = false;
      setBusy(false);
      setProgress("");
    }
  }

  if (loading)
    return (
      <main className={styles.page}>
        <section className={styles.card} aria-label="Loading request form">
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonBlock} />
        </section>
      </main>
    );
  if (!identity && !admin)
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1>Portal access unavailable</h1>
          <p role="alert">{error}</p>
          <Link href="/portal/login">Return to sign in</Link>
        </section>
      </main>
    );

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.topline}>
          <div>
            <p className={styles.eyebrow}>Website support</p>
            <h1>{step === "success" ? "Request received." : config.title}</h1>
          </div>
          {step !== "success" && (
            <span className={styles.stepBadge}>
              {step === "details" ? "Step 1 of 2" : "Step 2 of 2"}
            </span>
          )}
        </div>
        {notice && (
          <p className={styles.adminNote} role="status">
            {notice}
          </p>
        )}
        {recoveryBlocked && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => window.location.reload()}
          >
            Reload request
          </button>
        )}
        {step === "details" && (
          <>
            <p className={styles.intro}>{config.description}</p>
            {admin && !identity && (
              <p className={styles.adminNote}>
                Administrator preview. Use an approved client account to submit
                a request.
              </p>
            )}
            <form className={styles.form} onSubmit={review}>
              {websites.length > 1 && (
                <label>
                  <span>Which website?</span>
                  <select
                    value={websiteId}
                    onChange={(e) => setWebsiteId(e.target.value)}
                    required
                  >
                    {websites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {config.fields.map((field) => (
                <label key={field.key}>
                  <span>
                    {field.label}
                    {field.required ? " *" : ""}
                  </span>
                  {field.singleLine ? (
                    <input
                      value={fields[field.key] ?? ""}
                      onChange={(e) =>
                        setFields((f) => ({
                          ...f,
                          [field.key]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      maxLength={500}
                    />
                  ) : (
                    <textarea
                      value={fields[field.key] ?? ""}
                      onChange={(e) =>
                        setFields((f) => ({
                          ...f,
                          [field.key]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={field.key === "description" ? 4 : 3}
                      maxLength={10000}
                    />
                  )}
                </label>
              ))}
              <label className={fileStyles.filePicker}>
                <span>
                  {config.requiresFiles
                    ? "Choose photos or files *"
                    : "Supporting photos or files"}
                </span>
                <input
                  className={fileStyles.fileInput}
                  type="file"
                  accept={ACCEPTED_FILES}
                  multiple
                  onChange={(e) => {
                    const selected = Array.from(e.target.files ?? []);
                    const invalid = validateFiles(selected);
                    setError(invalid);
                    if (!invalid) setFiles(selected);
                    e.target.value = "";
                  }}
                />
                <small>
                  Up to 10 files, 15 MB each. JPG, PNG, WebP, GIF, AVIF,
                  HEIC/HEIF, or PDF.
                </small>
              </label>
              <div className={fileStyles.selectedFiles}>
                {files.map((file, index) => (
                  <FilePreview
                    key={file.name + index}
                    file={file}
                    remove={() =>
                      setFiles((fs) => fs.filter((_, i) => i !== index))
                    }
                  />
                ))}
              </div>
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}
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
        )}
        {step === "review" && (
          <>
            <p className={styles.intro}>
              Check your details before sending. Requested dates need
              confirmation, and work outside your agreed service is quoted
              separately.
            </p>
            <div className={styles.review}>
              {websiteId && (
                <div className={styles.reviewRow}>
                  <span>Website</span>
                  <strong>
                    {websites.find((s) => s.id === websiteId)?.name ??
                      "Your website"}
                  </strong>
                </div>
              )}
              {config.fields.map((field) => (
                <div key={field.key} className={styles.reviewRow}>
                  <span>{field.label}</span>
                  <strong>{fields[field.key]?.trim() || "Not provided"}</strong>
                </div>
              ))}
            </div>
            {files.length > 0 && (
              <div className={fileStyles.reviewFiles}>
                <strong>Files</strong>
                {files.map((file, i) => (
                  <div className={fileStyles.reviewFile} key={file.name + i}>
                    <strong>{file.name}</strong>
                    <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                  </div>
                ))}
              </div>
            )}
            {draft && (
              <p className={styles.previewOnly}>
                This request is saved on this device for up to seven days until
                it finishes or you sign out. Retrying uses the same request.
              </p>
            )}
            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}
            {progress && (
              <p className={fileStyles.progress} role="status">
                {progress}
              </p>
            )}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={busy || Boolean(draft)}
                onClick={() => setStep("details")}
              >
                Edit request
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                disabled={busy || !identity || recoveryBlocked}
                onClick={() => void send()}
              >
                {busy
                  ? "Sending…"
                  : draft
                    ? "Continue sending"
                    : identity
                      ? "Send request"
                      : "Client account required"}
              </button>
            </div>
            {draft && (
              <Link href="/portal/dashboard" className={styles.backLink}>
                Return to dashboard; continue here later
              </Link>
            )}
          </>
        )}
        {step === "success" && (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <p>
              Your request{files.length ? " and files have" : " has"} been
              received. I will review the details and confirm any timing or
              additional cost.
            </p>
            <Link
              href={"/portal/requests/" + draft?.id}
              className={styles.primaryButton}
            >
              View request
            </Link>
            <Link href="/portal/dashboard" className={styles.secondaryButton}>
              Back to dashboard
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

function FilePreview({ file, remove }: { file: File; remove: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!file.type.startsWith("image/") || /\.hei[cf]$/i.test(file.name))
      return;
    const preview = URL.createObjectURL(file);
    // This state synchronizes an externally allocated blob URL with its DOM image.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(preview);
    return () => URL.revokeObjectURL(preview);
  }, [file]);
  return (
    <div className={fileStyles.selectedFile}>
      <div className={fileStyles.fileIdentity}>
        {url /* Local file previews must use their original blob URL. */ ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={file.name} className={fileStyles.filePreview} />
        ) : (
          <span className={fileStyles.fileTypeBadge}>FILE</span>
        )}
        <div>
          <strong>{file.name}</strong>
          <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
        </div>
      </div>
      <button
        type="button"
        className={fileStyles.removeFile}
        onClick={remove}
        aria-label={"Remove " + file.name}
      >
        Remove
      </button>
    </div>
  );
}
