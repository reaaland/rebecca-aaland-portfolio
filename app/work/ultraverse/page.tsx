import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Ultraverse React Marketplace Case Study",
  description:
    "How Rebecca Aaland implemented a responsive React marketplace with API-driven content, routing, loading states, carousels, timers, and filtering.",
  path: "/work/ultraverse",
});

const implementation = [
  "Responsive React pages and reusable marketplace components",
  "API-driven Hot Collections, New Items, Top Sellers, Explore, author, and item-detail experiences",
  "Loading and skeleton states while remote data is being requested",
  "Responsive react-slick carousels with custom navigation and desktop, tablet, and mobile breakpoints",
  "Live countdown timers for expiring NFT listings",
  "Explore-page sorting through API filters and incremental Load more behavior",
  "React Router navigation between marketplace, author, and item-detail views",
  "Responsive card, image, spacing, and button refinements across screen sizes",
];

export default function UltraverseCaseStudy() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="case-hero case-hero-skinstric">
          <div className="skinstric-case-mark" aria-hidden="true" />

          <div className="shell" data-reveal>
            <p className="eyebrow">Frontend development project</p>

            <h1>
              Building a responsive marketplace around asynchronous data and
              reusable UI.
            </h1>

            <p className="case-lede">
              I implemented Ultraverse from a supplied starter, visual
              direction, assets, APIs, and project requirements, focusing on the
              frontend behavior that turns those inputs into a working
              marketplace.
            </p>

            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Frontend implementation</strong>
              </div>

              <div>
                <span>Provided</span>
                <strong>
                  Starter &middot; Design &middot; APIs &middot; Requirements
                </strong>
              </div>

              <div>
                <span>My focus</span>
                <strong>
                  Data &middot; Routing &middot; Responsive UI
                </strong>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://ultraverse.rebeccaiaaland.com"
                target="_blank"
                rel="noreferrer"
              >
                Live demo &#8599;
              </a>

              <a
                className="button button-secondary"
                href="https://github.com/reaaland/ultraverse-nft-marketplace"
                target="_blank"
                rel="noreferrer"
              >
                View code &#8599;
              </a>
            </div>
          </div>
        </section>

        <section className="case-body shell">
          <aside className="case-sidebar" data-reveal>
            <p className="eyebrow">Technology</p>

            <ul>
              <li>React &amp; JavaScript</li>
              <li>React Router &amp; Axios</li>
              <li>react-slick &amp; CSS</li>
              <li>REST APIs &amp; Vercel</li>
            </ul>

            <a
              href="https://ultraverse.rebeccaiaaland.com"
              target="_blank"
              rel="noreferrer"
            >
              Open the deployed project &#8599;
            </a>

            <a
              href="https://github.com/reaaland/ultraverse-nft-marketplace"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub &#8599;
            </a>
          </aside>

          <div className="case-narrative">
            <section data-reveal>
              <p className="eyebrow">01 / The assignment</p>

              <h2>
                Turn supplied marketplace requirements into a working React
                experience.
              </h2>

              <p>
                The project provided the starter structure, visual direction,
                assets, API endpoints, and requirements. My responsibility was
                to implement the frontend behavior, connect the data, and make
                the experience hold together across the different marketplace
                views and screen sizes.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">02 / The challenge</p>

              <h2>
                Several frontend concerns had to work together instead of as
                isolated exercises.
              </h2>

              <p>
                Ultraverse combines remote data, loading feedback, reusable card
                components, routing, countdown timers, carousels, sorting,
                incremental loading, and responsive behavior. The challenge was
                making those pieces feel like one consistent application rather
                than separate features.
              </p>
            </section>

            <section data-reveal aria-label="Ultraverse marketplace interface">
              <div className="project-screenshot-frame">
                <Image
                  src="/nft-case-study.png"
                  alt="Ultraverse Explore marketplace showing NFT cards, sorting, countdown timers, likes, prices, and load more behavior"
                  width={1648}
                  height={928}
                  className="project-screenshot"
                />
              </div>

              <p>
                The Explore view combines reusable marketplace cards, remote
                data, sorting, live countdown timers, pricing and like
                information, and incremental loading in one responsive screen.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">03 / What I implemented</p>

              <h2>The technical work behind the marketplace.</h2>

              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome" data-reveal>
              <p className="eyebrow">04 / What this project shows</p>

              <h2>
                I can connect data, state, routing, and responsive UI into a
                complete frontend flow.
              </h2>

              <p>
                Ultraverse is useful portfolio proof because the work goes
                beyond a static page. It required me to manage asynchronous
                content, provide useful loading states, reuse components across
                views, preserve responsive behavior, and keep navigation
                predictable as users move between collections, authors, items,
                and Explore.
              </p>

              <p>
                The marketplace actions are demonstration-only; the project does
                not implement real NFT purchases or a live crypto wallet.
              </p>
            </section>
          </div>
        </section>

        <section className="next-project shell" data-reveal>
          <p>Next case study</p>
          <Link href="/work/summarist">Summarist &#8599;</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
