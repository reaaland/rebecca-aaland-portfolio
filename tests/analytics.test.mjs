import test from "node:test";
import assert from "node:assert/strict";
import { MEASUREMENT_ID, gateAnalyticsNavigation, safeReferrer, shouldMeasure, syncAnalytics } from "../lib/analytics.ts";

const disabledKey = `ga-disable-${MEASUREMENT_ID}`;

function browserFixture(path = "/", hostname = "www.rebeccaiaaland.com") {
  const scripts = [];
  const browser = {
    location: { hostname, origin: `https://${hostname}`, href: `https://${hostname}${path}` },
    navigator: {},
  };
  const document = {
    referrer: "https://www.rebeccaiaaland.com/portal/requests/private-id?token=secret",
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
  };
  return { browser, document, scripts };
}

test("portal, auth, unknown routes and preview hosts do not load analytics", () => {
  for (const path of ["/portal/login", "/portal/admin/requests/secret", "/portal-auth-test", "/api/contact", "/unknown/private-id"]) {
    const { browser, document, scripts } = browserFixture(path);
    syncAnalytics(browser, document, path);
    assert.equal(browser[disabledKey], true);
    assert.equal(scripts.length, 0);
    assert.equal(browser.dataLayer, undefined);
  }
  for (const host of ["localhost", "rebecca-aaland-portfolio.vercel.app", "www.rebeccaiaaland.com.example.org"]) {
    assert.equal(shouldMeasure(host, "/"), false);
  }
});

test("public pages initialize the existing measurement ID once without manual pageviews", () => {
  const { browser, document, scripts } = browserFixture("/contact?email=private@example.com");
  syncAnalytics(browser, document, "/contact");
  syncAnalytics(browser, document, "/pricing");
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`);
  const commands = browser.dataLayer.map(value => Array.from(value));
  assert.equal(commands.length, 2);
  assert.equal(commands[1][0], "config");
  assert.equal(commands[1][1], MEASUREMENT_ID);
  assert.equal(commands[1][2].page_location, "https://www.rebeccaiaaland.com/contact");
  assert.equal(commands[1][2].page_referrer, "");
  assert.equal(commands[1][2].allow_google_signals, false);
  assert.equal(commands[1][2].allow_ad_personalization_signals, false);
  assert.equal(commands.some(command => command[0] === "event"), false);
});

test("public-to-portal navigation disables an already initialized tag before history changes", () => {
  const { browser, document, scripts } = browserFixture();
  syncAnalytics(browser, document, "/");
  gateAnalyticsNavigation(browser, "/portal/login?code=private");
  assert.equal(browser[disabledKey], true);
  syncAnalytics(browser, document, "/portal/login");
  assert.equal(browser[disabledKey], true);
  gateAnalyticsNavigation(browser, "/services");
  assert.equal(browser[disabledKey], false);
  syncAnalytics(browser, document, "/services");
  assert.equal(scripts.length, 1);
});

test("Do Not Track and Global Privacy Control suppress both loading and re-enabling", () => {
  for (const privacy of [{ doNotTrack: "1" }, { globalPrivacyControl: true }]) {
    const { browser, document, scripts } = browserFixture();
    Object.assign(browser.navigator, privacy);
    syncAnalytics(browser, document, "/");
    gateAnalyticsNavigation(browser, "/pricing");
    assert.equal(browser[disabledKey], true);
    assert.equal(scripts.length, 0);
  }
});

test("initial referrers omit private internal routes, credentials, queries and fragments", () => {
  assert.equal(safeReferrer("https://www.rebeccaiaaland.com/portal/requests/secret"), "");
  assert.equal(safeReferrer("https://www.rebeccaiaaland.com/pricing?email=private#secret"), "https://www.rebeccaiaaland.com/pricing");
  assert.equal(safeReferrer("https://user:secret@example.com/private?email=private#secret"), "https://example.com");
  assert.equal(safeReferrer("javascript:alert(1)"), "");
  assert.equal(safeReferrer(""), "");
});
