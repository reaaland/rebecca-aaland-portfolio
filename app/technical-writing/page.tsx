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
    title: "User guides & help content",
    text: "Clear, practical instructions that help people understand what to do without digging through unnecessary technical language.",
    includes: [
      "User guides and software walkthroughs",
      "Help-center and knowledge-base articles",
      "FAQs and step-by-step instructions",
      "Editing existing documentation for clarity",
    ],
  },
  {
    number: "02",
    title: "SOPs & process documentation",
    text: "Document recurring work so the process is easier to follow, teach, repeat, and improve.",
    includes: [
      "Standard operating procedures",
      "Internal process documentation",
      "Checklists and repeatable workflows",
      "Process cleanup and organization",
    ],
  },
  {
    number: "03",
    title: "Onboarding & training materials",
    text: "Turn complicated information into material that gives customers, employees, or users a clearer starting point.",
    includes: [
      "Client or customer onboarding guides",
      "Internal training documentation",
      "Implementation and setup instructions",
      "Plain-language revisions of technical material",
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
          <p className="eyebrow">Start with what you have</p>
          <h2>You do not need polished documentation before reaching out.</h2>
          <p>
            Send the process, notes, screenshots, draft, or existing material
            you are working from. I can help organize it and identify the
            clearest next step.
          </p>
          <Link className="button button-dark" href="/contact?type=technical">
            Discuss a documentation project ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
