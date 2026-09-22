"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Work", "/work"],
  ["Site Care", "/site-care"],
  ["About", "/about"],
] as const;

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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Aaland Web Design and Site Care home">
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
        <span className="wordmark-name">Aaland Web Design &amp; Site Care</span>
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
        {links.map(([label, href]) => (
          <Link href={href} key={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}

        <div className="mobile-theme-row">
          <ThemeToggle />
        </div>

        <Link
          className="nav-cta"
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
