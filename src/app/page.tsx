import Link from "next/link";
import { ArrowRight, Terminal, ShieldCheck, Cpu, Database, Sparkles, ExternalLink } from "lucide-react";
import { ThreeHero } from "@/components/ThreeHero";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Subtle background radial lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-primary/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-7">
              {/* Status Chip */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-primary/25 bg-cyan-primary/5 text-cyan-primary font-mono text-xs tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
                <span>STUDENT SOFTWARE DEVELOPER // SYSTEMS &amp; WEB</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                  Rithik SV
                </h1>
                <p className="font-mono text-sm sm:text-base text-cyan-primary/90 font-medium tracking-wide">
                  Frontend Engineering • Interactive 2D/3D Graphics • Local-First Systems
                </p>
              </div>

              {/* Editorial Positioning */}
              <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
                I build ambitious, practical software products with uncompromising technical discipline. My projects bridge high-velocity browser graphics, offline-first client-side architectures, and deterministic state validation backed by automated test suites.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold tracking-wide hover:bg-cyan-primary/90 hover:shadow-[0_0_25px_-5px_rgba(0,245,212,0.4)] transition-all"
                >
                  <span>Explore Selected Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/stack"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.03] text-white font-mono text-xs font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.06] transition-all"
                >
                  <Terminal className="w-4 h-4 text-cyan-primary" />
                  <span>Technical Stack</span>
                </Link>

                <a
                  href="https://github.com/leinhabersv-bit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-mono text-text-muted hover:text-white transition-colors"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-dim" />
                </a>
              </div>

              {/* Verified Metrics Strip */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <span className="block font-mono text-2xl font-bold text-white">10/10</span>
                  <span className="block text-xs font-mono text-text-dim mt-0.5">Automated Tests</span>
                </div>
                <div>
                  <span className="block font-mono text-2xl font-bold text-cyan-primary">100%</span>
                  <span className="block text-xs font-mono text-text-dim mt-0.5">Offline First Vaults</span>
                </div>
                <div>
                  <span className="block font-mono text-2xl font-bold text-violet-primary">60 FPS</span>
                  <span className="block text-xs font-mono text-text-dim mt-0.5">Canvas &amp; Three.js</span>
                </div>
              </div>
            </div>

            {/* Right 3D Spatial Core */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full max-w-md relative">
                <ThreeHero />
                <div className="mt-2 text-center">
                  <span className="inline-block font-mono text-[11px] text-text-dim uppercase tracking-widest">
                    {"Interactive Geometry Engine // Procedural Node"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
              {"// 01. Flagship Engineering"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Case Studies
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-cyan-primary transition-colors"
          >
            <span>View All Projects ({PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured={project.slug === "panic-delivery"} />
          ))}
        </div>
      </section>

      {/* Architectural Pillars / Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-white/[0.08] pb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-primary">
            {"// 02. Architectural Foundations"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
            How I Build Software
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center text-cyan-primary">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Local-First Storage</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Prioritizing on-device persistence with IndexedDB and JSON vaults. Eliminates hosting bloat and guarantees continuous operation during network drops.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-primary/10 border border-violet-primary/30 flex items-center justify-center text-violet-primary">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Deterministic State</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Employing strict finite state machines, directed acyclic dependency graphs (DAGs), and input debouncing to prevent invalid state transitions.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center text-cyan-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Procedural Graphics &amp; Audio</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Generating dynamic sound waves via the Web Audio API and rendering sub-pixel vehicle trajectories without downloading heavy external audio or video assets.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Automated Verification</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Evidence before assertions. Engineering comprehensive unit and end-to-end test suites using Vitest, Node Test Runner, and Playwright before shipping.
            </p>
          </div>
        </div>
      </section>

      {/* Callout / Connect Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0d1627] via-[#101930] to-[#0c1220] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-primary/[0.05] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
              {"// 03. Collaboration & Opportunities"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Looking for a disciplined developer who builds real, tested systems?
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Available for software engineering internships, technical collaborations, and ambitious creative engineering opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold tracking-wide hover:bg-cyan-primary/90 transition-all"
              >
                Get In Touch
              </Link>
              <Link
                href="/about"
                className="px-5 py-3 rounded-xl border border-white/20 bg-white/[0.03] text-white font-mono text-xs font-semibold tracking-wide hover:bg-white/[0.06] transition-all"
              >
                Read Background Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
