import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "New websites, website updates, and ongoing site care for small businesses in Rochester, Minnesota and beyond.",
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
      "Routine website checks",
      "Up to one hour of small updates each month",
      "Questions and practical support",
      "Larger changes quoted before work begins",
    ],
    href: "/site-care",
    cta: "Learn about Site Care",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Services</p>
          <h1>Choose the kind of website help you actually need.</h1>
          <p>
            You may need a new site, a few changes to the one you already have,
            or someone to keep it taken care of. Those are different problems,
            so I treat them as different services.
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
          <h2>Show me what you have now.</h2>
          <p>
            I will look at the existing site and the problem you are trying to
            solve before recommending the larger option.
          </p>
          <Link className="button button-dark" href="/contact">
            Discuss your website ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
