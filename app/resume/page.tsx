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

          <a
            className="button button-dark"
            href="https://drive.google.com/file/d/1gJD8GxJKbZWBOeKsvZzHFFtOv2yhY9Se/view?usp=sharing"
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

              <a href="mailto:reaaland@gmail.com">
                reaaland@gmail.com
              </a>

              <p>Rochester, Minnesota</p>
              <p>Open to remote work</p>
            </section>

            <section>
              <h2>Technical Skills</h2>

              <p>
                JavaScript · TypeScript · HTML5 · CSS3
              </p>

              <p>
                React · Next.js · Tailwind CSS · Supabase · PostgreSQL
              </p>

              <p>
                REST APIs · Authentication / Authorization · Stripe
              </p>

              <p>
                Git · GitHub · Vercel · Vite · Figma · VS Code · Axios ·
                React Router
              </p>

              <p>
                Debugging · Functional Testing
              </p>
            </section>

            <section>
              <h2>Background</h2>

              <p>Small-business ownership</p>
              <p>Teaching</p>
              <p>Technical writing</p>
              <p>Tier 1 technical support</p>
            </section>

            <section>
              <h2>Education</h2>

              <p>
                Frontend Simplified · Frontend Development Program · Coursework
                Completed 2026
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
                Frontend developer with hands-on experience building and
                launching responsive web applications using React, JavaScript,
                Next.js, Supabase, REST APIs, authentication, databases, and
                payments. Former educator, technical writer, Tier 1 support
                representative, and small-business owner who brings clear
                communication, customer perspective, and practical problem
                solving to development work.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">Professional Experience</p>

              <article>
                <h2>Founder &amp; Owner</h2>

                <span>
                  PawCircle LLC · Rochester, Minnesota · Oct 2023–Present
                </span>

                <p>
                  Founded and operate an independent pet care business with
                  approximately 95% repeat business, managing client
                  communication, scheduling, changing requirements, problem
                  resolution, and day-to-day operations.
                </p>

                <p>
                  Designed, built, launched, and maintained PawCircle
                  Membership, turning a real customer need into a production web
                  application and managing the product from planning through
                  launch and maintenance.
                </p>

                <p>
                  Applied troubleshooting and customer feedback to improve
                  registration, routing, profiles, messaging, notifications,
                  privacy controls, and payment workflows.
                </p>
              </article>

              <article>
                <h2>Science Teacher</h2>

                <span>
                  Rochester Public Schools · Rochester, Minnesota · Aug
                  2015–Jun 2023
                </span>

                <p>
                  Explained complex scientific and technical concepts to varied
                  audiences, adapting communication and instruction based on
                  feedback, results, and individual needs.
                </p>

                <p>
                  Managed concurrent projects, documentation, deadlines,
                  records, and communications while coordinating with colleagues
                  and families to identify barriers and develop practical
                  solutions.
                </p>
              </article>

              <article>
                <h2>Technical Writer</h2>

                <span>
                  TransCore · Remote / Minnesota · Oct 2000–Aug 2002
                </span>

                <p>
                  Edited, formatted, distributed, and maintained technical
                  documentation supporting engineering teams and operational
                  workflows.
                </p>

                <p>
                  Maintained Visibility and Workflow databases and coordinated
                  documentation changes, meetings, approvals, and information
                  flow among stakeholders.
                </p>
              </article>
            </section>

            <section data-reveal>
              <p className="eyebrow">Selected Development Work</p>

              <article>
                <h2>PawCircle Membership</h2>

                <span>
                  React · JavaScript · Supabase / PostgreSQL · Stripe · Vercel
                </span>

                <p>
                  Full-stack membership web application built from concept
                  through production launch.
                </p>

                <p>
                  Planned, designed, built, and launched a responsive React
                  application using Supabase/PostgreSQL, Stripe, and Vercel with
                  authentication, protected areas, messaging, privacy controls,
                  and payment workflows.
                </p>

                <p>
                  Implemented three role-based profile paths — pet owner, service
                  provider, and combined owner/provider — with gated directory
                  access and profile-specific functionality.
                </p>

                <p>
                  Troubleshot production issues across registration, routing,
                  profiles, notifications, data, and payments; after closing the
                  paid product, converted it into an interactive portfolio
                  demonstration.
                </p>
              </article>

              <article>
                <h2>Ultraverse NFT Marketplace</h2>

                <span>
                  React · JavaScript · Axios · React Router · react-slick
                </span>

                <p>
                  Responsive React marketplace implementation completed through
                  Frontend Simplified.
                </p>

                <p>
                  Built six API-driven experiences — Hot Collections, New Items,
                  Top Sellers, Explore, Author, and Item Detail — using React,
                  JavaScript, Axios, and React Router.
                </p>

                <p>
                  Created reusable loading skeletons and responsive react-slick
                  carousels with desktop, tablet, and mobile behavior that adapts
                  from four cards to two to one.
                </p>

                <p>
                  Implemented live countdown timers, sorting and filtering,
                  incremental load-more behavior, and routed author and
                  item-detail views; deployed the completed project on Vercel.
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