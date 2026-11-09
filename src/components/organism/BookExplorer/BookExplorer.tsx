"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getBookProofs, getBookProof } from "@/lib/proofs/books";
import { ProofDetails } from "@/components/organism/ProofDetails/ProofDetails";

const ProofTree = dynamic(
  () =>
    import("@/components/organism/ProofTree/ProofTree").then(
      (module) => module.ProofTree,
    ),
  {
    ssr: false,
    loading: () => (
      <Box
        sx={{
          height: "95vh",
          display: "grid",
          placeItems: "center",
          color: "text.secondary",
        }}
      >
        Loading proofs...
      </Box>
    ),
  },
);

interface BookExplorerProps {
  bookNumber: number;
}

export const BookExplorer: React.FC<BookExplorerProps> = ({ bookNumber }) => {
  const proofs = getBookProofs(bookNumber);
  const [selectedId, setSelectedId] = useState<string | null>(
    proofs[0]?.id ?? null,
  );

  useEffect(() => {
    setSelectedId(proofs[0]?.id ?? null);
  }, [bookNumber, proofs]);

  const select = useCallback(
    (id: string | null) => {
      if (id === null) {
        setSelectedId(null);
        return;
      }

      if (getBookProof(bookNumber, id)) setSelectedId(id);
    },
    [bookNumber],
  );

  const proof = selectedId ? getBookProof(bookNumber, selectedId) : null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: proof
          ? "minmax(0, 1.3fr) minmax(360px, 1fr)"
          : "minmax(0, 1fr)",
        minHeight: "calc(100vh - 132px)",
        background: "surface.canvas",
      }}
    >
      <Box sx={{ minWidth: 0, minHeight: 0 }}>
        {proofs.length > 0 ? (
          <ProofTree
            proofs={proofs}
            selectedId={selectedId}
            onSelect={select}
            bookNumber={bookNumber}
          />
        ) : (
          <Stack sx={{ minHeight: "calc(100vh - 132px)", p: 4 }}>
            <Typography variant="h2">Book {bookNumber}</Typography>
            <Typography color="text.secondary">
              Proofs for this book have not been added yet.
            </Typography>
          </Stack>
        )}
      </Box>

      {proof && (
        <Box sx={{ minWidth: 0, minHeight: 0, overflow: "hidden" }}>
          <ProofDetails
            proof={proof}
            onSelect={select}
            resolveProof={(id) => getBookProof(bookNumber, id)}
          />
        </Box>
      )}
    </Box>
  );
};
