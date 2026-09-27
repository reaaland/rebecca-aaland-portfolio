import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "../contact-form";

export const metadata = createPageMetadata({
  title: "Site Care Inquiry",
  description: "Share the current website and the routine updates or support you expect to need. I can help determine whether monthly Site Care fits.",
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
            <h1>Tell me what kind of website help you need ongoing.</h1>
            <p>
              Share the current website and the routine updates or support you expect to need. I can help determine whether monthly Site Care fits.
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
