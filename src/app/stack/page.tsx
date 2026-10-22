import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TECHNICAL_SKILLS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Technical Stack — Rithik SV",
  description:
    "Curated, evidence-backed technical skills, languages, and tools utilized across production systems and game engines.",
};

export default function StackPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-primary/20 bg-cyan-primary/5 text-cyan-primary font-mono text-xs">
          <span>{"// 03. TOOLING & CAPABILITIES"}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Technical Stack
        </h1>
        <p className="text-base text-text-muted max-w-3xl leading-relaxed">
          A disciplined, evidence-backed inventory of programming languages, frameworks, rendering engines, and testing tools I actively use. Every listed capability is grounded in concrete repository commits and verified production code.
        </p>
      </header>

      {/* Verified Skill Groups */}
      <div className="space-y-14">
        {TECHNICAL_SKILLS.map((group, groupIdx) => (
          <section key={groupIdx} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/[0.06] pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="font-mono text-xs text-cyan-primary">
                  {`0${groupIdx + 1} //`}
                </span>
                <span>{group.category}</span>
              </h2>
              <span className="text-xs text-text-dim font-mono">
                {group.description}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-xl border border-white/08 bg-[#0c1220]/70 hover:border-cyan-primary/30 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-base font-semibold text-white">
                      {skill.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-white/[0.04] border border-white/10 text-cyan-primary">
                      {skill.proficiency}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed">
                    <span className="font-mono text-text-dim">Verified in: </span>
                    {skill.context}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Philosophy Callout */}
      <section className="p-8 rounded-2xl border border-white/10 bg-[#090e1a] space-y-4">
        <div className="flex items-center gap-2.5 text-cyan-primary font-mono text-xs uppercase tracking-wider font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Verification Standard</span>
        </div>
        <p className="text-sm text-text-muted leading-relaxed">
          I intentionally exclude technologies I have only touched in introductory tutorials or haven&apos;t used to build real software. If a skill is listed here, I can walk you through the architecture, the edge cases, the performance tradeoffs, and the failure modes.
        </p>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-white/[0.08] pt-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold hover:bg-cyan-primary/90 transition-all"
        >
          <span>See Skills in Action (Work)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
        >
          <span>Connect with Me</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </div>
  );
}
