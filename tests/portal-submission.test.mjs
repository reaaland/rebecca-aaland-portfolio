import test from "node:test";
import assert from "node:assert/strict";
import {
  submitDraft,
  validateFiles,
  attachmentPath,
} from "../lib/portal/submission.ts";

function fixture() {
  const state = {
    requests: new Map(),
    attachments: new Map(),
    objects: new Set(),
    inserts: 0,
    uploads: 0,
    active: true,
    userId: "user-a",
    failure: "",
  };
  function query(table) {
    let action = "select",
      payload,
      filters = {};
    const q = {
      select() {
        return q;
      },
      eq(k, v) {
        filters[k] = v;
        return q;
      },
      maybeSingle() {
        return q;
      },
      insert(p) {
        action = "insert";
        payload = p;
        return q;
      },
      then(resolve, reject) {
        return Promise.resolve()
          .then(() => {
            if (table === "clients")
              return {
                data: state.active ? { id: "client-a" } : null,
                error: null,
              };
            const rows =
              table === "service_requests" ? state.requests : state.attachments;
            if (action === "select")
              return {
                data:
                  [...rows.values()].find((row) =>
                    Object.entries(filters).every(([k, v]) => row[k] === v),
                  ) ?? null,
                error: null,
              };
            if (table === "service_requests") {
              state.inserts++;
              rows.set(payload.id, {
                ...payload,
                upload_complete: payload.expected_attachment_count === 0,
              });
              if (state.failure === "insert-response") {
                state.failure = "";
                return { error: { message: "network response lost" } };
              }
            } else {
              rows.set(payload.storage_path, {
                ...payload,
                id: "attachment-" + rows.size,
              });
              if (state.failure === "metadata-response") {
                state.failure = "";
                return { error: { message: "network response lost" } };
              }
            }
            return { data: null, error: null };
          })
          .then(resolve, reject);
      },
    };
    return q;
  }
  const client = {
    auth: {
      getUser: async () => ({
        data: { user: { id: state.userId } },
        error: null,
      }),
    },
    from: query,
    storage: {
      from: () => ({
        upload: async (path) => {
          state.uploads++;
          if (state.failure === "upload-before") {
            state.failure = "";
            return { error: { message: "offline" } };
          }
          if (state.objects.has(path))
            return { error: { statusCode: "409", message: "already exists" } };
          state.objects.add(path);
          if (state.failure === "upload-response") {
            state.failure = "";
            return { error: { message: "response lost" } };
          }
          return { error: null };
        },
      }),
    },
    rpc: async (_, args) => {
      if (state.failure === "finalize") {
        state.failure = "";
        return { error: { message: "offline" } };
      }
      const r = state.requests.get(args.request_id);
      const count = [...state.attachments.values()].filter(
        (a) => a.request_id === r.id && state.objects.has(a.storage_path),
      ).length;
      if (count !== r.expected_attachment_count)
        return { error: { message: "missing files" } };
      r.upload_complete = true;
      return { error: null };
    },
  };
  const draft = {
    id: "request-a",
    userId: "user-a",
    clientId: "client-a",
    type: "website_update",
    fields: { description: "Replace gallery" },
    websiteId: "site-a",
    savedAt: Date.now(),
    files: [new File(["image"], "project.png", { type: "image/png" })],
  };
  return { state, client, draft };
}
for (const failure of [
  "insert-response",
  "upload-before",
  "upload-response",
  "metadata-response",
  "finalize",
]) {
  test(`retry after ${failure} keeps one request and one attachment`, async () => {
    const { state, client, draft } = fixture();
    state.failure = failure;
    await assert.rejects(submitDraft(client, draft, () => {}));
    await submitDraft(client, structuredClone(draft), () => {});
    assert.equal(state.inserts, 1);
    assert.equal(state.requests.size, 1);
    assert.equal(state.attachments.size, 1);
    assert.equal(state.objects.size, 1);
    assert.equal(state.requests.get(draft.id).upload_complete, true);
  });
}
test("completed request retry performs no additional upload", async () => {
  const { state, client, draft } = fixture();
  await submitDraft(client, draft, () => {});
  const n = state.uploads;
  await submitDraft(client, draft, () => {});
  assert.equal(state.uploads, n);
});
test("inactive session retry is rejected before a write", async () => {
  const { state, client, draft } = fixture();
  state.active = false;
  await assert.rejects(
    submitDraft(client, draft, () => {}),
    /no longer active/,
  );
  assert.equal(state.inserts, 0);
});
test("different signed-in identity cannot continue a draft", async () => {
  const { state, client, draft } = fixture();
  state.userId = "user-b";
  await assert.rejects(
    submitDraft(client, draft, () => {}),
    /account that started/,
  );
  assert.equal(state.inserts, 0);
});
test("files reject oversize, empty, and unsupported uploads", () => {
  assert.match(validateFiles([new File([], "empty.png")]), /empty/);
  assert.match(validateFiles([new File(["x"], "bad.exe")]), /not supported/);
  assert.match(
    validateFiles([
      new File([new Uint8Array(15 * 1024 * 1024 + 1)], "large.png"),
    ]),
    /larger/,
  );
  assert.equal(validateFiles([new File(["x"], "phone.HEIC")]), "");
});
test("deterministic paths distinguish duplicate filenames", () => {
  const { draft } = fixture();
  assert.notEqual(
    attachmentPath(draft, draft.files[0], 0),
    attachmentPath(draft, draft.files[0], 1),
  );
});
