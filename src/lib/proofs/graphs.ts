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

const COL_W = 230;
const ROW_H = 190;

export function buildLayout(proofs: Proof[]): GraphLayout {
  const issues = validateProofs(proofs);
  const byId = new Map(proofs.map((p) => [p.id, p]));

  // Depth = row. Roots (no dependencies) are depth 0.
  const depth = new Map<string, number>();
  const proofDepth = (id: string, path = new Set<string>()): number => {
    if (depth.has(id)) return depth.get(id)!;
    if (path.has(id)) return 0;
    const next = (byId.get(id)?.dependencies ?? []).filter((d) => byId.has(d));
    const nextPath = new Set(path).add(id);
    const value = next.length
      ? 1 + Math.max(...next.map((d) => proofDepth(d, nextPath)))
      : 0;
    depth.set(id, value);
    return value;
  };

  // Pick one primary parent per proof (its deepest dependency) so the
  // dependency DAG becomes a spanning forest. Other dependencies are still
  // drawn as edges, but don't affect positioning.
  const parentOf = new Map<string, string>();
  const children = new Map<string, Proof[]>();
  for (const p of proofs) {
    const valid = p.dependencies.filter((d) => byId.has(d) && d !== p.id);
    if (!valid.length) continue;
    const parent = valid.reduce((best, d) =>
      proofDepth(d) > proofDepth(best) ? d : best,
    );
    parentOf.set(p.id, parent);
    children.set(parent, [...(children.get(parent) ?? []), p]);
  }

  // Tidy tree: leaves take consecutive slots, parents are centered over
  // their children.
  const xById = new Map<string, number>();
  const placed = new Set<string>();
  let nextLeaf = 0;

  const place = (proof: Proof): number => {
    placed.add(proof.id);
    const childXs: number[] = [];
    for (const child of children.get(proof.id) ?? []) {
      if (!placed.has(child.id)) childXs.push(place(child));
    }
    const x = childXs.length
      ? (childXs[0] + childXs[childXs.length - 1]) / 2
      : nextLeaf++ * COL_W;
    xById.set(proof.id, x);
    return x;
  };

  // Real roots first, then anything left over (e.g. nodes stuck in a cycle).
  proofs
    .filter((p) => !parentOf.has(p.id))
    .forEach((p) => {
      if (!placed.has(p.id)) place(p);
    });
  proofs.forEach((p) => {
    if (!placed.has(p.id)) place(p);
  });

  // Center the whole forest around x = 0.
  const xs = [...xById.values()];
  const offset = xs.length ? -(Math.min(...xs) + Math.max(...xs)) / 2 : 0;

  const nodes: GraphLayout["nodes"] = proofs.map((p) => ({
    id: p.id,
    x: (xById.get(p.id) ?? 0) + offset,
    y: proofDepth(p.id) * ROW_H,
  }));

  const edges = proofs.flatMap((p) =>
    p.dependencies
      .filter((d) => byId.has(d))
      .map((d) => ({
        id: `${p.id}->${d}`,
        source: d,
        target: p.id,
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
