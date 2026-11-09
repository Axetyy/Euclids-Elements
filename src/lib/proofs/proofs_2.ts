import { defineProof, point, segment } from "./builders";
import type { Proof } from "./types";

export const proofs2: Proof[] = [
  defineProof({
    id: "ii-1",
    label: "II.1",
    kind: "theorem",
    title:
      "If a straight line be divided into any number of parts, the rectangle contained by the whole and one of the parts is equal to the rectangles contained by the parts.",
    statement:
      "A rectangle formed from a whole line and one part equals the sum of the corresponding rectangles.",
    steps: [
      {
        title: "Given",
        text: "Let AB be divided at C into the parts AC and CB.",
        add: [
          point("A", [0, 0]),
          point("C", [1.5, 0]),
          point("B", [3, 0]),
          segment("AB", "A", "B"),
          segment("AC", "A", "C", { color: "#fbbf24" }),
          segment("CB", "C", "B", { color: "#22d3ee" }),
        ],
      },
      {
        title: "Construct",
        text: "Complete the rectangles on the whole line and on each part.",
      },
      {
        title: "Therefore",
        text: "The rectangle on AB is equal to the rectangles on AC and CB together.",
      },
    ],
  }),
  defineProof({
    id: "ii-2",
    label: "II.2",
    kind: "theorem",
    title:
      "If a straight line be divided at random, the squares on the segments are equal to the rectangle contained by the whole line and the segments.",
    statement: "A divided line gives the corresponding sum of square areas.",
    steps: [
      {
        title: "Given",
        text: "Let AB be divided at C.",
        add: [
          point("A", [0, 0]),
          point("C", [1.5, 0]),
          point("B", [3, 0]),
          segment("AB", "A", "B"),
        ],
      },
      {
        title: "Complete",
        text: "Construct the squares on AC, CB, and AB.",
      },
      {
        title: "Equal areas",
        text: "The areas follow from the rectangle decomposition of the whole.",
      },
    ],
  }),
];
