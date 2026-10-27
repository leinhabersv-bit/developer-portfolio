import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  Cpu,
  Sparkles,
  ExternalLink,
  FlaskConical,
  Gauge,
  Layers,
  Atom,
} from "lucide-react";
import { ThreeHero } from "@/components/ThreeHero";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-24 md:space-y-36">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-12 overflow-hidden">
        {/* Subtle background architectural ambient glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[720px] h-[360px] bg-cyan-primary/[0.04] blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-violet-primary/[0.03] blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Authentic Identity & Editorial Narrative */}
            <div className="lg:col-span-7 space-y-8">
              {/* Institutional & Identity Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-primary/25 bg-cyan-primary/5 text-cyan-primary font-mono text-xs tracking-wider">
                <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse" />
                <span>STUDENT SOFTWARE DEVELOPER // VIT CHENNAI</span>
              </div>

              {/* Main Display Headline */}
              <div className="space-y-3">
                <h1 className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.02]">
                  Rithik SV
                </h1>
                <p className="font-mono text-sm sm:text-base text-cyan-primary font-medium tracking-wide">
                  Computational Simulators • Interactive Graphics • Local-First Systems
                </p>
              </div>

              {/* Editorial Statement */}
              <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl font-sans">
                I engineer ambitious client-side applications, physics workbenches, and interactive graphics engines with uncompromising technical rigor. My systems bridge closed-form analytical equations, sub-pixel browser kinematics, procedural Web Audio synthesis, and deterministic state architectures validated by automated test suites.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-primary text-[#06080d] font-mono text-xs font-bold tracking-wide hover:bg-cyan-primary/90 hover:shadow-[0_0_28px_-5px_rgba(0,245,212,0.45)] transition-all"
                >
                  <span>Explore Case Studies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/stack"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 bg-white/[0.03] text-white font-mono text-xs font-semibold tracking-wide hover:border-white/30 hover:bg-white/[0.06] transition-all"
                >
                  <Terminal className="w-4 h-4 text-cyan-primary" />
                  <span>Technical Disciplines</span>
                </Link>

                <a
                  href="https://github.com/leinhabersv-bit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-mono text-text-muted hover:text-white transition-colors"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-dim" />
                </a>
              </div>

              {/* Verified Engineering Instrument Deck */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                <div className="p-3 rounded-xl border border-white/06 bg-white/[0.02]">
                  <span className="block font-mono text-2xl font-bold text-white tracking-tight">142</span>
                  <span className="block text-[11px] font-mono text-cyan-primary mt-0.5">Passing Tests</span>
                  <span className="block text-[10px] text-text-dim mt-0.5">132 Vitest + 10 Node</span>
                </div>

                <div className="p-3 rounded-xl border border-white/06 bg-white/[0.02]">
                  <span className="block font-mono text-2xl font-bold text-cyan-primary tracking-tight">9 Labs</span>
                  <span className="block text-[11px] font-mono text-white mt-0.5">Physics Engines</span>
                  <span className="block text-[10px] text-text-dim mt-0.5">VIT Chennai BAPHY105</span>
                </div>

                <div className="p-3 rounded-xl border border-white/06 bg-white/[0.02]">
                  <span className="block font-mono text-2xl font-bold text-lime-primary tracking-tight">60 FPS</span>
                  <span className="block text-[11px] font-mono text-white mt-0.5">Kinematic Loop</span>
                  <span className="block text-[10px] text-text-dim mt-0.5">Canvas &amp; Three.js</span>
                </div>

                <div className="p-3 rounded-xl border border-white/06 bg-white/[0.02]">
                  <span className="block font-mono text-2xl font-bold text-violet-primary tracking-tight">0 kB</span>
                  <span className="block text-[11px] font-mono text-white mt-0.5">External Audio</span>
                  <span className="block text-[10px] text-text-dim mt-0.5">Web Audio Synthesizer</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Kinetic Spatial Core */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full max-w-md relative">
                <ThreeHero />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Engineering Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary flex items-center gap-2">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{"// 01. Flagship Engineering Case Studies"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Grounded In Verified Codebases
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-cyan-primary transition-colors"
          >
            <span>View All Repositories &amp; Work ({PROJECTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={project.slug === "champ-virtual-physics-lab"}
            />
          ))}
        </div>
      </section>

      {/* Engineering Tenets & Architectural Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-white/[0.08] pb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-primary flex items-center gap-2">
            <Atom className="w-3.5 h-3.5" />
            <span>{"// 02. Architectural Foundations"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            How I Architect Client-Side Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3 hover:border-cyan-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center text-cyan-primary">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Closed-Form Solvers</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Closed-form analytical equations replace random mock jitter. From quantum tunneling to LED Planck constant regression, all simulations evaluate real physical mathematics.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3 hover:border-violet-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-violet-primary/10 border border-violet-primary/30 flex items-center justify-center text-violet-primary">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Sub-Pixel Kinematics</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Deterministic 60fps game loops simulating vehicle slip angles, handbrake drift momentum, and hold-to-charge ballistic arcs with short/long/wide miss classification.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3 hover:border-lime-primary/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-lime-primary/10 border border-lime-primary/30 flex items-center justify-center text-lime-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Procedural Audio Synth</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Real-time Web Audio API oscillator synthesis generating dynamic engine revs, tyre skids, and victory chords without downloading external MP3 or WAV audio assets.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3 hover:border-emerald-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-sm font-bold text-white">Automated Verification</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Evidence before assertions. 142 automated regression, unit, and end-to-end tests across Vitest, Node Test Runner, and Playwright passing before shipping.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0c1424] via-[#0f192e] to-[#0a101d] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
              {"// 03. Opportunities & Technical Collaboration"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Looking for a student engineer who builds verified, testable systems?
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Available for software engineering internships, technical collaborations, and ambitious creative engineering opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-cyan-primary text-[#06080d] font-mono text-xs font-bold tracking-wide hover:bg-cyan-primary/90 transition-all shadow-[0_0_20px_rgba(0,245,212,0.3)]"
              >
                Get In Touch
              </Link>
              <Link
                href="/about"
                className="px-5 py-3.5 rounded-xl border border-white/20 bg-white/[0.03] text-white font-mono text-xs font-semibold tracking-wide hover:bg-white/[0.06] transition-all"
              >
                Read Background &amp; Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
