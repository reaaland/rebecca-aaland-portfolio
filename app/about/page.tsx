import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rebecca Aaland is a frontend developer and web designer with a background in helping people understand difficult things.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell">
          <p className="eyebrow">About Rebecca</p>
          <h1>I came to technology through people, problems, and persistence.</h1>
          <p>
            My path includes customer support, training, technical writing,
            education, business ownership, and now frontend development and web
            design.
          </p>
        </section>

        <section className="story-grid shell">
          <div className="story-marker">
            <span>Listen</span>
            <span>Clarify</span>
            <span>Build</span>
            <span>Improve</span>
          </div>
          <div className="story-copy">
            <h2>The common thread is making complicated things usable.</h2>
            <p>
              Working directly with customers and learners taught me to notice
              where confusion begins. Technical writing taught me to organize
              information so someone else can act on it. Business ownership
              taught me that a working product and a working business are not
              the same thing.
            </p>
            <p>
              I bring those lessons into development. I ask what the interface
              needs to help someone understand, what state might fail, and what
              the honest next step is when reality does not match the original
              plan.
            </p>
            <blockquote>
              Good work is not only polished. It is understandable,
              supportable, and truthful about what it is.
            </blockquote>
          </div>
        </section>

        <section className="principles-section">
          <div className="shell">
            <p className="eyebrow">How I work</p>
            <div className="principle-grid">
              <article>
                <span>01</span>
                <h2>Start with the real problem.</h2>
                <p>Clarity about the goal prevents decoration from becoming the strategy.</p>
              </article>
              <article>
                <span>02</span>
                <h2>Make states visible.</h2>
                <p>Loading, errors, empty results, and mobile behavior deserve design attention too.</p>
              </article>
              <article>
                <span>03</span>
                <h2>Say what the work actually proves.</h2>
                <p>Specific, supportable claims build more trust than a polished exaggeration.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="plain-cta shell">
          <p className="eyebrow">Continue</p>
          <h2>See the work behind those principles.</h2>
          <Link className="button button-dark" href="/work">
            View selected work ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
