import { notFound } from "next/navigation";
import { BookExplorer } from "@/components/organism/BookExplorer/BookExplorer";
import { BOOK_COUNT } from "@/lib/proofs/books";

export function generateStaticParams() {
  return Array.from({ length: BOOK_COUNT }, (_, index) => ({
    "book-number": String(index + 1),
  }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ "book-number": string }>;
}) {
  const { "book-number": bookNumberParam } = await params;
  const bookNumber = Number(bookNumberParam);

  if (
    !Number.isInteger(bookNumber) ||
    bookNumber < 1 ||
    bookNumber > BOOK_COUNT
  ) {
    notFound();
  }

  return <BookExplorer bookNumber={bookNumber} />;
}
