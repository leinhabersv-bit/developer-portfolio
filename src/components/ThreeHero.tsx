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

    // 2. Scene, Camera, Viewport Setup
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.4;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Dynamic Studio Lights
    const ambientLight = new THREE.AmbientLight(0x070b14, 2.0);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5d4, 3.2, 12);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 2.6, 12);
    violetLight.position.set(-3, -2, 2);
    scene.add(violetLight);

    // 4. Engineering Core Architecture (Group)
    const group = new THREE.Group();
    scene.add(group);

    // Outer crystalline structural cage (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.28,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Network Node Anchors (Points on Vertices)
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00f5d4,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
    });
    const pointsMesh = new THREE.Points(outerGeo, pointsMat);
    group.add(pointsMesh);

    // Inner geometric nucleus (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(1.05, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.55,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Glowing Kernel Node (Solid Sphere with High Emissive Value)
    const coreGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.65,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Orbital Planar Rings
    const ring1Geo = new THREE.RingGeometry(2.15, 2.18, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ringMat);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    group.add(ring1Mesh);

    const ring2Geo = new THREE.RingGeometry(2.35, 2.37, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 5;
    group.add(ring2Mesh);

    // 5. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.9;
      targetY = y * 0.9;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

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

    // 8. Fluid Render Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();

      if (!prefersReducedMotion) {
        outerMesh.rotation.y += delta * 0.22;
        outerMesh.rotation.x += delta * 0.1;

        innerMesh.rotation.y -= delta * 0.38;
        innerMesh.rotation.z += delta * 0.18;

        ring1Mesh.rotation.z += delta * 0.14;
        ring2Mesh.rotation.z -= delta * 0.12;

        const time = clock.getElapsedTime();
        const pulse = 1 + Math.sin(time * 2.2) * 0.07;
        coreMesh.scale.set(pulse, pulse, pulse);

        // Dynamic light orbit
        cyanLight.position.x = Math.sin(time * 0.7) * 3.5;
        cyanLight.position.y = Math.cos(time * 0.9) * 3;
        violetLight.position.x = -Math.cos(time * 0.6) * 3.5;
        violetLight.position.y = -Math.sin(time * 0.8) * 3;
      }

      // Smooth lerp tracking
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

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
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      if (renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer?.dispose();

      outerGeo.dispose();
      outerMat.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[340px] sm:h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden"
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

      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-cyan-primary/5 via-transparent to-transparent opacity-60" />
    </div>
  );
}
