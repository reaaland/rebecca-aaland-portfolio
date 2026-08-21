import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Summarist Case Study",
  description:
    "How Rebecca Aaland implemented a multi-route Next.js book-summary application as a completed Frontend Simplified virtual internship project.",
};

const implementation = [
  "Email/password registration, login, logout, and guest access with Firebase Authentication",
  "Redux state for the shared authentication modal",
  "API-driven selected, recommended, and suggested book sections",
  "Debounced search by book title or author",
  "Dynamic book detail and player routes",
  "Access checks for free and premium content",
  "Audio player controls with progress, rewind, and forward behavior",
  "Firestore persistence for saved and finished books",
  "Library and settings views tied to the signed-in user",
  "Responsive sidebar behavior plus loading, error, empty, and logged-out states",
];

export default function SummaristCaseStudy() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="case-hero">
          <div className="shell" data-reveal>
            <p className="eyebrow">
              Completed Frontend Simplified virtual internship
            </p>

            <h1>
              Building a larger application from a defined set of requirements.
            </h1>

            <p className="case-lede">
              Summarist was a Frontend Simplified virtual internship project
              that I completed and passed. I worked from supplied requirements,
              APIs, assets, and an existing visual starting point to implement
              the application flow in Next.js. This is internship project work,
              not a product or site I own.
            </p>

            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Frontend implementation</strong>
              </div>

              <div>
                <span>Provided by FES</span>
                <strong>
                  Requirements &middot; APIs &middot; Assets &middot; Visual
                  starting point
                </strong>
              </div>

              <div>
                <span>My focus</span>
                <strong>
                  Auth &middot; State &middot; Data &middot; Routing &middot;
                  Responsive UI
                </strong>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://summarist-internship-delta.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Live demo &#8599;
              </a>

              <a
                className="button button-secondary"
                href="https://github.com/reaaland/summarist-internship"
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
              <li>Next.js &amp; React</li>
              <li>TypeScript</li>
              <li>Firebase Authentication</li>
              <li>Firestore</li>
              <li>Redux Toolkit</li>
            </ul>

            <a
              href="https://summarist-internship-delta.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Open the deployed project &#8599;
            </a>

            <a
              href="https://github.com/reaaland/summarist-internship"
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
                Turn the internship brief into a working multi-page application.
              </h2>

              <p>
                The project required more than building individual components. I
                connected authentication, API data, routing, search,
                subscription-aware access, a player, library behavior, and user
                settings into one application.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">02 / The challenge</p>

              <h2>Keep several user states and data flows working together.</h2>

              <p>
                A user can be logged out, signed in as a guest, signed in with
                an account, or using a premium demo state. Those states affect
                what they can open, save, play, and see in Settings. The work
                was making those pieces behave consistently instead of feeling
                like separate exercises.
              </p>
            </section>

            <section data-reveal aria-label="Summarist application interface">
              <div className="project-screenshot-frame">
                <Image
                  src="/summarist-case-study.png"
                  alt="Summarist For You dashboard showing featured and recommended book summaries"
                  width={1648}
                  height={928}
                  className="project-screenshot"
                />
              </div>

              <p>
                The For You view brings together authenticated navigation,
                search, featured content, recommended books, ratings, and
                reusable book cards in the main application experience.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">03 / What I implemented</p>

              <h2>The application work behind the internship requirements.</h2>

              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome" data-reveal>
              <p className="eyebrow">04 / What this project shows</p>

              <h2>
                I can take a larger brief and connect the pieces into a usable
                application.
              </h2>

              <p>
                Summarist shows a different kind of work from PawCircle. I did
                not define the product or visual direction myself. The value is
                in following the internship requirements, working through app
                state and authentication, connecting multiple routes and data
                sources, and debugging the flow until the pieces worked
                together.
              </p>

              <p>
                For the public portfolio version, the subscription step uses a
                demo state rather than collecting real payment information. That
                keeps the access-gating behavior visible without presenting this
                internship project as a live paid product.
              </p>
            </section>
          </div>
        </section>

        <section className="next-project shell" data-reveal>
          <p>Previous case study</p>
          <Link href="/work/ultraverse">
            Ultraverse NFT Marketplace &#8599;
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}