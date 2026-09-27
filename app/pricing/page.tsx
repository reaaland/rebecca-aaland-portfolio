import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Starting prices for web design and Site Care, plus scope-based pricing for technical writing, grant research, and practical business support."
  path: "/pricing",
});

const categories = [
  {
    title: "New websites",
    price: "From $1,500",
    href: "#new-websites",
    text: "For businesses that need a new site or a full rebuild.",
  },
  {
    title: "Website updates",
    price: "From $150",
    href: "#existing-websites",
    text: "For focused changes to a site you already have.",
  },
  {
    title: "Site Care",
    price: "$100/month",
    href: "#site-care",
    text: "For routine support and small ongoing updates.",
  },
  {
    title: "Technical writing",
    price: "Quoted by scope",
    href: "#technical-writing",
    text: "For documentation, SOPs, user guides, onboarding, and help content.",
  },
  {
    title: "Grant research & writing",
    price: "From $195",
    href: "#grant-services",
    text: "For grant research, funding roadmaps, and clearly defined writing support.",
  },
] as const;

const websitePlans = [
  {
    title: "Simple Website",
    price: "$1,500",
    text: "A polished 1–3 page website with the essentials covered.",
    details: [
      "Typically 1–3 core pages",
      "Responsive custom design",
      "Contact form",
      "Foundational search setup",
      "Launch support",
    ],
  },
  {
    title: "Small Business Website",
    price: "$2,500",
    text: "A fuller 4–7 page site with stronger organization and a more complete customer path.",
    details: [
      "Typically 4–7 pages",
      "Custom layout and visual direction",
      "Clear service and customer paths",
      "Contact or quote form",
      "Foundational SEO and launch setup",
    ],
  },
  {
    title: "Custom Business Website",
    price: "$4,500",
    text: "For a larger site or a project that needs custom functionality, integrations, or more involved technical setup.",
    details: [
      "Typically 7+ pages or advanced functionality",
      "Custom features or integrations",
      "More detailed SEO and performance work",
      "More involved testing and launch support",
      "Scope confirmed before work begins",
    ],
  },
] as const;

const updateOptions = [
  {
    title: "Small Website Updates",
    price: "Starting at $150",
    text: "Best when you already know the changes you need: text, photos, links, services, contact information, or another focused fix.",
    href: "/contact",
    cta: "Request website updates",
  },
  {
    title: "Website Refresh",
    price: "Starting at $750",
    text: "Best when the website still works but several pages need cleanup, stronger organization, better mobile presentation, or a more polished look.",
    href: "/contact",
    cta: "Ask about a refresh",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Pricing</p>
          <h1>Start with the category that fits what you need.</h1>
          <p>
            These are starting prices, not hidden estimates. Once I understand
            the actual scope, I will give you the price in writing before work
            begins.
          </p>
        </section>

        <section className="services-section" data-reveal>
          <div className="shell">
            <div className="service-grid">
              {categories.map((category) => (
                <article key={category.title}>
                  <span>{category.price}</span>
                  <h3>{category.title}</h3>
                  <p>{category.text}</p>
                  <a className="text-link" href={category.href}>
                    Jump to this pricing ↓
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="new-websites" className="service-detail-list shell" aria-labelledby="new-websites-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">New websites</p>
              <h2 id="new-websites-title">Choose the scope closest to what you need.</h2>
            </div>
            <p>
              The difference between tiers is scope, functionality, integrations,
              testing, and setup—not how seriously I take the project.
            </p>
          </div>

          {websitePlans.map((plan, index) => (
            <article key={plan.title} data-reveal>
              <div className="service-detail-heading">
                <span>0{index + 1}</span>
                <h2>{plan.title}</h2>
              </div>
              <p className="service-fit">
                Starting at <strong>{plan.price}</strong> · {plan.text}
              </p>
              <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
                {plan.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="existing-websites" className="services-section" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Existing website help</p>
                <h2>Keep the site you have when it still makes sense.</h2>
              </div>
              <p>
                For smaller changes, choose an update or refresh. If the platform,
                structure, or overall site is the real problem, a rebuild may make
                more sense.
              </p>
            </div>

            <div className="service-grid pricing-update-grid">
              {updateOptions.map((option) => (
                <article key={option.title}>
                  <span>{option.price}</span>
                  <h3>{option.title}</h3>
                  <p>{option.text}</p>
                  <Link className="text-link" href={option.href}>
                    {option.cta} ↗
                  </Link>
                </article>
              ))}
            </div>

            <div className="pricing-rebuild-callout">
              <div>
                <p className="eyebrow">When updates are not enough</p>
                <h3>Is the current platform or structure getting in the way?</h3>
                <p>
                  If fixing the existing site would cost more than it is worth,
                  I will say so. You can compare the rebuild tiers above or send
                  me the current site and I will take a look.
                </p>
              </div>
              <div className="hero-actions">
                <a className="button button-secondary" href="#new-websites">
                  Compare rebuild pricing ↑
                </a>
                <Link className="button button-dark" href="/contact">
                  Send me the site ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="technical-writing" className="services-section" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Technical writing &amp; documentation</p>
                <h2>Pricing depends on the amount and condition of the material.</h2>
              </div>
              <p>
                A short SOP cleanup is different from building a documentation
                set from scattered notes, screenshots, interviews, and existing files.
                I review the scope first and give you the price in writing.
              </p>
            </div>
            <Link className="section-link" href="/technical-writing">
              See technical writing services ↗
            </Link>
          </div>
        </section>

        <section id="grant-services" className="services-section" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Grant research &amp; writing</p>
                <h2>Start small, then build the funding strategy when it makes sense.</h2>
              </div>
              <p>
                The Grant Funding Snapshot starts at $195. A deeper Funding
                Strategy starts at $750. Grant-writing support is quoted separately
                once the opportunity and scope are clear.
              </p>
            </div>
            <div className="service-grid pricing-update-grid">
              <article>
                <span>Starting at $195</span>
                <h3>Grant Funding Snapshot</h3>
                <p>
                  A focused review of 5–8 relevant opportunities, including
                  eligibility, deadlines, funding ranges, and priority notes.
                </p>
                <Link className="text-link" href="/grant-research-writing">
                  See grant research services ↗
                </Link>
              </article>
              <article>
                <span>Starting at $750</span>
                <h3>Funding Strategy</h3>
                <p>
                  A deeper opportunity pipeline with a 6–12 month grant calendar,
                  readiness gaps, and recommended next steps.
                </p>
                <Link className="text-link" href="/grant-research-writing">
                  See funding strategy details ↗
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section id="site-care" className="plain-cta shell" data-reveal>
          <p className="eyebrow">Ongoing Site Care</p>
          <h2>$100/month</h2>
          <p>
            Routine website checks, questions and support, plus up to one hour
            each month for small text, photo, link, service, or contact-information
            updates. Unused update time does not roll over. New pages, redesigns,
            integrations, SEO projects, and larger changes are quoted separately.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/site-care">
              See Site Care details ↗
            </Link>
            <Link className="button button-secondary" href="/contact">
              Ask about your website
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
