import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExperienceIntro } from "@/components/experience-intro";
import { MinnlawnProjectVisual } from "@/components/minnlawn-project-visual";
import { ProfileStructuredData } from "@/components/profile-structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const projects = [
  {
    number: "01",
    label: "Client website · Full rebuild",
    title: "Minnlawn Lawn & Landscape",
    summary:
      "I rebuilt a real local service-business website beyond the limits of its original GoDaddy template, with clearer service paths, seasonal content, quote functionality, SEO, performance work, and launch support.",
    testimonial: "“The site is now a powerful asset for my business.” — Yohan, Minnlawn",
    proof: [
      "Next.js",
      "TypeScript",
      "Responsive UI",
      "SEO",
      "Schema",
      "Forms",
      "Google reviews",
      "Netlify",
    ],
    href: "/work/minnlawn",
    visual: "minnlawn",
  },
  {
    number: "02",
    label: "Independent product · From idea to launch",
    title: "PawCircle Membership",
    summary:
      "I planned, built, launched, supported, and later converted a real paid pet-care membership product into an interactive portfolio demo after the paid model no longer made sense.",
    proof: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Responsive UI",
      "Supabase",
      "Stripe",
      "Product ownership",
    ],
    href: "/work/pawcircle",
    visual: "pawcircle",
  },
  {
    number: "03",
    label: "Skinstric internship",
    title: "Skinstric",
    summary:
      "A responsive Next.js and TypeScript skin-analysis flow I implemented from supplied Figma designs, APIs, assets, and project requirements during a paid internship with Skinstric.",
    proof: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Camera API",
      "Image upload",
      "Responsive UI",
      "Git & GitHub",
    ],
    href: "/work/skinstric",
    visual: "skinstric",
  },
  {
    number: "04",
    label: "Frontend development project",
    title: "Ultraverse NFT Marketplace",
    summary:
      "A responsive React marketplace I implemented from supplied designs, APIs, and requirements, with reusable components, routing, loading states, carousels, timers, sorting, and incremental loading.",
    proof: [
      "React",
      "JavaScript",
      "React Router",
      "Axios",
      "REST APIs",
      "Responsive UI",
      "Loading states",
      "Vercel",
    ],
    href: "/work/ultraverse",
    visual: "skinstric",
  },
] as const;

