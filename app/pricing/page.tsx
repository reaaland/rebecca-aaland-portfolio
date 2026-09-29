import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Starting prices for web design and Site Care, plus scope-based pricing for technical writing, grant research, and practical business support.",
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
    price: "From $175",
    href: "#technical-writing",
    text: "For documentation cleanup, SOPs, user guides, onboarding, and help content.",
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
    text: "For an owner-operated business that needs a clear introduction, a service overview, and a way for customers to get in touch.",
    details: [
      "Typically 1–3 pages, such as Home, Services, and Contact",
      "Custom design that works on phones, tablets, and desktops",
      "One straightforward contact form",
      "Organization of the business details, wording, and images you provide",
      "Core search setup, launch checks, and publishing support",
      "Includes 3 months of Site Care after launch",
    ],
  },
  {
    title: "Small Business Website",
    price: "$2,500",
    text: "For a business with several services or more work to showcase. Dedicated pages give customers room to understand the offer and decide whether it fits.",
    details: [
      "Typically 4–7 pages, with the same design, search, and launch foundations as the Simple Website",
      "Individual service pages and clearer navigation between them",
      "Project, gallery, testimonial, or FAQ content as agreed in the page plan",
      "A contact or quote-request form with fields suited to your business",
      "Organization of supplied content across a fuller customer journey",
      "Includes 6 months of Site Care after launch",
    ],
  },
  {
    title: "Custom Business Website",
    price: "$4,500",
    text: "For a larger content structure or a specific feature that needs extra planning, integration, and testing. A smaller site can also fit here when its functionality is more involved.",
    details: [
      "Often more than 7 pages, or a smaller site with more complex requirements",
      "The same core design, search, and launch foundations, with additional planning for the agreed scope",
      "Scoped features such as a multi-step inquiry flow or connection to an existing business tool",
      "Additional implementation and testing for the agreed features",
      "E-commerce, booking, accounts, portals, and membership systems are assessed and quoted individually; the starting price does not include every feature",
      "Includes 12 months of Site Care after launch",
    ],
  },
] as const;

const websiteScopeNotes = [
  {
    title: "What every build includes",
    text: "Responsive custom design, agreed page organization, core search setup, checks of the agreed pages and forms, and help publishing the finished site.",
    details: [
      "Core search setup covers page titles, descriptions, headings, and sitemap/indexing configuration appropriate to the platform",
      "Ongoing SEO campaigns, advertising, and guaranteed rankings or leads are not included",
      "Page counts guide the estimate; content volume, features, and integrations also affect the quote",
    ],
  },
  {
    title: "Content and separate costs",
    text: "You provide business information, final wording, branding, and images you have permission to use. I organize the supplied material for the agreed pages and flag anything missing.",
    details: [
      "Substantial copywriting, branding or logo design, photography, and paid image sourcing are quoted separately",
      "Domain registration, hosting, email, and paid third-party services are separate unless explicitly included in your quote",
      "Each website package includes a defined Site Care period after launch: 3 months with Simple, 6 months with Small Business, and 12 months with Custom",
      "Included Site Care follows the standard plan scope: a monthly website check, brief written support, a short monthly summary, and up to 60 minutes of small updates; unused update time does not roll over",
      "After the included period, continuing Site Care is optional at $100/month and does not begin automatically without your agreement",
    ],
  },
  {
    title: "Before work begins",
    text: "You receive a written scope and price before committing. We confirm the pages, features, content responsibilities, revision rounds, payment schedule, and estimated timeline together.",
    details: [
      "Timing depends on project complexity, content readiness, and feedback; your proposal sets the schedule",
      "You review the agreed work before launch; handoff and any post-launch support are defined in the proposal",
      "New requests outside the agreed scope receive a separate price and timing for approval",
    ],
  },
] as const;

const updateOptions = [
  {
    title: "Small Website Updates",
    price: "Starting at $150",
    text: "Best when you already know the changes you need: text, photos, links, services, contact information, or another focused fix.",
    href: "/contact/website",
    cta: "Request website updates",
  },
  {
    title: "Website Refresh",
    price: "Starting at $750",
    text: "Best when the website still works but several pages need cleanup, stronger organization, better mobile presentation, or a more polished look.",
    href: "/contact/website",
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
            These are starting prices for a defined scope. Once I understand
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
              Choose by what customers need to find and do. Page counts are a guide;
              custom features can make a smaller site a more involved project.
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

        <section className="service-detail-list shell" aria-label="What to expect with a website build">
          {websiteScopeNotes.map((note) => (
            <article key={note.title} data-reveal>
              <div className="service-detail-heading">
                <span>✓</span>
                <h2>{note.title}</h2>
              </div>
              <p className="service-fit">{note.text}</p>
              <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
                {note.details.map((detail) => (
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
                <Link className="button button-dark" href="/contact/website">
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
                <h2>Start with the size and complexity of the documentation.</h2>
              </div>
              <p>
                Introductory pricing starts at $175 for cleanup of an existing
                document. SOPs start at $250, user or onboarding guides at $400,
                and small documentation sets at $750. Larger projects are quoted
                by scope.
              </p>
            </div>

            <div className="service-grid pricing-update-grid">
              <article>
                <span>Starting at $175</span>
                <h3>Documentation Review &amp; Cleanup</h3>
                <p>
                  Edit and reorganize an existing SOP, guide, help article, or
                  process document for clarity and usability.
                </p>
                <Link className="text-link" href="/technical-writing">
                  See technical writing services ↗
                </Link>
              </article>

              <article>
                <span>Starting at $250</span>
                <h3>Single SOP or Process Guide</h3>
                <p>
                  Turn one defined workflow into a clear, repeatable SOP,
                  checklist, or internal process guide.
                </p>
                <Link className="text-link" href="/technical-writing">
                  See SOP details ↗
                </Link>
              </article>

              <article>
                <span>Starting at $400</span>
                <h3>User or Onboarding Guide</h3>
                <p>
                  Multi-step documentation for onboarding, implementation,
                  software use, or training.
                </p>
                <Link className="text-link" href="/technical-writing">
                  See guide details ↗
                </Link>
              </article>

              <article>
                <span>Starting at $750</span>
                <h3>Small Documentation Set</h3>
                <p>
                  A coordinated set of roughly 3–5 related documents with
                  consistent structure and terminology.
                </p>
                <Link className="text-link" href="/technical-writing">
                  See documentation packages ↗
                </Link>
              </article>
            </div>
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
                  A scoped search for funding opportunities, with eligibility,
                  deadlines, funding ranges, and fit notes for suitable matches.
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
            For one reviewed website: a monthly website check, brief written support,
            a short monthly summary, and up to 60 minutes of small updates.
            The check and summary are separate from your update allowance.
            Unused time does not roll over. Month to month; hosting, domains,
            and larger work are separate unless agreed in writing.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/site-care">
              See Site Care details ↗
            </Link>
            <Link className="button button-secondary" href="/contact/site-care">
              Ask about your website
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
