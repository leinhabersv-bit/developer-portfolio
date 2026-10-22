import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Compass, Cpu, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Rithik SV",
  description:
    "Student software developer building ambitious, practical products with frontend, graphics, and local-first architectures.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-primary/20 bg-cyan-primary/5 text-cyan-primary font-mono text-xs">
          <span>{"// 02. PROFILE & PHILOSOPHY"}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Rithik SV
        </h1>
        <p className="font-mono text-base text-cyan-primary">
          Student Developer • Frontend Engineering &amp; Systems Architecture
        </p>
      </header>

      {/* Narrative Section */}
      <section className="space-y-6 text-base text-text-muted leading-relaxed">
        <p className="text-lg text-white font-medium">
          I am a student software developer passionate about building practical, ambitious products from the ground up. I spend my time exploring the intersection of interactive web graphics, local-first client architectures, and rigorous testing discipline.
        </p>
        <p>
          Unlike typical student projects that stop at surface-level mockups or fragile prototypes, I focus on building systems that actually work reliably in the real world: deterministic vehicle physics engines running at 60fps, privacy-first business suites that store sensitive data strictly on local device storage, and automated ingestion pipelines that turn messy web markup into clean telemetry.
        </p>
        <p>
          My approach is grounded in solid engineering fundamentals: write strict TypeScript types, structure decoupled modules, respect user attention and bandwidth, and verify everything with automated unit and browser tests before considering a feature done.
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
              <Database className="w-4 h-4" />
              <span>01. Local-First by Default</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              If an application does not fundamentally require a centralized server, it shouldn&apos;t force users to rely on one. Local-first architectures using IndexedDB and portable JSON vaults protect user privacy, eliminate cloud hosting costs, and ensure zero downtime during network outages.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-cyan-primary font-mono text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>02. Tests as Living Specifications</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Testing is not an afterthought; it is how software specifications are proven. From verifying 6-key arcade input contracts and vehicle drift physics to validating complex proposal calculations, comprehensive test suites give confidence to iterate fast.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-violet-primary font-mono text-sm font-semibold">
              <Cpu className="w-4 h-4" />
              <span>03. Zero Unnecessary Bloat</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              Why download 5 megabytes of audio files when the browser&apos;s Web Audio API can procedurally synthesize engine sounds and celebration chords on the fly? Lightweight, zero-dependency engineering creates lightning-fast initial load times.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/70 space-y-3">
            <div className="flex items-center gap-2.5 text-violet-primary font-mono text-sm font-semibold">
              <Compass className="w-4 h-4" />
              <span>04. Integrity &amp; Transparency</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              I never claim experience I do not have or take credit for forks I didn&apos;t author. Every claim in this portfolio is backed by accessible code, public demo deployments, or verifiable commit histories.
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
            Current Technical Interests
          </h2>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/50 space-y-4">
          <ul className="space-y-3 text-sm text-text-muted">
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-primary font-mono mt-0.5">▸</span>
              <span>
                <strong className="text-white">Spatial Computing &amp; Three.js:</strong> Deepening expertise in camera matrix calculations, geometry instancing, and real-time interactive 3D in the browser.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-primary font-mono mt-0.5">▸</span>
              <span>
                <strong className="text-white">Local-First Sync Protocols:</strong> Investigating CRDTs (Conflict-Free Replicated Data Types) and peer-to-peer sync mechanisms for distributed on-device applications.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-primary font-mono mt-0.5">▸</span>
              <span>
                <strong className="text-white">Performance Profiling:</strong> Optimizing rendering frame budgets, memory garbage collection cycles in canvas games, and Core Web Vitals across modern browsers.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="border-t border-white/[0.08] pt-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold hover:bg-cyan-primary/90 transition-all"
        >
          <span>View My Projects</span>
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
