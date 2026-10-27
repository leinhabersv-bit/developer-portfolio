"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, RotateCw, Activity, Layers } from "lucide-react";

type GeometryMode = "quantum" | "geodesic" | "kinematic";

export function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeMode, setActiveMode] = useState<GeometryMode>("quantum");
  const [isPaused, setIsPaused] = useState(false);
  const [fps, setFps] = useState(60);
  const [vertexCount, setVertexCount] = useState(240);

  // Use a ref so the active animation loop can read state changes without re-creating the entire Three.js context
  const modeRef = useRef<GeometryMode>("quantum");
  const isPausedRef = useRef(false);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Verify WebGL
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) {
        window.requestAnimationFrame(() => setWebglSupported(false));
        return;
      }

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      window.requestAnimationFrame(() => setWebglSupported(false));
      return;
    }

    // 2. Viewport & Camera
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.6;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x060913, 2.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5d4, 3.8, 14);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 3.2, 14);
    violetLight.position.set(-3, -2, 2.5);
    scene.add(violetLight);

    const limeLight = new THREE.PointLight(0xc8f75a, 2.0, 10);
    limeLight.position.set(0, -3, 1);
    scene.add(limeLight);

    // 4. Primary Interactive Group
    const group = new THREE.Group();
    scene.add(group);

    // Sub-groups for each mode
    const quantumGroup = new THREE.Group();
    const geodesicGroup = new THREE.Group();
    const kinematicGroup = new THREE.Group();
    group.add(quantumGroup);
    group.add(geodesicGroup);
    group.add(kinematicGroup);

    // --- MODE 1: QUANTUM WAVE HARMONIC (Torus Knot Wavefunction) ---
    const quantumGeo = new THREE.TorusKnotGeometry(1.2, 0.32, 120, 24, 2, 3);
    const quantumWireMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      wireframe: true,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.45,
    });
    const quantumMesh = new THREE.Mesh(quantumGeo, quantumWireMat);
    quantumGroup.add(quantumMesh);

    const quantumPointsMat = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });
    const quantumPoints = new THREE.Points(quantumGeo, quantumPointsMat);
    quantumGroup.add(quantumPoints);

    // --- MODE 2: GEODESIC CRYSTALLINE CORE (Icosahedron & Core Kernel) ---
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    geodesicGroup.add(outerMesh);

    const innerGeo = new THREE.OctahedronGeometry(1.05, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    geodesicGroup.add(innerMesh);

    const coreGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    geodesicGroup.add(coreMesh);

    // --- MODE 3: KINEMATIC VECTOR FIELD (Concentric Velocity Rings & Particles) ---
    const kinematicCount = 360;
    const kinematicPos = new Float32Array(kinematicCount * 3);
    const kinematicColors = new Float32Array(kinematicCount * 3);

    for (let i = 0; i < kinematicCount; i++) {
      const radius = 1.0 + Math.random() * 1.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.7;

      kinematicPos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      kinematicPos[i * 3 + 1] = radius * Math.sin(phi);
      kinematicPos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      // Color interpolation: Cyan to Lime
      const isCyan = Math.random() > 0.4;
      kinematicColors[i * 3] = isCyan ? 0.0 : 0.78;
      kinematicColors[i * 3 + 1] = isCyan ? 0.96 : 0.97;
      kinematicColors[i * 3 + 2] = isCyan ? 0.83 : 0.35;
    }

    const kinematicParticlesGeo = new THREE.BufferGeometry();
    kinematicParticlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(kinematicPos, 3)
    );
    kinematicParticlesGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(kinematicColors, 3)
    );

    const kinematicParticlesMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const kinematicPoints = new THREE.Points(
      kinematicParticlesGeo,
      kinematicParticlesMat
    );
    kinematicGroup.add(kinematicPoints);

    // Subtle orbital ring
    const ringGeo = new THREE.RingGeometry(2.1, 2.14, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 5. Interactive Parallax & Direct Drag
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetX += deltaX * 0.008;
        targetY += deltaY * 0.008;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 0.8;
        targetY = y * 0.8;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousPointerX = e.touches[0].clientX;
        previousPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousPointerX;
        const deltaY = e.touches[0].clientY - previousPointerY;
        targetX += deltaX * 0.012;
        targetY += deltaY * 0.012;
        previousPointerX = e.touches[0].clientX;
        previousPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    // 6. Reduced Motion Accessibility Check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 7. Intersection Observer for Frame Budget Management
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Fluid Render Loop & FPS Telemetry
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Update FPS count once every 500ms
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 500) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
        setFps(Math.min(60, currentFps));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      const delta = clock.getDelta();
      const currentMode = modeRef.current;
      const paused = isPausedRef.current || prefersReducedMotion;

      // Mode Visibility Toggling
      quantumGroup.visible = currentMode === "quantum";
      geodesicGroup.visible = currentMode === "geodesic";
      kinematicGroup.visible = currentMode === "kinematic";

      if (!paused) {
        // Mode-specific rotational dynamics
        if (currentMode === "quantum") {
          quantumMesh.rotation.x += delta * 0.28;
          quantumMesh.rotation.y += delta * 0.42;
          quantumPoints.rotation.x += delta * 0.28;
          quantumPoints.rotation.y += delta * 0.42;
        } else if (currentMode === "geodesic") {
          outerMesh.rotation.y += delta * 0.22;
          outerMesh.rotation.x += delta * 0.1;
          innerMesh.rotation.y -= delta * 0.38;
          innerMesh.rotation.z += delta * 0.18;
          const time = clock.getElapsedTime();
          const pulse = 1 + Math.sin(time * 2.5) * 0.08;
          coreMesh.scale.set(pulse, pulse, pulse);
        } else if (currentMode === "kinematic") {
          kinematicPoints.rotation.y += delta * 0.35;
          kinematicPoints.rotation.z += delta * 0.15;
        }

        ringMesh.rotation.z += delta * 0.12;

        const time = clock.getElapsedTime();
        cyanLight.position.x = Math.sin(time * 0.8) * 3.6;
        cyanLight.position.y = Math.cos(time * 0.9) * 3.2;
        violetLight.position.x = -Math.cos(time * 0.7) * 3.6;
        violetLight.position.y = -Math.sin(time * 0.85) * 3.2;
      }

      // Smooth damped lerp tracking
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      group.rotation.y = mouseX;
      group.rotation.x = -mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // 10. Robust GPU & Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);

      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();

      quantumGeo.dispose();
      quantumWireMat.dispose();
      quantumPointsMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      kinematicParticlesGeo.dispose();
      kinematicParticlesMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  // Update vertex count telemetry when mode changes
  const handleSelectMode = (mode: GeometryMode) => {
    setActiveMode(mode);
    if (mode === "quantum") setVertexCount(2880);
    else if (mode === "geodesic") setVertexCount(240);
    else if (mode === "kinematic") setVertexCount(360);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        aria-label="Interactive 3D Engineering Spatial Core"
      >
        {/* WebGL Fallback UI */}
        {!webglSupported && (
          <div className="flex flex-col items-center justify-center p-8 text-center border border-white/10 rounded-2xl bg-[#0e1626]/80 backdrop-blur-md">
            <div className="w-20 h-20 rounded-full border border-cyan-primary/40 flex items-center justify-center mb-4 text-cyan-primary text-2xl font-mono">
              ◈
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-cyan-primary mb-1">
              Spatial Geometry Matrix
            </span>
            <p className="text-xs text-text-muted max-w-xs">
              Hardware acceleration disabled. Interactive 3D visualization rendered as static vector node.
            </p>
          </div>
        )}

        {/* Decorative corner coordinate ticks */}
        <div className="absolute top-2 left-2 font-mono text-[10px] text-white/20 select-none pointer-events-none">
          +X.044 // LAT: 12.8406° N
        </div>
        <div className="absolute top-2 right-2 font-mono text-[10px] text-white/20 select-none pointer-events-none">
          -Z.108 // LON: 80.1534° E
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-white/20 select-none pointer-events-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-primary animate-pulse" />
          <span>THREE.JS // ACES FILMIC</span>
        </div>
      </div>

      {/* Interactive Controls & Telemetry Dock */}
      <div className="w-full max-w-md mt-2 px-3 py-2.5 rounded-2xl border border-white/10 bg-[#0c1220]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-2.5">
        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/06">
          <button
            type="button"
            onClick={() => handleSelectMode("quantum")}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] tracking-wide transition-all ${
              activeMode === "quantum"
                ? "bg-cyan-primary text-[#06080d] font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]"
                : "text-text-muted hover:text-white"
            }`}
            title="Quantum Wave Harmonic Orbital (CHAMP Physics Lab)"
          >
            Quantum
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode("geodesic")}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] tracking-wide transition-all ${
              activeMode === "geodesic"
                ? "bg-cyan-primary text-[#06080d] font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]"
                : "text-text-muted hover:text-white"
            }`}
            title="Geodesic Crystalline Core"
          >
            Geodesic
          </button>
          <button
            type="button"
            onClick={() => handleSelectMode("kinematic")}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] tracking-wide transition-all ${
              activeMode === "kinematic"
                ? "bg-cyan-primary text-[#06080d] font-bold shadow-[0_0_12px_rgba(0,245,212,0.3)]"
                : "text-text-muted hover:text-white"
            }`}
            title="Kinematic Vector Field (Panic Delivery Engine)"
          >
            Kinematic
          </button>
        </div>

        {/* Live Telemetry Readout */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-text-dim">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-primary" />
            <span className="text-white font-medium">{fps}</span>
            <span>FPS</span>
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-violet-primary" />
            <span className="text-white font-medium">{vertexCount}</span>
            <span>NODES</span>
          </span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded-md text-text-muted hover:text-white hover:bg-white/10 transition-colors"
            title={isPaused ? "Resume Animation" : "Pause Animation"}
            aria-label={isPaused ? "Resume 3D animation" : "Pause 3D animation"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-cyan-primary" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
