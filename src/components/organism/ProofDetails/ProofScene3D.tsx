"use client";

import { useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import { Box, Typography } from "@mui/material";
import * as THREE from "three";

import {
  resolveScene,
  sceneBounds,
  type Bounds,
  type ResolvedCircle,
  type ResolvedPoint,
  type ResolvedPolygon,
  type ResolvedSegment,
} from "@/lib/proofs/scene";
import type { Proof } from "@/lib/proofs/types";

const DEFAULT_COLOR = "#cbd5e1";
const CIRCLE_SEGMENTS = 160;
type V3 = [number, number, number];
const v3 = (x: number, y: number, z = 0): V3 => [x, y, z];

function SegmentMesh({ seg, t }: { seg: ResolvedSegment; t: number }) {
  if (t <= 0) return null;
  const end = v3(
    seg.a.x + (seg.b.x - seg.a.x) * t,
    seg.a.y + (seg.b.y - seg.a.y) * t,
  );
  return (
    <Line
      points={[v3(seg.a.x, seg.a.y), end]}
      color={seg.color ?? DEFAULT_COLOR}
      lineWidth={2}
      dashed={seg.dashed}
      dashSize={0.12}
      gapSize={0.08}
    />
  );
}

function CircleMesh({ c, t }: { c: ResolvedCircle; t: number }) {
  if (t <= 0) return null;
  const n = Math.max(2, Math.ceil(CIRCLE_SEGMENTS * t) + 1);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = c.startAngle + (2 * Math.PI * t * i) / (n - 1);
    return v3(
      c.center.x + c.radius * Math.cos(a),
      c.center.y + c.radius * Math.sin(a),
    );
  });
  return (
    <Line
      points={pts}
      color={c.color ?? DEFAULT_COLOR}
      lineWidth={2}
      dashed={c.dashed}
      dashSize={0.12}
      gapSize={0.08}
    />
  );
}

function PolygonMesh({ poly, t }: { poly: ResolvedPolygon; t: number }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    poly.points.forEach((p, i) =>
      i === 0 ? s.moveTo(p.x, p.y) : s.lineTo(p.x, p.y),
    );
    s.closePath();
    return s;
  }, [poly]);
  if (t <= 0) return null;
  return (
    <mesh position={[0, 0, -0.01]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial
        color={poly.color ?? DEFAULT_COLOR}
        transparent
        opacity={0.22 * t}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function PointMesh({ p, t }: { p: ResolvedPoint; t: number }) {
  return (
    <group position={[p.pos.x, p.pos.y, 0.01]}>
      <mesh scale={Math.max(t, 0.001)}>
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color="#f8fafc" />
      </mesh>
      {p.label ? (
        <Text
          position={[0.16, 0.16, 0]}
          anchorX="center"
          anchorY="middle"
          fontSize={0.22}
          color="#f8fafc"
          fillOpacity={t}
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {p.label}
        </Text>
      ) : null}
    </group>
  );
}

function FitCamera({ bounds }: { bounds: Bounds }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const w = Math.max(bounds.maxX - bounds.minX, 1e-6);
    const h = Math.max(bounds.maxY - bounds.minY, 1e-6);
    const zoom = Math.min(size.width / (w * 1.3), size.height / (h * 1.3));
    const cam = camera as THREE.OrthographicCamera;
    cam.zoom = Number.isFinite(zoom) && zoom > 0 ? zoom : 50;
    cam.position.set(
      (bounds.minX + bounds.maxX) / 2,
      (bounds.minY + bounds.maxY) / 2,
      10,
    );
    cam.updateProjectionMatrix();
  }, [bounds, camera, size.width, size.height]);
  return null;
}

interface Props {
  proof: Proof;
  step: number;
  t: number;
}

export default function ProofScene3D({ proof, step, t }: Props) {
  const scene = useMemo(() => resolveScene(proof.steps, step), [proof, step]);
  const bounds = useMemo(
    () => sceneBounds(resolveScene(proof.steps, proof.steps.length - 1)),
    [proof],
  );
  const Custom = proof.custom;
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cy = (bounds.minY + bounds.maxY) / 2;
  const progress = (s: number) => (s === step ? t : 1);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "background.default",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Canvas
        orthographic
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], zoom: 60, near: 0.1, far: 100 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 8]} intensity={1.2} />
        <FitCamera bounds={bounds} />
        <OrbitControls
          key={`${cx}:${cy}`}
          makeDefault
          enableRotate={false}
          target={[cx, cy, 0]}
        />

        {scene.polygons.map((p) => (
          <PolygonMesh key={p.id} poly={p} t={progress(p.step)} />
        ))}
        {scene.circles.map((c) => (
          <CircleMesh key={c.id} c={c} t={progress(c.step)} />
        ))}
        {scene.segments.map((s) => (
          <SegmentMesh key={s.id} seg={s} t={progress(s.step)} />
        ))}
        {scene.points.map((p) => (
          <PointMesh key={p.id} p={p} t={progress(p.step)} />
        ))}
        {Custom ? <Custom step={step} t={t} /> : null}
      </Canvas>

      {scene.errors.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            left: 1,
            bottom: 1,
            right: 1,
            color: "error.light",
            fontSize: 11,
            fontFamily: "fontFamily.mono",
            bgcolor: "surface.scrim",
            p: 0.75,
            borderRadius: 1,
          }}
        >
          {scene.errors.slice(0, 4).map((e, i) => (
            <Typography key={i} variant="caption" sx={{ display: "block" }}>
              ⚠ {e}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
