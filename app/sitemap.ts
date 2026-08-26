import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/work",
    "/work/pawcircle",
    "/work/ultraverse",
    "/work/skinstric",
    "/work/summarist",
    "/services",
    "/about",
    "/resume",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/work" ? 0.9 : 0.7,
  }));
}
