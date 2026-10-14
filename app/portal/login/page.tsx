import type { Metadata } from "next";
import { PortalLoginCard } from "./portal-login-card";
import styles from "./portal-login.module.css";

export const metadata: Metadata = {
  title: "Client Portal Sign In",
  description:
    "Secure sign in for the Aaland Web Design & Business Solutions client portal.",
};

export default function PortalLoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.ambientOne} aria-hidden="true" />
      <div className={styles.ambientTwo} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <PortalLoginCard />
    </main>
  );
}
