import {
  circleCircleIntersections,
  lineCircleIntersections,
} from "../math/lineCircle";
import { distance, type Vec2 } from "../math/vec2";
import type { ProofStep } from "./types";

export interface ResolvedPoint {
  id: string;
  pos: Vec2;
  label?: string;
  step: number;
}
export interface ResolvedSegment {
  id: string;
  a: Vec2;
  b: Vec2;
  color?: string;
  dashed?: boolean;
  step: number;
}
export interface ResolvedCircle {
  id: string;
  center: Vec2;
  radius: number;
  color?: string;
  dashed?: boolean;
  step: number;
  startAngle: number;
}
export interface ResolvedPolygon {
  id: string;
  points: Vec2[];
  color?: string;
  step: number;
}
export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
export interface ResolvedScene {
  points: ResolvedPoint[];
  segments: ResolvedSegment[];
  circles: ResolvedCircle[];
  polygons: ResolvedPolygon[];
  errors: string[];
}
const empty = (): ResolvedScene => ({
  points: [],
  segments: [],
  circles: [],
  polygons: [],
  errors: [],
});
export function resolveScene(steps: ProofStep[], step: number): ResolvedScene {
  const scene = empty();
  const points = new Map<string, Vec2>();
  const circles = new Map<string, ResolvedCircle>();
  const primitives = steps
    .slice(0, Math.max(0, step + 1))
    .flatMap((proofStep, stepIndex) =>
      (proofStep.add ?? []).map((primitive) => ({
        primitive,
        step: stepIndex,
      })),
    );
  const addError = (message: string) => scene.errors.push(message);
  const pointFor = (id: string) => {
    const value = points.get(id);
    if (!value) addError(`Missing point "${id}"`);
    return value;
  };
  primitives.forEach(({ primitive, step: primitiveStep }) => {
    if (primitive.type === "point") {
      points.set(primitive.id, primitive.position);
      scene.points.push({
        id: primitive.id,
        pos: primitive.position,
        label: primitive.label,
        step: primitiveStep,
      });
    } else if (primitive.type === "segment") {
      const a = pointFor(primitive.from);
      const b = pointFor(primitive.to);
      if (a && b)
        scene.segments.push({
          id: primitive.id,
          a,
          b,
          color: primitive.color,
          dashed: primitive.dashed,
          step: primitiveStep,
        });
    } else if (primitive.type === "circle") {
      const center = pointFor(primitive.center);
      const through = pointFor(primitive.through);
      if (center && through) {
        const resolved = {
          id: primitive.id,
          center,
          radius: distance(center, through),
          color: primitive.color,
          dashed: primitive.dashed,
          step: primitiveStep,
          startAngle: 0,
        };
        circles.set(primitive.id, resolved);
        scene.circles.push(resolved);
      }
    } else if (primitive.type === "circleIntersection") {
      const first = circles.get(primitive.first);
      const second = circles.get(primitive.second);
      if (!first || !second) {
        addError(`Missing circle for intersection "${primitive.id}"`);
        return;
      }
      const hit = circleCircleIntersections(first, second)[
        primitive.branch ?? 0
      ];
      if (!hit) {
        addError(`No intersection for "${primitive.id}"`);
        return;
      }
      points.set(primitive.id, hit);
      scene.points.push({
        id: primitive.id,
        pos: hit,
        label: primitive.label,
        step: primitiveStep,
      });
    } else if (primitive.type === "lineCircleIntersection") {
      const a = pointFor(primitive.from);
      const b = pointFor(primitive.to);
      const circle = circles.get(primitive.circle);
      if (!a || !b || !circle) {
        addError(`Missing geometry for intersection "${primitive.id}"`);
        return;
      }
      const hit = lineCircleIntersections(a, b, circle)[primitive.branch ?? 0];
      if (!hit) {
        addError(`No intersection for "${primitive.id}"`);
        return;
      }
      points.set(primitive.id, hit.point);
      scene.points.push({
        id: primitive.id,
        pos: hit.point,
        label: primitive.label,
        step: primitiveStep,
      });
    } else if (primitive.type === "polygon") {
      const polygonPoints = primitive.points.map((point) =>
        typeof point === "string" ? pointFor(point) : point,
      );
      if (polygonPoints.every((p): p is Vec2 => !!p))
        scene.polygons.push({
          id: primitive.id,
          points: polygonPoints,
          color: primitive.color,
          step: primitiveStep,
        });
    }
  });
  return scene;
}
export function sceneBounds(scene: ResolvedScene): Bounds {
  const values = [
    ...scene.points.map((p) => p.pos),
    ...scene.segments.flatMap((s) => [s.a, s.b]),
    ...scene.circles.flatMap((c) => [
      { x: c.center.x - c.radius, y: c.center.y - c.radius },
      { x: c.center.x + c.radius, y: c.center.y + c.radius },
    ]),
    ...scene.polygons.flatMap((p) => p.points),
  ];
  if (!values.length) return { minX: -1, maxX: 1, minY: -1, maxY: 1 };
  return {
    minX: Math.min(...values.map((p) => p.x)),
    maxX: Math.max(...values.map((p) => p.x)),
    minY: Math.min(...values.map((p) => p.y)),
    maxY: Math.max(...values.map((p) => p.y)),
  };
}
