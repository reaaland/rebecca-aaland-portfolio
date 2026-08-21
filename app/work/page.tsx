import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected web and frontend projects from Rebecca Aaland, including PawCircle Membership, Skinstric, Ultraverse NFT Marketplace, and Summarist.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Selected work</p>
          <h1>Different projects. Different problems to solve.</h1>
          <p>
            These projects show different kinds of frontend work: taking a
            product from idea to launch, implementing supplied requirements, and
            building responsive API-driven interfaces.
          </p>
        </section>

        <section className="work-index shell" aria-label="Case studies">
          <article className="work-index-card work-index-pawcircle" data-reveal>
            <div>
              <span>01 / Independent product</span>
              <h2>PawCircle Membership</h2>
              <p>
                Taking a pet-care membership product from idea through
                development, launch, production troubleshooting, and its current
                portfolio-demo form.
              </p>
              <Link href="/work/pawcircle">Read the case study ↗</Link>
            </div>
          </article>

          <article className="work-index-card work-index-skinstric" data-reveal>
            <div>
              <span>02 / Paid frontend internship</span>
              <h2>Skinstric</h2>
              <p>
                Implementing a responsive Next.js and TypeScript skin-analysis
                flow from supplied Figma designs, APIs, assets, and project
                requirements, including image upload, camera capture, and
                interactive demographic results.
              </p>
              <Link href="/work/skinstric">Read the case study ↗</Link>
            </div>
          </article>

          <article className="work-index-card work-index-skinstric" data-reveal>
            <div>
              <span>03 / Frontend development project</span>
              <h2>Ultraverse NFT Marketplace</h2>
              <p>
                Building a responsive React marketplace with API-driven content,
                loading states, carousels, timers, filtering, incremental loading,
                and routed detail views.
              </p>
              <Link href="/work/ultraverse">Read the case study ↗</Link>
            </div>
          </article>

          <article className="work-index-card work-index-skinstric" data-reveal>
            <div>
              <span>04 / Completed Frontend Simplified virtual internship</span>
              <h2>Summarist</h2>
              <p>
                A completed multi-route Next.js book-summary application built as a
                Frontend Simplified virtual internship project from supplied
                requirements, APIs, assets, and a visual starting point. It includes
                authentication, search, Firestore persistence, subscription-aware
                access, library behavior, settings, and an audio player.
              </p>
              <Link href="/work/summarist">Read the case study ↗</Link>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
