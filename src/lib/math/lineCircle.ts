import { add, scale, sub, type Vec2 } from "./vec2";

export interface Circle2 {
  center: Vec2;
  radius: number;
}

export interface LineCircleHit {
  point: Vec2;
  t: number;
}

export function lineCircleIntersections(
  a: Vec2,
  b: Vec2,
  circle: Circle2,
): LineCircleHit[] {
  const direction = sub(b, a);
  const offset = sub(a, circle.center);
  const aa = direction.x * direction.x + direction.y * direction.y;

  if (aa === 0) return [];

  const bb = 2 * (offset.x * direction.x + offset.y * direction.y);
  const cc = offset.x * offset.x + offset.y * offset.y - circle.radius ** 2;

  const discriminant = bb * bb - 4 * aa * cc;
  if (discriminant < 0) return [];
  const root = Math.sqrt(Math.max(0, discriminant));
  const values =
    root === 0
      ? [-bb / (2 * aa)]
      : [(-bb - root) / (2 * aa), (-bb + root) / (2 * aa)];
  return values
    .filter((t) => t >= -1e-9 && t <= 1 + 1e-9)
    .map((t) => ({ t, point: add(a, scale(direction, t)) }));
}

export function circleCircleIntersections(
  first: Circle2,
  second: Circle2,
): Vec2[] {
  const delta = sub(second.center, first.center);
  const d = Math.hypot(delta.x, delta.y);
  if (
    d === 0 ||
    d > first.radius + second.radius + 1e-9 ||
    d < Math.abs(first.radius - second.radius) - 1e-9
  ) {
    return [];
  }
  const along = (first.radius ** 2 - second.radius ** 2 + d ** 2) / (2 * d);
  const heightSquared = first.radius ** 2 - along ** 2;
  const height = Math.sqrt(Math.max(0, heightSquared));
  const midpoint = add(first.center, scale(delta, along / d));
  const perpendicular = { x: -delta.y / d, y: delta.x / d };
  const upper = add(midpoint, scale(perpendicular, height));
  if (height === 0) return [upper];
  return [upper, add(midpoint, scale(perpendicular, -height))];
}
