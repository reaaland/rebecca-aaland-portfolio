import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rebecca Aaland about a frontend role, internship, website project, or general inquiry.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="contact-page shell">
          <div className="contact-page-intro">
            <p className="eyebrow">Contact</p>
            <h1>Start with the problem, role, or project.</h1>
            <p>
              A short, specific note is enough. Tell me what you are working
              on, where you are stuck, and what a useful outcome would look
              like.
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
