import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Starting prices for new websites, website updates, and ongoing Site Care from Aaland Web Design & Site Care.",
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
    price: "$150",
    text: "A clearly defined set of small changes such as text, photos, links, services, or contact information.",
  },
  {
    title: "Website Refresh",
    price: "$750",
    text: "Focused improvements across roughly 3–5 pages when the current site can still do the job.",
  },
  {
    title: "Full Website Rebuild",
    price: "Uses the website tiers above",
    text: "For an existing site whose current platform, template, structure, or technical setup is getting in the way.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
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
                <p className="eyebrow">Already have a website?</p>
                <h2>You may only need an update—not a rebuild.</h2>
              </div>
              <p>
                I will look at what you already have before recommending the
                larger option.
              </p>
            </div>

            <div className="service-grid">
              {updateOptions.map((option) => (
                <article key={option.title}>
                  <span>{option.price}</span>
                  <h3>{option.title}</h3>
                  <p>{option.text}</p>
                </article>
              ))}
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
