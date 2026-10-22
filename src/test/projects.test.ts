import { describe, it, expect } from "vitest";
import { PROJECTS, TECHNICAL_SKILLS } from "@/data/projects";

describe("Projects Data Integrity & Verification Standard", () => {
  it("contains only verified projects and no unverified claims", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(slugs).toContain("panic-delivery");
    expect(slugs).toContain("clientlaunch");
    expect(slugs).toContain("eventhub-cc");
    expect(slugs).toContain("mic-learning-path");

    // Must NOT feature duplicates or uncredited forks as original work
    expect(slugs).not.toContain("unicc");
    expect(slugs).not.toContain("mic-learning-path01");
  });

  it("ensures every project has a unique slug and required metadata", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(PROJECTS.length);

    PROJECTS.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.subtitle).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.problem).toBeTruthy();
      expect(project.solution).toBeTruthy();
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.metrics.length).toBeGreaterThan(0);
      expect(project.architecture.components.length).toBeGreaterThan(0);
    });
  });

  it("ensures panic-delivery has verified live deployment and public source", () => {
    const panic = PROJECTS.find((p) => p.slug === "panic-delivery");
    expect(panic).toBeDefined();
    expect(panic?.liveUrl).toBe("https://panic-delivery.vercel.app/");
    expect(panic?.githubUrl).toBe("https://github.com/leinhabersv-bit/panic-delivery");
    expect(panic?.visibility).toBe("Public Open Source");
  });

  it("ensures private projects do not falsely claim public open-source repos", () => {
    const claunch = PROJECTS.find((p) => p.slug === "clientlaunch");
    expect(claunch?.visibility).toBe("Private Commercial");
    expect(claunch?.githubUrl).toBeUndefined();

    const eventhub = PROJECTS.find((p) => p.slug === "eventhub-cc");
    expect(eventhub?.visibility).toBe("Private Platform");
    expect(eventhub?.githubUrl).toBeUndefined();
  });

  it("ensures technical skills are divided into valid categories with concrete context", () => {
    expect(TECHNICAL_SKILLS.length).toBeGreaterThanOrEqual(4);
    TECHNICAL_SKILLS.forEach((group) => {
      expect(group.category).toBeTruthy();
      expect(group.skills.length).toBeGreaterThan(0);
      group.skills.forEach((skill) => {
        expect(skill.name).toBeTruthy();
        expect(skill.context).toBeTruthy();
        expect(["Expert", "Advanced", "Intermediate", "Competent"]).toContain(skill.proficiency);
      });
    });
  });
});
