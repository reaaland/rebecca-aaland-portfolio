import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

type SupabaseGlobal = typeof globalThis & {
  __aalandSupabaseClient?: SupabaseClient;
};

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  const browserGlobal = globalThis as SupabaseGlobal;

  if (!browserGlobal.__aalandSupabaseClient) {
    browserGlobal.__aalandSupabaseClient = createSupabaseClient(
      url,
      publishableKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    );
  }

  return browserGlobal.__aalandSupabaseClient;
}
