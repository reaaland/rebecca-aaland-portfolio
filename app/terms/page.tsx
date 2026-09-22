import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Website terms of use for Aaland Web Design & Site Care and rebeccaiaaland.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="page-hero shell">
          <p className="eyebrow">Terms</p>
          <h1>Terms of Service</h1>
          <p>Effective September 22, 2026</p>
        </section>

        <section className="legal-copy shell">
          <h2>Website use</h2>
          <p>
            This website provides general information about Aaland Web Design &
            Site Care, Rebecca Aaland&apos;s work, services, pricing, portfolio,
            and ways to get in touch. You may use the site for lawful personal
            or business purposes.
          </p>

          <h2>Service information and pricing</h2>
          <p>
            Website descriptions and starting prices are provided for general
            planning purposes. A project is not accepted and a final price is
            not established until the project scope, timing, responsibilities,
            and payment terms are agreed to in writing.
          </p>

          <h2>Client agreements control project work</h2>
          <p>
            If you hire Aaland Web Design & Site Care, the proposal, statement
            of work, contract, invoice terms, or other written client agreement
            for that project controls if it conflicts with these website terms.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Unless otherwise noted, the design, original text, graphics, and
            other original material on this website are owned by Rebecca Aaland
            or used with permission. Client names, trademarks, logos, reviews,
            screenshots, and other third-party materials remain the property of
            their respective owners.
          </p>

          <h2>Portfolio and review content</h2>
          <p>
            Portfolio examples and client feedback are presented to describe
            prior work and experiences. Results vary by project, business,
            market, platform, and other factors. Reviews or business information
            supplied by third-party platforms may be subject to the terms of
            those platforms.
          </p>

          <h2>Third-party services and links</h2>
          <p>
            This site may link to or display information from third-party
            services. Aaland Web Design & Site Care does not control those
            services and is not responsible for their availability, content,
            policies, or security.
          </p>

          <h2>No guarantee of uninterrupted availability</h2>
          <p>
            Reasonable care is taken to keep this website accurate and
            available, but no guarantee is made that every page, feature, link,
            or third-party integration will always be available or error-free.
          </p>

          <h2>Limitation</h2>
          <p>
            To the extent permitted by law, Aaland Web Design & Site Care is not
            responsible for indirect or consequential loss arising solely from
            use of this informational website or reliance on third-party content
            displayed here.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            These terms may be updated as the website or services change. The
            effective date at the top of the page will reflect material updates.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
