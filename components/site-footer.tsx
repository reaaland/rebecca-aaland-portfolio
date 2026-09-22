import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div>
        <strong>
          <span aria-hidden="true">[RA]</span> Aaland Web Design &amp; Site Care
        </strong>
        <span>Web design · Updates · Ongoing support</span>
      </div>

      <p>
        Based in Rochester, Minnesota. Working with small businesses locally and beyond.
      </p>

      <nav aria-label="Footer navigation">
        <Link href="/services">Services</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/work">Work</Link>
        <Link href="/site-care">Site Care</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/portfolio">Developer Portfolio</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href="#top">Back to top ↑</a>
      </nav>
    </footer>
  );
}
