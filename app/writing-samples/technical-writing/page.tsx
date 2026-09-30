import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Technical Writing Samples",
  description:
    "Technical documentation, SEO content, and product-writing samples by Rebecca Aaland.",
  path: "/writing-samples/technical-writing",
});

const samples = [
  {
    number: "01",
    type: "Technical documentation",
    title: "Google Search Console Setup After a Website Launch",
    description:
      "A practical setup and troubleshooting guide written for a small-business site owner or team member who needs to understand what to do after launch.",
    proof: [
      "Step-by-step instructions",
      "Plain-language explanations",
      "Troubleshooting",
      "Official source research",
    ],
    href: "/writing-samples/search-console-guide",
  },
  {
    number: "02",
    type: "SEO article",
    title: "Why Your New Website May Not Show Up in Google Right Away",
    description:
      "An educational SEO article that explains crawling, indexing, and what a business owner can realistically do when a new or updated site is not appearing yet.",
    proof: [
      "Search-focused topic",
      "Reader-first structure",
      "Accurate expectations",
      "Actionable checklist",
    ],
    href: "/writing-samples/google-indexing-seo",
  },
  {
    number: "03",
    type: "Product content",
    title: "NorthDock 8-Port USB-C Hub",
    description:
      "A fictional technical product page showing how specifications can be translated into useful customer-facing copy without hiding compatibility limits.",
    proof: [
      "Feature-to-benefit writing",
      "Technical specifications",
      "Compatibility notes",
      "Customer FAQ",
    ],
    href: "/writing-samples/usb-c-hub-product",
  },
] as const;

export default function TechnicalWritingSamplesPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main service-theme-tech">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Technical Writing Samples</p>
          <h1>Technical information written for the person who has to use it.</h1>
          <p>
            These samples show how I organize technical information, explain
            unfamiliar steps, and turn specifications or search concepts into
            writing that is clear enough to act on.
          </p>
        </section>

        <section className="shell business-choice-grid" aria-label="Technical writing samples">
          {samples.map((sample) => (
            <article key={sample.title} data-reveal>
              <p className="eyebrow">
                {sample.number} / {sample.type}
              </p>
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

        <section className="legal-copy shell" data-reveal>
          <p className="eyebrow">Experience behind the samples</p>
          <h2>Technical writing is not entirely new territory for me.</h2>
          <p>
            Earlier in my career, I worked as a Technical Writer I / Document
            Control Coordinator, editing and formatting technical documents and
            helping engineers revise documentation and drawings. I no longer have
            those company documents, so the samples above are current demonstrations
            rather than reconstructed employer work.
          </p>
          <p>
            <strong>Portfolio note:</strong> These three pieces were created as
            demonstration samples and are not presented as paid client work. The
            NorthDock product and its specifications are fictional.
          </p>
        </section>

        <section className="plain-cta shell themed-cta" data-reveal>
          <p className="eyebrow">Need technical content?</p>
          <h2>I can work from source material, screenshots, rough notes, or technical input.</h2>
          <p>
            The goal is straightforward: understand the information first, then
            make it easier for the intended reader to understand and use.
          </p>
          <Link className="button button-dark" href="/contact/technical-writing">
            Discuss a technical writing project ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
