import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Rebecca Aaland home">
        <span className="wordmark-mark" aria-hidden="true">RA</span>
        <span className="wordmark-name">Rebecca Aaland</span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        <Link href="/work">Work</Link>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <ThemeToggle />
        <Link className="nav-cta" href="/contact">
          Discuss a website <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
