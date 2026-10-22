"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Support Verification
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
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

    // 2. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Geometries & Materials: Futuristic Architectural Cage
    const group = new THREE.Group();
    scene.add(group);

    // Outer wireframe icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Inner geometric cage
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Glowing core sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Subtle orbital ring
    const ringGeo = new THREE.RingGeometry(2.1, 2.12, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 4. Pointer Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // 5. Reduced Motion Check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 6. Intersection Observer (Pause Rendering When Offscreen)
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 7. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        outerMesh.rotation.y += delta * 0.25;
        outerMesh.rotation.x += delta * 0.12;

        innerMesh.rotation.y -= delta * 0.4;
        innerMesh.rotation.z += delta * 0.2;

        ringMesh.rotation.z += delta * 0.15;

        const time = clock.getElapsedTime();
        const scale = 1 + Math.sin(time * 2.5) * 0.08;
        coreMesh.scale.set(scale, scale, scale);
      }

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      group.rotation.y = mouseX;
      group.rotation.x = -mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] sm:h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden"
      aria-label="Interactive 3D Engineering Spatial Core"
    >
      {/* WebGL Fallback if unsupported */}
      {!webglSupported && (
        <div className="flex flex-col items-center justify-center p-8 text-center border border-white/10 rounded-2xl bg-surface-1/80 backdrop-blur-md">
          <div className="w-20 h-20 rounded-full border border-cyan-primary/40 flex items-center justify-center mb-4 text-cyan-primary text-2xl font-mono">
            ◈
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-cyan-primary mb-1">
            Spatial Geometry Node
          </span>
          <p className="text-xs text-text-muted max-w-xs">
            WebGL acceleration unavailable. Interactive 3D visualization scaled to static vector matrix.
          </p>
        </div>
      )}

      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-cyan-primary/5 via-transparent to-transparent opacity-60" />
    </div>
  );
}
