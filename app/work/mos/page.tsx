import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Majerus Outdoor Services Client Website Case Study",
  description:
    "How Rebecca Aaland designed and built a responsive website for Majerus Outdoor Services, organizing concrete and outdoor services around clear customer paths, project proof, and a straightforward contact experience.",
  path: "/work/mos",
});

const implementation = [
  "Explored multiple visual directions with the client before refining the final contractor-focused identity",
  "Organized concrete and outdoor services around clearer customer questions and service paths",
  "Built responsive layouts and navigation for desktop, tablet, and mobile use",
  "Created project and gallery areas so real work can serve as proof instead of relying on generic marketing language",
  "Made calling, contacting, and requesting an estimate easy to find from key pages",
  "Built a foundational local-search structure and supported the project through launch",
];

export default function MosCaseStudy() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="case-hero">
          <div className="shell" data-reveal>
            <p className="eyebrow">
              Client website &middot; Strategy, design &amp; build
            </p>

            <h1>
              Giving an owner-operated service business a clearer, more professional online presence.
            </h1>

            <p className="case-lede">
              Majerus Outdoor Services needed a website that could present
              concrete and outdoor services clearly, build trust quickly, and
              feel like a real local business rather than a generic contractor
              template. I worked with Jason to shape the visual direction,
              structure the content, and build the experience around the
              questions potential customers are likely to have.
            </p>

            <div className="case-meta">
              <div>
                <span>Role</span>
                <strong>Web designer &middot; Frontend developer &middot; Client collaboration</strong>
              </div>

              <div>
                <span>Built</span>
                <strong>Responsive site &middot; Service structure &middot; Project proof &middot; Contact path</strong>
              </div>

              <div>
                <span>Client</span>
                <strong>Majerus Outdoor Services &middot; Rochester, Minnesota</strong>
              </div>
            </div>

            <div className="hero-actions">
              <Link className="button button-primary" href="/contact">
                Discuss a website
              </Link>

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
              <li>Responsive web design</li>
              <li>Service architecture</li>
              <li>Visual direction</li>
              <li>Project &amp; gallery presentation</li>
              <li>Quote &amp; contact path</li>
              <li>Local SEO foundation</li>
              <li>Launch support</li>
            </ul>

            <Link href="/work">View selected work &#8599;</Link>
          </aside>

          <div className="case-narrative">
            <section data-reveal>
              <p className="eyebrow">01 / The challenge</p>

              <h2>A broad service mix needed to feel focused, not generic.</h2>

              <p>
                MOS provides concrete work alongside stump grinding, snow
                removal, and seasonal outdoor services. The challenge was to
                make those services easy to understand while keeping concrete
                at the center of the company&apos;s identity. Just as important,
                the site needed to reflect an owner-operated business where
                customers work directly with Jason rather than a large national
                brand.
              </p>
            </section>

            <section data-reveal>
              <p className="eyebrow">02 / What I built</p>

              <h2>A site designed around credibility, service discovery, and an easy next step.</h2>

              <p>
                I started with visual concept work so the client could react to
                different directions before the build. The final system uses a
                stronger contractor-focused palette and layout, while the
                content structure keeps the experience practical: understand
                the services, see the work, learn who is behind the business,
                and know how to get in touch.
              </p>

              <ul className="case-list">
                {implementation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section data-reveal aria-label="Majerus Outdoor Services website overview">
              <div className="project-screenshot-frame">
                <Image
                  src="/mos-homepage-real.jpg"
                  alt="Majerus Outdoor Services live website homepage with concrete driveway hero image"
                  width={900}
                  height={347}
                  className="project-screenshot"
                />
              </div>
              <p>
                The MOS direction is intentionally different from Minnlawn. The
                dark charcoal header, real concrete project photography, and
                straightforward service-focused layout support a contractor identity
                while keeping the site clean and easy to use.
              </p>
            </section>

            <section className="case-outcome" data-reveal>
              <p className="eyebrow">03 / The client experience</p>

              <h2>The process mattered as much as the finished pages.</h2>

              <p>
                One of my goals was to make the project understandable for a
                business owner who did not want to manage the technical details.
                Jason&apos;s review highlighted exactly that: work that initially
                felt stressful to him became a simple and thorough process.
              </p>
            </section>

            <section className="client-testimonial-section" data-reveal>
              <p className="eyebrow">04 / Google review</p>
              <h2>&ldquo;Fast, professional service.&rdquo;</h2>

              <blockquote className="client-testimonial">
                <p>
                  Fast, professional service. Rebecca was great to work with.
                  She made, what seemed to me, to be a stressful job, very
                  simple and thorough. I would definitely recommend her.
                </p>

                <footer>
                  Jason Majerus &middot; Majerus Outdoor Services &middot; Google review
                </footer>
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
