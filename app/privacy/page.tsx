import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Aaland Web Design & Site Care and rebeccaiaaland.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main">
        <section className="page-hero shell">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>
          <p>Effective September 22, 2026</p>
        </section>

        <section className="legal-copy shell">
          <p>
            Aaland Web Design &amp; Site Care is operated by PawCircle LLC. This
            policy applies to rebeccaiaaland.com and information collected
            through the website in connection with those services.
          </p>

          <h2>Information I collect</h2>
          <p>
            If you contact Aaland Web Design & Site Care through this website,
            I may receive information you choose to provide, such as your name,
            email address, business or organization name, website address, and
            the details included in your message.
          </p>
          <p>
            The website and its hosting or security providers may also process
            basic technical information needed to deliver and protect the site,
            such as browser information, device information, IP address, and
            request or error logs.
          </p>

          <h2>How information is used</h2>
          <p>
            Information is used to respond to inquiries, discuss or provide
            services, operate and improve the website, maintain security, and
            meet legal or business recordkeeping obligations.
          </p>

          <h2>Service providers and third parties</h2>
          <p>
            This website may use service providers for hosting, email delivery,
            analytics, forms, performance, and other website functions. Those
            providers may process information only as needed to provide their
            services.
          </p>
          <p>
            The site may also display content or information supplied by Google,
            including Google reviews or business information. Google services
            are governed by Google&apos;s own terms and privacy practices.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            The site may use cookies or similar technologies if analytics or
            other website tools are enabled. If analytics are added or changed,
            this policy will be updated to reflect the tools in use.
          </p>

          <h2>How long information is kept</h2>
          <p>
            Inquiry and business records may be retained for as long as they are
            reasonably needed to respond, provide services, maintain records,
            resolve disputes, or comply with legal obligations.
          </p>

          <h2>Sharing and selling information</h2>
          <p>
            Personal information is not sold. Information may be shared with
            service providers when necessary to operate the website or provide
            requested services, or when disclosure is required by law.
          </p>

          <h2>Links to other websites</h2>
          <p>
            This site may link to third-party websites. Their privacy practices
            are controlled by those third parties, not Aaland Web Design & Site
            Care.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            This website and its services are intended for businesses and adults
            and are not directed to children under 13.
          </p>

          <h2>Your choices</h2>
          <p>
            You may contact me to ask about personal information you previously
            submitted through this website or to request a correction or
            deletion when appropriate and legally permitted.
          </p>

          <h2>Policy updates</h2>
          <p>
            This policy may be updated as the website, services, or third-party
            tools change. The effective date at the top of this page will be
            updated when material changes are made.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this privacy policy can be sent to{" "}
            <a href="mailto:reaaland@gmail.com">reaaland@gmail.com</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