const skills = [
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Responsive UI",
  "REST APIs",
  "Supabase",
  "PostgreSQL",
  "Stripe",
  "Git & GitHub",
  "Accessibility",
  "Troubleshooting",
  "Web applications",
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function WebpageAssembler() {
  return (
    <div className="hero-principles" aria-label="How I approach frontend work">
      <article>
        <span className="hero-principle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </span>
        <h2>Problem first</h2>
        <p>
          I start by understanding the real goal and what success needs to look
          like.
        </p>
      </article>

      <article>
        <span className="hero-principle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
          </svg>
        </span>
        <h2>Clean builds</h2>
        <p>I build with structure, clarity, and reusable components.</p>
      </article>

      <article>
        <span className="hero-principle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 2.5 2.5L16 9" />
          </svg>
        </span>
        <h2>Test &amp; refine</h2>
        <p>I test what matters, fix what does not work, and keep improving.</p>
      </article>

      <article>
        <span className="hero-principle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="4" width="12" height="16" rx="2" />
            <rect x="17" y="8" width="4" height="10" rx="1" />
          </svg>
        </span>
        <h2>Responsive by default</h2>
        <p>I design and build for different screen sizes and real users.</p>
      </article>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ProfileStructuredData />
      <ExperienceIntro />
      <SiteHeader />

      <main id="main-content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
          <div className="hero-ambient hero-ambient-two" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span /> Frontend developer · React · Next.js · TypeScript
            </p>

            <h1 id="hero-title">
              I build thoughtful frontend experiences for{" "}
              <em>real-world problems.</em>
            </h1>

            <p className="hero-intro">
              I am a frontend developer with experience building responsive web
              applications, client websites, API-driven features, and production
              projects from real requirements. My background in teaching and
              business ownership also gives me a strong foundation in clear
              communication, problem-solving, and learning new systems quickly.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" href="/resume">
                View my résumé <Arrow />
              </Link>

              <a className="button button-secondary" href="#work">
                View my work
              </a>
            </div>

            <div className="hero-status" aria-label="Current availability">
              <span className="status-light" />
              <p>Open to frontend, web development, and related technical opportunities.</p>
            </div>
          </div>

          <WebpageAssembler />
        </section>

        <section className="signal-strip" aria-label="Technical skills">
          <div className="signal-track">
            {[...skills, ...skills].map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                aria-hidden={index >= skills.length}
              >
                {skill} <b>+</b>
              </span>
            ))}
          </div>
        </section>

        <section
          className="services-section"
          aria-labelledby="services-title"
          data-reveal
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / What I bring</p>
                <h2 id="services-title">
                  Technical work grounded in communication and problem-solving.
                </h2>
              </div>

              <p>
                My experience spans frontend development, real client work, and
                years of teaching. I bring both the technical skills to build
                and the communication skills to understand what people actually
                need.
              </p>
            </div>

            <div className="service-grid">
              <article>
                <span>01</span>
                <h3>Frontend development</h3>
                <p>
                  Responsive React and Next.js interfaces, TypeScript,
                  API-driven features, application states, forms, and careful
                  implementation from designs or requirements.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Practical problem-solving</h3>
                <p>
                  I have taken projects from idea to launch, worked through
                  deployment and integration issues, and adapted existing
                  systems when the original approach no longer fit the goal.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Clear communication</h3>
                <p>
                  Eighteen years of teaching taught me how to break complex
                  ideas into understandable steps, listen for what someone
                  needs, and explain technical decisions without unnecessary
                  jargon.
                </p>
              </article>
            </div>

            <Link className="section-link" href="/resume">
              View experience and résumé <Arrow />
            </Link>
          </div>
        </section>

        <section
          className="work-section shell"
          id="work"
          aria-labelledby="work-title"
          data-reveal
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Selected work</p>
              <h2 id="work-title">Real projects, real problem-solving.</h2>
            </div>

            <p>
              These projects show client website work, independent product
              development, paid implementation work, and responsive
              API-driven interfaces built from supplied requirements.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <Link
                className="project-card"
                href={project.href}
                key={project.title}
                data-reveal
              >
                <div
                  className={`project-visual project-visual-${project.visual}`}
                >
                  <div className="visual-topbar">
                    <span>{project.number} / CASE STUDY</span>
                    <span>REBECCA AALAND</span>
                  </div>

                  {project.title === "Minnlawn Lawn & Landscape" ? (
                    <MinnlawnProjectVisual />
                  ) : project.title === "PawCircle Membership" ? (
                    <div className="project-screenshot-frame">
                      <Image
                        src="/pawcircle-homepage.png"
                        alt="PawCircle Membership homepage"
                        width={1440}
                        height={900}
                        className="project-screenshot"
                      />
                    </div>
                  ) : project.title === "Skinstric" ? (
                    <div className="project-screenshot-frame">
                      <Image
                        src="/skinstric-homepage.png"
                        alt="Skinstric internship homepage"
                        width={1648}
                        height={928}
                        className="project-screenshot"
                      />
                    </div>
                  ) : (
                    <div className="project-screenshot-frame">
                      <Image
                        src="/ultraverse-homepage.png"
                        alt="Ultraverse NFT marketplace Hot Collections page"
                        width={1648}
                        height={928}
                        className="project-screenshot"
                      />
                    </div>
                  )}
                </div>

                <div className="project-body">
                  <p className="project-eyebrow">{project.label}</p>

                  <div className="project-main">
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                    {"testimonial" in project ? (
                      <blockquote className="project-quote">
                        {project.testimonial}
                      </blockquote>
                    ) : null}
                  </div>

                  <ul
                    className="tag-list"
                    aria-label={`${project.title} technologies and skills`}
                  >
                    {project.proof.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <span className="project-link">
                    Read the case study <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="journey-section"
          aria-labelledby="journey-title"
          data-reveal
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / The path here</p>
                <h2 id="journey-title">
                  Different experience, same problem-solving habit.
                </h2>
              </div>

              <p>
                Teaching, running a business, and building software all taught
                me the same thing: understand the problem, communicate clearly,
                and keep working until the solution makes sense.
              </p>
            </div>

            <ol className="journey-track">
              <li>
                <span>01</span>
                <strong>Science teacher</strong>
                <p>Make complicated ideas easier to understand.</p>
              </li>

              <li>
                <span>02</span>
                <strong>Business owner</strong>
                <p>Understand customers and solve practical problems.</p>
              </li>

              <li>
                <span>03</span>
                <strong>Product builder</strong>
                <p>Take an idea from concept to working software.</p>
              </li>

              <li>
                <span>04</span>
                <strong>Frontend developer</strong>
                <p>Build responsive interfaces people can actually use.</p>
              </li>
            </ol>
          </div>
        </section>

        <section
          className="principle-section shell"
          aria-labelledby="principle-title"
          data-reveal
        >
          <div className="principle-code" aria-hidden="true">
            <span>while (building) &#123;</span>
            <strong>build();</strong>
            <strong>test();</strong>
            <strong>improve();</strong>
            <strong>repeat();</strong>
            <span>&#125;</span>
          </div>

          <div className="principle-copy">
            <p className="eyebrow">04 / Working philosophy</p>
            <h2 id="principle-title">Build. Test. Improve. Repeat.</h2>

            <p>
              I work best by building through real problems, testing what works,
              and refining the result. Each project is a chance to make the next
              decision clearer, the interface more useful, and the final product
              stronger.
            </p>

            <Link className="text-link" href="/about">
              More about how I work <Arrow />
            </Link>

            <p>
              I also run PawCircle LLC, where I build and support websites for
              independent service businesses. That client work gives me ongoing
              production experience while this portfolio stays focused on my
              development career.
            </p>

            <a
              className="text-link"
              href="https://www.pawcirclellc.com"
              target="_blank"
              rel="noreferrer"
            >
              Visit PawCircle LLC <Arrow />
            </a>
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
          data-reveal
        >
          <div className="shell contact-inner">
            <p className="eyebrow">
              <span className="status-light" /> Open to frontend, web development,
              and related technical opportunities
            </p>

            <h2 id="contact-title">
              Looking for someone who can build, learn, and communicate clearly?
            </h2>

            <p>
              I would be glad to talk about the role, the team, and the problems
              you need someone to help solve.
            </p>

            <div className="contact-actions">
              <Link className="button button-primary" href="/contact">
                Contact me <Arrow />
              </Link>
              <Link className="button button-secondary" href="/resume">
                View résumé
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
