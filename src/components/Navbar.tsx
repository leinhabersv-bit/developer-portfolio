"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm tracking-tight font-semibold text-white transition-opacity hover:opacity-90"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-primary animate-pulse" />
          <span className="font-mono tracking-normal text-white group-hover:text-cyan-primary transition-colors">
            RITHIK SV
          </span>
          <span className="hidden sm:inline-block font-mono text-xs text-text-dim px-2 py-0.5 rounded border border-white/10 bg-white/[0.02]">
            leinhabersv-bit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-mono tracking-wide transition-all ${
                  isActive
                    ? "text-cyan-primary bg-white/[0.05] border border-cyan-primary/30"
                    : "text-text-muted hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action / External Links */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/leinhabersv-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/10 text-xs font-mono text-text-muted hover:text-white hover:border-white/25 transition-all bg-white/[0.02]"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-text-dim" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-text-muted hover:text-white hover:bg-white/5"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07090e] px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-mono tracking-wide ${
                  isActive
                    ? "text-cyan-primary bg-cyan-primary/10 border border-cyan-primary/30 font-medium"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
            <a
              href="https://github.com/leinhabersv-bit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white py-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/leinhabersv-bit</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-dim" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
