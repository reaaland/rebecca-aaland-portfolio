import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Aaland Web Design & Business Solutions and rebeccaiaaland.com.",
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
          <p>Effective October 20, 2026</p>
        </section>

        <section className="legal-copy shell">
          <p>
            This policy applies to Aaland Web Design &amp; Business Solutions,
            rebeccaiaaland.com, the Aaland Client Portal,
            and information collected through the website in connection with
            those services.
          </p>

          <h2>Information I collect</h2>
          <p>
            If you contact Aaland Web Design &amp; Business Solutions through this
            website, I may receive information you choose to provide, such as
            your name, email address, business or organization name, website
            address, and the details included in your message.
          </p>
          <p>
            The website and its hosting or security providers may also process
            basic technical information needed to deliver and protect the site,
            such as browser information, device information, IP address, and
            request or error logs.
          </p>

          <h2>Client Portal information</h2>
          <p>
            Approved clients may use the Client Portal to sign in, submit service
            requests, provide business information, and upload photos or
            documents related to requested website work. Portal records may
            include account identifiers, request details, status history,
            completion notes, and uploaded file metadata.
          </p>
          <p>
            Client Portal authentication, database records, and private file
            storage are provided through Supabase. Hosting is provided through
            Vercel. Google may process authentication information when a client
            chooses Google sign-in. Email providers may process addresses and
            message-delivery information when secure sign-in links or portal
            notices are sent.
          </p>

          <p>
            When you begin sending a request, the portal saves its details and
            selected files in this browser so an interrupted submission can be
            retried. Recovery is available on the same device and browser for
            up to seven days. Saved recovery data is removed after successful
            submission or portal sign-out; expired data is removed when checked.
            On a shared device, sign out and clear site data when finished.
          </p>

          <h2>How information is used</h2>
          <p>
            Information is used to respond to inquiries, provide requested
            services, authenticate approved portal users, receive and manage
            client requests, communicate about work, operate and improve the
            website and portal, maintain security, and meet legal or business
            recordkeeping obligations.
          </p>

          <h2>Service providers and third parties</h2>
          <p>
            This website may use service providers for hosting, authentication,
            private file storage, email delivery, analytics, forms, performance,
            and other website functions. Those providers may process
            information as needed to provide their services.
          </p>
          <p>
            The site may also display content or information supplied by Google,
            including Google reviews or business information. Google services
            are governed by Google&apos;s own terms and privacy practices.
          </p>

          <h2>Client files and access</h2>
          <p>
            Client Portal files are stored in a private bucket and are intended
            to be accessible only to the client associated with the request and
            authorized Aaland Web Design &amp; Business Solutions administration.
            Reasonable technical and access controls are used to protect portal
            information, but no online service can guarantee absolute security.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            The site may use cookies or similar technologies when needed for
            authentication, security, analytics, or other website functions. If
            analytics or other tools are added or changed, this policy will be
            updated to reflect material changes in how information is handled.
          </p>

          <h2>How long information is kept</h2>
          <p>
            Inquiry, client, portal, request, and business records may be
            retained for as long as reasonably needed to provide services,
            maintain project and business records, resolve disputes, comply with
            legal obligations, or protect the security and integrity of the
            service. Information that is no longer reasonably needed may be
            deleted or anonymized when appropriate.
          </p>

          <h2>Sharing and selling information</h2>
          <p>
            Personal information is not sold. Information may be shared with
            service providers when necessary to operate the website or portal,
            provide requested services, or when disclosure is required by law.
          </p>

          <h2>Links to other websites</h2>
          <p>
            This site may link to third-party websites. Their privacy practices
            are controlled by those third parties, not Aaland Web Design &amp;
            Business Solutions.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            This website, Client Portal, and services are intended for businesses
            and adults and are not directed to children under 13.
          </p>

          <h2>Your choices</h2>
          <p>
            You may contact me to ask about personal information you previously
            submitted through this website or Client Portal, or to request a
            correction or deletion when appropriate and legally permitted.
          </p>

          <h2>Policy updates</h2>
          <p>
            This policy may be updated as the website, Client Portal, services,
            or third-party tools change. The effective date at the top of this
            page will be updated when material changes are made.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this privacy policy can be sent to{" "}
            <a href="mailto:rebecca@rebeccaiaaland.com">rebecca@rebeccaiaaland.com</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
