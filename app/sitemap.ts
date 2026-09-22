import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/pricing",
    "/site-care",
    "/work",
    "/work/minnlawn",
    "/work/mos",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/portfolio",
    "/resume",
    "/work/pawcircle",
    "/work/ultraverse",
    "/work/skinstric",
    "/work/summarist",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency:
      route === "" || route === "/pricing" || route === "/site-care"
        ? "monthly"
        : "yearly",
    priority:
      route === ""
        ? 1
        : ["/services", "/pricing", "/site-care", "/work"].includes(route)
          ? 0.9
          : 0.7,
  }));
}
