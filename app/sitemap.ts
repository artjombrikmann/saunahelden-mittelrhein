import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/impressum", "/datenschutz", "/mietbedingungen"];
  return paths.map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: p === "" ? "weekly" : "yearly",
    priority: p === "" ? 1 : 0.3,
  }));
}
