"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Rebecca Aaland home">
        <span className="wordmark-logo-wrap" aria-hidden="true">
          <Image
            src="/rebecca-aaland-logo.png"
            alt=""
            width={46}
            height={46}
            className="wordmark-logo wordmark-logo-light"
            priority
          />
          <Image
            src="/rebecca-aaland-logo-dark.png"
            alt=""
            width={46}
            height={46}
            className="wordmark-logo wordmark-logo-dark"
            priority
          />
        </span>

        <span className="wordmark-name">Rebecca Aaland</span>
      </Link>

      <button
        ref={menuButtonRef}
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={`primary-nav ${menuOpen ? "primary-nav-open" : ""}`}
        aria-label="Primary navigation"
      >
        <Link href="/work" onClick={() => setMenuOpen(false)}>
          Work
        </Link>

        <Link href="/services" onClick={() => setMenuOpen(false)}>
          Services
        </Link>

        <Link href="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        <div className="mobile-theme-row">
          <ThemeToggle />
        </div>

        <Link
          className="nav-cta"
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Discuss a website <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
