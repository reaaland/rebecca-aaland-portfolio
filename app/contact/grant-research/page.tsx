import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "../contact-form";

export const metadata = createPageMetadata({
  title: "Grant Research & Writing Inquiry",
  description: "Start with the organization, project, funding goal, and any deadline you already know about. You do not need to identify the right grant before reaching out.",
  path: "/contact/grant-research",
});

export default function ServiceContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Tell me about the organization and funding need.</h1>
            <p>
              Start with the organization, project, funding goal, and any deadline you already know about. You do not need to identify the right grant before reaching out.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
            </div>
          </div>
          <ContactForm initialInquiryType="grant" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
