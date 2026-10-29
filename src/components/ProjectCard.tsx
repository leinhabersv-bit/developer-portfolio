import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Lock, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const isPrivate = project.visibility.includes("Private");

  return (
    <article
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
        featured
          ? "border-white/15 bg-gradient-to-b from-[#0e1628] to-[#080d16] hover:border-cyan-primary/50 hover:shadow-[0_0_35px_-8px_rgba(0,245,212,0.18)]"
          : "border-white/10 bg-[#0a0f1d]/70 hover:border-white/20 hover:bg-[#0c1324]"
      }`}
    >
      {/* Top Media / Preview Window */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#090d16] border-b border-white/[0.08]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
          loading="lazy"
        />

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider backdrop-blur-md bg-[#07090e]/80 border border-white/15 text-white">
            {isPrivate ? (
              <>
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300">{project.visibility}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3 text-cyan-primary" />
                <span className="text-cyan-primary">{project.visibility}</span>
              </>
            )}
          </span>

          <span className="px-2 py-0.5 rounded text-[11px] font-mono backdrop-blur-md bg-[#07090e]/80 border border-white/10 text-text-dim">
            {project.timeline}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-primary transition-colors">
              <Link href={`/work/${project.slug}`} className="focus:outline-none">
                {project.title}
              </Link>
            </h3>
            <span className="font-mono text-xs text-text-dim">{project.status}</span>
          </div>

          <p className="font-mono text-xs text-cyan-primary/90 font-medium">
            {project.subtitle}
          </p>

          {project.team && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-cyan-primary/10 border border-cyan-primary/30 text-cyan-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary" />
              <span>{project.team.attribution}</span>
            </div>
          )}

          <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        {/* Verified Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-text-dim">
                {m.label}
              </span>
              <span className="block font-mono text-xs font-semibold text-white mt-0.5">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-text-muted border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1.5 py-0.5 text-[11px] font-mono text-text-dim">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action CTAs */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white hover:text-cyan-primary transition-colors py-1"
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-mono text-cyan-primary bg-cyan-primary/10 border border-cyan-primary/30 hover:bg-cyan-primary/20 transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono text-text-muted border border-white/10 hover:text-white hover:border-white/20 transition-all"
              >
                <span>Source</span>
                <ExternalLink className="w-3 h-3 text-text-dim" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
