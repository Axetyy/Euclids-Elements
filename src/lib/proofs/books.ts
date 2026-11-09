import type { Proof } from "./types";
import { PROOFS as proofs1 } from "./proofs_1";
import { PROOFS as proofs2 } from "./proofs_2";

export const BOOK_COUNT = 13;

const proofsByBook: Record<number, Proof[]> = {
  1: proofs1,
  2: proofs2,
};

export const getBookProofs = (bookNumber: number): Proof[] =>
  proofsByBook[bookNumber] ?? [];

export const getBookProof = (
  bookNumber: number,
  id: string,
): Proof | undefined => getBookProofs(bookNumber).find((proof) => proof.id === id);
