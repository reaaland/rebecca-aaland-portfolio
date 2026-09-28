import type { Metadata } from "next";
import Link from "next/link";
import styles from "../request-placeholder.module.css";

export const metadata: Metadata = {
  title: "Change business information",
  description: "Update hours, contact details, services, pricing, or other business information.",
};

export default function RequestPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Aaland Client Portal</p>
        <h1>Change business information</h1>
        <p className={styles.intro}>Update hours, contact details, services, pricing, or other business information.</p>
        <div className={styles.notice}>
          This request type is connected and ready for its form to be built.
        </div>
        <Link href="/portal/dashboard" className={styles.backLink}>
          ← Back to dashboard
        </Link>
      </section>
    </main>
  );
}
