import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Rebecca Aaland's frontend developer résumé, including PawCircle Membership, paid Skinstric internship work, and React API projects.",
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
            <p>Junior Frontend Developer · React · JavaScript · Next.js · Supabase</p>
          </div>

          <a
            className="button button-dark"
            href="/Rebecca-Aaland-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View résumé PDF ↗
          </a>
        </section>

        <div className="resume-layout shell">
          <aside data-reveal>
            <section>
              <h2>Contact</h2>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
              <p>Rochester, Minnesota</p>
              <p>Open to remote work</p>
              <a
                href="https://www.linkedin.com/in/rebecca-aaland-494169411"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/reaaland"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </section>

            <section>
              <h2>Technical Skills</h2>
              <p>JavaScript · TypeScript · React · Next.js</p>
              <p>HTML5 · CSS3 · Tailwind CSS</p>
              <p>Supabase · PostgreSQL · Firebase · Firestore</p>
              <p>REST APIs · Authentication · Stripe</p>
              <p>Git · GitHub · Vercel · Vite</p>
              <p>Axios · React Router · Figma · VS Code</p>
              <p>Debugging · Functional Testing</p>
            </section>

            <section>
              <h2>Education</h2>
              <p>
                Frontend Simplified · Frontend Development Program · Completed
                2026
              </p>
              <p>
                B.S., Elementary Education, Summa Cum Laude · St. Cloud State
                University
              </p>
              <p>
                M.S., Women&apos;s Studies · Minnesota State University, Mankato
              </p>
              <p>
                B.S., Sociology &amp; Women&apos;s Studies · Minnesota State
                University, Mankato
              </p>
            </section>
          </aside>

          <div className="resume-main">
            <section data-reveal>
              <p className="eyebrow">Professional Summary</p>
              <p className="resume-summary">
                Junior Frontend Developer with experience building and launching web
                applications using React, JavaScript, Next.js, Supabase, APIs,
                authentication, databases, and payments. Built PawCircle
                Membership from idea through production and completed a paid
                frontend internship building Skinstric. Before moving into
                development, worked in teaching, business ownership, technical
                writing, and customer support, building strong communication,
                organization, and practical problem-solving skills.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">Selected Development Projects</p>

              <article>
                <h2>PawCircle Membership</h2>
                <span>Production app · React · Supabase / PostgreSQL · Stripe</span>
                <p>
                  Built and launched a responsive React application using
                  Supabase/PostgreSQL, Stripe, and Vercel with authentication,
                  role-based profiles, protected directories, messaging, privacy
                  controls, and payment workflows.
                </p>
                <p>
                  Troubleshot production issues across registration, routing,
                  profiles, notifications, data, and payments; after closing the
                  paid membership model, converted the application into an
                  interactive portfolio demonstration.
                </p>
              </article>

              <article>
                <h2>Skinstric</h2>
                <span>Paid Frontend Internship · Next.js · TypeScript · APIs</span>
                <p>
                  Built a responsive Next.js and TypeScript application from
                  supplied Figma designs, including user intake, image-source
                  selection, AI analysis results, and editable demographic
                  results.
                </p>
                <p>
                  Connected provided APIs, converted uploaded and camera images
                  to Base64, handled localStorage, state, and navigation, fixed a
                  hydration issue, tested responsive behavior, and deployed the
                  completed project to Vercel.
                </p>
              </article>

              <article>
                <h2>Ultraverse NFT Marketplace</h2>
                <span>React · JavaScript · Axios · React Router · APIs</span>
                <p>
                  Built six API-driven views with React, JavaScript, Axios, and
                  React Router, including loading skeletons, responsive
                  carousels, countdown timers, sorting, filtering, incremental
                  loading, and routed detail pages.
                </p>
              </article>
            </section>

            <section data-reveal>
              <p className="eyebrow">Professional Experience</p>

              <article>
                <h2>Frontend Developer Intern</h2>
                <span>Frontend Simplified · 2026</span>
                <p>
                  Completed a paid frontend internship building Skinstric from
                  project requirements and Figma designs, using Git and GitHub
                  throughout development, testing, and deployment.
                </p>
              </article>

              <article>
                <h2>Founder &amp; Owner</h2>
                <span>PawCircle LLC · 2023–Present</span>
                <p>
                  Run an independent pet-care business with approximately 95%
                  repeat business, managing client communication, scheduling,
                  changing needs, problem resolution, and day-to-day operations.
                </p>
              </article>

              <article>
                <h2>Earlier Professional Experience</h2>
                <span>Education · Technical Writing · Tier 1 Support</span>
                <p>
                  Taught science for 11 years, explaining complex ideas clearly,
                  managing multiple priorities, and creating curriculum and
                  training materials. Earlier technical roles included technical
                  writing and document control plus Tier 1 internet support.
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
