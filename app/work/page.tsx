import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected web and frontend projects from Rebecca Aaland, including PawCircle Membership and Skinstric.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell">
          <p className="eyebrow">Selected work</p>
          <h1>Different projects. Different problems to solve.</h1>
          <p>
            PawCircle shows what I learned taking my own product from idea to
            launch. Skinstric shows how I work from supplied designs,
            requirements, and APIs to build a working frontend experience.
          </p>
        </section>

        <section className="work-index shell" aria-label="Case studies">
          <article className="work-index-card work-index-pawcircle">
            <div>
              <span>01 / Independent product</span>
              <h2>PawCircle Membership</h2>
              <p>
                Taking a local pet-care membership product from idea through
                development, launch, production troubleshooting, and its current
                portfolio-demo form.
              </p>
              <Link href="/work/pawcircle">Read the case study ↗</Link>
            </div>
          </article>

          <article className="work-index-card work-index-skinstric">
            <div>
              <span>02 / Frontend Simplified internship project</span>
              <h2>Skinstric</h2>
              <p>
                Turning supplied designs, APIs, and phased requirements into a
                responsive multi-step skin-analysis experience.
              </p>
              <Link href="/work/skinstric">Read the case study ↗</Link>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
