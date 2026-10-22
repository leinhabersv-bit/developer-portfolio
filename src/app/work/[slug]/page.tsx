import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  CheckCircle2,
  Calendar,
  Layers,
  Check,
  ShieldAlert,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Technical Case Study | Rithik SV`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Next / Previous navigation
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;
  const isPrivate = project.visibility.includes("Private");

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-cyan-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Work</span>
        </Link>
      </div>

      {/* Case Header */}
      <header className="space-y-6 border-b border-white/[0.08] pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono tracking-wider backdrop-blur-md bg-white/[0.04] border border-white/10 text-white">
            {isPrivate ? (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300">{project.visibility}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-primary" />
                <span className="text-cyan-primary">{project.visibility}</span>
              </>
            )}
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/[0.02] border border-white/06 text-text-dim">
            <Calendar className="w-3 h-3" />
            <span>{project.timeline}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/[0.02] border border-white/06 text-text-dim">
            <Layers className="w-3 h-3" />
            <span>{project.category}</span>
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-primary font-medium tracking-tight">
            {project.subtitle}
          </p>
          <p className="text-base text-text-muted max-w-3xl leading-relaxed pt-2">
            {project.tagline}
          </p>
        </div>

        {/* Live / Source CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold tracking-wide hover:bg-cyan-primary/90 transition-all shadow-[0_0_20px_-3px_rgba(0,245,212,0.3)]"
            >
              <span>Play Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] text-white font-mono text-xs font-semibold hover:border-white/30 transition-all"
            >
              <span>View Source on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-text-dim" />
            </a>
          )}

          {isPrivate && (
            <span className="text-xs font-mono text-text-dim italic">
              * Commercial/Platform source kept private to protect proprietary code.
            </span>
          )}
        </div>
      </header>

      {/* Verified Metrics Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-xl border border-white/10 bg-[#0c1220]/80 space-y-1.5">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-text-dim">
              {m.label}
            </span>
            <span className="block font-mono text-2xl font-bold text-white">
              {m.value}
            </span>
            <span className="block text-xs text-text-muted">
              {m.detail}
            </span>
          </div>
        ))}
      </section>

      {/* Hero Media Showcase */}
      <section className="space-y-4">
        <div className="rounded-2xl border border-white/15 overflow-hidden bg-[#090d16] aspect-[16/9] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt={`${project.title} Hero Showcase`}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {project.screenshots.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.screenshots.slice(1).map((s, idx) => (
              <figure key={idx} className="space-y-2">
                <div className="rounded-xl border border-white/10 overflow-hidden bg-[#090d16] aspect-[16/10]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.url}
                    alt={s.caption}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <figcaption className="text-xs font-mono text-text-dim px-1">
                  Fig {idx + 2}. {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* Narrative: Problem & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/[0.08] pt-12">
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c1220]/60 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400">
            01 // The Problem &amp; Scope
          </span>
          <h2 className="text-xl font-bold text-white">Engineering Context</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-cyan-primary/20 bg-[#0c1220]/60 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
            02 // Technical Solution
          </span>
          <h2 className="text-xl font-bold text-white">Engineered Outcome</h2>
          <p className="text-sm text-text-muted leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* Architecture Breakdown */}
      <section className="space-y-6 border-t border-white/[0.08] pt-12">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-violet-primary">
            03 // Architecture &amp; Subsystems
          </span>
          <h2 className="text-2xl font-bold text-white">
            {project.architecture.title}
          </h2>
          <p className="text-sm text-text-muted">
            {project.architecture.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.architecture.components.map((comp, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-white/08 bg-[#090e1a] space-y-2">
              <span className="font-mono text-xs font-semibold text-cyan-primary">
                {comp.name}
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                {comp.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Decisions */}
      <section className="space-y-6 border-t border-white/[0.08] pt-12">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
            04 // Engineering Tradeoffs
          </span>
          <h2 className="text-2xl font-bold text-white">
            Key Architectural Decisions
          </h2>
        </div>

        <div className="space-y-4">
          {project.keyDecisions.map((dec, idx) => (
            <div key={idx} className="p-5 rounded-xl border border-white/08 bg-[#0c1220]/70 space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-primary" />
                <h3 className="font-mono text-sm font-semibold text-white">
                  {dec.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-6">
                {dec.rationale}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenges & Solutions */}
      {project.challenges.length > 0 && (
        <section className="space-y-6 border-t border-white/[0.08] pt-12">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
              05 // Roadblocks &amp; Resolutions
            </span>
            <h2 className="text-2xl font-bold text-white">
              Hard Technical Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.challenges.map((ch, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-white/08 bg-[#0c1220]/60 space-y-3">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {ch.problem}
                  </p>
                </div>
                <div className="pl-6 border-l border-white/10 ml-2">
                  <p className="text-xs text-text-muted leading-relaxed">
                    <span className="font-mono text-cyan-primary font-semibold">Fix: </span>
                    {ch.resolution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verification & Test Report */}
      <section className="space-y-4 border-t border-white/[0.08] pt-12">
        <div className="space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            06 // QA &amp; Verification
          </span>
          <h2 className="text-2xl font-bold text-white">
            Verification Report
          </h2>
        </div>

        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-[#08121d] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
            <div className="space-y-0.5">
              <span className="font-mono text-xs text-text-dim">Test Harness:</span>
              <p className="font-mono text-sm font-semibold text-white">
                {project.verification.framework}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="font-mono text-xs text-text-dim">Results:</span>
              <p className="font-mono text-sm font-semibold text-emerald-400">
                {project.verification.metrics}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="font-mono text-xs text-text-dim">Environment:</span>
              <p className="font-mono text-sm font-semibold text-text-muted">
                {project.verification.verifiedOn}
              </p>
            </div>
          </div>
          <p className="text-xs font-mono text-text-muted leading-relaxed">
            {project.verification.notes}
          </p>
        </div>
      </section>

      {/* Tech Stack Chips */}
      <section className="space-y-3 border-t border-white/[0.08] pt-12">
        <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim">
          Technologies &amp; Libraries Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] text-white border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Bottom Pagination */}
      <footer className="border-t border-white/[0.08] pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: {prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-cyan-primary transition-colors"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </footer>
    </article>
  );
}
