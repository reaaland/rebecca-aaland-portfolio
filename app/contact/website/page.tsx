import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "../contact-form";

export const metadata = createPageMetadata({
  title: "Website Inquiry",
  description: "Start with the current site, the problem, or the change you want. You do not need to diagnose the technical solution first.",
  path: "/contact/website",
});

export default function ServiceContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Tell me what you need the website to do better.</h1>
            <p>
              Start with the current site, the problem, or the change you want. You do not need to diagnose the technical solution first.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:rebecca@rebeccaiaaland.com">
                rebecca@rebeccaiaaland.com
              </a>
            </div>
          </div>
          <ContactForm initialInquiryType="website" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
