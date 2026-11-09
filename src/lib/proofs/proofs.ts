import {
  circle,
  circleIntersection,
  defineProof,
  point,
  polygon,
  segment,
} from "./builders";
import type { Primitive, Proof, ProofStep } from "./types";

const given = (text: string, add: Primitive[] = []) => ({
  title: "Given",
  text,
  add,
});
const step = (
  title: string,
  text: string,
  add: Primitive[] = [],
): ProofStep => ({ title, text, add });

const AMBER = "#fbbf24";
const CYAN = "#22d3ee";
const VIOLET = "#a78bfa";
const GREEN = "#34d399";
const ORANGE = "#f97316";
const SKY = "#38bdf8";

const h = (id: string, x: number, y: number) => point(id, [x, y], "");

export const PROOFS: Proof[] = [
  defineProof({
    id: "p-1",
    label: "P.1",
    kind: "postulate",
    title: "To draw a straight line from any point to any point.",
    statement: "A straight line may be drawn from any point to any point.",
    steps: [
      given("Let A and B be any two points.", [
        point("A", [0, 0]),
        point("B", [3, 1.2]),
      ]),
      step("Draw", "Draw the straight line from A to B.", [
        segment("AB", "A", "B", { color: ORANGE }),
      ]),
    ],
  }),
  defineProof({
    id: "p-2",
    label: "P.2",
    kind: "postulate",
    title: "To produce a finite straight line continuously in a straight line.",
    statement:
      "A finite straight line may be extended continuously in a straight line.",
    steps: [
      given("Let AB be a finite straight line.", [
        point("A", [0, 0]),
        point("B", [2, 0.6]),
        segment("AB", "A", "B"),
      ]),
      step("Produce", "Extend AB beyond B to the point C.", [
        point("C", [4, 1.2]),
        segment("BC", "B", "C", { color: ORANGE, dashed: true }),
      ]),
      step(
        "Continuously",
        "The extension lies in the same straight line as AB; it may be continued as far as we please.",
        [
          point("D", [5.5, 1.65]),
          segment("CD", "C", "D", { color: ORANGE, dashed: true }),
        ],
      ),
    ],
  }),
  defineProof({
    id: "p-3",
    label: "P.3",
    kind: "postulate",
    title: "To describe a circle with any centre and distance.",
    statement: "A circle may be described with any centre and distance.",
    steps: [
      given("Let A be the centre and AB the distance.", [
        point("A", [0, 0]),
        point("B", [1.5, 0]),
        segment("AB", "A", "B"),
      ]),
      step("Describe", "Describe the circle with centre A through B.", [
        circle("cA", "A", "B", { color: ORANGE }),
      ]),
      step(
        "Any distance",
        "A different distance gives a different circle about the same centre.",
        [
          point("C", [0, 2.4]),
          segment("AC", "A", "C", { dashed: true }),
          circle("cA2", "A", "C", { color: ORANGE, dashed: true }),
        ],
      ),
    ],
  }),
  defineProof({
    id: "p-4",
    label: "P.4",
    kind: "postulate",
    title: "That all right angles are equal to one another.",
    statement: "All right angles are equal.",
    steps: [
      given("Let two straight lines cross at right angles at O.", [
        point("O", [0, 0]),
        h("a1", -1.2, 0),
        h("a2", 1.2, 0),
        h("a3", 0, 1.2),
        h("a4", 0, -1.2),
        segment("a12", "a1", "a2"),
        segment("a34", "a3", "a4"),
      ]),
      step("Mark", "Mark the right angle at O.", [
        h("m1", 0.3, 0),
        h("m2", 0.3, 0.3),
        h("m3", 0, 0.3),
        polygon("RA1", ["O", "m1", "m2", "m3"], ORANGE),
      ]),
      step(
        "Another",
        "Let two other lines cross at right angles at P, wherever and however turned.",
        [
          point("P", [4, 0]),
          h("b1", 2.96, -0.6),
          h("b2", 5.04, 0.6),
          h("b3", 3.4, 1.04),
          h("b4", 4.6, -1.04),
          segment("b12", "b1", "b2"),
          segment("b34", "b3", "b4"),
        ],
      ),
      step(
        "Equal",
        "Mark the right angle at P. Each is half of a straight angle, so the two right angles are equal.",
        [
          h("n1", 4.26, 0.15),
          h("n2", 4.11, 0.41),
          h("n3", 3.85, 0.26),
          polygon("RA2", ["P", "n1", "n2", "n3"], ORANGE),
        ],
      ),
    ],
  }),
  defineProof({
    id: "p-5",
    label: "P.5",
    kind: "postulate",
    title:
      "That, if a straight line falling on two straight lines makes the interior angles less than two right angles, the two straight lines meet.",
    statement: "The parallel postulate.",
    steps: [
      given("Let EF fall on two straight lines at G and H.", [
        point("E", [0, -1.8]),
        point("F", [0, 1.8]),
        point("G", [0, -1]),
        point("H", [0, 1]),
        segment("EF", "E", "F"),
      ]),
      step(
        "Two lines",
        "Draw the two lines so the interior angles on one side are together less than two right angles.",
        [
          h("K", 2, -0.5),
          h("L", 2, 0.5),
          segment("GK", "G", "K", { color: ORANGE }),
          segment("HL", "H", "L", { color: ORANGE }),
        ],
      ),
      step(
        "Produce",
        "Produced indefinitely on that side, the lines meet at M.",
        [
          point("M", [4, 0]),
          segment("KM", "K", "M", { color: ORANGE, dashed: true }),
          segment("LM", "L", "M", { color: ORANGE, dashed: true }),
          polygon("GHM", ["G", "H", "M"], ORANGE),
        ],
      ),
    ],
  }),

  defineProof({
    id: "cn-1",
    label: "CN.1",
    kind: "common-notion",
    title: "Things equal to the same thing are also equal to one another.",
    statement: "Things equal to the same thing are equal to one another.",
    steps: [
      given("Let CD be a magnitude.", [
        point("C", [0, 1]),
        point("D", [2.5, 1]),
        segment("CD", "C", "D", { color: VIOLET }),
      ]),
      step("First equal", "Let AB be equal to CD.", [
        point("A", [0, 2]),
        point("B", [2.5, 2]),
        segment("gAC", "A", "C", { dashed: true }),
        segment("gBD", "B", "D", { dashed: true }),
        segment("AB", "A", "B", { color: VIOLET }),
      ]),
      step("Second equal", "Let EF also be equal to CD.", [
        point("E", [0, 0]),
        point("F", [2.5, 0]),
        segment("gCE", "C", "E", { dashed: true }),
        segment("gDF", "D", "F", { dashed: true }),
        segment("EF", "E", "F", { color: VIOLET }),
      ]),
      step(
        "Therefore",
        "AB and EF are each equal to CD, so they are equal to one another.",
        [polygon("ABFE", ["A", "B", "F", "E"], VIOLET)],
      ),
    ],
  }),
  defineProof({
    id: "cn-2",
    label: "CN.2",
    kind: "common-notion",
    title: "If equals are added to equals, the wholes are equal.",
    statement: "Adding equals preserves equality.",
    steps: [
      given("Let AB equal CD.", [
        point("A", [0, 1.2]),
        point("B", [2, 1.2]),
        point("C", [0, 0]),
        point("D", [2, 0]),
        segment("AB", "A", "B", { color: AMBER }),
        segment("CD", "C", "D", { color: AMBER }),
      ]),
      step("Add equals", "Add BE and DF, which are equal to each other.", [
        point("E", [3.3, 1.2]),
        point("F", [3.3, 0]),
        segment("BE", "B", "E", { color: CYAN }),
        segment("DF", "D", "F", { color: CYAN }),
      ]),
      step("Wholes", "The wholes AE and CF are equal.", [
        h("P", 0, 1.6),
        h("Q", 3.3, 1.6),
        h("R", 0, -0.4),
        h("S", 3.3, -0.4),
        segment("AEw", "P", "Q", { color: GREEN }),
        segment("CFw", "R", "S", { color: GREEN }),
      ]),
    ],
  }),
  defineProof({
    id: "cn-3",
    label: "CN.3",
    kind: "common-notion",
    title: "If equals are subtracted from equals, the remainders are equal.",
    statement: "Subtracting equals preserves equality.",
    steps: [
      given("Let the wholes AE and CF be equal.", [
        point("A", [0, 1.2]),
        point("E", [3.3, 1.2]),
        point("C", [0, 0]),
        point("F", [3.3, 0]),
        segment("AE", "A", "E", { color: VIOLET }),
        segment("CF", "C", "F", { color: VIOLET }),
      ]),
      step("Subtract equals", "Take away BE and DF, which are equal.", [
        point("B", [2, 1.2]),
        point("D", [2, 0]),
        segment("BE", "B", "E", { color: CYAN }),
        segment("DF", "D", "F", { color: CYAN }),
      ]),
      step("Remainders", "The remainders AB and CD are equal.", [
        segment("AB", "A", "B", { color: GREEN }),
        segment("CD", "C", "D", { color: GREEN }),
      ]),
    ],
  }),
  defineProof({
    id: "cn-4",
    label: "CN.4",
    kind: "common-notion",
    title: "Things coinciding with one another are equal to one another.",
    statement: "Coincident things are equal.",
    steps: [
      given("Let AB and CD be two straight lines.", [
        point("A", [0, 1.2]),
        point("B", [2.4, 1.2]),
        point("C", [0, 0]),
        point("D", [2.4, 0]),
        segment("AB", "A", "B", { color: VIOLET }),
        segment("CD", "C", "D", { color: CYAN }),
      ]),
      step("Apply", "Apply CD to AB so that C falls on A and D on B.", [
        segment("CA", "C", "A", { dashed: true }),
        segment("DB", "D", "B", { dashed: true }),
      ]),
      step("Coincide", "CD coincides with AB exactly, so they are equal.", [
        segment("CDon", "A", "B", { color: AMBER, dashed: true }),
      ]),
    ],
  }),
  defineProof({
    id: "cn-5",
    label: "CN.5",
    kind: "common-notion",
    title: "The whole is greater than the part.",
    statement: "A whole is greater than its part.",
    steps: [
      given("Let ABCD be the whole.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        point("C", [3, 2]),
        point("D", [0, 2]),
        segment("AB", "A", "B"),
        segment("BC", "B", "C"),
        segment("CD", "C", "D"),
        segment("DA", "D", "A"),
        polygon("whole", ["A", "B", "C", "D"], VIOLET),
      ]),
      step("The part", "Let AEFG be a part of it.", [
        h("E", 1.6, 0),
        h("F", 1.6, 1.1),
        h("G", 0, 1.1),
        polygon("part", ["A", "E", "F", "G"], CYAN),
        segment("EF", "E", "F", { color: CYAN }),
        segment("FG", "F", "G", { color: CYAN }),
      ]),
      step(
        "Remainder",
        "Something is left over, so the whole is greater than the part.",
        [polygon("rest", ["E", "B", "C", "D", "G", "F"], GREEN)],
      ),
    ],
  }),

  defineProof({
    id: "def-1",
    label: "D.1",
    kind: "definition",
    title: "A point is that which has no part.",
    statement: "A point is that which has no part.",
    steps: [
      given("Take a point A.", [point("A", [0, 0])]),
      step("Large", "Any disc around A has parts.", [
        h("r1", 1.2, 0),
        circle("c1", "A", "r1", { color: SKY }),
      ]),
      step("Smaller", "Shrinking it leaves a smaller disc, still with parts.", [
        h("r2", 0.6, 0),
        circle("c2", "A", "r2", { color: SKY }),
      ]),
      step(
        "No part",
        "Shrunk without end, nothing is left that can be divided: A has no part.",
        [h("r3", 0.22, 0), circle("c3", "A", "r3", { color: SKY })],
      ),
    ],
  }),
  defineProof({
    id: "def-2",
    label: "D.2",
    kind: "definition",
    title: "A line is a breadthless length.",
    statement: "A line is a breadthless length.",
    steps: [
      given("Take a length from A to B with some breadth.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        h("a1", 0, 0.4),
        h("a2", 3, 0.4),
        h("a3", 3, -0.4),
        h("a4", 0, -0.4),
        polygon("wide", ["a1", "a2", "a3", "a4"], SKY),
      ]),
      step("Narrower", "Reduce the breadth.", [
        h("b1", 0, 0.15),
        h("b2", 3, 0.15),
        h("b3", 3, -0.15),
        h("b4", 0, -0.15),
        polygon("narrow", ["b1", "b2", "b3", "b4"], SKY),
      ]),
      step(
        "Breadthless",
        "With no breadth left, only the length remains: the line AB.",
        [segment("AB", "A", "B", { color: SKY })],
      ),
    ],
  }),

  defineProof({
    id: "i-1",
    label: "I.1",
    kind: "theorem",
    title: "To construct an equilateral triangle.",
    statement:
      "On a given finite straight line to construct an equilateral triangle.",
    dependencies: ["p-1", "p-3", "def-1", "def-2"],
    steps: [
      given("Let AB be the given finite straight line.", [
        point("A", [0, 0]),
        point("B", [2, 0]),
        segment("AB", "A", "B"),
      ]),
      {
        title: "First circle",
        text: "With centre A and distance AB, describe the circle BCD.",
        add: [circle("cA", "A", "B")],
      },
      {
        title: "Second circle",
        text: "With centre B and distance BA, describe the circle ACE.",
        add: [circle("cB", "B", "A"), circleIntersection("C", "cA", "cB", 0)],
      },
      {
        title: "Complete",
        text: "Join CA and CB. ABC is the required equilateral triangle.",
        add: [
          segment("CA", "C", "A"),
          segment("CB", "C", "B"),
          polygon("ABC", ["A", "B", "C"], "#34d399"),
        ],
      },
    ],
  }),
  defineProof({
    id: "i-2",
    label: "I.2",
    kind: "theorem",
    title:
      "To place at a given point a straight line equal to a given straight line.",
    statement:
      "At a given point to place a straight line equal to a given straight line.",
    dependencies: ["p-1", "p-2", "p-3", "i-1"],
    steps: [
      given("Let A be the given point and BC the given straight line.", [
        point("A", [0, 0]),
        point("B", [2.4, 1.1]),
        point("C", [3.8, 1.1]),
        segment("BC", "B", "C"),
      ]),
      {
        title: "Join",
        text: "Join AB and construct the equilateral triangle ABD.",
        add: [segment("AB", "A", "B")],
      },
      {
        title: "Circles",
        text: "Describe circles with centres B and D and distances BC and DA.",
        add: [
          point("D", [1.2, 1.2]),
          circle("cB", "B", "C"),
          circle("cD", "D", "A"),
        ],
      },
      {
        title: "Transfer",
        text: "The line AE equals BC.",
        add: [circleIntersection("E", "cB", "cD", 0), segment("AE", "A", "E")],
      },
    ],
  }),
  defineProof({
    id: "i-3",
    label: "I.3",
    kind: "theorem",
    title:
      "To cut off from the greater of two given unequal straight lines a straight line equal to the less.",
    statement:
      "From the greater of two unequal straight lines to cut off a part equal to the less.",
    dependencies: ["p-1", "p-2", "p-3", "i-2"],
    steps: [
      given("Let AB be the greater and C the less line.", [
        point("A", [0, 0]),
        point("B", [4, 0]),
        point("C", [1, 1.3]),
        point("D", [2.6, 0]),
        segment("AB", "A", "B"),
        segment("C", "D", "C", { dashed: true }),
      ]),
      {
        title: "Circle",
        text: "With centre A and distance AC, describe a circle.",
        add: [circle("cA", "A", "C")],
      },
      {
        title: "Cut off",
        text: "The circle cuts AB at E, so AE equals AC.",
        add: [point("E", [1.6, 0]), segment("AE", "A", "E")],
      },
    ],
  }),
  defineProof({
    id: "i-4",
    label: "I.4",
    kind: "theorem",
    title: "The side-angle-side principle.",
    statement:
      "If two triangles have two sides equal to two sides and the included angles equal, their bases and remaining angles are equal.",
    dependencies: ["p-4", "cn-1"],
    steps: [
      given("Let ABC be a triangle.", [
        point("A", [0, 0]),
        point("B", [2, 0]),
        point("C", [0.8, 1.5]),
        segment("AB", "A", "B", { color: AMBER }),
        segment("AC", "A", "C", { color: AMBER }),
        segment("BC", "B", "C", { color: CYAN }),
      ]),
      step(
        "Second triangle",
        "Let DEF have DE equal to AB, DF equal to AC, and the angle at D equal to the angle at A.",
        [
          point("D", [3.6, 0]),
          point("E", [5.6, 0]),
          point("F", [4.4, 1.5]),
          segment("DE", "D", "E", { color: AMBER }),
          segment("DF", "D", "F", { color: AMBER }),
          segment("EF", "E", "F", { color: CYAN }),
          h("w1", 0.45, 0),
          h("w2", 0.21, 0.4),
          polygon("angA", ["A", "w1", "w2"], AMBER),
          h("v1", 4.05, 0),
          h("v2", 3.81, 0.4),
          polygon("angD", ["D", "v1", "v2"], AMBER),
        ],
      ),
      step(
        "Apply",
        "Apply DEF to ABC so that D falls on A and DE along AB. Then E falls on B, and DF falls along AC, so F falls on C.",
        [
          segment("DEa", "A", "B", { color: VIOLET, dashed: true }),
          segment("DFa", "A", "C", { color: VIOLET, dashed: true }),
        ],
      ),
      step(
        "Bases coincide",
        "So the base EF coincides with BC and is equal to it. The triangles are equal, with the remaining angles equal.",
        [
          segment("EFa", "B", "C", { color: GREEN, dashed: true }),
          polygon("tri1", ["A", "B", "C"], GREEN),
          polygon("tri2", ["D", "E", "F"], GREEN),
        ],
      ),
    ],
  }),
  defineProof({
    id: "i-5",
    label: "I.5",
    kind: "theorem",
    title: "The base angles of an isosceles triangle are equal.",
    statement:
      "In isosceles triangles the angles at the base are equal, and the equal sides produced make the exterior angles equal.",
    dependencies: ["p-1", "i-1", "i-4"],
    steps: [
      given("Let ABC be an isosceles triangle with AB equal to AC.", [
        point("A", [0, 2]),
        point("B", [-1, 0]),
        point("C", [1, 0]),
        segment("AB", "A", "B", { color: AMBER }),
        segment("AC", "A", "C", { color: AMBER }),
        segment("BC", "B", "C"),
      ]),
      step("Produce", "Produce AB and AC to D and E, with AD equal to AE.", [
        point("D", [-1.6, -1.2]),
        point("E", [1.6, -1.2]),
        segment("BD", "B", "D", { color: ORANGE, dashed: true }),
        segment("CE", "C", "E", { color: ORANGE, dashed: true }),
      ]),
      step("Join", "Join BE and CD.", [
        segment("BE", "B", "E", { color: CYAN }),
        segment("CD", "C", "D", { color: CYAN }),
      ]),
      step(
        "SAS",
        "Triangles ABE and ACD have AB = AC, AE = AD, and a common angle at A. By I.4, BE = CD and the triangles are equal.",
        [
          polygon("ABE", ["A", "B", "E"], VIOLET),
          polygon("ACD", ["A", "C", "D"], SKY),
        ],
      ),
      step(
        "Base angles",
        "Then triangles BDC and CEB are equal as well, so the angles ABC and ACB at the base are equal.",
        [
          polygon("BDC", ["B", "D", "C"], ORANGE),
          polygon("CEB", ["C", "E", "B"], ORANGE),
          polygon("ABC", ["A", "B", "C"], GREEN),
        ],
      ),
    ],
  }),
];

export const getProof = (id: string): Proof | undefined =>
  PROOFS.find((proof) => proof.id === id);
