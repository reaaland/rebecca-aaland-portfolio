import Link from "next/link";
import { ExperienceIntro } from "@/components/experience-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const projects = [
  {
    number: "01",
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
    number: "02",
    label: "Frontend development project",
    title: "Skinstric",
    summary:
      "A responsive AI skin-analysis flow I implemented from supplied designs, assets, APIs, and phased requirements.",
    proof: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "Responsive UI",
      "Browser media",
      "API integration",
    ],
    href: "/work/skinstric",
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
    <div className="page-assembler" aria-label="An interface assembling from a responsive grid">
      <div className="assembler-grid" aria-hidden="true" />
      <div className="assembler-window">
        <div className="assembler-toolbar">
          <span /><span /><span />
          <small>responsive-interface.tsx</small>
        </div>
        <div className="assembler-layout">
          <div className="assembler-nav" />
          <div className="assembler-copy">
            <span />
            <strong />
            <strong />
            <small />
            <button tabIndex={-1}>Clear next step</button>
          </div>
          <div className="assembler-visual">
            <i /><i /><i /><i />
          </div>
        </div>
      </div>
      <p className="assembler-caption"><span>01</span> Structure <b>→</b> interface <b>→</b> useful outcome</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ExperienceIntro />
      <SiteHeader />

      <main id="main-content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-ambient hero-ambient-one" aria-hidden="true" />
          <div className="hero-ambient hero-ambient-two" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span /> Frontend development · Web applications · Web design</p>
            <h1 id="hero-title">Websites and digital solutions built to solve <em>practical problems.</em></h1>
            <p className="hero-intro">
              I build clear, responsive websites and web applications for small
              businesses and real-world problems. My approach is practical:
              understand what needs to work, build it well, and refine it based
              on how people actually use it.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/contact">
                Discuss a website <Arrow />
              </Link>
              <a className="button button-secondary" href="#work">
                View my work
              </a>
            </div>
            <div className="hero-status" aria-label="Current availability">
              <span className="status-light" />
              <p>Available for website projects and frontend opportunities.</p>
            </div>
          </div>

          <WebpageAssembler />
        </section>

        <section className="signal-strip" aria-label="Technical skills">
          <div className="signal-track">
            {[...skills, ...skills].map((skill, index) => (
              <span key={`${skill}-${index}`} aria-hidden={index >= skills.length}>
                {skill} <b>+</b>
              </span>
            ))}
          </div>
        </section>

        <section className="services-section" aria-labelledby="services-title" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">01 / What I can help with</p>
                <h2 id="services-title">Practical web help for real business needs.</h2>
              </div>
              <p>
                Whether you need a new site, a clearer existing one, or frontend
                implementation for a larger product, I focus on what needs to
                work and who needs to use it.
              </p>
            </div>
            <div className="service-grid">
              <article>
                <span>01</span>
                <h3>New websites</h3>
                <p>
                  Professional, responsive sites for service businesses that
                  need a clear online presence and an easy way for customers to
                  take the next step.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Website improvements</h3>
                <p>
                  Updates to existing sites—mobile fixes, navigation, content
                  structure, forms, accessibility, and visual consistency—without
                  rebuilding more than necessary.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Frontend development</h3>
                <p>
                  Responsive React and Next.js interfaces, API-driven features,
                  application states, and careful implementation from designs or
                  requirements.
                </p>
              </article>
            </div>
            <Link className="section-link" href="/services">See services and fit <Arrow /></Link>
          </div>
        </section>

        <section className="work-section shell" id="work" aria-labelledby="work-title" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Selected work</p>
              <h2 id="work-title">Real projects, real problem-solving.</h2>
            </div>
            <p>
              These projects show how I turn ideas and requirements into working
              interfaces, solve problems as they come up, and make thoughtful
              decisions throughout the build.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.title} data-reveal>
                <div className={`project-visual project-visual-${project.visual}`}>
                  <div className="visual-topbar">
                    <span>{project.number} / CASE STUDY</span>
                    <span>REBECCA AALAND</span>
                  </div>
                  {project.visual === "pawcircle" ? (
                    <div className="pawcircle-console">
                      <div className="console-line"><span>PRODUCT</span><strong>PawCircle Membership</strong></div>
                      <div className="console-line"><span>BUILT</span><strong>Profiles · Messaging · Payments</strong></div>
                      <div className="console-line"><span>OUTCOME</span><strong>Launched · Supported · Repurposed</strong></div>
                      <div className="console-pulse" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="skinstric-scan">
                      <span className="scan-corner scan-one" />
                      <span className="scan-corner scan-two" />
                      <span className="scan-corner scan-three" />
                      <span className="scan-corner scan-four" />
                      <div className="scan-core"><span>FRONTEND PROJECT</span><strong>SKINSTRIC</strong><small>Camera + API + Results</small></div>
                    </div>
                  )}
                </div>

                <div className="project-body">
                  <p className="project-eyebrow">{project.label}</p>
                  <div className="project-main">
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                  </div>
                  <ul className="tag-list" aria-label={`${project.title} technologies and skills`}>
                    {project.proof.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <Link className="project-link" href={project.href}>
                    Read the case study <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section" aria-labelledby="journey-title" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / The path here</p>
                <h2 id="journey-title">Different experience, same problem-solving habit.</h2>
              </div>
              <p>
                Teaching, running a business, and building software all taught
                me the same thing: understand the problem, communicate clearly,
                and keep working until the solution makes sense.
              </p>
            </div>
            <ol className="journey-track">
              <li><span>01</span><strong>Science teacher</strong><p>Make complicated ideas easier to understand.</p></li>
              <li><span>02</span><strong>Business owner</strong><p>Understand customers and solve practical problems.</p></li>
              <li><span>03</span><strong>Product builder</strong><p>Take an idea from concept to working software.</p></li>
              <li><span>04</span><strong>Frontend developer</strong><p>Build responsive interfaces people can actually use.</p></li>
            </ol>
          </div>
        </section>

        <section className="principle-section shell" aria-labelledby="principle-title" data-reveal>
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
            <Link className="text-link" href="/about">More about how I work <Arrow /></Link>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
          <div className="shell contact-inner">
            <p className="eyebrow"><span className="status-light" /> Available for website projects and frontend opportunities</p>
            <h2 id="contact-title">Have a website or web project you want to improve?</h2>
            <p>
              Tell me what you need, what is not working now, or what you are
              trying to build. We can start there.
            </p>
            <div className="contact-actions">
              <Link className="button button-primary" href="/contact">Start a conversation <Arrow /></Link>
              <a className="text-link" href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
