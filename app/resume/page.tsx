import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "A concise professional overview of Rebecca Aaland's frontend, product, and communication experience.",
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
            <p>Frontend Developer &amp; Web Designer</p>
          </div>
          <Link className="button button-dark" href="/contact">
            Request the full résumé ↗
          </Link>
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
              <p>Supabase · PostgreSQL · Firebase · Stripe · Git · GitHub · Vercel</p>
            </section>
          </aside>

          <div className="resume-main">
            <section data-reveal>
              <p className="eyebrow">Professional summary</p>
              <p className="resume-summary">
                Frontend developer and web designer with independent
                product-development experience, modern internship
                implementation work, and a background in customer support,
                training, technical writing, education, and business ownership.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">Selected technical experience</p>
              <article>
                <h2>PawCircle Membership</h2>
                <span>Founder · Product owner · Developer</span>
                <p>
                  Planned and built a production React application with
                  authentication, profiles, messaging, role-based behavior,
                  Supabase data, and Stripe workflows. Retired the paid product
                  responsibly and converted it into a fictional demonstration.
                </p>
              </article>
              <article>
                <h2>Skinstric</h2>
                <span>Frontend Simplified internship project</span>
                <p>
                  Implemented a typed responsive Next.js flow spanning form
                  validation, API integration, Base64 upload, camera capture,
                  and interactive demographic results from supplied project
                  requirements.
                </p>
              </article>
            </section>

            <section data-reveal>
              <p className="eyebrow">Transferable strengths</p>
              <ul className="resume-strengths">
                <li>Explaining technical or unfamiliar information clearly</li>
                <li>Troubleshooting across user experience and system behavior</li>
                <li>Documenting decisions, processes, and support steps</li>
                <li>Working directly with customers, learners, and stakeholders</li>
                <li>Owning outcomes and changing direction when evidence demands it</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
