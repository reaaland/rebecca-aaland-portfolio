import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Rebecca Aaland's frontend development résumé, including PawCircle Membership, React project work, and earlier technical and communication experience.",
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="resume-hero shell" data-reveal>
          <div>
            <p className="eyebrow">Résumé</p>
            <h1>Rebecca Aaland</h1>
            <p>Frontend Developer · React · JavaScript · Next.js · Supabase</p>
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
              <h2>Technical skills</h2>
              <p>JavaScript · TypeScript · HTML5 · CSS3</p>
              <p>React · Next.js · Tailwind CSS · Supabase · PostgreSQL</p>
              <p>REST APIs · Stripe · Git · GitHub · Vercel · Vite</p>
            </section>

            <section>
              <h2>Background</h2>
              <p>Small-business ownership · Teaching · Technical writing · Tier 1 technical support</p>
            </section>

            <section>
              <h2>Education</h2>
              <p>Frontend Simplified · Frontend Development Program · 2026–Present</p>
              <p>B.S., Elementary Education, Summa Cum Laude · St. Cloud State University</p>
              <p>M.S., Women&apos;s Studies · Minnesota State University, Mankato</p>
              <p>B.S., Sociology &amp; Women&apos;s Studies · Minnesota State University, Mankato</p>
            </section>
          </aside>

          <div className="resume-main">
            <section data-reveal>
              <p className="eyebrow">Professional summary</p>
              <p className="resume-summary">
                Frontend developer with hands-on experience building and
                launching responsive web applications using React, JavaScript,
                Next.js, Supabase, and modern web tools. Experienced with API
                integration, authentication, databases, payments, responsive
                interfaces, and troubleshooting production issues. I bring a
                background in education, small-business ownership, technical
                writing, and customer support with a strong focus on clear
                communication and practical problem-solving.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">Professional experience</p>

              <article>
                <h2>Founder &amp; Owner · PawCircle LLC</h2>
                <span>Rochester, Minnesota · Oct 2023–Present</span>
                <p>
                  Founded and operate an independent pet-care business, building
                  approximately 95% repeat business through dependable service,
                  referrals, and long-term client relationships.
                </p>
                <p>
                  Expanded the business by designing, building, launching, and
                  maintaining PawCircle Membership, a React web application with
                  authentication, protected areas, role-based profiles, local
                  discovery, messaging, privacy controls, and Stripe payment
                  workflows. The paid membership product was later closed and is
                  now maintained as an interactive portfolio demonstration.
                </p>
              </article>

              <article>
                <h2>Science Teacher · Rochester Public Schools &amp; Adrian Public Schools</h2>
                <span>2012–2023</span>
                <p>
                  Explained complex scientific and technical concepts to varied
                  audiences, created curriculum and training materials, managed
                  concurrent projects and deadlines, and adjusted approaches when
                  people or processes were not working as expected.
                </p>
              </article>

              <article>
                <h2>Technical Writer · TransCore</h2>
                <span>2000–2002</span>
                <p>
                  Edited, formatted, distributed, and maintained technical
                  documentation supporting engineering teams and operational
                  workflows while coordinating documentation changes and keeping
                  technical information accurate and accessible.
                </p>
              </article>
            </section>

            <section data-reveal>
              <p className="eyebrow">Selected development work</p>

              <article>
                <h2>PawCircle Membership</h2>
                <span>React · JavaScript · Supabase/PostgreSQL · Stripe · Vercel</span>
                <p>
                  Planned, designed, built, launched, and supported a responsive
                  membership application with three role-based profile paths,
                  protected routes, search and discovery, privacy controls,
                  introductory messaging, and payment workflows. Troubleshot
                  production issues across registration, routing, profiles,
                  notifications, data, and payments.
                </p>
              </article>

              <article>
                <h2>Ultraverse NFT Marketplace</h2>
                <span>React · JavaScript · Axios · React Router · react-slick</span>
                <p>
                  Built API-driven marketplace experiences with reusable React
                  components, loading skeletons, responsive carousels that adapt
                  from four to two to one card across breakpoints, live countdown
                  timers, sorting and filtering, incremental load-more behavior,
                  and routed author and item-detail views.
                </p>
              </article>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
