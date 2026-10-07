import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Web design, Site Care, and as-needed website support for small businesses and organizations in Rochester, Minnesota and beyond.",
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
      "Foundational SEO and launch setup, with the exact SEO scope defined by the website tier you choose",
    ],
    href: "/pricing#new-websites",
    cta: "See website pricing and SEO scope",
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
      "As-needed support at $75/hour for occasional small requests; larger update projects are quoted by scope",
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
      "$100/month for one reviewed website",
      "Monthly checks of key pages, links, mobile display, and the main inquiry form",
      "Up to one hour of small updates each month, plus brief written support and a short monthly summary",
      "Ongoing SEO campaigns and larger changes are quoted separately before work begins",
    ],
    href: "/site-care",
    cta: "Compare monthly and as-needed support",
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
            Start with a new website, focused improvements to an existing site,
            or ongoing care. Choose the level of help your website needs,
            with scope and pricing agreed before work begins.
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
