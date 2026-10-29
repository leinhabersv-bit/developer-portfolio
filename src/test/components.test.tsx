import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CopyButton } from "@/components/CopyButton";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

describe("Component Tests", () => {
  it("renders ProjectCard for CHAMP Virtual Physics Lab with verified title, metrics, and visibility", () => {
    const champ = PROJECTS.find((p) => p.slug === "champ-virtual-physics-lab")!;
    render(<ProjectCard project={champ} />);

    expect(screen.getByText("CHAMP Virtual Physics Lab")).toBeInTheDocument();
    expect(screen.getByText("Public Open Source")).toBeInTheDocument();
    expect(screen.getByText("132/132")).toBeInTheDocument();
    expect(screen.getByText("Case Study")).toBeInTheDocument();
  });

  it("renders ProjectCard for panic-delivery with verified title and metrics", () => {
    const panic = PROJECTS.find((p) => p.slug === "panic-delivery")!;
    render(<ProjectCard project={panic} />);

    expect(screen.getByText("PANIC DELIVERY")).toBeInTheDocument();
    expect(screen.getByText("Public Open Source")).toBeInTheDocument();
    expect(screen.getByText("10/10")).toBeInTheDocument();
  });

  it("renders ProjectCard for A.D.A.P.T. with prominent 6-member team badge and metrics", () => {
    const adapt = PROJECTS.find((p) => p.slug === "adapt-dqps-engine")!;
    render(<ProjectCard project={adapt} />);

    expect(screen.getByText("A.D.A.P.T. — Autonomous Advertising Decision Engine")).toBeInTheDocument();
    expect(screen.getByText("Built collaboratively by Team M.A.R.K.A.N — 6 Team Members")).toBeInTheDocument();
    expect(screen.getByText("86/86")).toBeInTheDocument();
  });

  it("handles CopyButton click and updates state", async () => {
    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    render(<CopyButton textToCopy="test@example.com" label="Copy Email" />);
    const button = screen.getByRole("button", { name: /copy email/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(await screen.findByText("Copied!")).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test@example.com");
  });
});
