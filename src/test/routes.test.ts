import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("Routing & SEO Generators", () => {
  it("generates complete sitemap including all static and dynamic project routes", () => {
    const map = sitemap();
    const urls = map.map((m) => m.url);

    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/work");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/about");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/stack");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/contact");

    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/work/champ-virtual-physics-lab");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/work/panic-delivery");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/work/clientlaunch");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/work/mic-learning-path");
    expect(urls).toContain("https://developer-portfolio-eta-steel.vercel.app/work/developer-portfolio");
  });

  it("generates compliant robots directives", () => {
    const rob = robots();
    expect(rob.rules).toBeDefined();
    expect(rob.sitemap).toBe("https://developer-portfolio-eta-steel.vercel.app/sitemap.xml");
  });
});
