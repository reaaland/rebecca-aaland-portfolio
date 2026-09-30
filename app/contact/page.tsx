import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "./contact-form";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Rebecca Aaland about web design, Site Care, technical writing, grant research, business support, or a development opportunity.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Tell me what you need to work better.</h1>
            <p>
              A finished plan is not required. Start with what you have now,
              what is not working, what needs to be clearer, or what you are
              trying to accomplish. I can help figure out the practical next step.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:rebecca@rebeccaiaaland.com">
                rebecca@rebeccaiaaland.com
              </a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
