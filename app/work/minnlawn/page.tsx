import Link from "next/link";
import { MinnlawnProjectVisual } from "@/components/minnlawn-project-visual";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Minnlawn Client Website Case Study",
  description:
    "How Rebecca Aaland rebuilt Minnlawn Lawn & Landscape's website with responsive design, seasonal content, quote functionality, SEO, performance improvements, and launch support.",
  path: "/work/minnlawn",
});

const implementation = [
  "Reorganized the site around clearer service discovery and customer questions",
  "Built responsive layouts for desktop, tablet, and mobile use",
  "Created seasonal content that automatically highlights the services most relevant throughout the year",
  "Improved the quote path, calls to action, project gallery, and contact experience",
  "Added Google review integration, SEO metadata, schema, sitemap, and robots setup",
  "Tested performance and supported the domain and hosting transition through launch",
];

export default function MinnlawnCaseStudy() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="case-hero case-hero-minnlawn">
          <div className="shell" data-reveal>
            <p className="eyebrow">
              Client website &middot; Strategy, rebuild &amp; launch
            </p>

            <h1>
              Rebuilding a local service website around how the business actually works.
            </h1>

            <p className="case-lede">
              Minnlawn Lawn &amp; Landscape already had a functioning website,
              but the GoDaddy template system limited how clearly the business
              could present its services, seasonal work, projects, and quote
              process. I rebuilt the site around clearer customer paths and a
              more flexible foundation.
            </p>

            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Web designer &middot; Frontend developer &middot; Launch support</strong>
              </div>

              <div>
                <span>Built</span>
                <strong>Responsive site &middot; Quote flow &middot; Seasonal content &middot; SEO</strong>
              </div>

              <div>
                <span>Client</span>
                <strong>Minnlawn Lawn &amp; Landscape &middot; Rochester, Minnesota</strong>
              </div>
            </div>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://minnlawn.com"
                target="_blank"
                rel="noreferrer"
              >
                Visit live site &#8599;
              </a>

              <Link className="button button-secondary" href="/work">
                Back to selected work
              </Link>
            </div>
          </div>
        </section>

        <section className="case-body shell">
          <aside className="case-sidebar" data-reveal>
            <p className="eyebrow">Project focus</p>

            <ul>
              <li>Next.js &amp; TypeScript</li>
              <li>Responsive UI</li>
              <li>Quote &amp; contact flows</li>
              <li>Seasonal automation</li>
              <li>Google reviews</li>
              <li>SEO &amp; schema</li>
              <li>Netlify deployment</li>
            </ul>

            <a href="https://minnlawn.com" target="_blank" rel="noreferrer">
              Visit Minnlawn &#8599;
            </a>
          </aside>

          <div className="case-narrative">
            <section data-reveal>
              <p className="eyebrow">01 / The challenge</p>

              <h2>The old site worked, but the template was getting in the way.</h2>

              <p>
                Minnlawn had an established business and existing website traffic.
                The problem was not that the site was unusable; it was that the
                template made it difficult to organize services, show seasonal
                work clearly, present real project photos, and guide visitors
                toward a quote without adding clutter.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">02 / What I built</p>

              <h2>A custom site designed around real customer decisions.</h2>

              <p>
                I rebuilt the experience around the questions a lawn and
                landscape customer is likely to have: what services are offered,
                what is relevant right now, what the work looks like, and how to
                request a quote. The finished site is easier to maintain and no
                longer constrained by the original template system.
              </p>

              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section data-reveal aria-label="Minnlawn website rebuild overview">
              <MinnlawnProjectVisual />
              <p>
                The rebuild combines service discovery, seasonal messaging,
                project proof, quote functionality, and launch fundamentals in
                one responsive experience.
              </p>
            </section>

            <section className="case-outcome" data-reveal>
              <p className="eyebrow">03 / Launch &amp; support</p>

              <h2>The work included the handoff, not just the code.</h2>

              <p>
                Before launch I tested the finished site, worked through SEO and
                performance details, and helped guide the domain and hosting
                transition. The goal was a site the client could actually use as
                a business asset, not simply a development exercise.
              </p>
            </section>

            <section className="client-testimonial-section" data-reveal>
              <p className="eyebrow">04 / Full client testimonial</p>
              <h2>&ldquo;The site is now a powerful asset for my business.&rdquo;</h2>

              <blockquote className="client-testimonial">
                <p>
                  My website was in desperate need of a complete overhaul. It
                  was plain, disjointed, and actively costing me potential
                  clients. While my monthly visitor metrics showed decent
                  traffic, the actual leads coming through were minimal, and a
                  total lack of SEO data meant my Google search rankings were
                  taking a heavy hit.
                </p>

                <p>
                  Rebecca stepped in as an absolute superhero and completely
                  transformed my online presence into something far better than
                  I could have imagined on my own. She was remarkably attentive
                  to my goals, especially when building out the site&apos;s
                  functionality, like creating a dynamic &ldquo;In Service Now&rdquo;
                  section that automatically rotates seasonal offerings based on
                  the calendar month.
                </p>

                <p>
                  To top it off, Rebecca ran performance tests comparing my
                  site&apos;s original metrics to the newly launched version. Every
                  single metric improved dramatically, with performance, SEO,
                  and overall site health scores landing near or directly at a
                  perfect 10/10.
                </p>

                <p>
                  When it came time to launch, she provided clear, step-by-step
                  instructions for the domain and host transition. Even though
                  the handoff required a few actions on my end, her guidance made
                  the entire process quick, stress-free, and seamless. The site
                  is now a powerful asset for my business, and I will definitely
                  continue working with Rebecca to scale it as my company grows.
                </p>

                <footer>Yohan &middot; Minnlawn Lawn &amp; Landscape</footer>
              </blockquote>
            </section>
          </div>
        </section>

        <section className="next-project shell" data-reveal>
          <p>Next case study</p>
          <Link href="/work/pawcircle">PawCircle Membership &#8599;</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
