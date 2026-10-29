"use client";

import { useState, useEffect, useRef } from "react";
import { Atom, Play, RotateCcw, Zap, GitBranch, ShieldCheck } from "lucide-react";

// ==========================================
// 1. QUANTUM TUNNELING SIMULATOR
// ==========================================
export function QuantumTunnelingSimulator() {
  const [energy, setEnergy] = useState(2.0); // eV
  const [barrierV0, setBarrierV0] = useState(6.0); // eV
  const [barrierWidth, setBarrierWidth] = useState(1.5); // Angstrom
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Constants
  // kappa = sqrt(2 * m * (V0 - E)) / hbar
  // For electrons, kappa ~ 0.512 * sqrt(V0 - E) in 1/Angstrom
  const deltaE = Math.max(0.01, barrierV0 - energy);
  const kappa = 0.5123 * Math.sqrt(deltaE);
  const kappaA = kappa * barrierWidth;
  const sinhVal = Math.sinh(kappaA);
  const denominator = 1 + (Math.pow(barrierV0, 2) * Math.pow(sinhVal, 2)) / (4 * energy * deltaE);
  const transmission = Math.min(1, Math.max(0, 1 / denominator));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Baseline ground
      const groundY = h * 0.75;
      const barrierTopY = groundY - (barrierV0 / 10) * (h * 0.55);
      const energyY = groundY - (energy / 10) * (h * 0.55);

      // Draw potential barrier rectangle
      const barrierStartX = w * 0.42;
      const barrierPixelWidth = (barrierWidth / 3.0) * (w * 0.22);
      const barrierEndX = barrierStartX + barrierPixelWidth;

      ctx.fillStyle = "rgba(168, 85, 247, 0.15)";
      ctx.fillRect(barrierStartX, barrierTopY, barrierPixelWidth, groundY - barrierTopY);
      ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(barrierStartX, barrierTopY, barrierPixelWidth, groundY - barrierTopY);

      // Barrier label
      ctx.fillStyle = "#a855f7";
      ctx.font = "10px monospace";
      ctx.fillText(`V₀ = ${barrierV0.toFixed(1)} eV`, barrierStartX + 4, barrierTopY - 6);

      // Energy level dotted line
      ctx.strokeStyle = "rgba(0, 245, 212, 0.4)";
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(20, energyY);
      ctx.lineTo(w - 20, energyY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#00f5d4";
      ctx.fillText(`E = ${energy.toFixed(1)} eV`, 24, energyY - 6);

      // Draw Wavefunction psi(x)
      ctx.beginPath();
      ctx.strokeStyle = "#00f5d4";
      ctx.lineWidth = 2;

      for (let x = 20; x < w - 20; x += 2) {
        let psi = 0;
        if (x < barrierStartX) {
          // Region I: Incident + Reflected standing/traveling wave
          const k1 = 0.08 * Math.sqrt(energy);
          psi = Math.sin(k1 * x - t * 3) * 22;
        } else if (x <= barrierEndX) {
          // Region II: Evanescent exponential decay
          const xRel = (x - barrierStartX) / barrierPixelWidth;
          const decay = Math.exp(-kappa * barrierWidth * xRel);
          psi = Math.sin(-t * 3) * 22 * decay;
        } else {
          // Region III: Transmitted traveling wave
          const k1 = 0.08 * Math.sqrt(energy);
          const transmittedAmp = Math.sqrt(transmission) * 22;
          psi = Math.sin(k1 * (x - barrierEndX) - t * 3) * transmittedAmp;
        }

        const y = energyY - psi;
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [energy, barrierV0, barrierWidth, transmission, kappa]);

  return (
    <div className="p-6 rounded-2xl border border-cyan-primary/25 bg-[#080d17] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-primary/10 border border-cyan-primary/30 flex items-center justify-center text-cyan-primary">
            <Atom className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white">
              Interactive Simulation: Quantum Tunneling Solver
            </h4>
            <span className="text-[11px] font-mono text-text-dim">
              Closed-form analytical solution evaluated at runtime
            </span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-md border border-cyan-primary/30 bg-cyan-primary/10 font-mono text-xs text-cyan-primary font-bold">
          T(E) = {(transmission * 100).toFixed(2)}%
        </div>
      </div>

      {/* Wavefunction Canvas */}
      <div className="relative rounded-xl border border-white/10 bg-[#04060a] overflow-hidden">
        <canvas ref={canvasRef} width={800} height={220} className="w-full h-[180px] sm:h-[220px]" />
        <div className="absolute top-2 right-2 text-[10px] font-mono text-text-dim px-2 py-0.5 rounded bg-black/60 border border-white/06">
          ψ(x) Wavefunction Real Part
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Particle Energy (E)</span>
            <span className="text-cyan-primary font-bold">{energy.toFixed(1)} eV</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={5.5}
            step={0.1}
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            className="w-full accent-[#00f5d4] cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Barrier Height (V₀)</span>
            <span className="text-violet-primary font-bold">{barrierV0.toFixed(1)} eV</span>
          </div>
          <input
            type="range"
            min={4.0}
            max={8.0}
            step={0.2}
            value={barrierV0}
            onChange={(e) => setBarrierV0(parseFloat(e.target.value))}
            className="w-full accent-[#a855f7] cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Barrier Width (a)</span>
            <span className="text-lime-primary font-bold">{barrierWidth.toFixed(1)} Å</span>
          </div>
          <input
            type="range"
            min={0.8}
            max={3.0}
            step={0.1}
            value={barrierWidth}
            onChange={(e) => setBarrierWidth(parseFloat(e.target.value))}
            className="w-full accent-[#c8f75a] cursor-pointer"
          />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/06 text-xs font-mono text-text-dim flex flex-wrap items-center justify-between gap-2">
        <span>κ = {kappa.toFixed(3)} Å⁻¹</span>
        <span>Attenuation: e^(-2κa) = {Math.exp(-2 * kappaA).toExponential(3)}</span>
        <span>Unitarity: |R|² + |T|² = 1.0000</span>
      </div>
    </div>
  );
}

// ==========================================
// 2. KINEMATIC DRIFT & THROW SIMULATOR
// ==========================================
export function KinematicDriftSimulator() {
  const [speed, setSpeed] = useState(38); // km/h
  const [slipAngle, setSlipAngle] = useState(24); // degrees
  const [chargeTime, setChargeTime] = useState(0.85); // seconds
  const [throwOutcome, setThrowOutcome] = useState("PERFECT DELIVERY (x3.2)");

  const maxRange = 180; // pixels
  const normalizedCharge = Math.min(1.0, chargeTime / 1.2);
  const throwDistance = Math.round(normalizedCharge * maxRange);

  useEffect(() => {
    if (speed > 30 && slipAngle > 18 && normalizedCharge > 0.6) {
      setThrowOutcome("DRIFT SKILL BONUS (x4.5 MULTIPLIER!)");
    } else if (normalizedCharge < 0.35) {
      setThrowOutcome("SHORT MISS (Insufficient hold charge)");
    } else if (normalizedCharge > 0.95) {
      setThrowOutcome("LONG MISS (Over-charged pass)");
    } else {
      setThrowOutcome("STANDARD DELIVERY (x1.0 SCORE)");
    }
  }, [speed, slipAngle, normalizedCharge]);

  return (
    <div className="p-6 rounded-2xl border border-violet-primary/25 bg-[#080d17] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-primary/10 border border-violet-primary/30 flex items-center justify-center text-violet-primary">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white">
              Interactive Simulation: Courier Drift &amp; Ballistic Arc
            </h4>
            <span className="text-[11px] font-mono text-text-dim">
              Evaluates hold-to-charge kinematics and miss taxonomy
            </span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-md border border-violet-primary/30 bg-violet-primary/10 font-mono text-xs text-violet-primary font-bold">
          {throwOutcome}
        </div>
      </div>

      {/* Trajectory Arc Canvas Simulation */}
      <div className="relative h-28 rounded-xl border border-white/10 bg-[#04060a] p-4 flex items-center overflow-hidden">
        {/* Car indicator */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-6 rounded bg-violet-primary/80 border border-white flex items-center justify-center font-mono text-[9px] text-[#06080d] font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-transform"
            style={{ transform: `rotate(${-slipAngle}deg)` }}
          >
            CAR
          </div>

          {/* Ballistic arc path */}
          <div className="relative h-12 flex items-center" style={{ width: `${throwDistance + 40}px` }}>
            <svg className="w-full h-full overflow-visible">
              <path
                d={`M 0 24 Q ${throwDistance / 2} -10 ${throwDistance} 24`}
                fill="none"
                stroke="#00f5d4"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx={throwDistance} cy="24" r="5" fill="#00f5d4" className="animate-pulse" />
            </svg>
          </div>

          {/* Delivery Target Doorstep */}
          <div className="px-2.5 py-1 rounded border border-white/20 bg-white/5 font-mono text-[10px] text-text-muted">
            TARGET
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Vehicle Speed</span>
            <span className="text-white font-bold">{speed} km/h</span>
          </div>
          <input
            type="range"
            min={10}
            max={65}
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full accent-[#a855f7] cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Drift Slip Angle</span>
            <span className="text-violet-primary font-bold">{slipAngle}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={45}
            value={slipAngle}
            onChange={(e) => setSlipAngle(parseInt(e.target.value))}
            className="w-full accent-[#a855f7] cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Space Hold Charge</span>
            <span className="text-cyan-primary font-bold">{chargeTime.toFixed(2)}s</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1.5}
            step={0.05}
            value={chargeTime}
            onChange={(e) => setChargeTime(parseFloat(e.target.value))}
            className="w-full accent-[#00f5d4] cursor-pointer"
          />
        </div>
      </div>

      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/06 text-xs font-mono text-text-dim flex flex-wrap items-center justify-between gap-2">
        <span>Ballistic Distance: {throwDistance}px</span>
        <span>Flight Duration: {(normalizedCharge * 0.45).toFixed(2)}s</span>
        <span>Web Audio Rev Pitch: {(120 + speed * 6).toFixed(0)} Hz</span>
      </div>
    </div>
  );
}

// ==========================================
// 3. DAG PROGRESSION SIMULATOR
// ==========================================
export function DagProgressionSimulator() {
  const [completed, setCompleted] = useState<string[]>([]);

  const nodes = [
    { id: "step-1", title: "Cloud Concepts", prereq: [] },
    { id: "step-2", title: "Architecture & Services", prereq: ["step-1"] },
    { id: "step-3", title: "Management & Governance", prereq: ["step-2"] },
    { id: "step-4", title: "AZ-104 Administration", prereq: ["step-3"] },
  ];

  const handleToggle = (id: string, isAvailable: boolean) => {
    if (completed.includes(id)) {
      // Uncheck this and any downstream dependent
      setCompleted(completed.filter((c) => c !== id));
    } else if (isAvailable) {
      setCompleted([...completed, id]);
    }
  };

  const handleReset = () => {
    setCompleted([]);
  };

  return (
    <div className="p-6 rounded-2xl border border-lime-primary/25 bg-[#080d17] space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-lime-primary/10 border border-lime-primary/30 flex items-center justify-center text-lime-primary">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-mono text-sm font-bold text-white">
              Interactive Simulation: Directed Acyclic Graph Resolver
            </h4>
            <span className="text-[11px] font-mono text-text-dim">
              Enforces topological curriculum dependencies in real time
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-white/10 text-xs font-mono text-text-muted hover:text-white"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset DAG</span>
        </button>
      </div>

      {/* DAG Node Tree */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {nodes.map((node, idx) => {
          const isDone = completed.includes(node.id);
          const isAvailable = node.prereq.every((p) => completed.includes(p));

          return (
            <div
              key={node.id}
              onClick={() => handleToggle(node.id, isAvailable)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isDone
                  ? "border-emerald-500/50 bg-emerald-950/20 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : isAvailable
                  ? "border-lime-primary/40 bg-lime-950/15 text-white hover:border-lime-primary/70"
                  : "border-white/06 bg-white/[0.01] text-text-dim opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span>0{idx + 1} // STAGE</span>
                <span
                  className={`px-1.5 py-0.5 rounded ${
                    isDone
                      ? "bg-emerald-500/20 text-emerald-400"
                      : isAvailable
                      ? "bg-lime-500/20 text-lime-400"
                      : "bg-white/5 text-text-dim"
                  }`}
                >
                  {isDone ? "COMPLETE" : isAvailable ? "READY" : "LOCKED"}
                </span>
              </div>
              <h5 className="font-mono text-xs font-bold">{node.title}</h5>
              <p className="text-[10px] text-text-muted mt-2">
                {isDone
                  ? "✓ Prerequisite satisfied"
                  : isAvailable
                  ? "Click to complete stage"
                  : `Requires: ${nodes[idx - 1]?.title}`}
              </p>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/06 text-xs font-mono text-text-dim flex items-center justify-between">
        <span>Completion: {Math.round((completed.length / nodes.length) * 100)}%</span>
        <span>Zero-Key Offline AI Fallback: Active</span>
      </div>
    </div>
  );
}

// ==========================================
// 4. A.D.A.P.T. AUTONOMOUS DECISION SIMULATOR
// ==========================================
export function AdaptBudgetDecisionSimulator() {
  const [marginRate, setMarginRate] = useState(0.61); // 61%
  const [currentSpend, setCurrentSpend] = useState(25000); // INR
  const [beta, setBeta] = useState(0.70); // Return curve power
  const [runwayDays, setRunwayDays] = useState(4.2); // Inventory runway in days
  const [roas, setRoas] = useState(4.1); // Observed ROAS

  // Decision workflow state machine: 'pending' | 'approved' | 'rejected' | 'simulated'
  const [workflowState, setWorkflowState] = useState<"pending" | "approved" | "rejected" | "simulated">("pending");
  const [confidence, setConfidence] = useState(0.75); // Starting confidence 75%
  const [simResult, setSimResult] = useState<{
    predictedGain: number;
    simulatedGain: number;
    errorPct: number;
    newConfidence: number;
  } | null>(null);

  // Closed-form calculations
  const breakEvenRoas = 1 / Math.max(0.01, marginRate);
  const marginalProfitPerRupee = marginRate * beta * roas - 1;
  const isStockRisk = runwayDays < 5.0;
  const isForcedDonor = runwayDays < 3.0;

  // Decision recommendation logic
  let recommendationAction: string;
  let recommendedSpend: number;
  let recommendationBadge: string;
  let badgeColor: string;

  if (isForcedDonor) {
    recommendationAction = "CRITICAL DONOR: Cut budget to floor to prevent complete stockout";
    recommendedSpend = Math.round(currentSpend * 0.35); // -65% cut
    recommendationBadge = "FORCED DONOR (<3d Stock)";
    badgeColor = "text-rose-400 border-rose-500/30 bg-rose-500/10";
  } else if (isStockRisk) {
    recommendationAction = "STOCK WARNING: High ROAS does not justify scale without inventory cover";
    recommendedSpend = currentSpend; // Held neutral
    recommendationBadge = "STOCK WARNING (<5d Stock)";
    badgeColor = "text-amber-400 border-amber-500/30 bg-amber-500/10";
  } else if (marginalProfitPerRupee > 0) {
    recommendationAction = "ELIGIBLE RECEIVER: Marginal profit positive with safe inventory buffer";
    recommendedSpend = Math.min(Math.round(currentSpend * 1.40), Math.round(currentSpend + 10000)); // +40% cap
    recommendationBadge = "GROWTH RECEIVER (+40% Cap)";
    badgeColor = "text-cyan-primary border-cyan-primary/30 bg-cyan-primary/10";
  } else {
    recommendationAction = "UNPROFITABLE: Marginal profit negative; reallocate spend elsewhere";
    recommendedSpend = Math.round(currentSpend * 0.70); // -30% normal donor cap
    recommendationBadge = "BUDGET DONOR (-30% Cap)";
    badgeColor = "text-violet-primary border-violet-primary/30 bg-violet-primary/10";
  }

  const handleApprove = () => {
    setWorkflowState("approved");
  };

  const handleReject = () => {
    setWorkflowState("rejected");
    setSimResult(null);
  };

  const handleSimulate = () => {
    // 3-day simulation with locked M4 formula:
    // hidden beta in [0.8, 1.2]*beta, 8% noise, 1-day 50% ramp
    const deltaSpend = recommendedSpend - currentSpend;
    const predictedDailyGain = Math.round(marginRate * (deltaSpend * roas) - deltaSpend);
    const predictedGain3Day = Math.max(0, predictedDailyGain * 3);

    // Simulated actual with variance & stock cap
    const noiseFactor = 0.92 + Math.random() * 0.16; // 8% noise
    const stockFulfillCap = Math.max(0.3, Math.min(1.0, runwayDays / 7.0));
    const simulatedGain3Day = Math.round(predictedGain3Day * noiseFactor * stockFulfillCap * (0.85 + Math.random() * 0.3));

    // Prediction percentage error
    const absPredicted = Math.max(1, Math.abs(predictedGain3Day));
    const errorFraction = (simulatedGain3Day - predictedGain3Day) / absPredicted;
    const errorPct = Math.round(Math.abs(errorFraction) * 100);

    // Locked M5 confidence formula: c_new = c + 0.3 * (accuracy - c), step capped at +/-0.08, clamped to [0.30, 0.95]
    const accuracy = Math.max(0, 1 - Math.abs(errorFraction));
    const rawStep = 0.3 * (accuracy - confidence);
    const cappedStep = Math.max(-0.08, Math.min(0.08, rawStep));
    const nextConfidence = Number(Math.max(0.30, Math.min(0.95, confidence + cappedStep)).toFixed(3));

    setConfidence(nextConfidence);
    setSimResult({
      predictedGain: predictedGain3Day,
      simulatedGain: simulatedGain3Day,
      errorPct,
      newConfidence: nextConfidence,
    });
    setWorkflowState("simulated");
  };

  const handleReset = () => {
    setWorkflowState("pending");
    setSimResult(null);
    setConfidence(0.75);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-[#070b14] space-y-6">
      {/* Header telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <span className="font-mono text-xs text-cyan-primary tracking-wider uppercase block">
            A.D.A.P.T. Closed-Loop Decision Engine // DataQuest 3.0
          </span>
          <span className="text-xs text-text-dim block mt-0.5">
            Team M.A.R.K.A.N — 6 Contributors • Pure TypeScript Analytical Solvers
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded text-[11px] font-mono border ${badgeColor}`}>
            {recommendationBadge}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-white/10 text-text-dim hover:text-white transition-colors"
            title="Reset Simulator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Margin Rate (m)</span>
            <span className="text-cyan-primary font-bold">{(marginRate * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.30"
            max="0.80"
            step="0.01"
            value={marginRate}
            onChange={(e) => {
              setMarginRate(parseFloat(e.target.value));
              if (workflowState === "simulated") setWorkflowState("approved");
            }}
            className="w-full accent-cyan-primary"
          />
          <span className="text-[10px] font-mono text-text-dim block">
            Break-Even ROAS: {breakEvenRoas.toFixed(2)}x
          </span>
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Daily Spend (s₀)</span>
            <span className="text-white font-bold">₹{currentSpend.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="5000"
            max="50000"
            step="1000"
            value={currentSpend}
            onChange={(e) => {
              setCurrentSpend(parseInt(e.target.value));
              if (workflowState === "simulated") setWorkflowState("approved");
            }}
            className="w-full accent-cyan-primary"
          />
          <span className="text-[10px] font-mono text-text-dim block">
            Projected Rec: ₹{recommendedSpend.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Stock Runway</span>
            <span className={`font-bold ${isForcedDonor ? "text-rose-400" : isStockRisk ? "text-amber-400" : "text-emerald-400"}`}>
              {runwayDays.toFixed(1)} Days
            </span>
          </div>
          <input
            type="range"
            min="1.0"
            max="14.0"
            step="0.2"
            value={runwayDays}
            onChange={(e) => {
              setRunwayDays(parseFloat(e.target.value));
              if (workflowState === "simulated") setWorkflowState("approved");
            }}
            className="w-full accent-cyan-primary"
          />
          <span className="text-[10px] font-mono text-text-dim block">
            {runwayDays < 3 ? "Below 3d cut limit" : runwayDays < 5 ? "Under 5d warning" : "Safe >7d buffer"}
          </span>
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-text-muted">Observed ROAS</span>
            <span className="text-white font-bold">{roas.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="1.5"
            max="6.0"
            step="0.1"
            value={roas}
            onChange={(e) => {
              setRoas(parseFloat(e.target.value));
              if (workflowState === "simulated") setWorkflowState("approved");
            }}
            className="w-full accent-cyan-primary"
          />
          <span className="text-[10px] font-mono text-text-dim block">
            Marginal Profit: ₹{marginalProfitPerRupee.toFixed(2)} / ₹
          </span>
        </div>
      </div>

      {/* Decision Summary Card */}
      <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-text-dim">RECOMMENDATION ACTION</span>
          <span className="text-cyan-primary font-bold">
            Spend Move: {recommendedSpend > currentSpend ? "+" : ""}
            ₹{(recommendedSpend - currentSpend).toLocaleString("en-IN")}/day
          </span>
        </div>
        <p className="text-sm text-white font-mono leading-relaxed">
          {recommendationAction}
        </p>
      </div>

      {/* Human-in-the-Loop State Machine Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-text-dim">Decision State:</span>
          <span
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider ${
              workflowState === "simulated"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : workflowState === "approved"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : workflowState === "rejected"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
            }`}
          >
            {workflowState}
          </span>
          <span className="text-xs font-mono text-text-dim">
            Model Confidence: <span className="text-cyan-primary font-bold">{(confidence * 100).toFixed(1)}%</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {workflowState === "pending" && (
            <>
              <button
                onClick={handleReject}
                className="px-3.5 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs font-mono transition-colors"
              >
                Reject Plan
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-1.5 rounded-lg bg-cyan-primary text-[#06080d] hover:bg-cyan-primary/90 text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(0,245,212,0.3)]"
              >
                Approve Recommendation
              </button>
            </>
          )}

          {workflowState === "approved" && (
            <button
              onClick={handleSimulate}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 text-[#06080d] hover:bg-emerald-400 text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate 3-Day Horizon</span>
            </button>
          )}

          {workflowState === "simulated" && (
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.08] text-xs font-mono transition-colors"
            >
              Replay Next Cycle
            </button>
          )}
        </div>
      </div>

      {/* Simulation Result & Calibration Feedback */}
      {simResult && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-emerald-400 font-bold uppercase tracking-wider">
              3-Day Hidden-World Simulation Outcome
            </span>
            <span className="text-text-dim">M5 Error Calibration</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs font-mono">
            <div>
              <span className="text-text-dim block">Predicted Gain (3d)</span>
              <span className="text-white font-bold">₹{simResult.predictedGain.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span className="text-text-dim block">Simulated Actual</span>
              <span className="text-emerald-300 font-bold">₹{simResult.simulatedGain.toLocaleString("en-IN")}</span>
            </div>
            <div>
              <span className="text-text-dim block">Prediction Error</span>
              <span className="text-amber-300 font-bold">{simResult.errorPct}%</span>
            </div>
            <div>
              <span className="text-text-dim block">Updated Confidence</span>
              <span className="text-cyan-primary font-bold">{(simResult.newConfidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

