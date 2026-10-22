import { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rithiksv.dev";
  const staticDate = new Date("2026-10-22T00:00:00Z");

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: staticDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const routes = ["", "/work", "/about", "/stack", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticDate,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.7,
  }));

  return [...routes, ...projectRoutes];
}
