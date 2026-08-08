import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected web and frontend projects from Rebecca Aaland, including PawCircle Membership, Skinstric, and Frontend Simplified marketplace work.",
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
            PawCircle shows what I learned taking my own product from idea to
            launch. Skinstric shows how I work from supplied designs,
            requirements, and APIs. Additional Frontend Simplified work shows
            more of the responsive React and data-driven UI work I have built.
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

        <section className="work-hold-note shell" data-reveal aria-labelledby="additional-work-title">
          <span>03 / Additional frontend work</span>
          <div>
            <h2
              id="additional-work-title"
              className="m-0 mb-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--text)]"
            >
              Ultraverse NFT Marketplace
            </h2>
            <p>
              A Frontend Simplified React project built from a supplied starter,
              design, APIs, and requirements. I implemented API-driven content,
              loading skeletons, responsive carousels, countdown timers,
              sorting/filtering, incremental loading, and routed author and
              item-detail views.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold">
              <a
                className="underline underline-offset-4"
                href="https://rebecca-internship.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Open deployed project ↗
              </a>
              <a
                className="underline underline-offset-4"
                href="https://github.com/reaaland/rebecca-internship"
                target="_blank"
                rel="noreferrer"
              >
                View source on GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
