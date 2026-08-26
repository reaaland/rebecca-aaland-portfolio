import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "PawCircle Full-Stack Product Case Study",
  description:
    "How Rebecca Aaland designed, developed, launched, and supported PawCircle Membership, a full-stack React, Supabase, and Stripe pet-care product.",
  path: "/work/pawcircle",
});

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
          <div className="shell" data-reveal>
            <p className="eyebrow">
              Independent product &middot; From idea to launch
            </p>

            <h1>
              Taking a local pet-care platform from idea to a live product.
            </h1>

            <p className="case-lede">
              I created PawCircle Membership to explore a simpler way for pet
              owners and independent pet-care providers to find and connect with
              each other locally. I took it through design, development,
              payments, launch, and ongoing troubleshooting.
            </p>

            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>
                  Founder &middot; Product owner &middot; Developer
                </strong>
              </div>

              <div>
                <span>Built</span>
                <strong>
                  Profiles &middot; Discovery &middot; Messaging &middot;
                  Payments
                </strong>
              </div>

              <div>
                <span>Current state</span>
                <strong>Interactive portfolio demo</strong>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://www.pawcirclemembership.com"
                target="_blank"
                rel="noreferrer"
              >
                Live demo &#8599;
              </a>

              <a
                className="button button-secondary"
                href="https://github.com/reaaland/PawCircle-Membership"
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
              <li>React &amp; JavaScript</li>
              <li>Supabase &amp; PostgreSQL</li>
              <li>Stripe</li>
              <li>Vercel deployment</li>
            </ul>

            <a
              href="https://www.pawcirclemembership.com"
              target="_blank"
              rel="noreferrer"
            >
              Explore the product demo &#8599;
            </a>

            <a
              href="https://github.com/reaaland/PawCircle-Membership"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub &#8599;
            </a>
          </aside>

          <div className="case-narrative">
            <section data-reveal>
              <p className="eyebrow">01 / Why I built it</p>

              <h2>The idea came from my own experience working in pet care.</h2>

              <p>
                I saw how much large platforms could control fees, discovery,
                and communication between providers and pet owners. I wanted to
                see if a simpler local option could give people another way to
                find each other and start a direct conversation.
              </p>
            </section>

            <section data-reveal>
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

            <section data-reveal aria-label="PawCircle product interface">
              <div className="project-screenshot-frame">
                <Image
                  src="/pawcircle-case-study.png"
                  alt="PawCircle demo showing local provider cards and a sample introduction message"
                  width={1648}
                  height={928}
                  className="project-screenshot"
                />
              </div>

              <p>
                The portfolio demo preserves the core product experience with
                fictional provider data, local discovery, availability details,
                and a preview of the introductory messaging workflow.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">
                03 / Implementation &amp; problem-solving
              </p>

              <h2>
                Building it also meant supporting it when real problems
                appeared.
              </h2>

              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome" data-reveal>
              <p className="eyebrow">04 / What happened after launch</p>

              <h2>
                The product worked. The paid model needed stronger
                differentiation.
              </h2>

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

        <section className="next-project shell" data-reveal>
          <p>Next case study</p>
          <Link href="/work/skinstric">Skinstric &#8599;</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
