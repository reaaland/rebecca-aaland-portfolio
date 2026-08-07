import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found shell">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This path does not lead anywhere useful yet.</h1>
        <p>Return to the portfolio or continue with the selected work.</p>
        <div>
          <Link className="button button-dark" href="/">
            Go home
          </Link>
          <Link className="text-link" href="/work">
            View selected work
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
