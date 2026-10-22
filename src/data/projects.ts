export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
  aspect?: string;
}

export interface ProjectDecision {
  title: string;
  rationale: string;
}

export interface ProjectChallenge {
  problem: string;
  resolution: string;
}

export interface ProjectArchitecture {
  title: string;
  description: string;
  components: { name: string; role: string }[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: "Interactive & Graphics" | "Local-First & Commercial" | "Systems & Web";
  visibility: "Public Open Source" | "Private Commercial" | "Private Platform" | "Public Case Study";
  featured: boolean;
  status: string;
  timeline: string;
  role: string;
  summary: string;
  heroImage: string;
  screenshots: ProjectScreenshot[];
  metrics: ProjectMetric[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  solution: string;
  architecture: ProjectArchitecture;
  keyDecisions: ProjectDecision[];
  challenges: ProjectChallenge[];
  verification: {
    framework: string;
    metrics: string;
    verifiedOn: string;
    notes: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "panic-delivery",
    title: "PANIC DELIVERY",
    subtitle: "High-Speed Arcade Delivery & Physics Engine",
    tagline: "Top-down arcade courier score attack built with TypeScript, Canvas, Three.js & procedural Web Audio.",
    category: "Interactive & Graphics",
    visibility: "Public Open Source",
    featured: true,
    status: "Shipped & Tested",
    timeline: "October 2026",
    role: "Core Engine & Gameplay Engineer",
    summary:
      "A fast-paced 120-second arcade delivery simulation featuring vehicle drift dynamics, hold-to-charge package trajectories, lock-on targeting, and runtime procedural audio synthesis.",
    heroImage: "/images/projects/panic-delivery/gameplay-two-deliveries.jpg",
    screenshots: [
      {
        url: "/images/projects/panic-delivery/gameplay-two-deliveries.jpg",
        caption: "Real-time delivery burst, particle sparks, and dynamic lock-on trajectory indicator.",
      },
      {
        url: "/images/projects/panic-delivery/second-round-results.jpg",
        caption: "Round performance rating, combo multipliers, and localStorage high score persistence.",
      },
    ],
    metrics: [
      { label: "Unit Tests", value: "10/10", detail: "Automated regression tests passing in CI" },
      { label: "Target Round", value: "120s", detail: "Strict score-attack match loop with Final Rush phase" },
      { label: "Input Discipline", value: "6 Keys", detail: "Arrow Keys + Z (Drift/Start) + Space (Charge/Throw)" },
      { label: "External Audio Assets", value: "0", detail: "100% procedurally synthesized via Web Audio API" },
    ],
    technologies: [
      "TypeScript",
      "Vite",
      "HTML5 Canvas 2D",
      "Three.js (3D Spike)",
      "Web Audio API",
      "Node.js Test Runner",
    ],
    liveUrl: "https://panic-delivery.vercel.app/",
    githubUrl: "https://github.com/leinhabersv-bit/panic-delivery",
    problem:
      "Modern web games frequently suffer from input lag, oversized external asset payloads, and imprecise trajectory mechanics that ruin high-velocity arcade gameplay. The challenge was building a responsive 60fps courier simulation with zero audio asset latency and tight physics.",
    solution:
      "Engineered a lightweight, deterministic TypeScript game loop combining sub-pixel vehicle drift kinematics, hold-to-charge ballistic package throwing, and procedural audio synthesis directly on the Web Audio API without downloading external audio files.",
    architecture: {
      title: "Modular Subsystem Architecture",
      description: "Decoupled state, physics, rendering, and audio layers in src/game/:",
      components: [
        { name: "car.ts", role: "Simulates vehicle slip angles, handbrake drift momentum, and steering dampening." },
        { name: "package.ts", role: "Calculates charge-to-range throw kinematics, airtime arcs, and hit/miss bounds." },
        { name: "audio.ts", role: "Synthesizes engine rev oscillators, drift noise buffers, and delivery chords." },
        { name: "living_city.ts", role: "Manages road graphs, civilian obstacles, pedestrian density, and collision boxes." },
        { name: "hud.ts", role: "Renders compass guidance, combo timers, radar pings, and delivery alerts." },
      ],
    },
    keyDecisions: [
      {
        title: "Procedural Sound Generation vs MP3/OGG Assets",
        rationale:
          "Synthesizing all sounds (engine acceleration, tyre skids, package swishes, victory fanfares) via Web Audio API oscillators eliminated audio network load, zeroed out asset buffering, and allowed pitch-shifting dynamic feedback based on vehicle speed.",
      },
      {
        title: "Strict 6-Key Arcade Input Contract",
        rationale:
          "Restricted inputs strictly to Arrow keys + Z + Space. Debounced Space during menus to prevent accidental misfires and reserved fresh Z presses for title and game over states.",
      },
      {
        title: "Three-Tier Celebration System",
        rationale:
          "Implemented progressive audiovisual reward tiers (Level 1: Delivery Spark, Level 2: Neighborhood Party, Level 3: City Goes Wild!) to provide visceral feedback and incentivize risky moving throws.",
      },
    ],
    challenges: [
      {
        problem: "Inconsistent throw landings caused by frame-rate variance.",
        resolution:
          "Replaced time-step accumulation with delta-time normalized ballistic arcs, capping maximum charge at 1.5 seconds with automated release safeguards.",
      },
      {
        problem: "Distinguishing genuine skill throws from lucky misfires.",
        resolution:
          "Implemented short/long/wide miss classification that detects player intent, awarding bonus multipliers only when packages are thrown while traveling at high speed.",
      },
    ],
    verification: {
      framework: "npx tsx (Node.js Test Runner)",
      metrics: "10 test suites, 10 passed, 0 failed, 15.7ms runtime",
      verifiedOn: "Local CI environment & live Vercel production",
      notes: "Tests verify road scales, hold-to-charge kinematics, target lock-on, miss taxonomy, celebration contracts, and high score state transitions.",
    },
  },
  {
    slug: "clientlaunch",
    title: "ClientLaunch",
    subtitle: "Offline-First Commercial SMM Suite",
    tagline: "100% local-first operational suite for freelance social media managers and digital agencies.",
    category: "Local-First & Commercial",
    visibility: "Private Commercial",
    featured: true,
    status: "Commercial v1.0.0",
    timeline: "2026",
    role: "Full-Stack Architect & Product Engineer",
    summary:
      "A privacy-first, zero-subscription commercial web app designed for independent digital managers to price proposals, generate signed agreements, and schedule campaigns without remote server dependencies.",
    heroImage: "/images/projects/clientlaunch-preview.svg",
    screenshots: [
      {
        url: "/images/projects/clientlaunch-preview.svg",
        caption: "ClientLaunch operational cockpit: Proposal Studio, Retainer Calculator & JSON Vault.",
      },
    ],
    metrics: [
      { label: "Data Architecture", value: "100% Offline", detail: "IndexedDB on-device persistence with JSON vault backup" },
      { label: "Subscription Cost", value: "$0 / mo", detail: "Zero cloud database or API overhead for users" },
      { label: "Test Automation", value: "E2E + Unit", detail: "Automated test harness with Vitest and Playwright" },
      { label: "Source Privacy", value: "Proprietary", detail: "Private commercial repository with live public demo" },
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "IndexedDB",
      "Playwright (E2E)",
      "Vitest",
      "Oxlint",
      "TailwindCSS",
    ],
    liveUrl: "https://clientlaunch.vercel.app/",
    problem:
      "Freelance service providers and boutique agencies are overwhelmed with monthly SaaS subscriptions for basic proposal drafting, invoicing, and contract generation, creating recurring overhead and raising client privacy concerns.",
    solution:
      "Built a unified, offline-first application that handles client proposals, service-level agreements, and campaign scheduling entirely in the browser using IndexedDB, featuring encrypted JSON vault import/export for secure portability.",
    architecture: {
      title: "Local-First Storage & Module Structure",
      description: "Five core modules backed by an asynchronous persistence layer:",
      components: [
        { name: "Proposal Studio", role: "Interactive retainer calculator with scope boundary guardrails." },
        { name: "Agreement Generator", role: "Produces compliant service contracts with digital signature capture." },
        { name: "Client Onboarding", role: "Account intake workflows and asset collection checklists." },
        { name: "Content Scheduler", role: "Visual timeline and milestone manager across active engagements." },
        { name: "JSON Vault Engine", role: "Automated snapshot backup and single-click restoration." },
      ],
    },
    keyDecisions: [
      {
        title: "IndexedDB Local Persistence vs Cloud DB",
        rationale:
          "Keeps 100% of client sensitive financial data on user hardware, eliminates server hosting expenses, and guarantees uninterrupted functionality during offline work.",
      },
      {
        title: "Dual Test Strategy (Playwright + Vitest)",
        rationale:
          "Ensures reliable offline persistence via Playwright end-to-end browser tests while validating complex pricing and scope math with high-speed Vitest unit tests.",
      },
    ],
    challenges: [
      {
        problem: "Schema migrations across IndexedDB database versions.",
        resolution:
          "Engineered a resilient database upgrade listener that transforms legacy schema objects during initialization without data loss.",
      },
    ],
    verification: {
      framework: "Playwright E2E + Vitest + Oxlint",
      metrics: "Full suite verified prior to v1.0.0 commercial freeze",
      verifiedOn: "Node 22 / Chromium / WebKit",
      notes: "Commercial source code is kept strictly private; capabilities and deployment verified via live preview.",
    },
  },
  {
    slug: "eventhub-cc",
    title: "EventHub-CC",
    subtitle: "Campus Event Discovery & Telemetry Platform",
    tagline: "University community platform featuring automated multi-source intake and telemetry analytics.",
    category: "Systems & Web",
    visibility: "Private Platform",
    featured: true,
    status: "Production Prototype",
    timeline: "2026",
    role: "Full-Stack Software Developer",
    summary:
      "An interactive event discovery, scraping, and telemetry portal built for campus communities, utilizing Next.js App Router, Cheerio ingestion pipelines, and Framer Motion visual layouts.",
    heroImage: "/images/projects/eventhub-preview.svg",
    screenshots: [
      {
        url: "/images/projects/eventhub-preview.svg",
        caption: "Obsidian Lumina constellation layout and real-time campus telemetry dashboard.",
      },
    ],
    metrics: [
      { label: "Frontend Framework", value: "Next.js 15", detail: "App Router architecture running on Node 22 runtime" },
      { label: "Ingestion Engine", value: "Cheerio", detail: "Automated multi-source event intake & normalizers" },
      { label: "UI Motion", value: "Framer Motion", detail: "Fluid layout transitions and telemetry visualization" },
      { label: "Testing", value: "Vitest", detail: "Automated ingestion parsing and security header verification" },
    ],
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Node.js 22",
      "Cheerio",
      "Framer Motion",
      "Lucide Icons",
      "Vitest",
    ],
    problem:
      "University students frequently miss hackathons, workshops, and student union announcements scattered across disconnected portals, social media groups, and static bulletin boards.",
    solution:
      "Architected a centralized hub combining automated web scraping adapters with a curated review workbench, presenting upcoming campus opportunities through an interactive constellation visual layout.",
    architecture: {
      title: "Data Pipeline & Interface Layer",
      description: "Scraping, review, and presentation pipeline:",
      components: [
        { name: "import-events.ts", role: "Cheerio-powered scraper extracting date, venue, tags, and registrations." },
        { name: "review-events.ts", role: "Administrative workbench validating extracted event schemas." },
        { name: "Obsidian Lumina UI", role: "High-contrast dark theme layout presenting events chronologically." },
        { name: "Telemetry Engine", role: "Aggregates student bookmarking trends and category interest heatmaps." },
      ],
    },
    keyDecisions: [
      {
        title: "Server-Side Script Ingestion vs Real-Time Client Fetching",
        rationale:
          "Pre-caching and sanitizing event listings on the server avoids rate-limiting, handles heterogeneous target layouts cleanly, and serves zero-latency payloads to users.",
      },
      {
        title: "Strict Security Headers & CSP",
        rationale:
          "Configured Content Security Policy and defense-in-depth headers in Next.js configuration to safeguard community data.",
      },
    ],
    challenges: [
      {
        problem: "Inconsistent event markup across university department pages.",
        resolution:
          "Created modular site adapters with fallback regex date extractors that cleanly normalize messy HTML.",
      },
    ],
    verification: {
      framework: "Vitest unit tests & Vercel deployment audit",
      metrics: "Passing data pipeline and layout tests",
      verifiedOn: "Node 22 runtime",
      notes: "Internal project details kept confidential; architecture highlighted as modern web engineering case study.",
    },
  },
  {
    slug: "mic-learning-path",
    title: "MIC LearnPath",
    subtitle: "Prerequisite DAG Curriculum Tracker",
    tagline: "Interactive Microsoft curriculum tracker with dependency graphs and contextual AI topic summaries.",
    category: "Systems & Web",
    visibility: "Public Open Source",
    featured: false,
    status: "Completed",
    timeline: "August 2026",
    role: "Frontend Engineer",
    summary:
      "A curriculum navigation application for Microsoft Learn paths (Cloud, AI & Data, Security), implementing a Directed Acyclic Graph (DAG) unlock engine with an AI fallback mechanism.",
    heroImage: "/images/projects/miclearn-preview.svg",
    screenshots: [
      {
        url: "/images/projects/miclearn-preview.svg",
        caption: "Prerequisite tracking DAG showing locked, ready-to-start, and completed course stages.",
      },
    ],
    metrics: [
      { label: "Core Tracks", value: "3 Tracks", detail: "Cloud (Azure), AI & Data, Security Fundamentals" },
      { label: "Dependency Logic", value: "DAG Engine", detail: "Sequential prerequisite unlocking" },
      { label: "Offline Resilience", value: "Zero-Key Mode", detail: "Fallback topic explanations when API key is unset" },
      { label: "Curriculum Links", value: "Direct", detail: "One-click navigation to official Microsoft Learn modules" },
    ],
    technologies: ["React", "Vite", "JavaScript (ESNext)", "OpenAI API", "CSS3 Modern Layouts"],
    githubUrl: "https://github.com/leinhabersv-bit/Mic-learning-path",
    problem:
      "Self-directed students often struggle to identify which prerequisite topics to master first when exploring complex cloud and AI certifications.",
    solution:
      "Built a visual progression tree that models topic dependencies as a DAG, preventing out-of-order study while offering instant contextual AI summaries of newly unlocked subjects.",
    architecture: {
      title: "State Machine & Prerequisite Resolver",
      description: "Client-side graph traversal and API fallback flow:",
      components: [
        { name: "data.js", role: "Canonical graph definition storing track modules and prerequisite IDs." },
        { name: "App.jsx", role: "Manages completion state, unlocks next available node, and triggers AI briefs." },
        { name: "Fallback Handler", role: "Delivers built-in curriculum summaries if OpenAI key is missing or offline." },
      ],
    },
    keyDecisions: [
      {
        title: "Guaranteed Zero-Key Fallback Mode",
        rationale:
          "Ensured the entire UI, dependency graph, and curriculum explanations function out-of-the-box without requiring visitors to provide their own OpenAI API key.",
      },
    ],
    challenges: [
      {
        problem: "Preventing circular prerequisite deadlocks.",
        resolution: "Designed validation rules to enforce strictly directed acyclic module ordering.",
      },
    ],
    verification: {
      framework: "Manual & Automated Component Verification",
      metrics: "100% graph traversal integrity across all 3 tracks",
      verifiedOn: "Vite dev & build targets",
      notes: "Public repository leinhabersv-bit/Mic-learning-path verified.",
    },
  },
];

export const TECHNICAL_SKILLS = [
  {
    category: "Languages",
    description: "Core languages used across production applications, games, and data pipelines.",
    skills: [
      { name: "TypeScript", proficiency: "Expert", context: "Primary language for panic-delivery engine, ClientLaunch suite, Next.js applications" },
      { name: "JavaScript (ESNext)", proficiency: "Advanced", context: "Modern async/await, DOM APIs, Canvas 2D contexts, closures, workers" },
      { name: "Python 3.x", proficiency: "Competent", context: "Data manipulation, automation scripts, test harnesses, algorithmic verification" },
      { name: "HTML5 & Semantic Web", proficiency: "Expert", context: "Canvas 2D contexts, audio contexts, semantic landmarks, ARIA accessible roles" },
      { name: "CSS3 / Modern Layouts", proficiency: "Advanced", context: "Tailwind CSS, Grid, Flexbox, custom design tokens, container queries" },
    ],
  },
  {
    category: "Frontend Engineering",
    description: "Component systems, reactive architectures, and performance-focused rendering.",
    skills: [
      { name: "React 18 / 19", proficiency: "Advanced", context: "Server components, custom hooks, context state machines, concurrent rendering" },
      { name: "Next.js (App Router)", proficiency: "Advanced", context: "Static site generation, route handlers, metadata, layout cascades" },
      { name: "Vite Ecosystem", proficiency: "Expert", context: "High-speed bundling, HMR, custom plugin setups, multi-target builds" },
      { name: "Framer Motion / Motion", proficiency: "Advanced", context: "Layout animations, gesture recognition, scroll-driven choreography" },
      { name: "Tailwind CSS", proficiency: "Expert", context: "Tailwind v3/v4 theme configurations, responsive utility styling, dark mode" },
    ],
  },
  {
    category: "Graphics, Audio & Spatial",
    description: "Interactive 2D/3D visual rendering, physics, and audio synthesis.",
    skills: [
      { name: "Three.js", proficiency: "Intermediate", context: "Camera matrices, lighting, geometry instancing, 3D visual spike prototypes" },
      { name: "HTML5 Canvas 2D Engine", proficiency: "Advanced", context: "60fps game loops, vehicle kinematics, particle cascades, screen shake" },
      { name: "Web Audio API", proficiency: "Advanced", context: "Runtime oscillator synthesis, gain nodes, custom noise buffers, dynamic sound" },
    ],
  },
  {
    category: "Local-First & Data Systems",
    description: "On-device persistence, client-side vaults, and resilient ingestion.",
    skills: [
      { name: "IndexedDB & Storage APIs", proficiency: "Advanced", context: "ClientLaunch local-first persistence, automated JSON vault import/export" },
      { name: "Directed Acyclic Graphs (DAG)", proficiency: "Competent", context: "Prerequisite curriculum traversal and unlock logic in MIC LearnPath" },
      { name: "Cheerio Web Ingestion", proficiency: "Competent", context: "Server-side HTML parsing, schema normalization, multi-source event intake" },
      { name: "REST APIs & JSON", proficiency: "Expert", context: "Clean async API consuming, OpenAI integration, fallback error handling" },
    ],
  },
  {
    category: "Quality Assurance & DevOps",
    description: "Automated testing, continuous integration, and disciplined workflows.",
    skills: [
      { name: "Vitest & Node Test Runner", proficiency: "Advanced", context: "10/10 test suite in panic-delivery, unit tests in ClientLaunch and EventHub" },
      { name: "Playwright E2E", proficiency: "Competent", context: "Browser automation and offline workflow tests for commercial web suites" },
      { name: "Git & GitHub Workflows", proficiency: "Advanced", context: "Strict branch discipline, semantic commit messages, remote CI triggers" },
      { name: "Vercel Deployment", proficiency: "Advanced", context: "Edge deployment, environment variable configuration, build optimization" },
    ],
  },
];
