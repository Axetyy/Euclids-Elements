import type { Proof } from "./types";
import { proofs1 } from "./proofs_1";
import { proofs2 } from "./proofs_2";

export const BOOK_COUNT = 13;

/**
 * Add each future book to this registry. Keeping the source list here makes
 * proof references independent of the book currently being viewed.
 */
const proofsByBook: Partial<Record<number, Proof[]>> = {
  1: proofs1,
  2: proofs2,
};

const proofBookById = new Map(
  Object.entries(proofsByBook).flatMap(([book, proofs]) =>
    (proofs ?? []).map((proof) => [proof.id, Number(book)] as const),
  ),
);

export const getBookProofs = (bookNumber: number): Proof[] =>
  proofsByBook[bookNumber] ?? [];

export const getBookProof = (
  bookNumber: number,
  id: string,
): Proof | undefined =>
  getBookProofs(bookNumber).find((proof) => proof.id === id);

export const getProof = (id: string): Proof | undefined => {
  const bookNumber = proofBookById.get(id);
  return bookNumber === undefined ? undefined : getBookProof(bookNumber, id);
};

export const getProofBook = (id: string): number | undefined =>
  proofBookById.get(id);

/**
 * The active book owns the graph. External references are represented as
 * single nodes so a Book II graph can show the Book I proof it uses without
 * expanding Book I's entire dependency tree.
 */
export const getBookGraphProofs = (bookNumber: number): Proof[] => {
  const proofs = getBookProofs(bookNumber);
  const externalIds = new Set(
    proofs.flatMap((proof) =>
      proof.dependencies.filter((id) => getProofBook(id) !== bookNumber),
    ),
  );
  const external = [...externalIds]
    .map((id) => getProof(id))
    .filter((proof): proof is Proof => proof !== undefined)
    .map((proof) => ({ ...proof, dependencies: [] }));

  return [...proofs, ...external];
};
