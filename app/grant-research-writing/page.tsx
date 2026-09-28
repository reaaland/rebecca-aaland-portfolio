import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Grant Research & Writing",
  description:
    "Grant research, opportunity evaluation, funding roadmaps, and grant-writing support for small organizations in Rochester, Minnesota and beyond.",
  path: "/grant-research-writing",
});

const services = [
  {
    number: "01",
    title: "Grant Funding Snapshot",
    price: "Starting at $195",
    text: "A focused first step for organizations that want to know which opportunities are worth considering before committing to a larger strategy.",
    includes: [
      "A scoped search based on your organization, project, and funding need",
      "Eligibility and deadline review",
      "Funding-range and requirement notes",
      "Fit recommendations and readiness gaps; the number of suitable matches varies",
    ],
  },
  {
    number: "02",
    title: "Funding Strategy",
    price: "Starting at $750",
    text: "A deeper research and planning project that turns promising opportunities into an organized funding roadmap.",
    includes: [
      "Prioritized opportunity pipeline",
      "6–12 month grant calendar",
      "Readiness and information gaps",
      "Recommended next steps",
    ],
  },
  {
    number: "03",
    title: "Grant-writing support",
    price: "Quoted by scope",
    text: "Support for clearly defined grant applications when the opportunity and project are a realistic match.",
    includes: [
      "Application organization and drafting support",
      "Editing for clarity and alignment",
      "Research-backed narrative development",
      "Final review against funder requirements",
    ],
  },
] as const;

export default function GrantResearchWritingPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main service-theme-grant">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Grant Research &amp; Writing</p>
          <h1>Start with the right funding opportunities—not more applications.</h1>
          <p>
            I help small organizations research realistic grant opportunities,
            evaluate fit, organize funding priorities, and develop clear,
            well-supported applications.
          </p>
        </section>

        <section className="service-detail-list shell service-themed-list">
          {services.map((service) => (
            <article key={service.title} data-reveal>
              <div className="service-detail-heading">
                <span>{service.number}</span>
                <h2>{service.title}</h2>
              </div>
              <p className="service-fit">
                <strong>{service.price}</strong> · {service.text}
              </p>
              <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="plain-cta shell themed-cta" data-reveal>
          <p className="eyebrow">A practical starting point</p>
          <h2>Not sure whether a grant is worth pursuing?</h2>
          <p>
            Start with the organization, project, and funding need. Research and
            fit come before recommending an application. We agree on the research
            scope first. Research may identify few suitable opportunities or a
            need to improve readiness; funding is not guaranteed.
          </p>
          <Link className="button button-dark" href="/contact/grant-research">
            Discuss grant research ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
