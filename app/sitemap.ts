import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = ["/services", "/pricing", "/site-care", "/work"];
  const routes = [
    "", ...serviceRoutes,
    "/work/minnlawn", "/work/mos", "/about", "/contact", "/privacy", "/terms",
    "/portfolio", "/work/pawcircle", "/work/ultraverse", "/work/skinstric",
    "/writing-samples", "/writing-samples/search-console-guide",
    "/writing-samples/google-indexing-seo", "/writing-samples/usb-c-hub-product",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" || serviceRoutes.includes(route) ? "monthly" : "yearly",
    priority: route === "" ? 1 : serviceRoutes.includes(route) ? 0.9 : 0.7,
  }));
}
