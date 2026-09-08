import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div>
        <strong>
          <span aria-hidden="true">[RA]</span> Rebecca Aaland
        </strong>
        <span>Frontend Developer</span>
      </div>
      <p>
        Independent client work through{" "}
        <a
          href="https://www.pawcirclellc.com"
          target="_blank"
          rel="noreferrer"
        >
          PawCircle LLC
        </a>
        .
      </p>
      <nav aria-label="Footer navigation">
        <Link href="/resume">Résumé</Link>

        <a
          href="https://github.com/reaaland"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/rebecca-aaland-494169411"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        <a
          href="https://www.pawcirclellc.com"
          target="_blank"
          rel="noreferrer"
        >
          PawCircle LLC
        </a>

        <Link href="/contact">Contact</Link>

        <a href="#top">Back to top ↑</a>
      </nav>
    </footer>
  );
}
