import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07090e] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-primary" />
              <span className="font-mono text-sm font-semibold tracking-wider text-white">
                RITHIK SV
              </span>
              <span className="font-mono text-xs text-text-dim px-2 py-0.5 rounded border border-white/10 bg-white/[0.02]">
                @leinhabersv-bit
              </span>
            </div>
            <p className="text-xs text-text-muted max-w-md leading-relaxed">
              Student software developer focused on interactive systems, 2D/3D graphics, local-first web architectures, and disciplined automated testing.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-primary pt-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-primary animate-ping" />
              <span>Actively Building &amp; Shipping Software</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-dim">Navigation</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/work" className="text-text-muted hover:text-cyan-primary transition-colors">
                  {"// 01. Selected Work"}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-muted hover:text-cyan-primary transition-colors">
                  {"// 02. About & Philosophy"}
                </Link>
              </li>
              <li>
                <Link href="/stack" className="text-text-muted hover:text-cyan-primary transition-colors">
                  {"// 03. Technical Stack"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-muted hover:text-cyan-primary transition-colors">
                  {"// 04. Contact & Connect"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Channels */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-text-dim">Verified Channels</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://github.com/leinhabersv-bit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dim" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:leinhabersv@gmail.com"
                  className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>leinhabersv@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://panic-delivery.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-text-muted hover:text-cyan-primary transition-colors"
                >
                  <span>Panic Delivery Live</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dim" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-dim">
          <p>© 2026 Rithik SV. Built with Next.js, TypeScript &amp; Three.js.</p>
          <p>No fabricated metrics • Verified engineering claims only.</p>
        </div>
      </div>
    </footer>
  );
}
