"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./portal-login.module.css";

type AuthState =
  | { kind: "idle"; message?: string }
  | { kind: "working"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

type PortalIdentity = {
  email: string;
  label: string;
};

function GoogleMark() {
  return (
    <svg
      className={styles.googleMark}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.22-.2-1.75H12v3.4h5.52a4.74 4.74 0 0 1-2.05 3.02l-.02.11 2.97 2.3.2.02c1.85-1.7 2.98-4.22 2.98-7.1Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.68 0 4.93-.88 6.58-2.4l-3.15-2.44c-.84.57-1.96.97-3.43.97a5.96 5.96 0 0 1-5.64-4.12l-.1.01-3.09 2.39-.04.1A9.94 9.94 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.36 14.01A6.1 6.1 0 0 1 6.03 12c0-.7.12-1.39.32-2.01v-.12L3.23 7.44l-.1.05A9.98 9.98 0 0 0 2 12c0 1.62.39 3.15 1.08 4.51l3.28-2.5Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.87c1.86 0 3.12.8 3.84 1.46l2.81-2.74C16.92 2.97 14.68 2 12 2a9.94 9.94 0 0 0-8.87 5.49l3.22 2.5A5.98 5.98 0 0 1 12 5.87Z"
      />
    </svg>
  );
}

export function PortalLoginCard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [email, setEmail] = useState("");
  const [identity, setIdentity] = useState<PortalIdentity | null>(null);
  const [state, setState] = useState<AuthState>({
    kind: "idle",
  });

  useEffect(() => {
    if (!supabase) return;

    const client = supabase;
    let active = true;

    async function loadIdentity() {
      const { data, error } = await client.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        setIdentity(null);
        return;
      }

      const [{ data: adminRows }, { data: clientRows }] = await Promise.all([
        client.from("portal_admins").select("user_id").limit(1),
        client
          .from("clients")
          .select("contact_name, business_name")
          .eq("auth_user_id", data.user.id)
          .limit(1),
      ]);

      if (!active) return;

      const isAdmin = Boolean(adminRows?.length);
      const portalClient = clientRows?.[0];

      if (isAdmin || portalClient) {
        router.replace("/portal/dashboard");
        return;
      }

      setIdentity({
        email: data.user.email ?? "Signed-in account",
        label: "Portal access pending",
      });
    }

    const params = new URLSearchParams(window.location.search);
    const authError = params.get("error_description");

    if (authError) {
      setState({
        kind: "error",
        message: authError.replaceAll("+", " "),
      });
      window.history.replaceState({}, "", window.location.pathname);
    }

    void loadIdentity();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadIdentity();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  async function signInWithGoogle() {
    if (!supabase) return;

    setState({
      kind: "working",
      message: "Opening Google sign-in…",
    });

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/portal/login`,
      },
    });

    if (error) {
      setState({
        kind: "error",
        message: error.message,
      });
    }
  }

  async function sendMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase || !email.trim()) return;

    setState({
      kind: "working",
      message: "Sending your secure sign-in link…",
    });

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/portal/login`,
      },
    });

    if (error) {
      setState({
        kind: "error",
        message: error.message,
      });
      return;
    }

    setState({
      kind: "success",
      message:
        "Check your inbox. We sent you a secure sign-in link to this email address.",
    });
  }

  async function signOut() {
    if (!supabase) return;

    await supabase.auth.signOut();
    setIdentity(null);
    setEmail("");
    setState({
      kind: "idle",
      message: "You’re signed out.",
    });
  }

  if (!supabase) {
    return (
      <section className={styles.card} aria-labelledby="portal-login-title">
        <Brand />
        <h1 id="portal-login-title">Client portal</h1>
        <p className={styles.intro}>
          Portal authentication is not configured in this environment yet.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.card} aria-labelledby="portal-login-title">
      <Brand />

      {identity ? (
        <div className={styles.signedIn}>
          <div className={styles.successIcon} aria-hidden="true">
            ✓
          </div>
          <p className={styles.eyebrow}>Secure access confirmed</p>
          <h1 id="portal-login-title">You’re signed in.</h1>
          <p className={styles.intro}>
            Your Aaland client portal session is active on this device.
          </p>

          <div className={styles.identityPanel}>
            <span>{identity.label}</span>
            <strong>{identity.email}</strong>
          </div>

          <p className={styles.nextNote}>
            Your portal dashboard is ready for website requests, service
            information, and secure file sharing.
          </p>

          <button
            className={styles.secondaryButton}
            onClick={signOut}
            type="button"
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          <p className={styles.eyebrow}>Aaland Client Portal</p>
          <h1 id="portal-login-title">Sign in to your client portal</h1>
          <p className={styles.intro}>
            Securely send website updates, share files, and keep your service
            information in one place.
          </p>

          <button
            className={styles.googleButton}
            onClick={signInWithGoogle}
            type="button"
            disabled={state.kind === "working"}
          >
            <GoogleMark />
            <span>Continue with Google</span>
          </button>

          <p className={styles.ownerNote}>
            Owner / admin access: use Google sign-in. Returning sessions stay
            signed in on this browser unless you sign out.
          </p>

          <div className={styles.divider} aria-hidden="true">
            <span />
            <small>or</small>
            <span />
          </div>

          <form onSubmit={sendMagicLink} className={styles.form}>
            <label htmlFor="portal-email">Email</label>
            <input
              id="portal-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@yourbusiness.com"
              required
            />
            <button
              className={styles.primaryButton}
              type="submit"
              disabled={state.kind === "working"}
            >
              {state.kind === "working"
                ? "Please wait…"
                : "Email me a sign-in link"}
            </button>
            <small className={styles.clientNote}>
              Email links remain available for approved clients who prefer not
              to use Google.
            </small>
          </form>

          {state.message ? (
            <div
              className={
                state.kind === "error"
                  ? `${styles.notice} ${styles.errorNotice}`
                  : state.kind === "success"
                    ? `${styles.notice} ${styles.successNotice}`
                    : styles.notice
              }
              role={state.kind === "error" ? "alert" : "status"}
            >
              {state.message}
            </div>
          ) : null}

          <p className={styles.inviteNote}>
            Portal access is available to approved Aaland clients. If you need
            access,{" "}
            <Link href="/contact">
              contact Aaland Web Design &amp; Business Solutions
            </Link>.
          </p>
        </>
      )}
    </section>
  );
}

function Brand() {
  return (
    <div className={styles.brand}>
      <Image
        src="/rebecca-aaland-logo.png"
        alt=""
        width={58}
        height={58}
        className={styles.logo}
        priority
      />
      <div>
        <strong>Aaland Web Design</strong>
        <span>&amp; Business Solutions</span>
      </div>
    </div>
  );
}
