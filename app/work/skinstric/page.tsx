import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Skinstric Case Study",
  description:
    "How Rebecca Aaland implemented a responsive Next.js skin-analysis flow during a paid internship with Skinstric.",
};

const implementation = [
  "Responsive landing, intake, scan, results, and demographics routes",
  "Controlled name and location inputs with validation",
  "External API requests, local persistence, navigation, and error feedback",
  "Gallery upload with FileReader and Base64 conversion",
  "Camera permission, live video preview, canvas capture, JPEG conversion, and media cleanup",
  "Demographic ranking, confidence display, correction, reset, and confirmation flows",
];

export default function SkinstricCaseStudy() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="case-hero case-hero-skinstric">
          <div className="skinstric-case-mark" aria-hidden="true" />

          <div className="shell" data-reveal>
            <p className="eyebrow">Paid Skinstric internship</p>

            <h1>
              Turning supplied designs and requirements into a working browser
              experience.
            </h1>

            <p className="case-lede">
              I implemented a responsive AI skin-analysis flow using the design,
              assets, APIs, and phased requirements provided for my paid
              internship with Skinstric.
            </p>

            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Frontend Developer Intern</strong>
              </div>

              <div>
                <span>Project inputs</span>
                <strong>
                  Design &middot; Assets &middot; APIs &middot; Requirements
                </strong>
              </div>

              <div>
                <span>My focus</span>
                <strong>
                  Responsive UI &middot; Data flow &middot; Browser media
                </strong>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://skinstric-internship-chi.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Live demo &#8599;
              </a>

              <a
                className="button button-secondary"
                href="https://github.com/reaaland/skinstric-internship"
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
              <li>Tailwind CSS</li>
              <li>Browser media APIs</li>
            </ul>

            <a
              href="https://skinstric-internship-chi.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              Open the deployed project &#8599;
            </a>

            <a
              href="https://github.com/reaaland/skinstric-internship"
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
                Take an existing design and make the full interaction work.
              </h2>

              <p>
                I worked from supplied visual direction, assets, external APIs,
                expected behavior, and phased requirements. My job was to
                translate those inputs into a responsive Next.js application
                and connect the pieces into one working flow.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">02 / The challenge</p>

              <h2>
                Several browser features had to work together without feeling
                disconnected.
              </h2>

              <p>
                The project moves from validated intake data into API requests,
                image upload or camera capture, and demographic results that a
                user can review and adjust. That meant managing browser
                permissions, image conversion, application state, navigation,
                asynchronous feedback, and responsive behavior across the flow.
              </p>
            </section>

            <section data-reveal aria-label="Skinstric scan interface">
              <div className="project-screenshot-frame">
                <Image
                  src="/skinstric-case-study.png"
                  alt="Skinstric analysis interface offering camera scan and gallery upload options"
                  width={1648}
                  height={928}
                  className="project-screenshot"
                />
              </div>

              <p>
                The analysis flow gives users two browser-media paths: capture
                an image with the camera or select one from the gallery before
                continuing into the analysis experience.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">03 / What I implemented</p>

              <h2>The technical work behind the experience.</h2>

              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome" data-reveal>
              <p className="eyebrow">04 / What this project shows</p>

              <h2>
                I can work from someone else&apos;s requirements and turn them
                into a functioning interface.
              </h2>

              <p>
                Skinstric is different from PawCircle because I did not define
                the product or visual design. The value of this project is in
                the implementation: following supplied requirements, working
                through unfamiliar browser APIs, connecting multiple states and
                routes, and keeping the experience usable across screen sizes.
              </p>

              <p>
                It also gave me practice debugging a more involved user flow
                instead of building isolated components or a static page.
              </p>
            </section>
          </div>
        </section>

        <section className="next-project shell" data-reveal>
          <p>Next case study</p>
          <Link href="/work/ultraverse">
            Ultraverse NFT Marketplace &#8599;
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
