import Link from "next/link";
import { MinnlawnProjectVisual } from "@/components/minnlawn-project-visual";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Client Work",
  description:
    "Selected small-business website work by Aaland Web Design & Site Care, including Minnlawn Lawn & Landscape and Majerus Outdoor Services.",
  path: "/work",
});

const projects = [
  {
    number: "01",
    label: "Client website · Full rebuild",
    title: "Minnlawn Lawn & Landscape",
    summary:
      "A custom rebuild that moved beyond the limits of the original template, with clearer service paths, seasonal content, quote functionality, Google review integration, search work, performance testing, and launch support.",
    testimonial:
      "“The site is now a powerful asset for my business.” — Yohan, Minnlawn Lawn & Landscape",
    href: "/work/minnlawn",
    customVisual: true,
  },
  {
    number: "02",
    label: "Client website · New build",
    title: "Majerus Outdoor Services",
    summary:
      "A responsive multi-page website for an owner-operated Rochester-area concrete and outdoor-services business, with clear services, project proof, a stronger contact experience, and custom visual direction.",
    testimonial:
      "“Fast, professional service… very simple and thorough. I would definitely recommend her.” — Jason Majerus",
    href: "/work/mos",
    image: "/mos.png?v=20260912b",
  },
] as const;

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Client work</p>
          <h1>Different businesses need different websites.</h1>
          <p>
            These are my current client projects. The testimonials stay with the
            work they describe rather than being separated into a generic review
            page.
          </p>
        </section>

        <section className="work-index shell" aria-label="Client case studies">
          {projects.map((project) => (
            <Link
              className="work-index-card"
              href={project.href}
              key={project.title}
              data-reveal
            >
              <div className="work-index-image">
                {"customVisual" in project ? (
                  <MinnlawnProjectVisual compact />
                ) : (
                  <img
                    src={project.image}
                    alt="Majerus Outdoor Services website homepage"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "25% center",
                      display: "block",
                    }}
                  />
                )}
              </div>

              <div className="work-index-content">
                <span>
                  {project.number} / {project.label}
                </span>
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
                <blockquote className="work-index-quote">
                  {project.testimonial}
                </blockquote>
                <strong className="work-index-link">Read the case study ↗</strong>
              </div>
            </Link>
          ))}
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">Looking for development work?</p>
          <h2>The technical portfolio is still here.</h2>
          <p>
            My developer portfolio includes client work, product development,
            internship work, React and Next.js projects, and my résumé.
          </p>
          <Link className="button button-dark" href="/portfolio">
            View developer portfolio ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
