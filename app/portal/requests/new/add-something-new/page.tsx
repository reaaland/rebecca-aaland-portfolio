import type { Metadata } from "next";
import Link from "next/link";
import styles from "../request-placeholder.module.css";

export const metadata: Metadata = {
  title: "Add something new",
  description: "Request a new page, section, feature, or other addition to your website.",
};

export default function RequestPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Aaland Client Portal</p>
        <h1>Add something new</h1>
        <p className={styles.intro}>Request a new page, section, feature, or other addition to your website.</p>
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
