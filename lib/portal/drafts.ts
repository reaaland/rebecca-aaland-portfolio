export type RequestDraft = {
  id: string;
  userId: string;
  clientId: string;
  type: string;
  fields: Record<string, string>;
  websiteId: string;
  files: File[];
  savedAt: number;
};

const DATABASE = "aaland-request-drafts-v1";
const STORE = "drafts";
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;

async function database() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function operation<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
) {
  const db = await database();
  try {
    return await new Promise<T>((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const request = action(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () =>
        reject(tx.error ?? new Error("Draft storage was interrupted."));
    });
  } finally {
    db.close();
  }
}

export async function saveDraft(draft: RequestDraft) {
  await operation("readwrite", (store) =>
    store.put(draft, draft.userId + ":" + draft.type),
  );
}

export async function removeDraft(userId: string, type: string) {
  await operation("readwrite", (store) => store.delete(userId + ":" + type));
}

export async function loadDraft(
  userId: string,
  type: string,
): Promise<RequestDraft | null> {
  const key = userId + ":" + type;
  const draft = await operation<RequestDraft | undefined>("readonly", (store) =>
    store.get(key),
  );
  if (!draft) return null;
  if (
    draft.userId !== userId ||
    draft.type !== type ||
    Date.now() - draft.savedAt > MAX_AGE
  ) {
    await removeDraft(userId, type);
    return null;
  }
  return draft;
}

export async function clearUserDrafts(userId: string) {
  const db = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      const request = tx.objectStore(STORE).openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;
        if (String(cursor.key).startsWith(userId + ":")) cursor.delete();
        cursor.continue();
      };
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
