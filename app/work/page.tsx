import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected web and frontend projects from Rebecca Aaland, including PawCircle Membership, Ultraverse NFT Marketplace, Skinstric, and Summarist.",
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
                Taking a local pet-care membership product from idea through
                development, launch, production troubleshooting, and its current
                portfolio-demo form.
              </p>
              <Link href="/work/pawcircle">Read the case study ↗</Link>
            </div>
          </article>

          <article className="work-index-card work-index-skinstric" data-reveal>
            <div>
              <span>02 / Frontend development project</span>
              <h2>Ultraverse NFT Marketplace</h2>
              <p>
                Building a responsive React marketplace with API-driven content,
                loading states, carousels, timers, filtering, incremental loading,
                and routed detail views.
              </p>
              <Link href="/work/ultraverse">Read the case study ↗</Link>
            </div>
          </article>
        </section>

        <section className="work-hold-note shell" data-reveal aria-labelledby="skinstric-title">
          <span>03 / Supporting frontend work</span>
          <div>
            <h2
              id="skinstric-title"
              className="m-0 mb-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--text)]"
            >
              Skinstric
            </h2>
            <p>
              A responsive Next.js skin-analysis flow implemented from supplied
              designs, assets, APIs, and phased requirements. The project includes
              validation, image upload, camera capture, asynchronous states, and
              interactive demographic results.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
              <Link className="underline underline-offset-4" href="/work/skinstric">
                Read the case study ↗
              </Link>
              <a
                className="underline underline-offset-4"
                href="https://skinstric-internship-chi.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Open deployed project ↗
              </a>
            </div>
          </div>
        </section>

        <section className="work-hold-note shell" data-reveal aria-labelledby="summarist-title">
          <span>04 / Frontend Simplified virtual internship</span>
          <div>
            <h2
              id="summarist-title"
              className="m-0 mb-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--text)]"
            >
              Summarist
            </h2>
            <p>
              A multi-route Next.js book-summary application built from supplied
              internship requirements, APIs, assets, and a visual starting point.
              The project includes authentication, search, Firestore persistence,
              subscription-aware access, library behavior, settings, and an audio player.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
              <Link className="underline underline-offset-4" href="/work/summarist">
                Read the case study ↗
              </Link>
              <a
                className="underline underline-offset-4"
                href="https://summarist-internship.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Open deployed project ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
