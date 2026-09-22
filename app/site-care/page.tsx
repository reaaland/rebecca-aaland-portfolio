import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Website Site Care",
  description:
    "Ongoing website support, routine checks, and small updates for businesses that want someone to keep their site taken care of.",
  path: "/site-care",
});

const included = [
  "Routine website checks",
  "Help with website questions",
  "Up to one hour each month for small updates",
  "Text, photo, link, service, and contact-information changes",
  "A clear heads-up before work falls outside the monthly plan",
] as const;

const separate = [
  "New pages or major page rebuilds",
  "Redesign projects",
  "New integrations or advanced functionality",
  "Large SEO projects",
  "Major content writing or photo sourcing",
] as const;

export default function SiteCarePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Site Care</p>
          <h1>You should not have to rebuild your website every time something changes.</h1>
          <p>
            Site Care is for businesses that want a reliable person to keep an
            eye on the website and handle routine changes without turning every
            update into a new project.
          </p>
        </section>

        <section className="service-detail-list shell">
          <article data-reveal>
            <div className="service-detail-heading">
              <span>$99</span>
              <h2>Monthly Site Care</h2>
            </div>
            <p className="service-fit">
              $99 per month. Includes routine support and up to one hour of small
              website updates each month. Unused update time does not roll over.
            </p>
            <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article data-reveal>
            <div className="service-detail-heading">
              <span>+</span>
              <h2>Larger work stays clear.</h2>
            </div>
            <p className="service-fit">
              Site Care is meant for ongoing small changes, not unlimited redesign
              or development work. Larger requests are priced before I start them.
            </p>
            <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
              {separate.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">A practical starting point</p>
          <h2>Already have a website?</h2>
          <p>
            Send the link and tell me what you regularly need help with. I can
            tell you whether Site Care makes sense or whether occasional updates
            would be a better fit.
          </p>
          <Link className="button button-dark" href="/contact">
            Ask about Site Care ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
