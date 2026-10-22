import type { Metadata } from "next";
import { Mail, ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Contact & Connect — Rithik SV",
  description:
    "Direct channels and verified links to connect with Rithik SV for software engineering internships and technical collaborations.",
};

export default function ContactPage() {
  const emailAddress = "leinhabersv@gmail.com";
  const githubProfile = "https://github.com/leinhabersv-bit";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <header className="space-y-4 border-b border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-primary/20 bg-cyan-primary/5 text-cyan-primary font-mono text-xs">
          <span>{"// 04. GET IN TOUCH"}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Contact &amp; Connect
        </h1>
        <p className="text-base text-text-muted max-w-2xl leading-relaxed">
          Open to software engineering internships, technical collaborations, and ambitious creative web development projects. Reach out directly via email or inspect my active codebases on GitHub.
        </p>
      </header>

      {/* Primary Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Card */}
        <div className="p-7 rounded-2xl border border-white/10 bg-[#0c1220]/80 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center text-cyan-primary">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Direct Email</h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Best for engineering inquiries, internship opportunities, and collaboration proposals.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[#080d16] border border-white/[0.06] flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-cyan-primary truncate">
                {emailAddress}
              </span>
              <CopyButton textToCopy={emailAddress} label="Copy Email" />
            </div>

            <a
              href={`mailto:${emailAddress}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold hover:bg-cyan-primary/90 transition-all"
            >
              <span>Compose Message</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* GitHub Card */}
        <div className="p-7 rounded-2xl border border-white/10 bg-[#0c1220]/80 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-primary/10 border border-violet-primary/30 flex items-center justify-center text-violet-primary">
              <GithubIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">GitHub Profile</h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Inspect verified commit histories, public test suites, and active repository codebases.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[#080d16] border border-white/[0.06] flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-text-muted truncate">
                github.com/leinhabersv-bit
              </span>
              <CopyButton textToCopy={githubProfile} label="Copy Link" />
            </div>

            <a
              href={githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/20 bg-white/[0.03] text-white font-mono text-xs font-semibold hover:border-white/40 hover:bg-white/[0.06] transition-all"
            >
              <span>Visit GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-text-dim" />
            </a>
          </div>
        </div>
      </div>

      {/* Response Standard Callout */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#090e1a] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-primary">
          <CheckCircle2 className="w-4 h-4" />
          <span>Verified Channels Only</span>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          I respond to all genuine technical and collaboration messages. To prevent identity ambiguity or spam, unverified social profiles are omitted from this portfolio.
        </p>
      </div>
    </div>
  );
}
