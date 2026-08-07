"use client";

import { useEffect, useState } from "react";

export function ExperienceIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = window.sessionStorage.getItem("rebecca-intro-seen");

    if (reduceMotion || hasSeenIntro) {
      const hideTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("rebecca-intro-seen", "true");
      setVisible(false);
    }, 1050);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="experience-intro" aria-hidden="true">
      <div className="intro-shell">
        <div className="intro-topline">
          <span>[RA] / PORTFOLIO</span>
          <span>INITIALIZING</span>
        </div>
        <div className="intro-skeleton intro-skeleton-wide" />
        <div className="intro-skeleton intro-skeleton-medium" />
        <div className="intro-progress"><span /></div>
        <p>Build. Learn. Improve. Repeat.</p>
      </div>
    </div>
  );
}
