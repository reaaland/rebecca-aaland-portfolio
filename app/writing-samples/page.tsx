import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { PortfolioHeader } from "@/components/portfolio-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Writing Samples | Technical & Grant Writing",
  description:
    "Technical writing, SEO content, product content, grant-writing samples, and earlier published reporting by Rebecca Aaland.",
  path: "/writing-samples",
});

const technicalSamples = [
  {
    number: "01",
    type: "Technical documentation",
    title: "Google Search Console Setup After a Website Launch",
    description:
      "A practical setup and troubleshooting guide written for a small-business site owner or team member who needs to understand what to do after launch.",
    proof: ["Step-by-step instructions", "Plain-language explanations", "Troubleshooting", "Official source research"],
    href: "/writing-samples/search-console-guide",
  },
  {
    number: "02",
    type: "SEO article",
    title: "Why Your New Website May Not Show Up in Google Right Away",
    description:
      "An educational SEO article that explains crawling, indexing, and what a business owner can realistically do when a new or updated site is not appearing yet.",
    proof: ["Search-focused topic", "Reader-first structure", "Accurate expectations", "Actionable checklist"],
    href: "/writing-samples/google-indexing-seo",
  },
  {
    number: "03",
    type: "Product content",
    title: "NorthDock 8-Port USB-C Hub",
    description:
      "A fictional technical product page showing how specifications can be translated into useful customer-facing copy without hiding compatibility limits.",
    proof: ["Feature-to-benefit writing", "Technical specifications", "Compatibility notes", "Customer FAQ"],
    href: "/writing-samples/usb-c-hub-product",
  },
] as const;

export default function WritingSamplesPage() {
  return (
    <>
      <PortfolioHeader />
      <main className="business-main">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Writing Portfolio</p>
          <h1>Writing that makes information easier to use.</h1>
          <p>
            Explore technical documentation, SEO and product content, and a submitted
            application for my own business. These samples show my approach to
            research, structure, and clear communication.
          </p>
        </section>

        <nav className="shell hero-actions" aria-label="Writing sample categories">
          <a className="button button-dark" href="#technical-writing">Technical writing samples ↓</a>
          <a className="text-link" href="#grant-writing">Grant application sample ↓</a>
        </nav>

        <section id="technical-writing" className="page-hero shell" data-reveal>
          <p className="eyebrow">Technical Writing Samples</p>
          <h2>Clear technical information for people who need to act on it.</h2>
          <p>
            These demonstration samples show how I approach instructions, SEO content,
            and product copy: understand the source material, organize it around the
            reader, and make complicated information easier to use.
          </p>
        </section>

        <section className="shell service-grid" aria-label="Technical writing samples">
          {technicalSamples.map((sample) => (
            <article key={sample.title} data-reveal>
              <p className="eyebrow">{sample.number} / {sample.type}</p>
              <h2>{sample.title}</h2>
              <p>{sample.description}</p>
              <ul>
                {sample.proof.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="text-link" href={sample.href}>
                Read the sample ↗
              </Link>
            </article>
          ))}
        </section>

        <section id="grant-writing" className="page-hero shell" data-reveal>
          <p className="eyebrow">Grant Application Sample</p>
          <h2>A real submitted application, presented as a portfolio sample.</h2>
          <p>
            This first grant-writing sample comes from the Amber Grant application I
            submitted for Aaland Web Design &amp; Business Solutions on September 29,
            2026. This is my own business application, not client work or evidence
            of a funding award. The excerpts reflect the business plan at submission.
          </p>
        </section>

        <section className="legal-copy shell" data-reveal>
          <p className="eyebrow">Amber Grant 2026 / Submitted Application</p>
          <h2>Question 1 — Business story, opportunity &amp; challenge</h2>
          <p><strong>Question:</strong> Tell us about your business or business idea...</p>
          <p>
            <strong>Prompt:</strong> What motivates you? What&apos;s the story behind your
            business? What are the opportunities and challenges?
          </p>
          <p>
            Aaland Web Design &amp; Business Solutions grew out of both a career
            transition and firsthand experience with the challenges small businesses
            face. After 18 years in education, I began retraining in web development
            and building websites. At the same time, my experience operating a small
            service business showed me how difficult it can be for a small business
            owner to manage a website, marketing, documentation, client communication,
            and day-to-day operations without a large budget or an internal team.
          </p>
          <p>
            As I began creating websites for small businesses, I realized that the part
            of the work I enjoyed most was not simply building a site. I enjoyed taking
            something that felt complicated or overwhelming to a client and turning it
            into something clear, useful, and manageable. That became the foundation
            for Aaland Web Design &amp; Business Solutions.
          </p>
          <p>
            The business now brings together web design, ongoing site care, technical
            writing, grant research and writing, and practical business support. My
            focus is on small businesses and organizations that need professional
            support but may not have the resources to hire separate web developers,
            technical writers, grant writers, and administrative or communications
            staff. I want to provide practical services that solve real problems while
            building long-term client relationships rather than completing a project
            and disappearing.
          </p>
          <p>
            <em>Selected excerpt from the submitted response. The full application is
            retained in my grant records.</em>
          </p>
        </section>

        <section className="legal-copy shell" data-reveal>
          <p className="eyebrow">Amber Grant 2026 / Use of Funds</p>
          <h2>Question 2 — Turning the request into a specific plan</h2>
          <p><strong>Question:</strong> Tell us what you would do with the money if awarded a grant...</p>
          <p>
            <strong>Prompt:</strong> Please be specific about your plans if you won the
            $10,000 and the $50,000 year-end grant.
          </p>
          <p>
            For the $10,000 grant, the submitted plan allocated approximately $3,000
            to marketing and outreach, $2,500 to professional software and business
            systems, $2,000 to professional development and training, and $2,500 to
            portfolio development, client onboarding systems, and business
            infrastructure.
          </p>
          <p>
            The larger $50,000 plan focused on scaling that foundation through stronger
            client acquisition, more robust systems, continued professional development,
            improved service processes, and added capacity through specialized contract
            help when appropriate.
          </p>
          <p>
            <strong>What this sample demonstrates:</strong> applicant-centered narrative,
            specific allocation of funds, alignment between spending and business goals,
            and a longer-term growth plan.
          </p>
        </section>

        <section className="legal-copy shell" data-reveal>
          <p className="eyebrow">Earlier published writing</p>
          <h2>Reporting and professional writing came before web development.</h2>
          <p>
            I also wrote local news for the <em>News Record</em>. Archived byline pieces
            include reporting on a city-council public-safety issue, a school wellness
            event, and Minnesota&apos;s Safe and Sober campaign. Those articles involved
            interviews, research, public information, and writing to deadline.
          </p>
          <p>
            Earlier in my career, I worked as a Technical Writer I / Document Control
            Coordinator, editing and formatting technical documents and helping
            engineers revise documentation and drawings. The original company documents
            are no longer in my possession, so the technical samples above are current
            demonstrations rather than reconstructed employer work.
          </p>
          <p>
            <strong>Portfolio note:</strong> The technical samples are demonstration
            pieces and are not presented as paid client work. The NorthDock product and
            its specifications are fictional. The Amber Grant section is based on a real
            application submitted for my own business.
          </p>
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">Professional portfolio</p>
          <h2>Explore my experience and other work.</h2>
          <div className="hero-actions">
            <Link className="button button-dark" href="/portfolio">
              Back to portfolio ↗
            </Link>
            <Link className="button button-secondary" href="/resume">
              View résumé
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
