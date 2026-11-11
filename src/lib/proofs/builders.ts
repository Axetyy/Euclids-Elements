import type { Proof, ProofStep, Primitive } from "./types";
import type { Vec2 } from "../math/vec2";

export const point = (
  id: string,
  position: [number, number],
  label = id,
): Primitive => ({
  type: "point",
  id,
  position: { x: position[0], y: position[1] },
  label,
});
export const segment = (
  id: string,
  from: string,
  to: string,
  options?: Pick<Primitive & { type: "segment" }, "color" | "dashed">,
): Primitive => ({
  type: "segment",
  id,
  from,
  to,
  ...options,
});
export const circle = (
  id: string,
  center: string,
  through: string,
  options?: Pick<Primitive & { type: "circle" }, "color" | "dashed">,
): Primitive => ({
  type: "circle",
  id,
  center,
  through,
  ...options,
});
export const circleIntersection = (
  id: string,
  first: string,
  second: string,
  branch: 0 | 1 = 0,
  label = id,
): Primitive => ({
  type: "circleIntersection",
  id,
  first,
  second,
  branch,
  label,
});
export const lineCircleIntersection = (
  id: string,
  from: string,
  to: string,
  circleId: string,
  branch: 0 | 1 = 0,
  label = id,
): Primitive => ({
  type: "lineCircleIntersection",
  id,
  from,
  to,
  circle: circleId,
  branch,
  label,
});
export const polygon = (
  id: string,
  points: (string | Vec2 | [number, number])[],
  color?: string,
): Primitive => ({
  type: "polygon",
  id,
  points: points.map((point) =>
    typeof point === "string"
      ? point
      : Array.isArray(point)
        ? { x: point[0], y: point[1] }
        : point,
  ),
  color,
});
export const defineProof = (
  proof: Omit<Proof, "dependencies" | "steps"> & {
    dependencies?: string[];
    steps?: ProofStep[];
  },
): Proof => ({ dependencies: [], steps: [], ...proof });
