import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Small-business websites, website improvements, and frontend development from Rebecca Aaland.",
};

const services = [
  {
    number: "01",
    title: "New websites",
    fit: "For service businesses that need a professional, responsive website with a clear message and an easy next step for customers.",
    includes: [
      "Page structure and message clarification",
      "Responsive custom design and build",
      "Contact and inquiry pathways",
      "Launch support and practical handoff",
    ],
  },
  {
    number: "02",
    title: "Website improvements",
    fit: "For existing sites that are hard to use, dated, confusing, or not working well on phones.",
    includes: [
      "Homepage and navigation improvements",
      "Mobile and responsive fixes",
      "Content, forms, and call-to-action cleanup",
      "Accessibility and visual consistency improvements",
    ],
  },
  {
    number: "03",
    title: "Frontend development",
    fit: "For teams with a design, feature, or set of requirements that need to become a working interface.",
    includes: [
      "Responsive React or Next.js interfaces",
      "Reusable TypeScript components",
      "API-driven states and interactions",
      "Testing, troubleshooting, and browser behavior review",
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
          <h1>Web help built around what you actually need.</h1>
          <p>
            I work with small businesses and teams on focused website and
            frontend projects—from new sites and mobile fixes to responsive
            implementation from an existing design.
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
          <h2>Tell me what you need the site to do.</h2>
          <p>
            You do not need a technical plan before reaching out. Tell me what
            you are trying to accomplish, what is not working now, or what you
            wish your website did better.
          </p>
          <Link className="button button-dark" href="/contact">
            Discuss a website project ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
