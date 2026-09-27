import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Technical Writing & Documentation",
  description:
    "Technical writing, process documentation, user guides, onboarding content, SOPs, and help-center content for small businesses and organizations in Rochester, Minnesota and beyond.",
  path: "/technical-writing",
});

const services = [
  {
    number: "01",
    title: "Documentation Review & Cleanup",
    price: "Starting at $175",
    text: "For an existing SOP, help article, guide, or process document that needs clearer structure, wording, or organization.",
    includes: [
      "Clarity and structure review",
      "Editing and rewrite of existing material",
      "Organization and formatting cleanup",
      "One revision round",
    ],
  },
  {
    number: "02",
    title: "Single SOP or Process Guide",
    price: "Starting at $250",
    text: "For one clearly defined process that needs to become a polished, repeatable SOP, checklist, or internal guide.",
    includes: [
      "One defined workflow or process",
      "Step-by-step structure",
      "Clear roles, actions, or checkpoints",
      "One revision round",
    ],
  },
  {
    number: "03",
    title: "User Guide or Onboarding Guide",
    price: "Starting at $400",
    text: "For a more substantial guide with multiple steps or sections, such as software walkthroughs, onboarding, implementation instructions, or training material.",
    includes: [
      "Multi-step guide structure",
      "Plain-language instructions",
      "Screenshots or visual references when provided",
      "One revision round",
    ],
  },
  {
    number: "04",
    title: "Small Documentation Set",
    price: "Starting at $750",
    text: "For several related documents that need a consistent structure, voice, and format.",
    includes: [
      "Typically 3–5 related documents",
      "Examples: SOP set, onboarding package, or small help-center section",
      "Shared structure and terminology",
      "One revision round",
    ],
  },
  {
    number: "05",
    title: "Larger Documentation Project",
    price: "Quoted by scope",
    text: "For larger documentation systems, multi-page knowledge bases, or projects that require deeper research, interviews, testing, or ongoing coordination.",
    includes: [
      "Scope defined before work begins",
      "Milestones and deliverables confirmed in writing",
      "Pricing based on complexity and source material",
      "Specialized work quoted separately",
    ],
  },
] as const;

export default function TechnicalWritingPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main service-theme-tech">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Technical Writing &amp; Documentation</p>
          <h1>Make complicated information easier to understand and use.</h1>
          <p>
            I help small businesses and organizations turn processes, technical
            details, and scattered information into clear documentation people
            can actually follow.
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
          <p className="eyebrow">Start with what you have</p>
          <h2>You do not need polished documentation before reaching out.</h2>
          <p>
            Send the process, notes, screenshots, draft, or existing material
            you are working from. I can help organize it and identify the
            clearest next step.
          </p>
          <Link className="button button-dark" href="/contact/technical-writing">
            Discuss a documentation project ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
