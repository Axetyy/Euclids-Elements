"use client";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import type { Proof } from "@/lib/proofs/types";
import { KIND_STYLE } from "@/lib/proofs/kinds";
import { getProof } from "@/lib/proofs/proofs";
import { usePlayback } from "@/lib/hooks/usePlayback";

const ProofScene3D = dynamic(() => import("./ProofScene3D"), {
  ssr: false,
  loading: () => (
    <Stack
      spacing={2}
      sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress color="primary" size="40px" />
      <Typography variant="body2" sx={{ color: "primary.main", mt: 1 }}>
        Loading scene...
      </Typography>
    </Stack>
  ),
});
interface ProofDetailsProps {
  proof: Proof;
  onSelect: (id: string) => void;
  resolveProof?: (id: string) => Proof | undefined;
}

export const ProofDetails: React.FC<ProofDetailsProps> = ({
  proof,
  onSelect,
  resolveProof = getProof,
}) => {
  const pb = usePlayback(proof.steps.length, proof.id);
  const kind = KIND_STYLE[proof.kind];
  const hasScene = proof.steps.length > 0 || !!proof.custom;
  const last = Math.max(proof.steps.length - 1, 0);
  const deps = proof.dependencies
    .map((id) => resolveProof(id))
    .filter((p): p is Proof => !!p);
  return (
    <Stack spacing={2} sx={{ height: "100%", p: 4, overflowY: "auto" }}>
      <Stack>
        <Typography
          variant="h3"
          sx={{
            color: kind.color,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          {kind.label} · {proof.label}
        </Typography>
        <Typography variant="h2"> {proof.title}</Typography>
        <Typography variant="body1" color="text.secondary">
          {proof.statement}
        </Typography>
      </Stack>
      {deps.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Uses:
          </Typography>
          {deps.map((d) => (
            <Button
              key={d.id}
              variant="outlined"
              onClick={() => onSelect(d.id)}
              title={d.title}
              sx={{
                p: "2px 8px",
                borderColor: KIND_STYLE[d.kind].color,
                color: KIND_STYLE[d.kind].color,
              }}
            >
              <Typography variant="body2">{d.label}</Typography>
            </Button>
          ))}
        </Box>
      )}
      <Box
        sx={{
          height: 320,
          minHeight: 240,
          flexShrink: 0,
        }}
      >
        {hasScene ? (
          <ProofScene3D proof={proof} step={pb.step} t={pb.t} />
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "#0b1020",
              borderRadius: 10,
              color: "#64748b",
              textAlign: "center",
              p: 16,
            }}
          >
            <Typography>
              No animation yet — add{" "}
              <Typography component="code" variant="caption">
                steps
              </Typography>{" "}
              to this proof in{" "}
              <Typography component="code" variant="caption">
                proofs.ts
              </Typography>
              .
            </Typography>
          </Box>
        )}
      </Box>
      {proof.steps.length > 0 && (
        <>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={pb.prev}
              disabled={pb.step === 0}
              title="Previous step"
              aria-label="Previous step"
              color="inherit"
            >
              ◀
            </IconButton>
            <Button
              variant="outlined"
              sx={{ minWidth: 92 }}
              onClick={pb.togglePlay}
            >
              {pb.playing ? "⏸ Pause" : "▶ Play"}
            </Button>
            <IconButton
              onClick={pb.next}
              disabled={pb.step >= last}
              title="Next step"
              aria-label="Next step"
              color="inherit"
            >
              ▶|
            </IconButton>
            <Slider
              min={0}
              max={last}
              step={1}
              value={pb.step}
              onChange={(_, value) =>
                pb.goTo(Array.isArray(value) ? value[0] : value)
              }
              sx={{ flex: 1, minWidth: 80 }}
              aria-label="Proof step"
            />
            <Typography sx={{ fontSize: 12, color: "#94a3b8" }}>
              {pb.step + 1}/{proof.steps.length}
            </Typography>
          </Stack>
          <List
            component="ol"
            disablePadding
            sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}
          >
            {proof.steps.map((s, i) => (
              <ListItem
                component="li"
                key={i}
                onClick={() => pb.goTo(i)}
                sx={{
                  cursor: "pointer",
                  opacity: i > pb.step ? 0.4 : 1,
                  bgcolor: i === pb.step ? "surface.elevated" : "transparent",
                  borderLeft: `3px solid ${i === pb.step ? kind.color : "transparent"}`,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  display: "block",
                }}
              >
                <Typography variant="h6">{s.title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {s.text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Stack>
  );
};
