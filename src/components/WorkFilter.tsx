"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

interface WorkFilterProps {
  projects: Project[];
}

const CATEGORIES = [
  "All",
  "Physics & Scientific Simulation",
  "Interactive & Graphics",
  "Local-First & Commercial",
  "Systems & Web",
] as const;

export function WorkFilter({ projects }: WorkFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#0c1220]/60 backdrop-blur-md max-w-fit">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                isSelected
                  ? "bg-cyan-primary text-[#06080d] font-bold shadow-[0_0_20px_-3px_rgba(0,245,212,0.4)]"
                  : "text-text-muted hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01]">
          <p className="font-mono text-sm text-text-muted">No projects found in this domain.</p>
        </div>
      )}
    </div>
  );
}
