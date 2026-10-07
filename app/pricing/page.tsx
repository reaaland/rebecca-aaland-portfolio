import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Starting prices for web design, Site Care, and as-needed website support, with clear SEO scope for each website tier.",
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
    price: "$75/hour or scoped quote",
    href: "#existing-websites",
    text: "For occasional support, focused changes, or a larger refresh.",
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
    text: "For an owner-operated business that needs a clear introduction, a service overview, and a way for customers to get in touch.",
    details: [
      "Typically 1–3 pages, such as Home, Services, and Contact",
      "Custom design that works on phones, tablets, and desktops",
      "One straightforward contact form",
      "Organization of the business details, wording, and images you provide",
      "Foundational SEO: search-friendly page titles and descriptions, heading structure, image alt text for supplied images, canonical URLs, sitemap and robots setup, and Google Search Console connection when access is provided",
      "Launch checks, publishing support, and sitemap submission to Google when Search Console access is available",
      "Includes 3 months of Site Care after launch",
    ],
  },
  {
    title: "Small Business Website",
    price: "$2,500",
    text: "For a business with several services or more work to showcase. Dedicated pages give customers room to understand the offer and decide whether it fits.",
    details: [
      "Typically 4–7 pages, with the same design, foundational SEO, and launch setup as the Simple Website",
      "Individual service pages and clearer navigation between them",
      "Light keyword and local-service research to help shape agreed page titles, headings, and service wording",
      "Local business structured data when appropriate for the business and platform",
      "Project, gallery, testimonial, or FAQ content as agreed in the page plan",
      "A contact or quote-request form with fields suited to your business",
      "Includes 6 months of Site Care after launch",
    ],
  },
  {
    title: "Custom Business Website",
    price: "$4,500",
    text: "For a larger content structure or a specific feature that needs extra planning, integration, and testing. A smaller site can also fit here when its functionality is more involved.",
    details: [
      "Often more than 7 pages, or a smaller site with more complex requirements",
      "The same design, foundational SEO, and local-search setup included with the Small Business Website",
      "Broader keyword and competitor review to guide a larger page structure when search visibility is part of the agreed project goals",
      "SEO planning for the agreed content architecture, internal linking, and structured data where appropriate",
      "Scoped features such as a multi-step inquiry flow or connection to an existing business tool",
      "Additional implementation and testing for the agreed features",
      "E-commerce, booking, accounts, portals, and membership systems are assessed and quoted individually; the starting price does not include every feature",
      "Includes 12 months of Site Care after launch, including one post-launch Search Console review during the included care period",
    ],
  },
] as const;

const websiteScopeNotes = [
  {
    title: "What every build includes",
    text: "Responsive custom design, agreed page organization, a defined SEO foundation, checks of the agreed pages and forms, and help publishing the finished site.",
    details: [
      "Every website tier includes the foundational SEO items listed above; higher tiers add research and planning because they include more pages and a larger search footprint",
      "Page counts guide the estimate; content volume, features, integrations, and research needs also affect the quote",
      "The final proposal lists the exact pages, features, SEO work, and launch tasks included in your project",
    ],
  },
  {
    title: "What ongoing SEO does not mean",
    text: "A search-ready website and an ongoing SEO campaign are different services. The website packages cover the launch foundation described above, not unlimited search marketing after launch.",
    details: [
      "Ongoing SEO strategy, recurring keyword and competitor research, regular Search Console monitoring, Google Business Profile management, citation or backlink work, and ongoing SEO content are quoted separately unless your proposal specifically includes them",
      "New service or location pages created later are separate work unless they are already part of the agreed website scope",
      "Search engines decide rankings, so rankings, traffic, leads, and specific placement in Google cannot be guaranteed",
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
    text: "You receive a written scope and price before committing. We confirm the pages, features, content responsibilities, revision rounds, payment schedule, estimated timeline, and included SEO work together.",
    details: [
      "Timing depends on project complexity, content readiness, and feedback; your proposal sets the schedule",
      "You review the agreed work before launch; handoff and any post-launch support are defined in the proposal",
      "New requests outside the agreed scope receive a separate price and timing for approval",
    ],
  },
] as const;

const updateOptions = [
  {
    title: "As-needed Website Support",
    price: "$75/hour",
    text: "Best for occasional small updates or troubleshooting when you do not need monthly Site Care. You approve the work before I begin.",
    href: "/contact/website",
    cta: "Request as-needed support",
  },
  {
    title: "Focused Website Update",
    price: "Starting at $150",
    text: "Best for a defined set of changes such as several text, photo, link, service, contact, form, or layout updates that make more sense as one scoped project.",
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
                Choose hourly help for occasional small requests, a scoped update
                for a defined set of changes, or a refresh when several pages need
                broader improvement.
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

        <section id="site-care" className="plain-cta shell" data-reveal>
          <p className="eyebrow">Website support after launch</p>
          <h2>$100/month Site Care · $75/hour as needed</h2>
          <p>
            Site Care includes a monthly website check, brief written support, a
            short monthly summary, and up to 60 minutes of small updates for one
            reviewed website. If you only need occasional help, as-needed support
            is available at $75/hour. Hosting, domains, ongoing SEO campaigns,
            and larger project work are separate unless agreed in writing.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/site-care">
              Compare support options ↗
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
