import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Frontend development, small-business websites, and practical website refreshes from Rebecca Aaland.",
};

const services = [
  {
    number: "01",
    title: "Frontend implementation",
    fit: "For teams with a design or clear product requirements that need careful implementation.",
    includes: [
      "Responsive React or Next.js interfaces",
      "Reusable typed components",
      "API-driven states and interactions",
      "Accessibility and mobile behavior review",
    ],
  },
  {
    number: "02",
    title: "Small-business websites",
    fit: "For service businesses that need a credible, focused web presence with a clear next step.",
    includes: [
      "Page structure and message clarification",
      "Responsive custom design and build",
      "Contact and inquiry pathways",
      "Launch support and practical handoff",
    ],
  },
  {
    number: "03",
    title: "Website refreshes",
    fit: "For existing sites that feel confusing, dated, inconsistent, or difficult to use on a phone.",
    includes: [
      "Homepage and navigation improvements",
      "Content hierarchy and call-to-action cleanup",
      "Mobile, accessibility, and visual consistency fixes",
      "A prioritized plan when a full rebuild is unnecessary",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell">
          <p className="eyebrow">Services</p>
          <h1>Focused help without the agency fog.</h1>
          <p>
            I offer practical frontend and website support with clear scope,
            direct communication, and no promise that outruns the evidence.
          </p>
        </section>

        <section className="service-detail-list shell">
          {services.map((service) => (
            <article key={service.title}>
              <div className="service-detail-heading">
                <span>{service.number}</span>
                <h2>{service.title}</h2>
              </div>
              <p className="service-fit">{service.fit}</p>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="plain-cta shell">
          <p className="eyebrow">A good first step</p>
          <h2>Tell me what is not working and what you need the site to do.</h2>
          <Link className="button button-dark" href="/contact">
            Discuss a website project ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
