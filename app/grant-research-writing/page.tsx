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
    title: "Grant opportunity research",
    text: "Find realistic funding opportunities and narrow the list before spending time on an application.",
    includes: [
      "Relevant grant opportunity research",
      "Eligibility and deadline review",
      "Funding-range and requirement notes",
      "Prioritized fit recommendations",
    ],
  },
  {
    number: "02",
    title: "Funding roadmap",
    text: "Organize promising opportunities into a practical plan so you can see what to pursue, when, and what needs to be ready first.",
    includes: [
      "Prioritized opportunity list",
      "Grant deadline calendar",
      "Readiness and information gaps",
      "Recommended next steps",
    ],
  },
  {
    number: "03",
    title: "Grant-writing support",
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
              <p className="service-fit">{service.text}</p>
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
            fit come before promising that an application should be written.
          </p>
          <Link className="button button-dark" href="/contact">
            Discuss grant research ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
