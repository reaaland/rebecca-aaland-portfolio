import type { Metadata } from "next";
import Link from "next/link";
import styles from "./website-update-request.module.css";

export const metadata: Metadata = {
  title: "Website Update Request",
  description: "Submit a website update request through the Aaland client portal.",
};

export default function WebsiteUpdateRequestPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Website update request</p>
        <h1>Update something on my website</h1>
        <p className={styles.intro}>
          This is the first request flow we&apos;re building. The form itself is
          the next step, but the dashboard link is now live and routes here.
        </p>

        <div className={styles.notice}>
          Next: add the simple website-update form, optional file upload, review,
          and submit flow.
        </div>

        <Link href="/portal/dashboard" className={styles.backLink}>
          ← Back to dashboard
        </Link>
      </section>
    </main>
  );
}
