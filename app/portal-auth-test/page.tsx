"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthState =
  | { kind: "idle"; message?: string }
  | { kind: "working"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function PortalAuthTestPage() {
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessRole, setAccessRole] = useState<string | null>(null);
  const [state, setState] = useState<AuthState>({ kind: "idle" });

  useEffect(() => {
    if (!supabase) return;

    const client = supabase;
    let active = true;

    async function checkUser() {
      const { data, error } = await client.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        setUserEmail(null);
        setAccessRole(null);
        return;
      }

      setUserEmail(data.user.email ?? "signed-in user");

      const [{ data: adminRows }, { data: clientRows }] = await Promise.all([
        client.from("portal_admins").select("user_id").limit(1),
        client
          .from("clients")
          .select("contact_name, business_name")
          .eq("auth_user_id", data.user.id)
          .limit(1),
      ]);

      if (!active) return;

      if (adminRows?.length) {
        setAccessRole("Portal admin");
      } else if (clientRows?.length) {
        const client = clientRows[0];
        setAccessRole(
          client.business_name
            ? `Client: ${client.business_name}`
            : `Client: ${client.contact_name}`,
        );
      } else {
        setAccessRole("Authenticated, but no portal record is linked");
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void checkUser();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function signInWithGoogle() {
    if (!supabase) return;

    setState({ kind: "working", message: "Opening Google sign-in…" });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/portal-auth-test`,
      },
    });

    if (error) {
      setState({ kind: "error", message: error.message });
    }
  }

  async function sendMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase || !email.trim()) return;

    setState({ kind: "working", message: "Sending secure sign-in link…" });

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/portal-auth-test`,
      },
    });

    if (error) {
      setState({ kind: "error", message: error.message });
      return;
    }

    setState({
      kind: "success",
      message: "Check your inbox for the secure sign-in link.",
    });
  }

  async function signOut() {
    if (!supabase) return;

    await supabase.auth.signOut();
    setUserEmail(null);
    setAccessRole(null);
    setState({ kind: "idle", message: "Signed out." });
  }

  if (!supabase) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <p style={styles.eyebrow}>Aaland Client Portal</p>
          <h1 style={styles.heading}>Auth test is ready.</h1>
          <p style={styles.copy}>
            Add the Supabase URL and publishable key to this Vercel project,
            then redeploy this branch to run the login test.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.eyebrow}>Temporary security test</p>
        <h1 style={styles.heading}>Aaland Client Portal</h1>
        <p style={styles.copy}>
          This page only verifies authentication and invite-only access. The
          polished login design comes after these tests pass.
        </p>

        {userEmail ? (
          <div style={styles.panel}>
            <strong>Signed in</strong>
            <span>{userEmail}</span>
            <span>{accessRole ?? "Checking portal access…"}</span>
            <button style={styles.secondaryButton} onClick={signOut} type="button">
              Sign out
            </button>
          </div>
        ) : (
          <>
            <button
              style={styles.googleButton}
              onClick={signInWithGoogle}
              type="button"
              disabled={state.kind === "working"}
            >
              Continue with Google
            </button>

            <div style={styles.divider}>
              <span />
              <small>or</small>
              <span />
            </div>

            <form onSubmit={sendMagicLink} style={styles.form}>
              <label htmlFor="portal-test-email" style={styles.label}>
                Email
              </label>
              <input
                id="portal-test-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                style={styles.input}
              />
              <button
                style={styles.primaryButton}
                type="submit"
                disabled={state.kind === "working"}
              >
                Email me a sign-in link
              </button>
            </form>
          </>
        )}

        {state.message ? (
          <p
            style={{
              ...styles.status,
              color: state.kind === "error" ? "#a72d2d" : "#40516a",
            }}
            role={state.kind === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        ) : null}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "32px 18px",
    background:
      "radial-gradient(circle at 18% 12%, rgba(54,127,211,.18), transparent 32rem), radial-gradient(circle at 86% 78%, rgba(130,117,207,.15), transparent 30rem), #e9edf3",
    color: "#162033",
  },
  card: {
    width: "min(100%, 470px)",
    padding: "36px",
    border: "1px solid rgba(37,57,88,.16)",
    borderRadius: "22px",
    background: "rgba(255,255,255,.9)",
    boxShadow: "0 28px 80px rgba(47,61,82,.16)",
  },
  eyebrow: {
    margin: "0 0 12px",
    color: "#367fd3",
    fontSize: ".72rem",
    fontWeight: 800,
    letterSpacing: ".1em",
    textTransform: "uppercase" as const,
  },
  heading: {
    margin: 0,
    fontSize: "clamp(2rem, 6vw, 2.8rem)",
    lineHeight: 1.05,
    letterSpacing: "-.045em",
  },
  copy: {
    margin: "16px 0 28px",
    color: "#4f5e73",
    lineHeight: 1.65,
  },
  googleButton: {
    width: "100%",
    minHeight: "50px",
    border: "1px solid rgba(37,57,88,.2)",
    borderRadius: "12px",
    background: "#fff",
    color: "#162033",
    fontWeight: 750,
    cursor: "pointer",
  },
  divider: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "12px",
    margin: "22px 0",
    color: "#718096",
  },
  form: {
    display: "grid",
    gap: "10px",
  },
  label: {
    fontSize: ".82rem",
    fontWeight: 750,
  },
  input: {
    minHeight: "50px",
    padding: "0 14px",
    border: "1px solid rgba(37,57,88,.18)",
    borderRadius: "11px",
    background: "#f8fafc",
    color: "#162033",
    font: "inherit",
  },
  primaryButton: {
    minHeight: "50px",
    marginTop: "4px",
    border: 0,
    borderRadius: "11px",
    background: "linear-gradient(120deg, #245eb5, #367fd3)",
    color: "#fff",
    fontWeight: 750,
    cursor: "pointer",
  },
  secondaryButton: {
    minHeight: "44px",
    marginTop: "14px",
    border: "1px solid rgba(37,57,88,.18)",
    borderRadius: "10px",
    background: "#fff",
    color: "#162033",
    fontWeight: 700,
    cursor: "pointer",
  },
  panel: {
    display: "grid",
    gap: "8px",
    padding: "18px",
    border: "1px solid rgba(54,127,211,.18)",
    borderRadius: "14px",
    background: "rgba(54,127,211,.06)",
  },
  status: {
    margin: "18px 0 0",
    fontSize: ".88rem",
    lineHeight: 1.5,
  },
} satisfies Record<string, React.CSSProperties>;
