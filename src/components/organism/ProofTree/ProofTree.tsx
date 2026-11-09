import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Panel,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box, Stack, Typography } from "@mui/material";
import React, { memo, useMemo } from "react";
import type { Proof, ProofKind } from "@/lib/proofs/types";
import { KIND_STYLE } from "@/lib/proofs/kinds";
import { buildLayout, collectRelated } from "@/lib/proofs/graphs";

type Role = "selected" | "dependency" | "dependent" | "idle" | "dim";

interface NodeData {
  label: string;
  title: string;
  kind: ProofKind;
  role: Role;
  animated: boolean;
}
const NODE_W = 160;
const ROLE_RING: Record<Role, string> = {
  selected: "#ffffff",
  dependency: "#fbbf24",
  dependent: "#22d3ee",
  idle: "transparent",
  dim: "transparent",
};

const ProofNode = memo(function ProofNode({ data }: NodeProps<NodeData>) {
  const color = KIND_STYLE[data.kind]?.color ?? "info.main";
  return (
    <Box
      title={data.title}
      sx={{
        width: NODE_W,
        px: "8px",
        py: "8px",
        borderRadius: 2,
        background: "#111a33",
        border: `2px solid ${color}`,
        boxShadow: `0 0 0 3px ${ROLE_RING[data.role]}`,
        color: "common.white",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Handle
        type="source"
        position={Position.Top}
        style={{ opacity: 0 }}
        isConnectable={false}
      />
      <Typography variant="body2" sx={{ fontWeight: 700, color: color }}>
        {data.label} {data.animated ? "▶" : ""}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.6rem",
          lineHeight: 1.2,
          pt: 2,
          overflow: "hidden",
          WebkitLineClamp: 2,
        }}
      >
        {data.title}
      </Typography>
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ opacity: 0 }}
        isConnectable={false}
      />
    </Box>
  );
});

const NODE_TYPES = { proof: ProofNode };
const EDGE_TYPES = {};

interface ProofTreeProps {
  proofs: Proof[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  bookNumber?: number;
}
export const ProofTree: React.FC<ProofTreeProps> = ({
  proofs,
  selectedId,
  onSelect,
  bookNumber = 1,
}) => {
  const layout = useMemo(() => buildLayout(proofs), [proofs]);
  const byId = useMemo(() => new Map(proofs.map((p) => [p.id, p])), [proofs]);
  const deps = useMemo(
    () =>
      selectedId
        ? collectRelated(proofs, selectedId, "dependencies")
        : new Set<string>(),
    [proofs, selectedId],
  );
  const dependents = useMemo(
    () =>
      selectedId
        ? collectRelated(proofs, selectedId, "dependents")
        : new Set<string>(),
    [proofs, selectedId],
  );
  const nodes: Node<NodeData>[] = useMemo(() => {
    return layout.nodes.flatMap((n) => {
      const p = byId.get(n.id);
      if (!p) return [];
      let role: Role = "idle";
      if (selectedId) {
        if (n.id === selectedId) role = "selected";
        else if (deps.has(n.id)) role = "dependency";
        else if (dependents.has(n.id)) role = "dependent";
        else role = "dim";
      }
      return [
        {
          id: n.id,
          type: "proof",
          position: { x: n.x - NODE_W / 2, y: n.y },
          data: {
            label: p.label,
            title: p.title,
            kind: p.kind,
            role,
            animated: p.steps.length > 0 || !!p.custom,
          },
          draggable: true,
        },
      ];
    });
  }, [layout, byId, selectedId, deps, dependents]);

  const edges: Edge[] = useMemo(
    () =>
      layout.edges.map((e: any) => {
        const upSet = selectedId ? new Set([selectedId, ...deps]) : null;
        const downSet = selectedId
          ? new Set([selectedId, ...dependents])
          : null;
        const isDep = !!upSet && upSet.has(e.source) && upSet.has(e.target);
        const isDependent =
          !!downSet && downSet.has(e.source) && downSet.has(e.target);
        const stroke = isDep ? "#fbbf24" : isDependent ? "#22d3ee" : "#475569";
        const dimmed = !!selectedId && !isDep && !isDependent;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: isDep || isDependent,
          style: {
            stroke,
            strokeWidth: isDep || isDependent ? 2.5 : 1.2,
            opacity: dimmed ? 0.75 : 1,
          },
          markerEnd: { type: MarkerType.ArrowClosed, color: stroke },
        };
      }),
    [layout, selectedId, deps, dependents],
  );
  return (
    <Box sx={{ width: "100%", height: "95vh", background: "surface.canvas" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        onNodeClick={(_, node) => onSelect(node.id)}
        nodesConnectable={false}
        onPaneClick={() => onSelect(null)}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: false }}
      >
        <Background color="surface.canvas" gap={24} />
        <Controls showInteractive={false} />
        <Panel position="top-left" style={{ top: -20 }}>
          <Box
            sx={{
              bgcolor: "surface.overlay",
              color: "text.secondary",
              p: 0,
              borderRadius: 1,
              fontSize: 11,
            }}
          >
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Elements, Book {bookNumber}
            </Typography>
            <Stack spacing={0.5}>
              {(Object.keys(KIND_STYLE) as ProofKind[]).map((k) => (
                <Stack
                  key={k}
                  direction="row"
                  spacing={0.5}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: 0.75,
                      bgcolor: KIND_STYLE[k].color,
                    }}
                  />
                  <Typography variant="body1">{KIND_STYLE[k].label}</Typography>
                </Stack>
              ))}
            </Stack>
            <Typography variant="body1" sx={{ display: "block", mt: 0.5 }}>
              ▶ = has animation · arrows point to what a proof uses
            </Typography>
            {selectedId && (
              <Typography variant="body1" sx={{ display: "block", mt: 0.5 }}>
                <Box component="span" sx={{ color: "graph.dependency" }}>
                  ■
                </Box>{" "}
                uses ·{" "}
                <Box component="span" sx={{ color: "graph.dependent" }}>
                  ■
                </Box>{" "}
                used by
              </Typography>
            )}
            {layout.issues.length > 0 && (
              <Box sx={{ mt: 0.75, color: "error.light" }}>
                {layout.issues.slice(0, 3).map((i, idx) => (
                  <Typography
                    key={idx}
                    variant="caption"
                    sx={{ display: "block" }}
                  >
                    ⚠ {i.proofId ? `${i.proofId}: ` : ""}
                    {i.message}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Panel>
      </ReactFlow>
    </Box>
  );
};
