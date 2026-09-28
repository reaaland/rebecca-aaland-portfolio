import type { Metadata } from "next";
import Link from "next/link";
import styles from "../request-placeholder.module.css";

export const metadata: Metadata = {
  title: "Upload photos",
  description: "Send new photos or files for your website request.",
};

export default function RequestPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Aaland Client Portal</p>
        <h1>Upload photos</h1>
        <p className={styles.intro}>Send new photos or files for your website request.</p>
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
