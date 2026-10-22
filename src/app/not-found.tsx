import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 rounded-3xl border border-white/10 bg-[#0c1220]/80 backdrop-blur-xl text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center text-cyan-primary mx-auto">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-primary">
            ERROR 404 // NULL POINTER
          </span>
          <h1 className="text-2xl font-bold text-white">Route Not Found</h1>
          <p className="text-xs text-text-muted leading-relaxed">
            The requested trajectory does not exist in this application matrix or has been migrated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-primary text-[#07090e] font-mono text-xs font-bold hover:bg-cyan-primary/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Matrix</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
