import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "PawCircle Membership Case Study",
  description:
    "How Rebecca Aaland built, tested, retired, and repositioned a local pet-care membership platform.",
};

const implementation = [
  "Responsive React interfaces for pet owners and service providers",
  "Registration, authentication, protected areas, profiles, and role-based behavior",
  "Direct messaging and member communication flows",
  "Supabase and PostgreSQL data integration",
  "Stripe membership workflows and Vercel deployment",
  "Debugging across registration, profiles, messaging, payments, data, and deployment",
];

export default function PawCircleCaseStudy() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="case-hero case-hero-pawcircle">
          <div className="shell">
            <p className="eyebrow">Independent founder-built product</p>
            <h1>Building, testing, and responsibly repositioning a real product.</h1>
            <p className="case-lede">
              PawCircle Membership was my own attempt to help pet owners and
              local service providers connect directly. The product launched;
              the paid model did not gain enough traction.
            </p>
            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Founder · Product owner · Developer</strong>
              </div>
              <div>
                <span>Context</span>
                <strong>Independent product, not client work</strong>
              </div>
              <div>
                <span>Current state</span>
                <strong>Fictional portfolio demonstration</strong>
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
              href="https://github.com/reaaland/PawCircle-Membership"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub ↗
            </a>
          </aside>

          <div className="case-narrative">
            <section>
              <p className="eyebrow">01 / The problem</p>
              <h2>A two-sided marketplace needs more than working software.</h2>
              <p>
                PawCircle needed to serve pet owners and service providers,
                establish local trust, enable direct communication, and create
                enough geographic density to be useful. I built the product and
                promoted it locally, but the initial outreach did not create
                enough new membership.
              </p>
            </section>

            <section>
              <p className="eyebrow">02 / My role</p>
              <h2>From product decisions to production troubleshooting.</h2>
              <p>
                I was the founder, product owner, designer, developer, operator,
                and customer contact. That meant implementing the application,
                connecting outside services, answering member questions,
                investigating failures, and deciding what to do when the
                business evidence did not support continued paid operation.
              </p>
            </section>

            <section>
              <p className="eyebrow">03 / Implementation</p>
              <h2>The system behind the membership experience.</h2>
              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="case-outcome">
              <p className="eyebrow">04 / Outcome</p>
              <h2>The responsible decision was to close the paid product.</h2>
              <p>
                I canceled subscriptions, issued refunds, deactivated former
                memberships, cleared payment identifiers, disabled Stripe
                payment paths, and converted the site into a fictional
                demonstration. This is not a commercial-success story. It is
                evidence of ownership, technical breadth, customer
                responsibility, and honest response to market feedback.
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
