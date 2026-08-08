import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "PawCircle Membership Case Study",
  description:
    "How Rebecca Aaland took PawCircle Membership from an idea to a launched full-stack pet-care membership product.",
};

const implementation = [
  "Responsive React interfaces for pet owners and service providers",
  "Registration, authentication, protected areas, profiles, and role-based behavior",
  "Local provider discovery, service filtering, privacy preferences, and direct messaging",
  "Supabase and PostgreSQL data integration with database policies",
  "Stripe membership workflows and Vercel deployment",
  "Production troubleshooting across registration, profiles, messaging, payments, data, and deployment",
];

export default function PawCircleCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="case-hero case-hero-pawcircle">
          <div className="shell">
            <p className="eyebrow">Independent product · From idea to launch</p>
            <h1>Taking a local pet-care platform from idea to a live product.</h1>
            <p className="case-lede">
              I created PawCircle Membership to explore a simpler way for pet
              owners and independent pet-care providers to find and connect with
              each other locally. I took it through design, development,
              payments, launch, and ongoing troubleshooting.
            </p>
            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Founder · Product owner · Developer</strong>
              </div>
              <div>
                <span>Built</span>
                <strong>Profiles · Discovery · Messaging · Payments</strong>
              </div>
              <div>
                <span>Current state</span>
                <strong>Interactive portfolio demo</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="case-body shell">
          <aside className="case-sidebar">
            <p className="eyebrow">Technology</p>
            <ul>
              <li>React &amp; JavaScript</li>
              <li>Supabase &amp; PostgreSQL</li>
              <li>Stripe</li>
              <li>GitHub &amp; Vercel</li>
            </ul>
            <a
              href="https://www.pawcirclemembership.com"
              target="_blank"
              rel="noreferrer"
            >
              Explore the product demo ↗
            </a>
            <a
              href="https://github.com/reaaland/PawCircle-Membership"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub ↗
            </a>
          </aside>

          <div className="case-narrative">
            <section>
              <p className="eyebrow">01 / Why I built it</p>
              <h2>The idea came from my own experience working in pet care.</h2>
              <p>
                I saw how much large platforms could control fees, discovery,
                and communication between providers and pet owners. I wanted to
                see if a simpler local option could give people another way to
                find each other and start a direct conversation.
              </p>
            </section>

            <section>
              <p className="eyebrow">02 / What I built</p>
              <h2>A full-stack product, not just a landing page.</h2>
              <p>
                PawCircle included separate experiences for pet owners,
                providers, and people who were both. The product combined local
                profiles, service and availability filtering, privacy controls,
                introductory messaging, authentication, memberships, and
                payments into one responsive application.
              </p>
            </section>

            <section>
              <p className="eyebrow">03 / Implementation &amp; problem-solving</p>
              <h2>Building it also meant supporting it when real problems appeared.</h2>
              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome">
              <p className="eyebrow">04 / What happened after launch</p>
              <h2>The product worked. The paid model needed stronger differentiation.</h2>
              <p>
                PawCircle launched as a real paid membership product. After
                launch, I found several free platforms already offering much of
                the same core value. I did not think continuing to charge people
                made sense without a stronger reason to choose PawCircle, so I
                closed the paid membership and refunded the members.
              </p>
              <p>
                I kept the application online because the development work was
                substantial and still worth showing. The public version now uses
                fictional data and lets visitors explore the product without
                creating an account or entering payment information.
              </p>
            </section>
          </div>
        </section>

        <section className="next-project shell">
          <p>Next case study</p>
          <Link href="/work/skinstric">Skinstric ↗</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
