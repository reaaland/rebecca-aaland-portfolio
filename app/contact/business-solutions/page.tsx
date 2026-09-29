import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "../contact-form";

export const metadata = createPageMetadata({
  title: "Business Solutions Inquiry",
  description: "Share the task, process, or business information you need help organizing. A short description is enough to start.",
  path: "/contact/business-solutions",
});

export default function ServiceContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Tell me what could work more smoothly.</h1>
            <p>
              Share the task, process, or business information you need help organizing. A short description is enough to start.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
            </div>
          </div>
          <ContactForm initialInquiryType="business" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
