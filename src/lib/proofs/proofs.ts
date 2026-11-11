import { proofs1 } from "./proofs_1";
import { proofs2 } from "./proofs_2";
import type { Proof } from "./types";
export const PROOFS: Proof[] = [...proofs1, ...proofs2];

export const getProof = (id: string): Proof | undefined =>
  PROOFS.find((proof) => proof.id === id);
