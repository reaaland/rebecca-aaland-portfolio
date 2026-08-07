import Link from "next/link";
import { ExperienceIntro } from "@/components/experience-intro";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const projects = [
  {
    number: "01",
    label: "Independent product · Honest outcome",
    title: "PawCircle Membership",
    summary:
      "I planned, built, launched, and ultimately retired a real local pet-care membership product when the market evidence did not support continuing the paid model.",
    proof: ["React", "Supabase", "Stripe", "Product ownership"],
    href: "/work/pawcircle",
    visual: "pawcircle",
  },
  {
    number: "02",
    label: "FES internship project · Compensation pending",
    title: "Skinstric",
    summary:
      "A responsive AI skin-analysis flow I implemented from supplied designs, assets, APIs, and phased requirements.",
    proof: ["Next.js", "TypeScript", "Browser media", "API integration"],
    href: "/work/skinstric",
    visual: "skinstric",
  },
] as const;

const skills = [
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
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SystemMap() {
  return (
    <div className="system-map" aria-label="Rebecca's build, learn, improve, repeat working loop">
      <div className="system-orbit system-orbit-one" aria-hidden="true" />
      <div className="system-orbit system-orbit-two" aria-hidden="true" />
      <div className="system-grid" aria-hidden="true" />
      <div className="system-core">
        <span>Rebecca Aaland</span>
        <strong>Clear systems.<br />Human outcomes.</strong>
        <small>Rochester, MN</small>
      </div>
      <div className="system-node node-build"><span>01</span><strong>Build</strong></div>
      <div className="system-node node-learn"><span>02</span><strong>Learn</strong></div>
      <div className="system-node node-improve"><span>03</span><strong>Improve</strong></div>
      <div className="system-node node-repeat"><span>04</span><strong>Repeat</strong></div>
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
            <p className="eyebrow hero-eyebrow"><span /> Frontend developer · Web designer · Problem solver</p>
            <h1 id="hero-title">I build the useful path through <em>complicated problems.</em></h1>
            <p className="hero-intro">
              Former science teacher. Business owner. SaaS founder. Now I build
              thoughtful frontend experiences—and bring the communication,
              troubleshooting, and persistence the work demands.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <Arrow />
              </a>
              <Link className="button button-secondary" href="/contact">
                Start a conversation
              </Link>
            </div>
            <div className="hero-status" aria-label="Current availability">
              <span className="status-light" />
              <p>Open to frontend roles, implementation work, and focused website projects.</p>
            </div>
          </div>

          <SystemMap />
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

        <section className="work-section shell" id="work" aria-labelledby="work-title" data-reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2 id="work-title">Proof with the full story attached.</h2>
            </div>
            <p>
              I am not building a highlight reel of perfect endings. These
              projects show implementation, ownership, judgment, and what I do
              when the evidence changes the plan.
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
                      <div className="console-line"><span>OUTCOME</span><strong>Retired responsibly</strong></div>
                      <div className="console-pulse" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="skinstric-scan">
                      <span className="scan-corner scan-one" />
                      <span className="scan-corner scan-two" />
                      <span className="scan-corner scan-three" />
                      <span className="scan-corner scan-four" />
                      <div className="scan-core"><span>FES / INTERNSHIP</span><strong>SKINSTRIC</strong><small>Camera + API + Results</small></div>
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
                    Read the honest case study <Arrow />
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
                <p className="eyebrow">02 / The path here</p>
                <h2 id="journey-title">Different chapters. One useful pattern.</h2>
              </div>
              <p>
                Every chapter taught me to understand a problem, explain it
                clearly, build a response, and improve it with real feedback.
              </p>
            </div>
            <ol className="journey-track">
              <li><span>01</span><strong>Science teacher</strong><p>Turn complexity into understanding.</p></li>
              <li><span>02</span><strong>Business owner</strong><p>Listen closely and earn trust.</p></li>
              <li><span>03</span><strong>SaaS founder</strong><p>Own the entire problem—and the outcome.</p></li>
              <li><span>04</span><strong>Frontend developer</strong><p>Build clear systems people can actually use.</p></li>
            </ol>
          </div>
        </section>

        <section className="services-section" aria-labelledby="services-title" data-reveal>
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / What I bring</p>
                <h2 id="services-title">Technical execution with human context.</h2>
              </div>
              <p>Useful for a development team, an implementation role, or a small business that needs a clearer website.</p>
            </div>
            <div className="service-grid">
              <article><span>01</span><h3>Frontend development</h3><p>Responsive React and Next.js interfaces, typed components, APIs, states, and careful browser behavior.</p></article>
              <article><span>02</span><h3>Implementation &amp; support</h3><p>Requirements, workflow mapping, testing, troubleshooting, documentation, and clear communication with users.</p></article>
              <article><span>03</span><h3>Focused websites</h3><p>Practical sites that clarify an offer, build credibility, and give visitors an obvious next step.</p></article>
            </div>
            <Link className="section-link" href="/services">See services and fit <Arrow /></Link>
          </div>
        </section>

        <section className="principle-section shell" aria-labelledby="principle-title" data-reveal>
          <div className="principle-code" aria-hidden="true">
            <span>while (curious) &#123;</span>
            <strong>build();</strong>
            <strong>learn();</strong>
            <strong>improve();</strong>
            <strong>repeat();</strong>
            <span>&#125;</span>
          </div>
          <div className="principle-copy">
            <p className="eyebrow">04 / Working philosophy</p>
            <h2 id="principle-title">Build. Learn. Improve. Repeat.</h2>
            <p>
              My portfolio is not proof that I know everything. It is proof
              that I can learn difficult systems, make useful things, evaluate
              the result honestly, and keep improving the work.
            </p>
            <Link className="text-link" href="/about">More about how I work <Arrow /></Link>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
          <div className="shell contact-inner">
            <p className="eyebrow"><span className="status-light" /> Available for the right next step</p>
            <h2 id="contact-title">Have a useful problem we should talk about?</h2>
            <p>Tell me about the role, project, or workflow—and what a good outcome would look like.</p>
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
