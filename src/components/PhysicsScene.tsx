import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { ContactShadows } from '@react-three/drei';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';
import { featuredProjects } from '../projectsData';

export function setCursorLabel(label: string | null) {
  window.dispatchEvent(new CustomEvent('cursor-label', { detail: { label } }));
}

/* ============================================================
   LABEL TEXTURES — rendered on a local 2D canvas.
   Zero network requests. Replaces drei <Text>, which pulled
   its font from a CDN and could hang the scene forever.
   ============================================================ */

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapLabel(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function createLabelTexture(title: string, accent: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // accent plate
  const pad = 34;
  roundRectPath(ctx, pad, pad, size - pad * 2, size - pad * 2, 26);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#0a0a0b';
  ctx.stroke();

  // auto-fit title
  let fontSize = 76;
  const maxW = size - pad * 2 - 56;
  let lines: string[] = [];
  const fontFor = (s: number) => `800 ${s}px 'Inter Tight', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  ctx.font = fontFor(fontSize);
  while (fontSize > 30) {
    lines = wrapLabel(ctx, title.toUpperCase(), maxW);
    const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
    if (lines.length <= 3 && widest <= maxW) break;
    fontSize -= 6;
    ctx.font = fontFor(fontSize);
  }

  ctx.fillStyle = '#0a0a0b';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lineHeight = fontSize * 1.12;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2 - fontSize * 0.06;
  lines.forEach((l, i) => ctx.fillText(l, size / 2, startY + i * lineHeight));

  // corner tag
  ctx.font = "700 20px 'JetBrains Mono', monospace";
  ctx.fillStyle = 'rgba(10,10,11,0.55)';
  ctx.fillText('· DRAG · THROW ·', size / 2, size - pad - 42);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ============================================================
   PROCEDURAL ENVIRONMENT — reflections generated locally.
   Replaces <Environment preset="city"> which downloaded an
   HDR file from raw.githack.com at runtime.
   ============================================================ */

function ProceduralEnv() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envMap.texture;
    return () => {
      envMap.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);
  return null;
}

/* ============================================================
   PHYSICS WORLD
   ============================================================ */

function Pointer() {
  const ref = useRef<any>(null);
  useFrame(({ mouse, viewport }) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation({
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      });
    }
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders="ball" ref={ref}>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#c6ff3d" emissive="#c6ff3d" emissiveIntensity={1.4} roughness={0.25} />
      </mesh>
    </RigidBody>
  );
}

function ProjectBlock({ title, color, position, link }: any) {
  const rb = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const label = useMemo(() => createLabelTexture(title, color), [title, color]);

  useFrame(({ mouse, viewport }) => {
    if (isDragging && rb.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      const pos = rb.current.translation();
      rb.current.setLinvel(
        { x: (x - pos.x) * 15, y: (y - pos.y) * 15, z: (0 - pos.z) * 15 },
        true
      );
      rb.current.setAngularDamping(5);
      rb.current.setLinearDamping(2);
    } else if (rb.current) {
      rb.current.setAngularDamping(0.5);
      rb.current.setLinearDamping(0.5);
    }
  });

  return (
    /* colliders={false} + explicit CuboidCollider so label planes don't spawn extra colliders */
    <RigidBody
      position={position}
      colliders={false}
      restitution={0.7}
      friction={0.5}
      ref={rb}
      enabledRotations={[false, false, true]}
    >
      <CuboidCollider args={[1, 1, 1]} restitution={0.7} friction={0.5} />
      <mesh
        onPointerOver={() => {
          setHover(true);
          setCursorLabel(isDragging ? 'THROW' : 'DRAG');
        }}
        onPointerOut={() => {
          setHover(false);
          setCursorLabel(null);
        }}
        onPointerDown={(e: any) => {
          e.stopPropagation();
          setIsDragging(true);
          setCursorLabel('THROW');
          e.target.setPointerCapture(e.pointerId);
          dragStartRef.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e: any) => {
          e.stopPropagation();
          setIsDragging(false);
          setCursorLabel(null);
          e.target.releasePointerCapture(e.pointerId);
          const dx = e.clientX - dragStartRef.current.x;
          const dy = e.clientY - dragStartRef.current.y;
          if (Math.sqrt(dx * dx + dy * dy) < 10) window.open(link, '_blank');
        }}
        castShadow
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#141419"
          roughness={0.28}
          metalness={0.88}
          emissive={hovered ? '#1f1f27' : '#000000'}
        />
      </mesh>

      {/* labels on front + back faces */}
      <mesh position={[0, 0, 1.02]}>
        <planeGeometry args={[1.82, 1.82]} />
        <meshBasicMaterial map={label} transparent />
      </mesh>
      <mesh position={[0, 0, -1.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.82, 1.82]} />
        <meshBasicMaterial map={label} transparent />
      </mesh>
    </RigidBody>
  );
}

const FLOOR_TOP_OFFSET = 0.3;

function InvisibleBounds() {
  const { viewport } = useThree();
  const t = 2;
  return (
    <>
      <RigidBody type="fixed" position={[0, -viewport.height / 2 - t / 2 + FLOOR_TOP_OFFSET, 0]} restitution={0.5} friction={0.5}>
        <CuboidCollider args={[viewport.width, t / 2, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, viewport.height / 2 + t / 2, 0]} restitution={0.5}>
        <CuboidCollider args={[viewport.width, t / 2, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-viewport.width / 2 - t / 2, 0, 0]} restitution={0.5}>
        <CuboidCollider args={[t / 2, viewport.height, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[viewport.width / 2 + t / 2, 0, 0]} restitution={0.5}>
        <CuboidCollider args={[t / 2, viewport.height, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, -1.5]} restitution={0}>
        <CuboidCollider args={[viewport.width, viewport.height, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 0, 1.5]} restitution={0}>
        <CuboidCollider args={[viewport.width, viewport.height, 0.5]} />
      </RigidBody>
    </>
  );
}

function GroundShadows() {
  const { viewport } = useThree();
  return (
    <ContactShadows
      position={[0, -viewport.height / 2 + FLOOR_TOP_OFFSET, 0]}
      opacity={0.6}
      scale={22}
      blur={2.4}
      far={4.5}
      color="#000000"
    />
  );
}

function Scene() {
  return (
    <>
      <ProceduralEnv />
      <ambientLight intensity={0.32} />
      <hemisphereLight args={['#8a93a6', '#0a0a0b', 0.45]} />
      <directionalLight position={[8, 14, 8]} castShadow intensity={1.5} color="#fff6e8" />
      <pointLight position={[-10, -6, -8]} intensity={40} distance={45} decay={2} color="#c6ff3d" />

      <Physics gravity={[0, -9.81, 0]}>
        <Pointer />
        {featuredProjects.map((p) => (
          <ProjectBlock key={p.id} {...p} />
        ))}
        <InvisibleBounds />
      </Physics>

      <GroundShadows />
    </>
  );
}

/* ============================================================ */

export default function PhysicsCanvas({ onReady }: { onReady: () => void }) {
  return (
    <div className="canvas-layer">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        onCreated={() => onReady()}
        style={{ touchAction: 'pan-y' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}