import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Monthly Website Care — $100/month",
  description:
    "Monthly website checks, up to 60 minutes of small updates, written support, and a short monthly summary for one website. $100/month.",
  path: "/site-care",
});

const careSections = [
  {
    label: "$100",
    title: "Monthly Site Care",
    text: "For one small-business website. Each month includes a website check, a short written summary, and up to 60 minutes of small updates. The check and summary do not reduce your update allowance.",
    details: [
      "Check main pages, navigation, important links, and key pages on mobile",
      "Test the main contact or quote form, including delivery where access is available",
      "Receive a brief summary of checks, completed changes, and anything needing attention, even in months with no edits",
      "Existing websites are welcome, subject to a review of the platform, condition, and access needed",
    ],
  },
  {
    label: "01",
    title: "Small updates, handled for you.",
    text: "Use your 60 minutes for several small requests or one focused update to existing pages. Send the final wording and photos you want to use; I handle the website changes.",
    details: [
      "Update text, hours, services, prices, links, or contact information",
      "Replace photos or add seasonal announcements within an existing layout",
      "Resize and compress supplied replacement photos as part of the update time",
      "Testing and publishing requested changes count toward the allowance; unused time does not roll over",
    ],
  },
  {
    label: "02",
    title: "A clear way to get help.",
    text: "Send requests by email, or through the client portal when access is provided. Brief website questions are included. Hands-on troubleshooting or investigation uses your monthly allowance.",
    details: [
      "Receive a reply and next step within two business days, Monday–Friday, excluding holidays",
      "Most small updates are completed within three to five business days after all needed content and access arrive; timing is confirmed for each request",
      "Portal access, when provided, keeps instructions, photos, and request status together",
      "If a check finds a problem, I explain the next step; repairs use available update time or a separate approved quote",
    ],
  },
  {
    label: "+",
    title: "Know what costs extra.",
    text: "Larger work is quoted before it begins. The monthly plan covers routine care for a small-business website; custom applications and more involved support need their own scope.",
    details: [
      "New pages, redesigns, new integrations, and advanced functionality",
      "Substantial copywriting, photo sourcing, grant work, and ongoing SEO campaigns",
      "Major repairs, complex database or membership-app support, and emergency or after-hours service",
      "Hosting, domain renewals, and paid software are separate unless your written agreement includes them",
    ],
  },
  {
    label: "03",
    title: "Simple monthly terms.",
    text: "Site Care is $100 per month, month to month. Cancel in writing before the next renewal to stop future billing. Your agreement confirms the start date and billing details.",
    details: [
      "One reviewed website per plan",
      "New website packages include Site Care after launch: 3 months with Simple Website, 6 months with Small Business Website, and 12 months with Custom Business Website",
      "When the included period ends, you can choose to continue month to month at $100; paid Site Care does not begin automatically",
      "No extra-cost work begins without your approval",
      "Scheduled monthly checks; continuous monitoring, security management, and backup services are not included unless separately agreed",
      "If you rarely need help, occasional paid updates may be a better fit",
    ],
  },
] as const;

export default function SiteCarePage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Site Care</p>
          <h1>You should not have to rebuild your website every time something changes.</h1>
          <p>
            Site Care is for businesses that want a reliable person to keep an
            eye on the website and handle routine changes without turning every
            update into a new project. New website packages include an initial
            Site Care period after launch, based on the package you choose.
          </p>
        </section>

        <section className="service-detail-list shell" aria-label="Site Care inclusions and expectations">
          {careSections.map((section) => (
            <article key={section.title} data-reveal>
              <div className="service-detail-heading">
                <span>{section.label}</span>
                <h2>{section.title}</h2>
              </div>
              <p className="service-fit">{section.text}</p>
              <ul className="border-l border-[color:var(--line)] pl-8 max-[680px]:border-l-0 max-[680px]:pl-[18px]">
                {section.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="plain-cta shell" data-reveal>
          <p className="eyebrow">A practical starting point</p>
          <h2>Already have a website?</h2>
          <p>
            Send the link and tell me what you regularly need help with. I can
            tell you whether Site Care makes sense or whether occasional updates
            would be a better fit.
          </p>
          <Link className="button button-dark" href="/contact/site-care">
            Ask about Site Care ↗
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
