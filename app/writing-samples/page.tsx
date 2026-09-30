import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Writing Samples | Technical, SEO & Product Content",
  description:
    "Technical writing, SEO content, product content, and earlier published reporting samples by Rebecca Aaland.",
  path: "/writing-samples",
});

const samples = [
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
      <SiteHeader />
      <main className="business-main service-theme-tech">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Technical Writing Portfolio</p>
          <h1>Clear writing for people who need to understand and act.</h1>
          <p>
            These demonstration samples show how I approach technical instructions,
            SEO content, and product copy: understand the source material, organize
            it around the reader, and make complicated information easier to use.
          </p>
        </section>

        <section className="shell business-choice-grid" aria-label="Writing samples">
          {samples.map((sample) => (
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

        <section className="legal-copy shell" data-reveal>
          <p className="eyebrow">Earlier published writing</p>
          <h2>Reporting and professional writing came before web development.</h2>
          <p>
            I also wrote local news for the <em>News Record</em>. Archived byline
            pieces in my files include reporting on a city-council public-safety
            issue, a school wellness event, and Minnesota&apos;s Safe and Sober
            campaign. Those articles involved interviews, research, public
            information, and writing to deadline.
          </p>
          <p>
            Earlier in my career, I worked as a Technical Writer I / Document
            Control Coordinator, editing and formatting technical documents and
            helping engineers revise documentation and drawings. The original
            company documents are no longer in my possession, so the technical
            samples above are current demonstrations rather than reconstructed
            client work.
          </p>
          <p>
            <strong>Portfolio note:</strong> The three samples above were created
            specifically as demonstration pieces and are not presented as paid
            client work. The NorthDock product and its specifications are fictional.
          </p>
        </section>

        <section className="plain-cta shell themed-cta" data-reveal>
          <p className="eyebrow">Need something explained clearly?</p>
          <h2>I can work from rough notes, source material, screenshots, or technical input.</h2>
          <p>
            I can help turn that information into documentation, web content,
            product copy, or a practical guide that fits the people who will use it.
          </p>
          <Link className="button button-dark" href="/contact/technical-writing">
            Discuss a writing project ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
