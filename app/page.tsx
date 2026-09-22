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
    price: "$99/month",
    text: "Routine checks, support, and a limited amount of small monthly updates.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
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

          <div className="hero-principles" aria-label="Choose the kind of website help you need">
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

        <section className="services-section" aria-labelledby="pricing-title" data-reveal>
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

        <section className="plain-cta shell" data-reveal>
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
