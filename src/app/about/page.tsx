import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Compass, Cpu, Database, Atom, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Rithik SV",
  description:
    "Student software developer at VIT Chennai building ambitious, practical products with frontend, graphics, and local-first architectures.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-primary/20 bg-cyan-primary/5 text-cyan-primary font-mono text-xs">
          <span>{"// 02. PROFILE & PHILOSOPHY"}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Rithik SV
        </h1>
        <p className="font-mono text-base text-cyan-primary font-medium">
          Student Developer at VIT Chennai • Systems Engineering &amp; Computational Graphics
        </p>
      </header>

      {/* Narrative Section */}
      <section className="space-y-6 text-base text-text-muted leading-relaxed font-sans">
        <p className="text-lg text-white font-medium leading-relaxed">
          I am a student software developer at Vellore Institute of Technology (VIT Chennai), engineering client-side systems, interactive physics workbenches, and high-velocity browser graphics.
        </p>
        <p>
          Unlike typical student projects that stop at superficial Figma clones or fragile tutorial copy-pastes, I focus on building systems that actually execute real mathematics and state machines: closed-form quantum tunneling and electron diffraction simulators aligned with printed laboratory manuals (CHAMP Lab), deterministic 60fps arcade vehicle kinematics with procedural Web Audio synthesis (Panic Delivery), and offline-first client-side data vaults backed by automated test suites.
        </p>
        <p>
          My engineering tenet is simple: establish solid architectural foundations, write strict TypeScript contracts, respect user device resources, and assert everything with automated unit and browser tests before considering a feature shipped.
        </p>
      </section>

      {/* Core Principles */}
      <section className="space-y-8 border-t border-white/[0.08] pt-12">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-primary">
            Engineering Tenets
          </span>
          <h2 className="text-2xl font-bold text-white">
            Core Principles I Build By
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-cyan-primary font-mono text-sm font-semibold">
              <FlaskConical className="w-4 h-4" />
              <span>01. Mathematical Truth Over Fake Jitter</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              In scientific simulations, mock data is useless. Every equation in CHAMP Lab evaluates closed-form physics equations (Bragg diffraction, Cauchy grating dispersion, finite square barrier tunneling), asserting physical fidelity with 132 automated tests.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-cyan-primary font-mono text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>02. Tests as Living Specifications</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Testing is how software contracts are proven. From verifying 6-key arcade input contracts and vehicle drift slip angles to validating observation tables and CSV exports, comprehensive test suites ensure zero regressions.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-violet-primary font-mono text-sm font-semibold">
              <Cpu className="w-4 h-4" />
              <span>03. Zero Network Bloat</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Why download 5 megabytes of external audio files when the browser&apos;s Web Audio API can procedurally synthesize dynamic engine revs, tyre skids, and victory chords in 0 kB? Lightweight architectures load instantly.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-lime-primary font-mono text-sm font-semibold">
              <Compass className="w-4 h-4" />
              <span>04. Complete Professional Authenticity</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              I never claim experience I do not have or take credit for forks I didn&apos;t author. Every project featured in this portfolio is backed by public source code, live deployments, or verifiable commit histories.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Areas & Interests */}
      <section className="space-y-6 border-t border-white/[0.08] pt-12">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
            Areas of Exploration
          </span>
          <h2 className="text-2xl font-bold text-white">
            Current Technical Disciplines
          </h2>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/50 space-y-4">
          <ul className="space-y-3 text-sm text-text-muted">
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-primary font-mono mt-0.5">▸</span>
              <span>
                <strong className="text-white">Computational Simulators &amp; Physics:</strong> Deepening modeling of quantum mechanics, semiconductor diode netlists, and optical spectroscopy.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-primary font-mono mt-0.5">▸</span>
              <span>
                <strong className="text-white">Spatial Computing &amp; Three.js:</strong> Mastering camera projection matrices, ACESFilmic tone mapping, and geometry instancing for 60fps browser rendering.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-primary font-mono mt-0.5">▸</span>
              <span>
                <strong className="text-white">Local-First Storage &amp; PWA:</strong> Engineering resilient client-side storage with IndexedDB, Service Workers, and zero-overhead offline persistence.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="border-t border-white/[0.08] pt-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-primary text-[#06080d] font-mono text-xs font-bold hover:bg-cyan-primary/90 transition-all shadow-[0_0_20px_rgba(0,245,212,0.3)]"
        >
          <span>View Verified Work</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
        >
          <span>Get In Touch</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </div>
  );
}
