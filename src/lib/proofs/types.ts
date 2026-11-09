import type { ComponentType } from "react";
import type { Vec2 } from "../math/vec2";

export type ProofKind =
  | "postulate"
  | "common-notion"
  | "definition"
  | "theorem";

export interface PointPrimitive {
  type: "point";
  id: string;
  position: Vec2;
  label?: string;
  color?: string;
}
export interface SegmentPrimitive {
  type: "segment";
  id: string;
  from: string;
  to: string;
  color?: string;
  dashed?: boolean;
}
export interface CirclePrimitive {
  type: "circle";
  id: string;
  center: string;
  through: string;
  color?: string;
  dashed?: boolean;
}
export interface CircleIntersectionPrimitive {
  type: "circleIntersection";
  id: string;
  first: string;
  second: string;
  branch?: 0 | 1;
  label?: string;
  color?: string;
}
export interface LineCircleIntersectionPrimitive {
  type: "lineCircleIntersection";
  id: string;
  from: string;
  to: string;
  circle: string;
  branch?: 0 | 1;
  label?: string;
  color?: string;
}
export interface PolygonPrimitive {
  type: "polygon";
  id: string;
  points: string[];
  color?: string;
}
export type Primitive =
  | PointPrimitive
  | SegmentPrimitive
  | CirclePrimitive
  | CircleIntersectionPrimitive
  | LineCircleIntersectionPrimitive
  | PolygonPrimitive;

export interface ProofStep {
  title: string;
  text: string;
  add?: Primitive[];
}
export interface Proof {
  id: string;
  label: string;
  title: string;
  kind: ProofKind;
  statement: string;
  dependencies: string[];
  steps: ProofStep[];
  custom?: ComponentType<{ step: number; t: number }>;
}
