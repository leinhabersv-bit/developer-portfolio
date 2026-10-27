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
