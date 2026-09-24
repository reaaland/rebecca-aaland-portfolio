import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet Rebecca Aaland, the web designer and developer behind Aaland Web Design & Site Care in Rochester, Minnesota.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">About Rebecca</p>
          <h1>I build practical websites for real businesses.</h1>
          <p>
            My background includes teaching, running a small business, and
            frontend development. Those experiences shaped how I work now:
            understand the problem first, explain things clearly, and build only
            what actually helps.
          </p>
        </section>

        <section className="story-grid shell" data-reveal>
          <aside className="story-process" aria-labelledby="story-process-title">
            <p className="eyebrow" id="story-process-title">How I approach the work</p>
            <ol>
              <li><strong>Understand</strong><span>Start with the business goal and the customer.</span></li>
              <li><strong>Simplify</strong><span>Remove unnecessary complexity before adding more.</span></li>
              <li><strong>Build</strong><span>Create something clear, responsive, and useful.</span></li>
              <li><strong>Support</strong><span>Keep improving the site as the business changes.</span></li>
            </ol>
          </aside>

          <div className="story-copy">
            <h2>The website is part of the business—not a separate technical project.</h2>
            <p>
              I spent years teaching before moving into web development and
              business ownership. Teaching taught me how to listen, break down
              complicated information, and recognize when an explanation is not
              working. Running a service business taught me how much time,
              trust, communication, and clear expectations matter.
            </p>
            <p>
              I now bring those habits into web design and development. My work
              includes custom client websites, frontend applications, API
              integrations, forms, deployment, troubleshooting, and ongoing
              website support.
            </p>
            <blockquote>
              My goal is not to sell the biggest project. It is to figure out
              what the website actually needs to do better.
            </blockquote>
          </div>
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">Two sides of the work</p>
          <h2>Looking for my development experience?</h2>
          <p>
            The business site stays focused on clients. My technical portfolio
            and résumé are available separately for employers and development
            opportunities.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/portfolio">
              Developer portfolio ↗
            </Link>
            <Link className="button button-secondary" href="/work">
              Client work
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
