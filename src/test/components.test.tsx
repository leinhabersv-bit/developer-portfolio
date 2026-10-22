import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CopyButton } from "@/components/CopyButton";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

describe("Component Tests", () => {
  it("renders ProjectCard with verified title, metrics, and visibility", () => {
    const project = PROJECTS[0]; // panic-delivery
    render(<ProjectCard project={project} />);

    expect(screen.getByText("PANIC DELIVERY")).toBeInTheDocument();
    expect(screen.getByText("Public Open Source")).toBeInTheDocument();
    expect(screen.getByText("10/10")).toBeInTheDocument();
    expect(screen.getByText("Case Study")).toBeInTheDocument();
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
