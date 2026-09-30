import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "../contact-form";

export const metadata = createPageMetadata({
  title: "Website Support Inquiry",
  description: "Share the current website and the kind of help you expect to need. I can help determine whether $100/month Site Care or $75/hour as-needed support fits better.",
  path: "/contact/site-care",
});

export default function ServiceContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Tell me what kind of website support you need.</h1>
            <p>
              Share the current website and the kind of help you expect to need. I can help determine whether $100/month Site Care or $75/hour as-needed support fits better.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
            </div>
          </div>
          <ContactForm initialInquiryType="care" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
