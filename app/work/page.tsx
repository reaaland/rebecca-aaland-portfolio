import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Evidence-backed case studies from Rebecca Aaland, frontend developer and web designer.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell">
          <p className="eyebrow">Selected work</p>
          <h1>Evidence first. Story second. No inflated claims.</h1>
          <p>
            These projects show different kinds of work: an independently
            owned product and a frontend implementation completed from supplied
            internship requirements.
          </p>
        </section>

        <section className="work-index shell" aria-label="Case studies">
          <article className="work-index-card work-index-pawcircle">
            <div>
              <span>01 / Independent product</span>
              <h2>PawCircle Membership</h2>
              <p>
                Building, testing, and responsibly repositioning a local
                pet-care platform.
              </p>
              <Link href="/work/pawcircle">Read the case study ↗</Link>
            </div>
          </article>

          <article className="work-index-card work-index-skinstric">
            <div>
              <span>02 / Frontend internship project</span>
              <h2>Skinstric</h2>
              <p>
                Implementing a multi-step AI skin-analysis experience from
                supplied requirements.
              </p>
              <Link href="/work/skinstric">Read the case study ↗</Link>
            </div>
          </article>
        </section>

        <aside className="work-hold-note shell">
          <span>Why only two?</span>
          <p>
            Summarist contains meaningful implementation work, but it is not
            featured until its lint errors and required missing flows are
            resolved. Two honest case studies are stronger than three padded
            ones.
          </p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
