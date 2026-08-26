import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet Rebecca Aaland, a Rochester, Minnesota frontend developer, web designer, business owner, and former teacher who builds practical digital products.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">About Rebecca</p>
          <h1>I learned to solve problems in a few very different places.</h1>
          <p>
            Before I was building websites and web applications, I was a science
            teacher and later a small-business owner. Those experiences taught
            me how to listen, explain complicated things clearly, and figure out
            what someone actually needs.
          </p>
        </section>

        <section className="story-grid shell" data-reveal>
          <aside className="story-process" aria-labelledby="story-process-title">
            <p className="eyebrow" id="story-process-title">How I approach the work</p>
            <ol>
              <li><strong>Understand</strong><span>Start with what needs to happen and who it is for.</span></li>
              <li><strong>Simplify</strong><span>Break a complicated problem into manageable pieces.</span></li>
              <li><strong>Build</strong><span>Turn the plan into something clear and usable.</span></li>
              <li><strong>Improve</strong><span>Test it, fix what does not work, and refine the result.</span></li>
            </ol>
          </aside>
          <div className="story-copy">
            <h2>The work changed. The way I solve problems did not.</h2>
            <p>
              Teaching taught me to notice when something was not making sense
              and find another way to explain it. Running a business taught me
              to think about customers, trust, time, money, and what actually
              helps.
            </p>
            <p>
              Development gave me another way to solve those kinds of problems.
              I now build responsive websites and web applications through
              independent product work and frontend projects built from real
              requirements, designs, APIs, and user needs.
            </p>
            <blockquote>
              I like building things that have a reason to exist and are easier
              for people to use when I am done.
            </blockquote>
          </div>
        </section>

        <section className="principles-section" data-reveal>
          <div className="shell">
            <p className="eyebrow">What I bring to the work</p>
            <div className="principle-grid">
              <article>
                <span>01</span>
                <h2>Understand before building.</h2>
                <p>A good solution starts with knowing what the person or business is actually trying to accomplish.</p>
              </article>
              <article>
                <span>02</span>
                <h2>Make it clear and usable.</h2>
                <p>A feature is not very useful if people cannot understand it, find it, or use it comfortably on their phone.</p>
              </article>
              <article>
                <span>03</span>
                <h2>Test, refine, and improve.</h2>
                <p>I troubleshoot what is not working, use the evidence in front of me, and make the next version better.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">Continue</p>
          <h2>See what I have built.</h2>
          <Link className="button button-dark" href="/work">
            View selected work ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
