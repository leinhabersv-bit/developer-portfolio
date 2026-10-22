import type { Metadata } from "next";
import { WorkFilter } from "@/components/WorkFilter";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Engineering Work — Rithik SV",
  description:
    "Production projects, arcade game engines, and local-first commercial applications built by Rithik SV.",
};

export default function WorkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-white/[0.08] pb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
          {"// Index // Portfolio Projects"}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Selected Engineering Work
        </h1>
        <p className="text-base text-text-muted leading-relaxed">
          A curated index of production applications, interactive 2D/3D systems, and offline-first suites. Every featured project represents real, verified implementations with automated test coverage or verifiable live deployments.
        </p>
      </div>

      {/* Interactive Project Directory */}
      <WorkFilter projects={PROJECTS} />
    </div>
  );
}
