import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rebeccaiaaland.com";
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
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/work" ? 0.9 : 0.7,
  }));
}
