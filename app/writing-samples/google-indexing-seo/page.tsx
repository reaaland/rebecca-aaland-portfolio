import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { PortfolioHeader } from "@/components/portfolio-header";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Why a New Website May Not Show Up in Google | SEO Writing Sample",
  description:
    "SEO writing demonstration explaining crawling, indexing, Search Console, sitemaps, and realistic expectations for a new website.",
  path: "/writing-samples/google-indexing-seo",
});

export default function GoogleIndexingSeoSamplePage() {
  return (
    <>
      <PortfolioHeader />
      <main className="business-main service-theme-tech">
        <section className="page-hero shell" data-reveal>
          <p className="eyebrow">Writing Sample · SEO Article</p>
          <h1>Why Your New Website May Not Show Up in Google Right Away</h1>
          <p>
            You launched the site, searched for the business, and expected to see it.
            Instead, another company appears — or your site seems to be missing altogether.
            That does not automatically mean something is broken.
          </p>
        </section>

        <article className="legal-copy shell">
          <p>
            One of the most frustrating parts of launching a website is that Google
            does not work like a light switch. Publishing the site makes it available
            on the web. It does not mean Google has already found every page, processed
            the information, decided where it belongs in search results, and ranked it
            for the exact phrase a customer happens to type.
          </p>
          <p>
            If a new or recently updated website is not showing up the way you expect,
            start by separating three different questions: <strong>Can Google crawl the
            page? Has Google indexed it? And how is it ranking?</strong>
          </p>

          <h2>First: crawling is how Google discovers the page</h2>
          <p>
            Google uses automated crawlers to discover and revisit pages on the web.
            Links, sitemaps, and previously known URLs can all help Google find content.
            For a brand-new site, discovery may take time simply because Google has not
            had a reason to visit it yet.
          </p>
          <p>
            Google&apos;s own documentation says a recrawl can take from a few days to a
            few weeks. That is why making an SEO change at 8 p.m. and testing the same
            search at 8:10 p.m. is not a meaningful measure of whether the work helped.
          </p>

          <h2>Second: indexing is not the same as crawling</h2>
          <p>
            A page can be discovered without necessarily being selected for Google&apos;s
            index. Search Console&apos;s URL Inspection tool helps you check an individual
            URL and see whether Google knows about it and whether an indexing issue is
            being reported.
          </p>
          <p>
            You can request indexing for an important new or substantially changed page,
            but the request is exactly that — a request. Google does not guarantee that
            a page will be indexed immediately or at all, and repeatedly resubmitting the
            same URL does not speed the process up.
          </p>

          <h2>Third: being indexed does not guarantee a top ranking</h2>
          <p>
            This is where expectations often get tangled. A page can be technically
            healthy and indexed and still not appear near the top for a competitive term
            such as &quot;concrete contractor&quot; or &quot;landscaping company.&quot; Ranking depends on
            more than whether the website exists.
          </p>
          <p>
            Search intent, the usefulness and relevance of the page, local signals,
            competition, links, business information, and many other factors can affect
            visibility. SEO work can improve the signals a site sends, but responsible
            SEO should not promise an exact position or an overnight result.
          </p>

          <h2>What I would check first</h2>
          <ul>
            <li>
              <strong>Can the site be opened publicly?</strong> If visitors can&apos;t reach
              it without signing in, search engines may have the same problem.
            </li>
            <li>
              <strong>Is the correct site in Search Console?</strong> Make sure the
              property matches the live domain and protocol you are actually using.
            </li>
            <li>
              <strong>Has ownership been verified?</strong> Without verification, you
              cannot use the full set of Search Console tools for the property.
            </li>
            <li>
              <strong>Is there a sitemap?</strong> A sitemap gives Google a structured
              list of the URLs you want it to discover.
            </li>
            <li>
              <strong>What does URL Inspection say?</strong> Check the homepage and the
              most important service pages individually.
            </li>
            <li>
              <strong>Is the page accidentally marked noindex?</strong> A noindex rule
              tells search engines not to include the page in results.
            </li>
            <li>
              <strong>Does the page clearly explain what the business does and where it
              serves customers?</strong> Technical setup matters, but so does the content
              Google and potential customers actually read.
            </li>
          </ul>

          <h2>A sitemap helps, but it is not a fast-pass ticket</h2>
          <p>
            Google recommends sitemaps as a way to tell it about new and updated URLs,
            and they are especially useful for a newly launched site. Submitting a sitemap
            through Search Console also gives you a place to see whether Google was able
            to process it.
          </p>
          <p>
            What a sitemap does not do is force Google to crawl every URL immediately.
            Google describes a submitted sitemap as a hint, not a guarantee.
          </p>

          <h2>Give SEO changes enough time to be measurable</h2>
          <p>
            After fixing technical issues and improving page content, monitor what happens
            instead of judging the work from one manual search. Search Console can show
            impressions, clicks, indexing information, and the search queries that are
            beginning to connect people with the site.
          </p>
          <p>
            If nothing changes after Google has had time to recrawl the site, then there is
            useful information to investigate. Maybe the target phrase is too broad. Maybe
            a service page needs more substance. Maybe local business information is weak
            or inconsistent. Maybe a competitor is paying for a sponsored placement that
            looks similar to an organic result. Those are different problems, and each one
            calls for a different solution.
          </p>

          <h2>The short version</h2>
          <p>
            A new website not appearing immediately in Google is not unusual. Confirm that
            Google can access the site, verify Search Console, submit the sitemap, inspect
            important URLs, fix real indexing problems, and then allow time for Google to
            process the changes. After that, use actual search-performance data to decide
            what should be improved next.
          </p>
          <p>
            The goal is not to promise instant visibility. It is to make sure the website
            is technically discoverable, useful to the people searching for the service,
            and steadily giving Google clearer information about what the business offers.
          </p>

          <h2>Source notes</h2>
          <p>
            This demonstration article was researched using current Google Search Central
            and Search Console documentation on crawling, indexing requests, sitemaps,
            property setup, and noindex directives.
          </p>
          <p>
            <a href="https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl" target="_blank" rel="noreferrer">
              Google: Ask Google to recrawl URLs ↗
            </a>
            <br />
            <a href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap" target="_blank" rel="noreferrer">
              Google: Build and submit a sitemap ↗
            </a>
            <br />
            <a href="https://developers.google.com/search/docs/crawling-indexing/block-indexing" target="_blank" rel="noreferrer">
              Google: Block indexing with noindex ↗
            </a>
          </p>

          <p>
            <strong>Portfolio note:</strong> This is a current demonstration sample,
            not a client article.
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
