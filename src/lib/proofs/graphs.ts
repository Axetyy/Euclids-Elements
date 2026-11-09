import type { Proof } from "./types";

export interface LayoutIssue {
  proofId?: string;
  message: string;
}
export interface GraphLayout {
  nodes: Array<{ id: string; x: number; y: number }>;
  edges: Array<{ id: string; source: string; target: string }>;
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

const COL_W = 190;
const ROW_H = 190;
const SIDE_ROW_H = 190;
const SIDE_GAP = 280;

export function buildLayout(proofs: Proof[]): GraphLayout {
  const issues = validateProofs(proofs);
  const byId = new Map(proofs.map((p) => [p.id, p]));

  const depth = new Map<string, number>();
  const theoremDepth = (id: string, path = new Set<string>()): number => {
    if (depth.has(id)) return depth.get(id)!;
    if (path.has(id)) return 0;
    const next = (byId.get(id)?.dependencies ?? []).filter(
      (d) => byId.get(d)?.kind === "theorem",
    );
    const nextPath = new Set(path).add(id);
    const value = next.length
      ? 1 + Math.max(...next.map((d) => theoremDepth(d, nextPath)))
      : 0;
    depth.set(id, value);
    return value;
  };

  const rows = new Map<number, Proof[]>();
  const left: Proof[] = [];
  const right: Proof[] = [];
  const addRow = (row: number, p: Proof) =>
    rows.set(row, [...(rows.get(row) ?? []), p]);

  for (const p of proofs) {
    if (p.kind === "postulate") addRow(0, p);
    else if (p.kind === "theorem") addRow(1 + theoremDepth(p.id), p);
    else if (p.kind === "common-notion") left.push(p);
    else right.push(p);
  }

  const nodes: GraphLayout["nodes"] = [];
  let maxCount = 1;
  rows.forEach((row) => {
    maxCount = Math.max(maxCount, row.length);
  });
  const halfWidth = ((maxCount - 1) * COL_W) / 2;
  const rowCount = rows.size ? Math.max(...rows.keys()) + 1 : 1;
  const centralHeight = (rowCount - 1) * ROW_H;

  rows.forEach((row, r) => {
    row.forEach((p, i) => {
      nodes.push({
        id: p.id,
        x: (i - (row.length - 1) / 2) * COL_W,
        y: r * ROW_H,
      });
    });
  });

  const placeColumn = (items: Proof[], x: number) => {
    const colHeight = (items.length - 1) * SIDE_ROW_H;
    const startY = Math.max(0, (centralHeight - colHeight) / 2);
    items.forEach((p, i) =>
      nodes.push({ id: p.id, x, y: startY + i * SIDE_ROW_H }),
    );
  };
  const sideX = halfWidth + SIDE_GAP;
  placeColumn(left, -sideX);
  placeColumn(right, sideX);

  const edges = proofs.flatMap((p) =>
    p.dependencies
      .filter((d) => byId.has(d))
      .map((d) => ({
        id: `${p.id}->${d}`,
        source: p.id,
        target: d,
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
