export const MEASUREMENT_ID = "G-NBPCCCC8M8";
const DISABLED_KEY = `ga-disable-${MEASUREMENT_ID}` as const;
const SITE_ORIGIN = "https://www.rebeccaiaaland.com";

const publicPaths = new Set([
  "/", "/about", "/services", "/pricing", "/site-care", "/work",
  "/work/minnlawn", "/work/mos", "/work/skinstric", "/work/summarist",
  "/work/ultraverse", "/portfolio", "/resume", "/contact",
  "/contact/website", "/contact/site-care", "/contact/technical-writing",
  "/contact/grant-research", "/privacy", "/terms", "/writing-samples",
  "/writing-samples/search-console-guide", "/writing-samples/google-indexing-seo",
  "/writing-samples/usb-c-hub-product",
]);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    "ga-disable-G-NBPCCCC8M8"?: boolean;
    awdbsAnalyticsInitialized?: boolean;
  }
}

export function shouldMeasure(hostname: string, pathname: string, optedOut = false) {
  return !optedOut && hostname === "www.rebeccaiaaland.com" && publicPaths.has(pathname);
}

function optedOut(browser: Window) {
  const navigator = browser.navigator as Navigator & { globalPrivacyControl?: boolean };
  return navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;
}

// Limit initial referrer details: private internal paths and URL parameters are omitted.
export function safeReferrer(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    if (url.hostname === "rebeccaiaaland.com" || url.hostname === "www.rebeccaiaaland.com") {
      return publicPaths.has(url.pathname) ? `${SITE_ORIGIN}${url.pathname}` : "";
    }
    return url.origin;
  } catch {
    return "";
  }
}

export function updateAnalyticsGate(browser: Window, pathname: string) {
  const enabled = shouldMeasure(browser.location.hostname, pathname, optedOut(browser));
  browser[DISABLED_KEY] = !enabled;
  return enabled;
}

export function syncAnalytics(browser: Window, document: Document, pathname: string) {
  if (!updateAnalyticsGate(browser, pathname) || browser.awdbsAnalyticsInitialized) return;

  browser.dataLayer ??= [];
  browser.gtag ??= function () {
    // Google's command queue uses an Arguments object, not an event object.
    // eslint-disable-next-line prefer-rest-params
    browser.dataLayer!.push(arguments);
  };
  browser.gtag("js", new Date());
  browser.gtag("config", MEASUREMENT_ID, {
    page_location: `${SITE_ORIGIN}${pathname}`,
    page_referrer: safeReferrer(document.referrer),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  browser.awdbsAnalyticsInitialized = true;

  const script = document.createElement("script");
  script.id = "awdbs-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function gateAnalyticsNavigation(browser: Window, href: string) {
  const destination = new URL(href, browser.location.href);
  if (destination.origin === browser.location.origin) {
    updateAnalyticsGate(browser, destination.pathname);
  }
}
