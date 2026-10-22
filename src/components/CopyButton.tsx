"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  className?: string;
}

export function CopyButton({ textToCopy, label = "Copy", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all border border-white/10 hover:border-cyan-primary/50 hover:bg-cyan-primary/5 text-text-muted hover:text-white ${className}`}
      title={`Copy ${textToCopy}`}
      aria-label={`Copy ${label}: ${textToCopy}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-cyan-primary" />
          <span className="text-cyan-primary font-semibold">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-text-dim" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
