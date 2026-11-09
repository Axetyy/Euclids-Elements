/**
 * A 2D vector.
 */
export interface Vec2 {
  x: number;
  y: number;
}

export const add = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: Vec2, b: Vec2): Vec2 => ({ x: a.x - b.x, y: a.y - b.y });
export const scale = (v: Vec2, scalar: number): Vec2 => ({
  x: v.x * scalar,
  y: v.y * scalar,
});
export const dot = (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y;
export const cross = (a: Vec2, b: Vec2): number => a.x * b.y - a.y * b.x;
export const length = (v: Vec2): number => Math.hypot(v.x, v.y);
export const distance = (a: Vec2, b: Vec2): number => length(sub(a, b));
export const normalize = (v: Vec2): Vec2 => {
  const len = length(v);
  return len === 0 ? { x: 0, y: 0 } : scale(v, 1 / len);
};

export const lerp = (a: Vec2, b: Vec2, t: number): Vec2 =>
  add(a, scale(sub(b, a), t));

export const mid = (a: Vec2, b: Vec2): Vec2 => lerp(a, b, 0.5);

export const lineInt = (a: Vec2, b: Vec2, c: Vec2, d: Vec2): Vec2 => {
  const r = sub(b, a);
  const s = sub(d, c);
  return add(a, scale(r, cross(sub(c, a), s) / cross(r, s)));
};

export const foot = (p: Vec2, a: Vec2, b: Vec2): Vec2 => {
  const d = normalize(sub(b, a));
  return add(a, scale(d, dot(sub(p, a), d)));
};

export const reflect = (p: Vec2, a: Vec2, b: Vec2): Vec2 =>
  sub(scale(foot(p, a, b), 2), p);

export const rot = (p: Vec2, c: Vec2, t: number): Vec2 => {
  const d = sub(p, c);
  return {
    x: c.x + d.x * Math.cos(t) - d.y * Math.sin(t),
    y: c.y + d.x * Math.sin(t) + d.y * Math.cos(t),
  };
};

export const circ2 = (
  c1: Vec2,
  r1: number,
  c2: Vec2,
  r2: number,
  side: 1 | -1 = 1,
): Vec2 => {
  const d = distance(c2, c1);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const hh = Math.sqrt(Math.max(r1 * r1 - a * a, 0));
  const u = normalize(sub(c2, c1));
  const offset: Vec2 = { x: -u.y * hh * side, y: u.x * hh * side };
  return add(add(c1, scale(u, a)), offset);
};

export const area = (p: Vec2[]) =>
  Math.abs(p.reduce((s, q, i) => s + cross(q, p[(i + 1) % p.length]), 0)) / 2;
