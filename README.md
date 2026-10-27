# 🚀 Developer Portfolio — Rithik SV

> **Cinematic, high-performance personal engineering portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Three.js, and Vitest.**

[![Build Status](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge&logo=next.js&logoColor=fff)](https://nextjs.org/)
[![Tests Passing](https://img.shields.io/badge/Tests-11%2F11_Passing-22c55e?style=for-the-badge&logo=vitest&logoColor=fff)](./src/test)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Kinetic_Spatial_Core-00f5d4?style=for-the-badge&logo=three.js&logoColor=000)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

---

## 🧭 Overview

This repository contains the complete personal developer portfolio for **Rithik SV** ([@leinhabersv-bit](https://github.com/leinhabersv-bit)), student software engineer at **Vellore Institute of Technology (VIT Chennai)**. Designed for engineering recruiters, hackathon judges, technical collaborators, and prospective clients.

### Visual & Architectural Philosophy
- **Cinematic Aesthetic:** Deep obsidian backgrounds (`#06080d`), electric cyan (`#00f5d4`) and violet (`#a855f7`) accents, sophisticated typography, and thin geometric grid borders.
- **Kinetic Spatial Engine (Three.js):** 3 interactive visual simulation modes ("Quantum Wave Harmonic", "Geodesic Core", "Kinematic Vectors"), live telemetry HUD (FPS, Node count), pause/play toggle, mouse drag and touch controls, with reduced-motion accessibility fallbacks.
- **In-Situ Engineering Simulators:**
  1. *Quantum Tunneling Simulator:* Analytical transmission probability $T(E)$ calculation with dynamic wavefunction canvas $\psi(x)$ and $E, V_0, a$ parameter sliders.
  2. *Kinematic Drift Simulator:* Hold-to-charge ballistic trajectory arc visualizer with vehicle slip angle and miss taxonomy.
  3. *DAG Progression Simulator:* Topological curriculum unlocker with reactive prerequisite state resolution.
- **Evidence-Based Case Studies:** Every case study is grounded in verified codebases, automated test suites (e.g., 132 tests in CHAMP Physics Lab, 10 tests in Panic Delivery), or live deployments.
- **Local-First & Zero Bloat:** Fast initial paint, responsive layouts from 360px mobile up to 1440px desktop, and zero external runtime tracking.

---

## 📁 Page Structure & Routes

```
src/app/
├── page.tsx                 # Home: Institutional hero, 3D spatial centerpiece, telemetry deck, architectural pillars
├── work/
│   ├── page.tsx             # Work Index: Interactive directory with category filter (Physics & Sim, Web Audio, etc.)
│   └── [slug]/
│       └── page.tsx         # Dynamic Case Studies: In-situ simulators, problem, architecture, tradeoffs, tests, links
├── about/
│   └── page.tsx             # About: VIT Chennai student developer story, engineering tenets, focus areas
├── stack/
│   └── page.tsx             # Stack: 5 verified technical domains with codebase context
├── contact/
│   └── page.tsx             # Contact: Direct email, GitHub link, working copy-to-clipboard
├── not-found.tsx            # Custom 404: Terminal-inspired missing route screen
├── sitemap.ts               # Automated XML sitemap generation for all routes
└── robots.ts                # Compliant search engine crawling directives
```

---

## 🛠️ Tech Stack & Tooling

- **Framework:** Next.js 16.4.2 (App Router with Turbopack)
- **Library:** React 19.3.0
- **Language:** TypeScript 5.x (Strict mode)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";` with `@theme inline` palette mappings)
- **3D Graphics:** Three.js (Spatial geometry wireframe cage with lerp cursor tracking & 3 kinetic modes)
- **Icons:** Lucide React & Custom SVG Brand Components
- **Test Harness:** Vitest 5.x + JSDOM + React Testing Library (11 unit & component tests)

---

## 🧪 Testing & Verification

Run the automated test suite:

```bash
npm test
```

### Test Suite Output (11/11 Passing):
```
 ✓ src/test/projects.test.ts (6 tests)
 ✓ src/test/routes.test.ts (2 tests)
 ✓ src/test/components.test.tsx (3 tests)

 Test Files  3 passed (3)
      Tests  11 passed (11)
```

Run TypeScript compilation check:
```bash
npm run typecheck
```

Run ESLint analysis:
```bash
npm run lint
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ (tested on Node 22 & Node 24)
- npm or pnpm

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/leinhabersv-bit/developer-portfolio.git
   cd developer-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm run start
   ```

---

## ☁️ Deployment Architecture

### 1. Vercel Production Deployment
The primary production instance is deployed on Vercel with automated GitHub integration:
- Live URL: [https://developer-portfolio-eta-steel.vercel.app/](https://developer-portfolio-eta-steel.vercel.app/)
- Framework: Next.js App Router (Turbopack)
- CI/CD: Automated builds triggered on commits to `main`.

### 2. Cloudflare Deployment Compatibility
Cloudflare is supported via Cloudflare Pages or Cloudflare Workers:
- **Cloudflare Pages (Static):** Run static export build and deploy via `wrangler pages deploy out`.
- **Cloudflare Workers (Full-Stack):** For edge runtime deployments using `vinext` or `@cloudflare/workers`, refer to the official Cloudflare Workers Next.js guide.

---

## 📄 License

MIT © [Rithik SV](https://github.com/leinhabersv-bit)
