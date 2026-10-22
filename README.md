# 🚀 Developer Portfolio — Rithik SV

> **Cinematic, high-performance personal engineering portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS, Three.js, and Vitest.**

[![Build Status](https://img.shields.io/badge/Build-Passing-22c55e?style=for-the-badge&logo=next.js&logoColor=fff)](https://nextjs.org/)
[![Tests Passing](https://img.shields.io/badge/Tests-9%2F9_Passing-22c55e?style=for-the-badge&logo=vitest&logoColor=fff)](./src/test)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Spatial_Core-00f5d4?style=for-the-badge&logo=three.js&logoColor=000)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

---

## 🧭 Overview

This repository contains the complete personal developer portfolio for **Rithik SV** ([@leinhabersv-bit](https://github.com/leinhabersv-bit)), designed for software engineering recruiters, hackathon judges, technical collaborators, and prospective clients.

### Visual & Architectural Philosophy
- **Cinematic Aesthetic:** Deep charcoal backgrounds (`#07090e`), subtle electric cyan (`#00f5d4`) and violet (`#a855f7`) accents, sophisticated typography, and thin geometric borders.
- **Progressive 3D Enhancement:** Lightweight Three.js procedural spatial core that tracks mouse pointer coordinates, pauses animation when scrolled offscreen via `IntersectionObserver`, respects `prefers-reduced-motion`, and provides a zero-overhead vector fallback if WebGL is unavailable.
- **Evidence-Based Case Studies:** Every case study is grounded in verified codebases, automated test suites, or live deployments. No unverified employment, no fabricated metrics.
- **Local-First & Zero Bloat:** Fast initial paint, responsive layouts from 360px mobile up to 1440px desktop, and zero external runtime tracking.

---

## 📁 Page Structure & Routes

```
src/app/
├── page.tsx                 # Home: Editorial hero, 3D spatial centerpiece, pillars, featured projects
├── work/
│   ├── page.tsx             # Work Index: Interactive directory with category filter
│   └── [slug]/
│       └── page.tsx         # Dynamic Case Studies: Problem, architecture, tradeoffs, tests, links
├── about/
│   └── page.tsx             # About: Authentic developer story, engineering tenets, focus areas
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
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss";`)
- **3D Graphics:** Three.js (Spatial geometry wireframe cage with lerp cursor tracking)
- **Icons:** Lucide React & Custom SVG Brand Components
- **Test Harness:** Vitest 5.x + JSDOM + React Testing Library (9 unit & component tests)

---

## 🧪 Testing & Verification

Run the automated test suite:

```bash
npm test
```

### Test Suite Output (9/9 Passing):
```
 ✓ src/test/projects.test.ts (5 tests)
 ✓ src/test/routes.test.ts (2 tests)
 ✓ src/test/components.test.tsx (2 tests)

 Test Files  3 passed (3)
      Tests  9 passed (9)
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

## ☁️ Vercel Deployment Instructions

Deploying this portfolio to Vercel is seamless:

1. **Via Vercel Web Dashboard:**
   - Go to [vercel.com/new](https://vercel.com/new).
   - Import `leinhabersv-bit/developer-portfolio`.
   - Framework Preset: **Next.js** (automatically detected).
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install --legacy-peer-deps`
   - Click **Deploy**.

2. **Via Vercel CLI:**
   ```bash
   npx vercel
   # Follow the interactive prompts, select Next.js, and deploy to production:
   npx vercel --prod
   ```

---

## 📄 License

MIT © [Rithik SV](https://github.com/leinhabersv-bit)
