import { circle, point, polygon, segment } from "../proofs/builders";
import { Primitive, ProofStep } from "../proofs/types";

export const AMBER = "#fbbf24";
export const CYAN = "#22d3ee";
export const VIOLET = "#a78bfa";
export const GREEN = "#34d399";
export const ORANGE = "#f97316";
export const SKY = "#38bdf8";

export const given = (text: string, add: Primitive[] = []) => ({
  title: "Given",
  text,
  add,
});
export const step = (
  title: string,
  text: string,
  add: Primitive[] = [],
): ProofStep => ({ title, text, add });

export const h = (id: string, x: number, y: number) => point(id, [x, y], "");

export type V = [number, number];
export type SegOpts = { color?: string; dashed?: boolean };
export const vmul = (a: V, s: number): V => [a[0] * s, a[1] * s];
export const vadd = (a: V, b: V): V => [a[0] + b[0], a[1] + b[1]];
export const vsub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1]];
export const vlen = (a: V) => Math.hypot(a[0], a[1]);
export const vunit = (a: V): V => vmul(a, 1 / vlen(a));
export const lerp = (a: V, b: V, t: number): V => vadd(a, vmul(vsub(b, a), t));
export const mid = (a: V, b: V): V => lerp(a, b, 0.5);
export const cross = (a: V, b: V) => a[0] * b[1] - a[1] * b[0];
export const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1];
export const lineInt = (a: V, b: V, c: V, d: V): V => {
  const r = vsub(b, a);
  const s = vsub(d, c);
  return vadd(a, vmul(r, cross(vsub(c, a), s) / cross(r, s)));
};
export const foot = (p: V, a: V, b: V): V => {
  const d = vunit(vsub(b, a));
  return vadd(a, vmul(d, dot(vsub(p, a), d)));
};
export const reflect = (p: V, a: V, b: V): V => vsub(vmul(foot(p, a, b), 2), p);
export const rot = (p: V, c: V, t: number): V => {
  const d = vsub(p, c);
  return [
    c[0] + d[0] * Math.cos(t) - d[1] * Math.sin(t),
    c[1] + d[0] * Math.sin(t) + d[1] * Math.cos(t),
  ];
};
export const circ2 = (
  c1: V,
  r1: number,
  c2: V,
  r2: number,
  side: 1 | -1 = 1,
): V => {
  const d = vlen(vsub(c2, c1));
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const hh = Math.sqrt(Math.max(r1 * r1 - a * a, 0));
  const u = vunit(vsub(c2, c1));
  return vadd(vadd(c1, vmul(u, a)), vmul([-u[1], u[0]], hh * side));
};
export const area = (p: V[]) =>
  Math.abs(p.reduce((s, q, i) => s + cross(q, p[(i + 1) % p.length]), 0)) / 2;

export const P = (id: string, v: V, label = id) => point(id, v, label);
export const H = (id: string, v: V) => h(id, v[0], v[1]);
export const line2 = (id: string, a: V, b: V, o?: SegOpts): Primitive[] => [
  H(`${id}_a`, a),
  H(`${id}_b`, b),
  segment(id, `${id}_a`, `${id}_b`, o),
];
export const shape = (id: string, pts: V[], color?: string): Primitive[] => [
  ...pts.map((p, i) => H(`${id}_${i}`, p)),
  polygon(
    id,
    pts.map((_, i) => `${id}_${i}`),
    color,
  ),
];
export const disc = (id: string, c: V, r: number, o?: SegOpts): Primitive[] => [
  H(`${id}_c`, c),
  H(`${id}_r`, [c[0] + r, c[1]]),
  circle(id, `${id}_c`, `${id}_r`, o),
];
export const wedge = (
  id: string,
  o: V,
  a: V,
  b: V,
  r = 0.4,
  color = AMBER,
): Primitive[] => {
  const a0 = Math.atan2(a[1] - o[1], a[0] - o[0]);
  let d = Math.atan2(b[1] - o[1], b[0] - o[0]) - a0;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const n = 8;
  const pts: V[] = [o];
  for (let i = 0; i <= n; i++) {
    const t = a0 + (d * i) / n;
    pts.push([o[0] + r * Math.cos(t), o[1] + r * Math.sin(t)]);
  }
  return shape(id, pts, color);
};
export const slice = (
  id: string,
  o: V,
  r: number,
  t0: number,
  t1: number,
  color: string,
  withCentre = false,
): Primitive[] => {
  const n = 24;
  const pts: V[] = withCentre ? [o] : [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    pts.push([o[0] + r * Math.cos(t), o[1] + r * Math.sin(t)]);
  }
  return shape(id, pts, color);
};
