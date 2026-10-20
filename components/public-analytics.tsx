"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gateAnalyticsNavigation, syncAnalytics, updateAnalyticsGate } from "@/lib/analytics";

export function PublicAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    syncAnalytics(window, document, pathname);

    // Set the gate before Next.js changes browser history. This prevents the
    // existing automatic history measurement from recording portal navigation.
    function beforeNavigation(event: MouseEvent) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (link instanceof HTMLAnchorElement && (!link.target || link.target === "_self")) {
        gateAnalyticsNavigation(window, link.href);
      }
    }

    function onHistoryNavigation() {
      updateAnalyticsGate(window, window.location.pathname);
    }

    document.addEventListener("click", beforeNavigation, true);
    window.addEventListener("popstate", onHistoryNavigation, true);
    return () => {
      document.removeEventListener("click", beforeNavigation, true);
      window.removeEventListener("popstate", onHistoryNavigation, true);
    };
  }, [pathname]);

  return null;
}
