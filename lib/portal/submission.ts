import type { SupabaseClient } from "@supabase/supabase-js";
import type { RequestDraft } from "./drafts";

export const ACCEPTED_FILES =
  ".jpg,.jpeg,.png,.webp,.gif,.avif,.heic,.heif,.pdf";
export const MAX_FILES = 10;
export const MAX_FILE_SIZE = 15 * 1024 * 1024;

export function validateFiles(files: File[]) {
  if (files.length > MAX_FILES) return "Please choose no more than 10 files.";
  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ACCEPTED_FILES.split(",").includes("." + extension))
      return `${file.name} is not supported. Use JPG, PNG, WebP, GIF, AVIF, HEIC/HEIF, or PDF.`;
    if (file.size === 0)
      return `${file.name} is empty. Please choose another file.`;
    if (file.size > MAX_FILE_SIZE) return `${file.name} is larger than 15 MB.`;
  }
  return "";
}

export function attachmentPath(draft: RequestDraft, file: File, index: number) {
  const safe =
    file.name
      .replace(/[^a-zA-Z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(-120) || "file";
  return `${draft.clientId}/${draft.id}/${String(index + 1).padStart(2, "0")}-${safe}`;
}

export function isConflict(
  error: {
    code?: string;
    statusCode?: string | number;
    status?: string | number;
    message?: string;
  } | null,
) {
  return Boolean(
    error &&
    (error.code === "23505" ||
      String(error.statusCode ?? error.status) === "409" ||
      error.message?.toLowerCase().includes("already exists")),
  );
}

export async function submitDraft(
  client: SupabaseClient,
  draft: RequestDraft,
  progress: (value: string) => void,
) {
  // Revalidate identity on every retry; cached UI identity is never sufficient.
  const auth = await client.auth.getUser();
  if (auth.error || auth.data.user?.id !== draft.userId)
    throw new Error(
      "Please sign in with the account that started this request.",
    );
  const access = await client
    .from("clients")
    .select("id")
    .eq("id", draft.clientId)
    .eq("auth_user_id", draft.userId)
    .eq("status", "active")
    .maybeSingle();
  if (access.error || !access.data)
    throw new Error(
      "Your portal access is no longer active. Please contact Aaland for help.",
    );

  progress("Saving your request…");
  const existing = await client
    .from("service_requests")
    .select("id, expected_attachment_count, upload_complete")
    .eq("id", draft.id)
    .maybeSingle();
  if (existing.error)
    throw new Error("We could not check your saved request. Please retry.");
  if (existing.data?.upload_complete) return;
  if (!existing.data) {
    const f = draft.fields;
    const result = await client.from("service_requests").insert({
      id: draft.id,
      client_id: draft.clientId,
      website_id: draft.websiteId || null,
      request_type: draft.type,
      description: f.description.trim(),
      location_on_site: f.locationOnSite?.trim() || null,
      replacement_text: f.replacementText?.trim() || null,
      desired_timing: f.desiredTiming?.trim() || null,
      additional_notes: f.additionalNotes?.trim() || null,
      expected_attachment_count: draft.files.length,
      status: "received",
    });
    if (result.error && !isConflict(result.error))
      throw new Error(
        "We could not save your request. Retry safely using this same request.",
      );
  }

  for (let index = 0; index < draft.files.length; index++) {
    const file = draft.files[index];
    const path = attachmentPath(draft, file, index);
    progress(`Uploading file ${index + 1} of ${draft.files.length}…`);
    const record = await client
      .from("request_attachments")
      .select("id")
      .eq("request_id", draft.id)
      .eq("storage_path", path)
      .maybeSingle();
    if (record.error)
      throw new Error(
        `We could not check ${file.name}. Retry to continue this request.`,
      );
    if (record.data) continue;
    const upload = await client.storage
      .from("client-request-files")
      .upload(path, file, {
        upsert: false,
        cacheControl: "3600",
        ...(file.type ? { contentType: file.type } : {}),
      });
    if (upload.error && !isConflict(upload.error))
      throw new Error(
        `${file.name} did not finish uploading. Retry to continue this request.`,
      );
    const metadata = await client.from("request_attachments").insert({
      request_id: draft.id,
      client_id: draft.clientId,
      storage_path: path,
      original_filename: file.name,
      mime_type: file.type || null,
      size_bytes: file.size,
      uploaded_by: draft.userId,
    });
    if (metadata.error && !isConflict(metadata.error))
      throw new Error(
        `${file.name} reached storage, but its record did not finish. Retry to reconnect it.`,
      );
  }
  if (draft.files.length) {
    progress("Checking that all files arrived…");
    const final = await client.rpc("complete_request_upload", {
      request_id: draft.id,
    });
    if (final.error)
      throw new Error(
        "Your request is saved, but the files could not be confirmed. Retry to finish.",
      );
  }
}
