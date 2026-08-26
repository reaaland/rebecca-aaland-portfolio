import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Junior Frontend Developer Résumé",
  description:
    "Rebecca Aaland's frontend developer résumé, highlighting production React/Supabase work, a paid Skinstric internship, API-driven projects, and practical problem solving.",
  path: "/resume",
});

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
            href="/resume.pdf"
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
              <p>HTML5 · CSS3 · Tailwind CSS · React Router · Redux Toolkit</p>
              <p>REST APIs · Axios · Supabase · PostgreSQL</p>
              <p>Firebase · Firestore · Stripe</p>
              <p>Git · GitHub · Vercel · Vite · Figma</p>
              <p>Responsive Design · Accessibility · Functional Testing</p>
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
                M.S., Women&apos;s Studies; B.S., Sociology &amp; Women&apos;s
                Studies · Minnesota State University, Mankato
              </p>
            </section>
          </aside>

          <div className="resume-main">
            <section data-reveal>
              <p className="eyebrow">Professional Summary</p>
              <p className="resume-summary">
                Junior frontend developer who builds and ships responsive web
                applications from requirements through deployment. Recent work
                includes a production React/Supabase application and a paid
                Next.js/TypeScript internship. Brings practical experience with
                APIs, authentication, databases, payments, testing, debugging,
                and responsive design, along with a background in technical
                writing, teaching, and small-business ownership.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">Selected Development Projects</p>

              <article>
                <h2>PawCircle Membership</h2>
                <span>React · Supabase / PostgreSQL · Stripe</span>
                <p>
                  Identified the need for a direct local pet-care membership
                  product, mapped the core user flows, and built and launched a
                  responsive React application with Supabase/PostgreSQL, Stripe,
                  and Vercel.
                </p>
                <p>
                  Implemented authentication, role-based profiles, protected
                  directories, messaging, privacy controls, and payment workflows;
                  tested failures across the interface, data layer, and third-party
                  services and verified fixes before release.
                </p>
              </article>

              <article>
                <h2>Skinstric</h2>
                <span>Paid Internship · Next.js · TypeScript</span>
                <p>
                  Turned supplied Figma designs and API requirements into a
                  responsive skin-analysis flow with validated intake,
                  camera/gallery capture, Base64 conversion, browser permissions,
                  editable results, responsive testing, and Vercel deployment.
                </p>
              </article>

              <article>
                <h2>Ultraverse NFT Marketplace</h2>
                <span>React · API Project</span>
                <p>
                  Built reusable API-driven marketplace views with loading
                  skeletons, responsive carousels, countdown timers,
                  sorting/filtering, incremental loading, and React Router
                  navigation to deliver a complete responsive browsing experience.
                </p>
              </article>

              <article>
                <h2>Summarist</h2>
                <span>Next.js · Firebase Project</span>
                <p>
                  Completed a multi-route book-summary application with Firebase
                  Authentication, Firestore persistence, Redux Toolkit state,
                  debounced search, protected and premium states, dynamic routes,
                  and an audio player.
                </p>
              </article>
            </section>

            <section data-reveal>
              <p className="eyebrow">Professional Experience</p>

              <article>
                <h2>Frontend Developer Intern</h2>
                <span>Skinstric · 2026</span>
                <p>
                  Completed a paid frontend internship by carrying Skinstric from
                  supplied requirements and designs through implementation,
                  Git/GitHub workflow, testing, debugging, and deployment.
                </p>
              </article>

              <article>
                <h2>Founder &amp; Owner</h2>
                <span>PawCircle LLC · 2023–Present</span>
                <p>
                  Run an independent service business with approximately 95%
                  repeat business, managing client communication, scheduling,
                  changing requirements, and day-to-day problem solving.
                </p>
              </article>

              <article>
                <h2>Earlier Professional Experience</h2>
                <span>Education · Technical Writing · Tier 1 Support</span>
                <p>
                  Eleven years as a science educator plus earlier technical
                  writing/document control and Tier 1 internet support built strong
                  documentation, training, communication, and technical
                  troubleshooting skills.
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
