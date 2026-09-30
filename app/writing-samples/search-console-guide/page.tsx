import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Google Search Console Setup After Launch | Writing Sample",
  description:
    "Technical writing demonstration: a practical Google Search Console setup and troubleshooting guide for small-business websites.",
  path: "/writing-samples/search-console-guide",
});

export default function SearchConsoleGuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="business-main service-theme-tech">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Writing Sample · Technical Documentation</p>
          <h1>Google Search Console Setup After a Website Launch</h1>
          <p>
            A practical guide for a small-business owner or team member who wants
            to confirm that Google can find the site and understand what happens next.
          </p>
        </section>

        <article className="legal-copy shell">
          <p>
            Launching a website does not automatically mean Google has already
            discovered every page. Google Search Console gives you a place to
            verify ownership of the site, submit a sitemap, inspect important URLs,
            and see whether Google is able to crawl and index your content.
          </p>

          <h2>Before you start</h2>
          <p>
            You will need a Google account and access to either the website or the
            domain&apos;s DNS settings. If someone else manages the domain, you may
            need that person&apos;s help with verification.
          </p>

          <h2>1. Add the website as a Search Console property</h2>
          <p>
            In Search Console, choose <strong>Add property</strong>. Google offers
            two common property types: Domain and URL-prefix.
          </p>
          <p>
            A <strong>Domain property</strong> covers the domain across protocols
            and subdomains, such as both www and non-www versions. It requires DNS
            verification. A <strong>URL-prefix property</strong> covers only the
            exact prefix you enter, including the protocol, but it gives you more
            verification options.
          </p>
          <p>
            For a small business with access to its DNS records, I generally prefer
            a Domain property because it keeps the site&apos;s data together instead
            of splitting versions of the domain into separate properties.
          </p>

          <h2>2. Verify ownership</h2>
          <p>
            Follow the verification method Search Console provides. For a Domain
            property, this normally means adding the TXT or CNAME record Google
            gives you to your domain&apos;s DNS records. Copy the value exactly.
          </p>
          <p>
            DNS changes are not always visible immediately. If verification fails
            right after you add the record, confirm that the record was entered in
            the correct domain and try again after the DNS change has had time to
            propagate. Do not remove the verification record after setup; Google
            periodically checks that the verification token is still valid.
          </p>

          <h2>3. Submit the sitemap</h2>
          <p>
            A sitemap gives Google a structured list of URLs you want it to know
            about. Many website platforms generate one automatically. Once you know
            the sitemap address, open the <strong>Sitemaps</strong> report in Search
            Console and submit it.
          </p>
          <p>
            A sitemap is a useful discovery signal, especially for a new website,
            but it is not a command. Submitting one does not guarantee that every
            listed page will be crawled or indexed immediately.
          </p>

          <h2>4. Inspect the most important pages</h2>
          <p>
            Use the <strong>URL Inspection</strong> tool for the homepage and other
            high-priority pages. Enter the full URL and review what Search Console
            reports. This is where you can see whether Google knows about the URL
            and whether there are indexing issues that need attention.
          </p>
          <p>
            If a page is new or has changed significantly, you can use
            <strong>Request indexing</strong>. Save this for important URLs rather
            than repeatedly submitting the same page. Sending the request again and
            again does not make Google crawl it faster.
          </p>

          <h2>5. Give Google time to process the site</h2>
          <p>
            This is the step that is easiest to underestimate. Google says crawling
            can take anywhere from a few days to a few weeks. A request to crawl a
            page is not a promise that the page will appear in search results, and
            Search Console cannot guarantee a particular ranking.
          </p>
          <p>
            Instead of checking the same search every hour, use Search Console to
            monitor the site over time. Look for indexing problems, confirm that the
            sitemap can be read, and watch for search impressions and clicks as data
            begins to accumulate.
          </p>

          <h2>Common problems to check</h2>
          <ul>
            <li>
              <strong>The wrong property was added.</strong> A URL-prefix property
              for http does not automatically include https, and www and non-www
              versions can also be separate.
            </li>
            <li>
              <strong>DNS verification is failing.</strong> Confirm that the record
              matches Google&apos;s value exactly and that it was added to the correct domain.
            </li>
            <li>
              <strong>The sitemap cannot be read.</strong> Open the sitemap URL in a
              browser and confirm that it loads publicly.
            </li>
            <li>
              <strong>A page is intentionally or accidentally blocked.</strong>
              Check for a noindex directive or other crawl/indexing restrictions.
            </li>
            <li>
              <strong>The page was just published.</strong> A delay by itself does
              not mean the website is broken.
            </li>
          </ul>

          <h2>What Search Console can — and cannot — do</h2>
          <p>
            Search Console helps you see how Google interacts with your site and
            gives you tools to make discovery easier. It does not buy placement,
            force an index, or guarantee that a page will rank for a competitive
            search term. Those are separate questions from whether Google can find
            and process the site correctly.
          </p>

          <h2>Source notes</h2>
          <p>
            This demonstration guide was researched against Google&apos;s current
            Search Console and Search Central documentation, including property
            setup, ownership verification, sitemap submission, URL Inspection, and
            recrawl guidance.
          </p>
          <p>
            <a href="https://support.google.com/webmasters/answer/34592" target="_blank" rel="noreferrer">
              Google: Add a property to Search Console ↗
            </a>
            <br />
            <a href="https://support.google.com/webmasters/answer/9008080" target="_blank" rel="noreferrer">
              Google: Verify site ownership ↗
            </a>
            <br />
            <a href="https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl" target="_blank" rel="noreferrer">
              Google: Ask Google to recrawl URLs ↗
            </a>
            <br />
            <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" target="_blank" rel="noreferrer">
              Google: Build and submit a sitemap ↗
            </a>
          </p>

          <p>
            <strong>Portfolio note:</strong> This is a current demonstration sample,
            not client documentation.
          </p>

          <p>
            <Link className="text-link" href="/writing-samples">
              ← Back to writing samples
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
