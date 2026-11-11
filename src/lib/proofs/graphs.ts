import type { Proof } from "./types";

export interface LayoutIssue {
  proofId?: string;
  message: string;
}
export interface GraphLayout {
  nodes: Array<{
    id: string;
    x: number;
    y: number;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    primary: boolean;
    shelf: boolean;
  }>;
  issues: LayoutIssue[];
}

export function validateProofs(proofs: Proof[]): LayoutIssue[] {
  const ids = new Set(proofs.map((p) => p.id));
  const issues: LayoutIssue[] = [];
  for (const proof of proofs) {
    for (const dependency of proof.dependencies) {
      if (!ids.has(dependency))
        issues.push({
          proofId: proof.id,
          message: `Unknown dependency: ${dependency}`,
        });
    }
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byId = new Map(proofs.map((p) => [p.id, p]));
  const visit = (id: string, path: string[]) => {
    if (visiting.has(id)) {
      issues.push({
        proofId: id,
        message: `Dependency cycle: ${[...path, id].join(" -> ")}`,
      });
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of byId.get(id)?.dependencies ?? [])
      if (byId.has(dependency)) visit(dependency, [...path, id]);
    visiting.delete(id);
    visited.add(id);
  };
  proofs.forEach((p) => visit(p.id, []));
  return issues;
}

/** Horizontal distance between node centers on the same row (NODE_W is 190). */
const COL_W = 450;
/** Vertical distance between proposition layers. */
const ROW_H = 450;
/** Vertical distance between rows inside the definitions / notions shelf. */
const SHELF_ROW_H = 100;
/** Max nodes per row in the shelf grids. */
const SHELF_COLS = 10;
/** Extra vertical breathing room between bands. */
const BAND_GAP = 150;

type Bucket = "definition" | "notion" | "postulate" | "proposition";

/**
 * Classify by `kind`. Matching is by substring so it works with names like
 * "definition", "common-notion", "postulate", "proposition"/"theorem"/etc.
 * Adjust here if your ProofKind values differ.
 */
function bucketOf(p: Proof): Bucket {
  const k = String(p.kind).toLowerCase();
  if (k.includes("def")) return "definition";
  if (k.includes("postulate")) return "postulate";
  if (k.includes("common") || k.includes("notion") || k.includes("axiom"))
    return "notion";
  return "proposition";
}

const rowX = (i: number, n: number) => (i - (n - 1) / 2) * COL_W;

export function buildLayout(proofs: Proof[]): GraphLayout {
  const issues = validateProofs(proofs);
  const byId = new Map(proofs.map((p) => [p.id, p]));
  const bucket = new Map(proofs.map((p) => [p.id, bucketOf(p)]));
  const of = (b: Bucket) => proofs.filter((p) => bucket.get(p.id) === b);
  const pos = new Map<string, { x: number; y: number }>();

  /** Wrapped, centered grid. Returns the height it used. */
  const placeGrid = (list: Proof[], top: number): number => {
    if (!list.length) return 0;
    const cols = Math.min(SHELF_COLS, list.length);
    const rows = Math.ceil(list.length / cols);
    list.forEach((p, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      const inRow = Math.min(cols, list.length - r * cols);
      pos.set(p.id, { x: rowX(c, inRow), y: top + r * SHELF_ROW_H });
    });
    return (rows - 1) * SHELF_ROW_H + BAND_GAP + SHELF_ROW_H * 0.5;
  };

  // ── Bands 1–3: definitions, common notions, postulates ────────────────
  let y = 0;
  y += placeGrid(of("definition"), y);
  y += placeGrid(of("notion"), y);
  y += placeGrid(of("postulate"), y);

  // ── Band 4: propositions, at most 2^n per layer n ─────────────────────
  const props = of("proposition");
  const propIds = new Set(props.map((p) => p.id));

  // Longest-path depth among propositions only (decides who goes first).
  const depth = new Map<string, number>();
  const depthOf = (id: string, path = new Set<string>()): number => {
    const cached = depth.get(id);
    if (cached !== undefined) return cached;
    if (path.has(id)) return 0;
    const nextPath = new Set(path).add(id);
    const ds = (byId.get(id)?.dependencies ?? []).filter(
      (d) => propIds.has(d) && d !== id,
    );
    const v = ds.length
      ? 1 + Math.max(...ds.map((d) => depthOf(d, nextPath)))
      : 0;
    depth.set(id, v);
    return v;
  };

  // Greedy layering: a proposition must sit strictly below every proposition
  // it depends on; if its layer is already full (2^n), it drops to the next.
  // Pushing down never breaks a dependency, so order is always valid.
  const order = props
    .map((p, i) => ({ p, i, d: depthOf(p.id) }))
    .sort((a, b) => a.d - b.d || a.i - b.i);
  const layerOf = new Map<string, number>();
  const layers: string[][] = [];
  for (const { p } of order) {
    let layer = 0;
    for (const d of p.dependencies) {
      const l = layerOf.get(d);
      if (l !== undefined && d !== p.id) layer = Math.max(layer, l + 1);
    }
    while ((layers[layer]?.length ?? 0) >= 2 ** layer) layer++;
    (layers[layer] ??= []).push(p.id);
    layerOf.set(p.id, layer);
  }

  // Order each layer by the average x of what it depends on (barycenter),
  // then space evenly. Fixed spacing >= COL_W means nodes can never overlap.
  const xOf = new Map<string, number>();
  const anchorX = (d: string): number | undefined => {
    const b = bucket.get(d);
    if (b === "proposition") return xOf.get(d);
    if (b === "postulate") return pos.get(d)?.x;
    return undefined;
  };
  layers.forEach((ids, li) => {
    const bary = new Map<string, number>();
    for (const id of ids) {
      const xs = (byId.get(id)?.dependencies ?? [])
        .map(anchorX)
        .filter((v): v is number => v !== undefined);
      bary.set(id, xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
    }
    const sorted = ids
      .map((id, i) => ({ id, i }))
      .sort((a, b) => bary.get(a.id)! - bary.get(b.id)! || a.i - b.i);
    sorted.forEach(({ id }, i) => {
      const x = rowX(i, sorted.length);
      xOf.set(id, x);
      pos.set(id, { x, y: y + li * ROW_H });
    });
  });

  const nodes: GraphLayout["nodes"] = proofs.map((p) => ({
    id: p.id,
    x: pos.get(p.id)?.x ?? 0,
    y: pos.get(p.id)?.y ?? 0,
  }));

  // Primary edge per proof: the closest proposition above it, otherwise a
  // postulate. Definitions / notions are never primary.
  const primaryOf = new Map<string, string>();
  for (const p of proofs) {
    const valid = [...new Set(p.dependencies)].filter(
      (d) => byId.has(d) && d !== p.id,
    );
    const propDeps = valid.filter((d) => bucket.get(d) === "proposition");
    if (propDeps.length) {
      primaryOf.set(
        p.id,
        propDeps.reduce((best, d) =>
          (layerOf.get(d) ?? 0) > (layerOf.get(best) ?? 0) ? d : best,
        ),
      );
      continue;
    }
    const post = valid.find((d) => bucket.get(d) === "postulate");
    if (post) primaryOf.set(p.id, post);
  }

  const edges = proofs.flatMap((p) =>
    [...new Set(p.dependencies)]
      .filter((d) => byId.has(d) && d !== p.id)
      .map((d) => ({
        id: `${p.id}->${d}`,
        source: d,
        target: p.id,
        primary: primaryOf.get(p.id) === d,
        shelf: bucket.get(d) === "definition" || bucket.get(d) === "notion",
      })),
  );
  return { nodes, edges, issues };
}

export function collectRelated(
  proofs: Proof[],
  id: string,
  direction: "dependencies" | "dependents",
): Set<string> {
  const byId = new Map(proofs.map((p) => [p.id, p]));
  const result = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    const next =
      direction === "dependencies"
        ? (byId.get(current)?.dependencies ?? [])
        : proofs
            .filter((p) => p.dependencies.includes(current))
            .map((p) => p.id);
    next.forEach((value) => {
      if (value !== id && !result.has(value)) {
        result.add(value);
        queue.push(value);
      }
    });
  }
  return result;
}
