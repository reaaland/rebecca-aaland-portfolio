import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Web Design, Updates & Site Care",
  description:
    "Aaland Web Design & Site Care builds new websites, improves existing sites, and provides ongoing website support for small businesses.",
  path: "/",
});

const quickPaths = [
  {
    title: "I need a website",
    text: "Custom, responsive websites for small businesses that need a clear, professional online home.",
    href: "/services#new-websites",
    link: "Explore website builds",
  },
  {
    title: "I need website updates",
    text: "Focused improvements, content changes, mobile fixes, forms, new sections, and other practical updates.",
    href: "/services#website-updates",
    link: "Explore website updates",
  },
  {
    title: "I want someone to handle it",
    text: "Ongoing Site Care for businesses that want a reliable person to keep the website updated and working well.",
    href: "/site-care",
    link: "Explore Site Care",
  },
] as const;

const pricing = [
  {
    title: "Website Builds",
    price: "Starting at $1,500",
    text: "From focused small-business sites to more involved custom builds.",
  },
  {
    title: "Website Updates",
    price: "Starting at $150",
    text: "For clearly defined changes to an existing website.",
  },
  {
    title: "Site Care",
    price: "$100/month",
    text: "Routine checks, support, and a limited amount of small monthly updates.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main business-home">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
          <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span /> Rochester, Minnesota · Small-business web support
            </p>

            <h1 id="hero-title">
              A website should make your business easier to understand—
              <em> and easier to run.</em>
            </h1>

            <p className="hero-intro">
              I build new websites, improve existing ones, and provide ongoing
              support for small businesses that want a professional site without
              unnecessary technical hassle.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="/services">
                View services ↗
              </Link>
              <Link className="button button-secondary" href="/pricing">
                See pricing
              </Link>
            </div>
          </div>

          <div className="hero-principles business-choice-grid" aria-label="Choose the kind of website help you need">
            {quickPaths.map((item) => (
              <article key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <Link className="text-link" href={item.href}>
                  {item.link} ↗
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="business-value-section shell" aria-labelledby="business-value-title" data-reveal>
          <div className="business-value-copy">
            <p className="eyebrow">Practical web support</p>
            <h2 id="business-value-title">Web help without making you manage the technology.</h2>
            <p>
              Some businesses need a new website. Others only need a few things
              fixed, updated, or made easier for customers. I start with what is
              already working and build from there.
            </p>
          </div>

          <div className="business-value-grid">
            <article>
              <span>01</span>
              <h3>Start in writing</h3>
              <p>You can send the details first. A phone call is not required just to find out whether the project fits.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Existing sites are welcome</h3>
              <p>I can review and improve a website I did not originally build instead of automatically recommending a replacement.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Know the price first</h3>
              <p>You will know the scope and price before I begin work that changes your cost.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Stay supported</h3>
              <p>Use one-time updates when that is enough, or Site Care when you want ongoing help month to month.</p>
            </article>
          </div>
        </section>

        <section className="services-section business-pricing-band" aria-labelledby="pricing-title" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Pricing at a glance</p>
                <h2 id="pricing-title">Know the starting point before you reach out.</h2>
              </div>
              <p>
                Clear starting prices make it easier to decide whether a project
                fits your budget before we spend time discussing the details.
              </p>
            </div>

            <div className="service-grid">
              {pricing.map((item) => (
                <article key={item.title}>
                  <span>{item.price}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <Link className="section-link" href="/pricing">
              See full pricing ↗
            </Link>
          </div>
        </section>

        <section className="work-section shell" aria-labelledby="work-title" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected client work</p>
              <h2 id="work-title">Built around real business needs.</h2>
            </div>
            <p>
              My current client work includes two Rochester-area service
              businesses, each with different goals, features, and technical needs.
            </p>
          </div>

          <div className="service-grid">
            <article>
              <span>Client rebuild</span>
              <h3>Minnlawn Lawn &amp; Landscape</h3>
              <p>
                A custom rebuild with seasonal content, quote functionality,
                Google review integration, search work, and launch support.
              </p>
              <Link className="text-link" href="/work/minnlawn">
                View case study ↗
              </Link>
            </article>

            <article>
              <span>Client build</span>
              <h3>Majerus Outdoor Services</h3>
              <p>
                A responsive multi-page website with clearer service paths,
                project proof, custom contact flow, and a stronger local presence.
              </p>
              <Link className="text-link" href="/work/mos">
                View case study ↗
              </Link>
            </article>

            <article>
              <span>Need something different?</span>
              <h3>Start with the problem.</h3>
              <p>
                If you already have a site, I will look at what can be improved
                before recommending a full rebuild.
              </p>
              <Link className="text-link" href="/contact">
                Tell me what you need ↗
              </Link>
            </article>
          </div>
        </section>

        <section className="business-process-section shell" aria-labelledby="business-process-title" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">How it works</p>
              <h2 id="business-process-title">A clear path from “something needs to change” to a finished update.</h2>
            </div>
            <p>
              You do not need to diagnose the technical problem before reaching
              out. Tell me what you want the website to do better, and I will
              help sort out the practical next step.
            </p>
          </div>

          <div className="business-process-grid">
            <article>
              <span>01</span>
              <h3>Send what you know</h3>
              <p>Share the website, the problem, the change you want, and any deadline that matters.</p>
            </article>
            <article>
              <span>02</span>
              <h3>I review the best path</h3>
              <p>I look at what can be improved before recommending a larger project than you need.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Get a written next step</h3>
              <p>You receive a clear response about scope, pricing, and what I need from you to move forward.</p>
            </article>
          </div>
        </section>

        <section className="plain-cta business-final-cta shell" data-reveal>
          <p className="eyebrow">Simple next step</p>
          <h2>Tell me what you want your website to do better.</h2>
          <p>
            You do not need to know the technical solution first. Start with the
            business problem, the current site, or the change you need.
          </p>
          <Link className="button button-dark" href="/contact">
            Contact Rebecca ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
