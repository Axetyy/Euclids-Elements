import type { ProofKind } from "./types";

export const KIND_STYLE: Record<ProofKind, { color: string; label: string }> = {
  postulate: { color: "#f97316", label: "Postulate" },
  "common-notion": { color: "#a78bfa", label: "Common notion" },
  definition: { color: "#38bdf8", label: "Definition" },
  theorem: { color: "#34d399", label: "Proposition" },
};
