import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("Routing & SEO Generators", () => {
  it("generates complete sitemap including all static and dynamic project routes", () => {
    const map = sitemap();
    const urls = map.map((m) => m.url);

    expect(urls).toContain("https://rithiksv.dev");
    expect(urls).toContain("https://rithiksv.dev/work");
    expect(urls).toContain("https://rithiksv.dev/about");
    expect(urls).toContain("https://rithiksv.dev/stack");
    expect(urls).toContain("https://rithiksv.dev/contact");

    expect(urls).toContain("https://rithiksv.dev/work/panic-delivery");
    expect(urls).toContain("https://rithiksv.dev/work/clientlaunch");
    expect(urls).toContain("https://rithiksv.dev/work/eventhub-cc");
    expect(urls).toContain("https://rithiksv.dev/work/mic-learning-path");
  });

  it("generates compliant robots directives", () => {
    const rob = robots();
    expect(rob.rules).toBeDefined();
    expect(rob.sitemap).toBe("https://rithiksv.dev/sitemap.xml");
  });
});
