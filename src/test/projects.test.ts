import { describe, it, expect } from "vitest";
import { PROJECTS, TECHNICAL_SKILLS } from "@/data/projects";

describe("Projects Data Integrity & Verification Standard", () => {
  it("contains verified projects with public open source evidence", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(slugs).toContain("champ-virtual-physics-lab");
    expect(slugs).toContain("adapt-dqps-engine");
    expect(slugs).toContain("panic-delivery");
    expect(slugs).toContain("clientlaunch");
    expect(slugs).toContain("mic-learning-path");
    expect(slugs).toContain("developer-portfolio");

    // Must NOT feature duplicates or uncredited forks as original work
    expect(slugs).not.toContain("unicc");
    expect(slugs).not.toContain("mic-learning-path01");
  });

  it("ensures adapt-dqps-engine has verified 6-member team attribution and 86 tests", () => {
    const adapt = PROJECTS.find((p) => p.slug === "adapt-dqps-engine");
    expect(adapt).toBeDefined();
    expect(adapt?.team).toBeDefined();
    expect(adapt?.team?.size).toBe(6);
    expect(adapt?.team?.name).toBe("Team M.A.R.K.A.N");
    expect(adapt?.team?.attribution).toBe("Built collaboratively by Team M.A.R.K.A.N — 6 Team Members");
    expect(adapt?.role).toBe("Team Contributor / Collaborative Developer");
    expect(adapt?.githubUrl).toBe("https://github.com/Bot25692/dqps-engine");
    expect(adapt?.metrics.find((m) => m.label === "Automated Tests")?.value).toBe("86/86");
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

  it("ensures champ-virtual-physics-lab has verified open-source repository and 132 tests", () => {
    const champ = PROJECTS.find((p) => p.slug === "champ-virtual-physics-lab");
    expect(champ).toBeDefined();
    expect(champ?.githubUrl).toBe("https://github.com/leinhabersv-bit/champ-virtual-physics-lab");
    expect(champ?.visibility).toBe("Public Open Source");
    expect(champ?.metrics.find((m) => m.label === "Automated Tests")?.value).toBe("132/132");
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
  });

  it("ensures technical skills are divided into valid categories with concrete context", () => {
    expect(TECHNICAL_SKILLS.length).toBeGreaterThanOrEqual(5);
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
