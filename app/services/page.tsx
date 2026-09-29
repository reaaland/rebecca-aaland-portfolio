import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Web design, site care, technical writing, grant research, and practical business support for small businesses and organizations in Rochester, Minnesota and beyond.",
  path: "/services",
});

const serviceList = [
  {
    id: "new-websites",
    number: "01",
    title: "New websites",
    fit: "For a business that needs a professional website built around what customers need to know, trust, and do next.",
    includes: [
      "Responsive custom design and development",
      "Clear page and service organization",
      "Contact or quote pathways",
      "Foundational search and launch setup",
    ],
    href: "/pricing#new-websites",
    cta: "See website pricing",
  },
  {
    id: "website-updates",
    number: "02",
    title: "Website updates & improvements",
    fit: "For an existing site that needs changes, cleanup, new content, better mobile behavior, or focused improvements rather than a complete rebuild.",
    includes: [
      "Text, photo, service, and contact-information updates",
      "Homepage, navigation, and call-to-action improvements",
      "Mobile, accessibility, and visual consistency fixes",
      "Forms, links, and other practical website changes",
    ],
    href: "/pricing#existing-websites",
    cta: "See update pricing",
  },
  {
    id: "site-care",
    number: "03",
    title: "Ongoing Site Care",
    fit: "For businesses that want a reliable person to keep the website working well and handle routine updates after launch.",
    includes: [
      "Monthly checks of key pages, links, mobile display, and the main inquiry form",
      "Up to one hour of small updates each month",
      "Brief written support and a short monthly summary, separate from update time",
      "Larger changes quoted before work begins",
    ],
    href: "/site-care",
    cta: "Learn about Site Care",
  },
  {
    id: "technical-writing",
    number: "04",
    title: "Technical Writing & Documentation",
    fit: "For businesses and organizations that need complicated information turned into clear user guides, SOPs, onboarding material, help content, or process documentation.",
    includes: [
      "User guides and software walkthroughs",
      "SOPs and internal process documentation",
      "Onboarding and training materials",
      "Help-center content and documentation editing",
    ],
    href: "/technical-writing",
    cta: "Explore technical writing",
  },
  {
    id: "grant-research",
    number: "05",
    title: "Grant Research & Writing",
    fit: "For small organizations that need help finding realistic funding opportunities, evaluating fit, organizing priorities, or developing a well-supported application.",
    includes: [
      "Grant opportunity research",
      "Eligibility, deadline, and fit review",
      "Funding roadmaps and grant calendars",
      "Clearly defined grant-writing support",
    ],
    href: "/grant-research-writing",
    cta: "Explore grant research & writing",
  },
  {
    id: "business-solutions",
    number: "06",
    title: "Business Solutions & Process Support",
    fit: "For businesses that need help organizing everyday tasks, information, or workflows and are not sure where to start.",
    includes: [
      "Process and workflow organization",
      "Practical forms and reusable templates",
      "Clear business information and instructions",
      "A defined scope and quote before work begins",
    ],
    href: "/contact/business-solutions",
    cta: "Ask about business support",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Services</p>
          <h1>Choose the kind of practical support you actually need.</h1>
          <p>
            You may need a website, clearer documentation, funding research, or
            help organizing a process. Those are different problems, so I treat
            them as different services instead of forcing everything into one package.
          </p>
        </section>

        <section className="service-detail-list shell">
          {serviceList.map((service) => (
            <article id={service.id} key={service.title} data-reveal>
              <div className="service-detail-heading">
                <span>{service.number}</span>
                <h2>{service.title}</h2>
              </div>
              <p className="service-fit">{service.fit}</p>
              <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="text-link" href={service.href}>
                {service.cta} ↗
              </Link>
            </article>
          ))}
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">Not sure which one?</p>
          <h2>Start with the problem you are trying to solve.</h2>
          <p>
            You do not need to choose the service category first. Tell me what
            you have now, what is getting in the way, and what you need to work
            better. I can help identify the practical next step.
          </p>
          <Link className="button button-dark" href="/contact">
            Tell me what you need ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
