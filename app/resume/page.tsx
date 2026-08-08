import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Rebecca Aaland's web and frontend development résumé, including PawCircle, Frontend Simplified project work, and earlier communication and technical experience.",
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="resume-hero shell" data-reveal>
          <div>
            <p className="eyebrow">Résumé overview</p>
            <h1>Rebecca Aaland</h1>
            <p>Web Developer · Frontend Developer · Technical Problem Solver</p>
          </div>
          <a className="button button-dark" href="/resume.pdf">
            Download résumé PDF ↓
          </a>
        </section>

        <div className="resume-layout shell">
          <aside data-reveal>
            <section>
              <h2>Contact</h2>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
              <p>Rochester, Minnesota · Open to remote work</p>
            </section>
            <section>
              <h2>Core tools</h2>
              <p>React · Next.js · TypeScript · JavaScript · HTML · CSS · Tailwind CSS</p>
              <p>REST APIs · Supabase · PostgreSQL · Firebase · Stripe · Git · GitHub · Vercel</p>
            </section>
            <section>
              <h2>Background</h2>
              <p>Business ownership · Teaching · Tier 1 technical support · Technical writing</p>
            </section>
          </aside>

          <div className="resume-main">
            <section data-reveal>
              <p className="eyebrow">Professional summary</p>
              <p className="resume-summary">
                Frontend developer and web designer with hands-on experience
                building and launching responsive web applications, implementing
                supplied designs and requirements, and connecting interfaces to
                APIs, authentication, databases, payments, and browser media.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">Selected development work</p>
              <article>
                <h2>PawCircle Membership</h2>
                <span>Founder · Product owner · Developer</span>
                <p>
                  Planned, designed, built, and launched a responsive React
                  application with authentication, role-based profiles, local
                  discovery, privacy controls, messaging, Supabase/PostgreSQL,
                  and Stripe. The closed paid product is now preserved as an
                  interactive portfolio demo.
                </p>
              </article>
              <article>
                <h2>Skinstric</h2>
                <span>Frontend Simplified internship project</span>
                <p>
                  Implemented a responsive Next.js and TypeScript skin-analysis
                  flow from supplied designs, assets, APIs, and requirements,
                  including validation, image upload, camera capture, and
                  interactive demographic results.
                </p>
              </article>
              <article>
                <h2>Ultraverse NFT Marketplace</h2>
                <span>Frontend Simplified internship project</span>
                <p>
                  Implemented API-driven React marketplace sections with loading
                  skeletons, responsive carousels, countdown timers,
                  sorting/filtering, load-more behavior, and routed author and
                  item-detail views.
                </p>
              </article>
            </section>

            <section data-reveal>
              <p className="eyebrow">What I bring to a team</p>
              <ul className="resume-strengths">
                <li>Turning requirements into clear, usable interfaces</li>
                <li>Troubleshooting across user experience and system behavior</li>
                <li>Explaining technical or unfamiliar information clearly</li>
                <li>Working directly with customers, learners, and stakeholders</li>
                <li>Testing, learning, and improving when something does not work as expected</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
