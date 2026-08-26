import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";
import { ContactForm } from "./contact-form";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Rebecca Aaland about frontend opportunities or local and remote website projects.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="contact-page shell" data-reveal>
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Let’s Talk About What’s Next.</h1>
            <p>
              Choose the path that fits best: a frontend opportunity, a website
              project, or a general question. Each option asks only for the
              details that are useful for that conversation.
            </p>
            <div className="direct-email">
              <span>Prefer direct email?</span>
              <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
