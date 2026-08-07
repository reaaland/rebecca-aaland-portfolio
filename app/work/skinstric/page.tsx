import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Skinstric Case Study",
  description:
    "A typed responsive Next.js skin-analysis flow implemented by Rebecca Aaland from supplied internship requirements.",
};

const implementation = [
  "Responsive landing, intake, scan, results, and demographics routes",
  "Controlled name and location inputs with string validation",
  "External API requests, local persistence, navigation, and error feedback",
  "Gallery upload with FileReader and Base64 conversion",
  "Camera permission, video preview, canvas capture, JPEG conversion, and media cleanup",
  "Demographic ranking, two-decimal confidence display, correction, reset, and confirmation",
];

export default function SkinstricCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="case-hero case-hero-skinstric">
          <div className="skinstric-case-mark" aria-hidden="true" />
          <div className="shell">
            <p className="eyebrow">Frontend internship project · Compensation pending</p>
            <h1>Turning supplied requirements into a connected browser experience.</h1>
            <p className="case-lede">
              I implemented a responsive AI skin-analysis flow using the design,
              assets, APIs, and phased requirements supplied by Frontend
              Simplified.
            </p>
            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Frontend implementation</strong>
              </div>
              <div>
                <span>Provided by FES</span>
                <strong>Design · Assets · APIs · Requirements</strong>
              </div>
              <div>
                <span>Compensation</span>
                <strong>$200 expected, not confirmed received</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="case-body shell">
          <aside className="case-sidebar">
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
              Open the deployed project ↗
            </a>
            <a
              href="https://github.com/reaaland/skinstric-internship"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub ↗
            </a>
          </aside>

          <div className="case-narrative">
            <section>
              <p className="eyebrow">01 / Context</p>
              <h2>Implementation work—not an original product-design claim.</h2>
              <p>
                Frontend Simplified supplied the visual direction, assets,
                external APIs, expected behavior, and phased requirements. My
                responsibility was to translate those inputs into a working,
                typed, responsive application. This was not direct client work.
              </p>
            </section>

            <section>
              <p className="eyebrow">02 / Challenge</p>
              <h2>Several browser capabilities had to feel like one flow.</h2>
              <p>
                The experience connects validated intake data, asynchronous API
                requests, gallery-to-Base64 image handling, camera permissions,
                selfie capture, and demographic results that users can review
                and correct.
              </p>
            </section>

            <section>
              <p className="eyebrow">03 / Implementation</p>
              <h2>Required behaviors verified in the repository.</h2>
              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome">
              <p className="eyebrow">04 / Verification boundary</p>
              <h2>A strong build with one honest testing gate remaining.</h2>
              <p>
                The repository passes lint, TypeScript compilation, and a
                production build. Its public Home, Analysis, Scan, and
                Demographics routes return successfully. Before calling the
                flow fully verified, I still need one manual live-browser pass
                covering the external APIs, upload, camera, selfie, and mobile
                interactions.
              </p>
              <p>
                The public project also needs a clear facial-image disclosure,
                stronger upload validation, a project-specific README, and
                cleanup of placeholder or unused routes.
              </p>
            </section>
          </div>
        </section>

        <section className="next-project shell">
          <p>Previous case study</p>
          <Link href="/work/pawcircle">PawCircle Membership ↗</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
