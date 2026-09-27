import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "../contact-form";

export const metadata = createPageMetadata({
  title: "Technical Writing Inquiry",
  description: "Share the documentation, process, audience, or material you need help organizing. You can start with rough notes, an existing document, or simply describe the problem.",
  path: "/contact/technical-writing",
});

export default function ServiceContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Tell me what needs to be clearer.</h1>
            <p>
              Share the documentation, process, audience, or material you need help organizing. You can start with rough notes, an existing document, or simply describe the problem.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
            </div>
          </div>
          <ContactForm initialInquiryType="technical" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
