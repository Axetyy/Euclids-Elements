import {
  AMBER,
  area,
  circ2,
  CYAN,
  disc,
  foot,
  given,
  GREEN,
  h,
  lerp,
  line2,
  lineInt,
  mid,
  ORANGE,
  P,
  reflect,
  rot,
  shape,
  SKY,
  slice,
  step,
  V,
  vadd,
  VIOLET,
  vlen,
  vmul,
  vsub,
  vunit,
  wedge,
} from "../math/v";
import {
  circle,
  circleIntersection,
  defineProof,
  point,
  polygon,
  segment,
} from "./builders";
import type { Primitive, Proof } from "./types";

export const proofs1: Proof[] = [
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
    id: "def-3",
    label: "D.3",
    kind: "definition",
    title: "The ends of a line are points.",
    statement: "The ends of a line are points.",
    steps: [
      given("Take a line AB.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B"),
      ]),
      step("Ends", "The ends of the line are points.", [
        ...shape(
          "endA",
          [
            [-0.12, -0.12],
            [0.12, -0.12],
            [0.12, 0.12],
            [-0.12, 0.12],
          ],
          ORANGE,
        ),
        ...shape(
          "endB",
          [
            [2.88, -0.12],
            [3.12, -0.12],
            [3.12, 0.12],
            [2.88, 0.12],
          ],
          ORANGE,
        ),
      ]),
    ],
  }),

  defineProof({
    id: "def-4",
    label: "D.4",
    kind: "definition",
    title:
      "A straight line is a line which lies evenly with the points on itself.",
    statement:
      "A straight line is a line which lies evenly with the points on itself.",
    steps: [
      given("Take a line AB.", [
        point("A", [0, 0]),
        point("B", [4, 0]),
        segment("AB", "A", "B", { color: SKY }),
      ]),
      step("Points on it", "Mark points C, D and E on AB.", [
        point("C", [1, 0]),
        point("D", [2, 0]),
        point("E", [3, 0]),
      ]),
      step(
        "Evenly",
        "Every point sits on the line in the same way, with no turning to either side. AB lies evenly with its points, so it is straight.",
        line2("level", [-0.4, 0], [4.4, 0], { color: AMBER, dashed: true }),
      ),
    ],
  }),
  defineProof({
    id: "def-5",
    label: "D.5",
    kind: "definition",
    title: "A surface is that which has length and breadth only.",
    statement: "A surface is that which has length and breadth only.",
    steps: [
      given("Take a length AB.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B", { color: SKY }),
      ]),
      step("Breadth", "Give it a breadth AD.", [
        point("D", [0, 1.8]),
        segment("AD", "A", "D", { color: SKY }),
      ]),
      step(
        "Surface",
        "Length and breadth together, and nothing more, make the surface ABCD.",
        [point("C", [3, 1.8]), polygon("S", ["A", "B", "C", "D"], SKY)],
      ),
    ],
  }),
  defineProof({
    id: "def-6",
    label: "D.6",
    kind: "definition",
    title: "The edges of a surface are lines.",
    statement: "The edges of a surface are lines.",
    steps: [
      given("Let ABCD be a surface.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        point("C", [3, 1.8]),
        point("D", [0, 1.8]),
        polygon("S", ["A", "B", "C", "D"], SKY),
      ]),
      step("Edges", "Its edges are the lines AB, BC, CD and DA.", [
        segment("AB", "A", "B", { color: ORANGE }),
        segment("BC", "B", "C", { color: ORANGE }),
        segment("CD", "C", "D", { color: ORANGE }),
        segment("DA", "D", "A", { color: ORANGE }),
      ]),
    ],
  }),
  defineProof({
    id: "def-7",
    label: "D.7",
    kind: "definition",
    title:
      "A plane surface is a surface which lies evenly with the straight lines on itself.",
    statement:
      "A plane surface is a surface which lies evenly with the straight lines on itself.",
    steps: [
      given("Let ABCD be a surface.", [
        point("A", [0, 0]),
        point("B", [4, 0]),
        point("C", [4, 2.4]),
        point("D", [0, 2.4]),
        polygon("S", ["A", "B", "C", "D"], SKY),
      ]),
      step("Two points", "Take any two points M and N on the surface.", [
        point("M", [0.6, 0.5]),
        point("N", [3.2, 1.9]),
      ]),
      step(
        "Straight line",
        "The straight line MN lies wholly on the surface, never leaving it. A surface with this property is a plane.",
        [segment("MN", "M", "N", { color: ORANGE })],
      ),
    ],
  }),
  (() => {
    const O: V = [0, 0];
    const A: V = [3, 0.2];
    const B: V = [1.6, 2.2];
    return defineProof({
      id: "def-8",
      label: "D.8",
      kind: "definition",
      title:
        "A plane angle is the inclination to one another of two lines in a plane which meet one another and do not lie in a straight line.",
      statement:
        "A plane angle is the inclination of two meeting lines in a plane that do not lie in a straight line.",
      steps: [
        given("Let two lines OA and OB lie in a plane and meet at O.", [
          P("O", O),
          P("A", A),
          P("B", B),
          segment("OA", "O", "A", { color: SKY }),
          segment("OB", "O", "B", { color: SKY }),
        ]),
        step(
          "Not in a straight line",
          "They do not lie in one straight line, so they incline to one another.",
          line2("notStraight", [-1.2, -0.08], [0, 0], {
            color: ORANGE,
            dashed: true,
          }),
        ),
        step(
          "The angle",
          "That inclination is the plane angle AOB.",
          wedge("wO", O, A, B, 0.7, AMBER),
        ),
      ],
    });
  })(),
  (() => {
    const O: V = [0, 0];
    const A: V = [3, 0];
    const B: V = [1.2, 2];
    return defineProof({
      id: "def-9",
      label: "D.9",
      kind: "definition",
      title:
        "And when the lines containing the angle are straight, the angle is called rectilinear.",
      statement: "An angle contained by straight lines is rectilinear.",
      steps: [
        given("Let OA and OB be straight lines meeting at O.", [
          P("O", O),
          P("A", A),
          P("B", B),
          segment("OA", "O", "A", { color: SKY }),
          segment("OB", "O", "B", { color: SKY }),
        ]),
        step(
          "Rectilinear",
          "The angle AOB is contained by straight lines, so it is a rectilinear angle.",
          wedge("wO", O, A, B, 0.7, AMBER),
        ),
      ],
    });
  })(),
  defineProof({
    id: "def-10",
    label: "D.10",
    kind: "definition",
    title:
      "When a straight line standing on a straight line makes the adjacent angles equal to one another, each of the equal angles is right, and the straight line standing on the other is called a perpendicular.",
    statement:
      "Equal adjacent angles are right angles; the standing line is a perpendicular.",
    steps: [
      given("Let AB be a straight line.", [
        point("A", [-2, 0]),
        point("B", [2, 0]),
        segment("AB", "A", "B"),
      ]),
      step("Standing line", "Let OC stand on AB at the point O.", [
        point("O", [0, 0]),
        point("C", [0, 1.8]),
        segment("OC", "O", "C", { color: SKY }),
      ]),
      step(
        "Equal adjacent angles",
        "Suppose the adjacent angles AOC and COB are equal to one another.",
        [
          ...wedge("wL", [0, 0], [-2, 0], [0, 1.8], 0.55, AMBER),
          ...wedge("wR", [0, 0], [0, 1.8], [2, 0], 0.55, AMBER),
        ],
      ),
      step(
        "Right angles",
        "Each of the equal angles is a right angle, and OC is a perpendicular to AB.",
        [
          ...shape(
            "sqL",
            [
              [0, 0],
              [-0.3, 0],
              [-0.3, 0.3],
              [0, 0.3],
            ],
            ORANGE,
          ),
          ...shape(
            "sqR",
            [
              [0, 0],
              [0.3, 0],
              [0.3, 0.3],
              [0, 0.3],
            ],
            ORANGE,
          ),
        ],
      ),
    ],
  }),
  (() => {
    const O: V = [0, 0];
    const A: V = [2.4, 0];
    const B = rot(A, O, 2.3);
    return defineProof({
      id: "def-11",
      label: "D.11",
      kind: "definition",
      title: "An obtuse angle is an angle greater than a right angle.",
      statement: "An obtuse angle is greater than a right angle.",
      steps: [
        given("Let AOB be an angle.", [
          P("O", O),
          P("A", A),
          P("B", B),
          segment("OA", "O", "A", { color: SKY }),
          segment("OB", "O", "B", { color: SKY }),
          ...wedge("wO", O, A, B, 0.6, AMBER),
        ]),
        step(
          "Compare",
          "Draw the perpendicular OR to OA for comparison.",
          line2("OR", O, [0, 2.2], { color: ORANGE, dashed: true }),
        ),
        step(
          "Obtuse",
          "AOB is greater than the right angle AOR, so it is obtuse.",
          wedge("wR", O, A, [0, 2.2], 0.9, ORANGE),
        ),
      ],
    });
  })(),
  (() => {
    const O: V = [0, 0];
    const A: V = [2.4, 0];
    const B = rot(A, O, 0.9);
    return defineProof({
      id: "def-12",
      label: "D.12",
      kind: "definition",
      title: "An acute angle is an angle less than a right angle.",
      statement: "An acute angle is less than a right angle.",
      steps: [
        given("Let AOB be an angle.", [
          P("O", O),
          P("A", A),
          P("B", B),
          segment("OA", "O", "A", { color: SKY }),
          segment("OB", "O", "B", { color: SKY }),
          ...wedge("wO", O, A, B, 0.6, AMBER),
        ]),
        step(
          "Compare",
          "Draw the perpendicular OR to OA for comparison.",
          line2("OR", O, [0, 2.4], { color: ORANGE, dashed: true }),
        ),
        step(
          "Acute",
          "AOB is less than the right angle AOR, so it is acute.",
          wedge("wR", O, A, [0, 2.4], 0.9, ORANGE),
        ),
      ],
    });
  })(),
  defineProof({
    id: "def-13",
    label: "D.13",
    kind: "definition",
    title: "A boundary is that which is an extremity of anything.",
    statement: "A boundary is an extremity of anything.",
    steps: [
      given("Take a line AB.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B", { color: SKY }),
      ]),
      step("Its boundary", "The points A and B are the extremities of AB.", [
        ...shape(
          "mA",
          [
            [-0.12, -0.12],
            [0.12, -0.12],
            [0.12, 0.12],
            [-0.12, 0.12],
          ],
          ORANGE,
        ),
        ...shape(
          "mB",
          [
            [2.88, -0.12],
            [3.12, -0.12],
            [3.12, 0.12],
            [2.88, 0.12],
          ],
          ORANGE,
        ),
      ]),
      step(
        "Another",
        "The circumference is the extremity of the disc about O.",
        [
          point("O", [1.5, -3]),
          point("R", [2.5, -3]),
          circle("c", "O", "R", { color: ORANGE }),
        ],
      ),
    ],
  }),
  defineProof({
    id: "def-14",
    label: "D.14",
    kind: "definition",
    title: "A figure is that which is contained by any boundary or boundaries.",
    statement: "A figure is contained by a boundary or boundaries.",
    steps: [
      given("Take three straight lines AB, BC and CA as boundaries.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        point("C", [1.2, 2]),
        segment("AB", "A", "B", { color: ORANGE }),
        segment("BC", "B", "C", { color: ORANGE }),
        segment("CA", "C", "A", { color: ORANGE }),
      ]),
      step("Contained", "The triangle ABC is contained by these boundaries.", [
        polygon("tri", ["A", "B", "C"], SKY),
      ]),
      step("One boundary", "A single boundary can also contain a figure.", [
        point("O", [5.4, 1]),
        point("R", [6.6, 1]),
        circle("c", "O", "R", { color: ORANGE }),
      ]),
    ],
  }),
  (() => {
    const O: V = [0, 0];
    const A: V = [1.6, 0];
    const B = rot(A, O, 1.2);
    const C = rot(A, O, 2.5);
    const D = rot(A, O, 4.2);
    return defineProof({
      id: "def-15",
      label: "D.15",
      kind: "definition",
      title:
        "A circle is a plane figure contained by one line such that all the straight lines falling upon it from one point among those lying within the figure equal one another.",
      statement:
        "A circle is a plane figure bounded by one line, with one interior point from which all lines to the boundary are equal.",
      steps: [
        given("Let O be a point in a plane.", [P("O", O)]),
        step("The line", "Let one line bound a figure about O.", [
          P("A", A),
          circle("c", "O", "A", { color: SKY }),
        ]),
        step(
          "Straight lines",
          "Draw straight lines OA, OB, OC, OD from O to the line.",
          [
            P("B", B),
            P("C", C),
            P("D", D),
            segment("OA", "O", "A", { color: AMBER }),
            segment("OB", "O", "B", { color: AMBER }),
            segment("OC", "O", "C", { color: AMBER }),
            segment("OD", "O", "D", { color: AMBER }),
          ],
        ),
        step(
          "Equal",
          "All the lines from O equal one another, so the figure is a circle.",
          [polygon("tri", ["O", "A", "B"], GREEN)],
        ),
      ],
    });
  })(),
  defineProof({
    id: "def-16",
    label: "D.16",
    kind: "definition",
    title: "And the point is called the center of the circle.",
    statement: "The point from which the lines are equal is the center.",
    steps: [
      given("Let ABC be a circle.", [
        point("O", [0, 0], ""),
        point("A", [1.6, 0]),
        circle("c", "O", "A", { color: SKY }),
      ]),
      step("The center", "The point O is called the center of the circle.", [
        point("Oc", [0, 0], "O"),
        segment("OA", "Oc", "A", { color: AMBER, dashed: true }),
      ]),
    ],
  }),
  (() => {
    const O: V = [0, 0];
    return defineProof({
      id: "def-17",
      label: "D.17",
      kind: "definition",
      title:
        "A diameter of the circle is any straight line drawn through the center and terminated in both directions by the circumference, and such a straight line also bisects the circle.",
      statement:
        "A diameter passes through the center, ends on the circumference, and bisects the circle.",
      steps: [
        given("Let O be the center of a circle.", [
          P("O", O),
          P("B", [1.6, 0]),
          circle("c", "O", "B", { color: SKY }),
        ]),
        step("Through the center", "Draw AB through O to the circumference.", [
          P("A", [-1.6, 0]),
          segment("AB", "A", "B", { color: ORANGE }),
        ]),
        step("Bisects", "AB cuts the circle into two equal halves.", [
          ...slice("top", O, 1.6, 0, Math.PI, CYAN),
          ...slice("bot", O, 1.6, Math.PI, 2 * Math.PI, VIOLET),
        ]),
      ],
    });
  })(),
  (() => {
    const O: V = [0, 0];
    return defineProof({
      id: "def-18",
      label: "D.18",
      kind: "definition",
      title:
        "A semicircle is the figure contained by the diameter and the circumference cut off by it. And the center of the semicircle is the same as that of the circle.",
      statement:
        "A semicircle is contained by a diameter and the circumference it cuts off; its center is the circle's center.",
      steps: [
        given("Let AB be a diameter of the circle with center O.", [
          P("O", O),
          P("A", [-1.6, 0]),
          P("B", [1.6, 0]),
          circle("c", "O", "B", { color: SKY }),
          segment("AB", "A", "B", { color: ORANGE }),
        ]),
        step(
          "Semicircle",
          "The figure contained by AB and the circumference above it is a semicircle.",
          slice("semi", O, 1.6, 0, Math.PI, CYAN),
        ),
        step(
          "Same center",
          "The center of the semicircle is the same point O.",
          disc("ring", O, 0.2, { color: AMBER }),
        ),
      ],
    });
  })(),
  defineProof({
    id: "def-19",
    label: "D.19",
    kind: "definition",
    title:
      "Rectilinear figures are those which are contained by straight lines: trilateral, quadrilateral, and multilateral.",
    statement:
      "Rectilinear figures are contained by straight lines (three, four, or more than four).",
    steps: [
      given(
        "Rectilinear figures are contained by straight lines.",
        line2("base", [-0.5, -0.3], [8.8, -0.3], { color: SKY }),
      ),
      step(
        "Trilateral",
        "Contained by three straight lines.",
        shape(
          "t3",
          [
            [0, 0],
            [2.4, 0],
            [1.2, 2],
          ],
          VIOLET,
        ),
      ),
      step(
        "Quadrilateral",
        "Contained by four straight lines.",
        shape(
          "t4",
          [
            [3.4, 0],
            [5.6, 0],
            [5.9, 1.8],
            [3.6, 2],
          ],
          CYAN,
        ),
      ),
      step(
        "Multilateral",
        "Contained by more than four straight lines.",
        shape(
          "t5",
          [
            [6.8, 0],
            [8.6, 0],
            [9.2, 1.4],
            [7.8, 2.4],
            [6.4, 1.4],
          ],
          GREEN,
        ),
      ),
    ],
  }),
  defineProof({
    id: "def-20",
    label: "D.20",
    kind: "definition",
    title:
      "Of trilateral figures, an equilateral triangle has its three sides equal, an isosceles triangle two sides alone equal, and a scalene triangle three sides unequal.",
    statement: "Equilateral, isosceles and scalene triangles.",
    steps: [
      given("Three triangles."),
      step(
        "Equilateral",
        "All three sides are equal.",
        shape(
          "eq",
          [
            [0, 0],
            [2, 0],
            [1, Math.sqrt(3)],
          ],
          GREEN,
        ),
      ),
      step(
        "Isosceles",
        "Two sides alone are equal.",
        shape(
          "iso",
          [
            [3.4, 0],
            [5.8, 0],
            [4.6, 2.2],
          ],
          CYAN,
        ),
      ),
      step(
        "Scalene",
        "All three sides are unequal.",
        shape(
          "sca",
          [
            [7.2, 0],
            [9.8, 0],
            [7.8, 1.8],
          ],
          VIOLET,
        ),
      ),
    ],
  }),
  defineProof({
    id: "def-21",
    label: "D.21",
    kind: "definition",
    title:
      "Of trilateral figures, a right-angled, an obtuse-angled and an acute-angled triangle.",
    statement:
      "A right-angled triangle has a right angle, an obtuse-angled one an obtuse angle, and an acute-angled one three acute angles.",
    steps: [
      given("Three triangles."),
      step("Right-angled", "It has a right angle.", [
        ...shape(
          "rt",
          [
            [0, 0],
            [2.4, 0],
            [0, 1.8],
          ],
          GREEN,
        ),
        ...wedge("rtm", [0, 0], [2.4, 0], [0, 1.8], 0.35, ORANGE),
      ]),
      step("Obtuse-angled", "It has an obtuse angle.", [
        ...shape(
          "ob",
          [
            [3.6, 0],
            [6.4, 0],
            [3.2, 1.4],
          ],
          CYAN,
        ),
        ...wedge("obm", [3.6, 0], [6.4, 0], [3.2, 1.4], 0.45, ORANGE),
      ]),
      step("Acute-angled", "All three angles are acute.", [
        ...shape(
          "ac",
          [
            [7.6, 0],
            [10.2, 0],
            [8.8, 2],
          ],
          VIOLET,
        ),
        ...wedge("ac1", [7.6, 0], [10.2, 0], [8.8, 2], 0.4, ORANGE),
        ...wedge("ac2", [10.2, 0], [8.8, 2], [7.6, 0], 0.4, ORANGE),
        ...wedge("ac3", [8.8, 2], [7.6, 0], [10.2, 0], 0.4, ORANGE),
      ]),
    ],
  }),
  defineProof({
    id: "def-22",
    label: "D.22",
    kind: "definition",
    title:
      "Of quadrilateral figures, a square, an oblong, a rhombus, a rhomboid, and the rest are trapezia.",
    statement: "Kinds of quadrilateral.",
    steps: [
      given("Quadrilaterals."),
      step(
        "Square",
        "Both equilateral and right-angled.",
        shape(
          "sq",
          [
            [0, 0],
            [1.8, 0],
            [1.8, 1.8],
            [0, 1.8],
          ],
          GREEN,
        ),
      ),
      step(
        "Oblong",
        "Right-angled but not equilateral.",
        shape(
          "ob",
          [
            [3, 0],
            [5.6, 0],
            [5.6, 1.6],
            [3, 1.6],
          ],
          CYAN,
        ),
      ),
      step(
        "Rhombus",
        "Equilateral but not right-angled.",
        shape(
          "rh",
          [
            [7.2, 0],
            [9.2, 0],
            [10.2, Math.sqrt(3)],
            [8.2, Math.sqrt(3)],
          ],
          VIOLET,
        ),
      ),
      step(
        "Rhomboid",
        "Opposite sides and angles equal, but neither equilateral nor right-angled.",
        shape(
          "rd",
          [
            [0, -3],
            [2.6, -3],
            [3.4, -1.6],
            [0.8, -1.6],
          ],
          AMBER,
        ),
      ),
      step(
        "Trapezia",
        "All other quadrilaterals are called trapezia.",
        shape(
          "tz",
          [
            [4.6, -3],
            [7.6, -3],
            [7, -1.5],
            [5.4, -1.8],
          ],
          ORANGE,
        ),
      ),
    ],
  }),
  defineProof({
    id: "def-23",
    label: "D.23",
    kind: "definition",
    title:
      "Parallel straight lines are straight lines which, being in the same plane and produced indefinitely in both directions, do not meet one another in either direction.",
    statement: "Parallel lines never meet.",
    steps: [
      given("Let AB and CD be straight lines in one plane.", [
        point("A", [-1, 0]),
        point("B", [3, 0]),
        point("C", [-1, 1.2]),
        point("D", [3, 1.2]),
        segment("AB", "A", "B", { color: SKY }),
        segment("CD", "C", "D", { color: SKY }),
      ]),
      step(
        "Produce them",
        "Produce both lines indefinitely in both directions.",
        [
          ...line2("eA", [-5, 0], [-1, 0], { color: ORANGE, dashed: true }),
          ...line2("eB", [3, 0], [7, 0], { color: ORANGE, dashed: true }),
          ...line2("eC", [-5, 1.2], [-1, 1.2], { color: ORANGE, dashed: true }),
          ...line2("eD", [3, 1.2], [7, 1.2], { color: ORANGE, dashed: true }),
        ],
      ),
      step(
        "Never meet",
        "They meet in neither direction, so AB and CD are parallel.",
        shape(
          "band",
          [
            [-5, 0],
            [7, 0],
            [7, 1.2],
            [-5, 1.2],
          ],
          GREEN,
        ),
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
    dependencies: ["p-1", "p-3", "cn-1", "def-20", "def-15"],
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
  (() => {
    const A: V = [0, 0];
    const B: V = [2.4, 1.1];
    const C: V = [3.8, 1.1];
    const r = vlen(vsub(C, B));
    const ab = vlen(vsub(B, A));
    const D = circ2(A, ab, B, ab, 1);
    const G = vadd(B, vmul(vunit(vsub(B, D)), r));
    const L = vadd(D, vmul(vunit(vsub(A, D)), ab + r));
    return defineProof({
      id: "i-2",
      label: "I.2",
      kind: "theorem",
      title:
        "To place a straight line equal to a given straight line with one end at a given point.",
      statement:
        "At a given point to place a straight line equal to a given straight line.",
      dependencies: ["p-1", "i-1", "p-2", "p-3", "def-15", "cn-3", "cn-1"],
      steps: [
        given("Let A be the given point and BC the given straight line.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("BC", "B", "C", { color: AMBER }),
        ]),
        step(
          "Join",
          "Join AB, and construct the equilateral triangle DAB on it (I.1).",
          [
            P("D", D),
            segment("AB", "A", "B"),
            segment("DA", "D", "A"),
            segment("DB", "D", "B"),
          ],
        ),
        step(
          "Circle about B",
          "Describe the circle CGH with centre B and radius BC, and produce DB to G.",
          [
            circle("cB", "B", "C", { dashed: true }),
            P("G", G),
            segment("BG", "B", "G", { dashed: true }),
          ],
        ),
        step(
          "Circle about D",
          "Describe the circle GKL with centre D and radius DG, and produce DA to L.",
          [
            circle("cD", "D", "G", { dashed: true }),
            P("L", L),
            segment("AL", "A", "L", { color: ORANGE }),
          ],
        ),
        step(
          "Equal",
          "DL equals DG, and DA equals DB, so the remainder AL equals BG, which equals BC. Hence AL is the required line.",
          [segment("BGc", "B", "G", { color: AMBER })],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [4, 0];
    const D = rot([1.6, 0], A, 0.8);
    const E: V = [1.6, 0];
    return defineProof({
      id: "i-3",
      label: "I.3",
      kind: "theorem",
      title:
        "To cut off from the greater of two given unequal straight lines a straight line equal to the less.",
      statement:
        "From the greater of two unequal straight lines to cut off a part equal to the less.",
      dependencies: ["p-3", "cn-1", "def-15", "i-2"],
      steps: [
        given("Let AB be the greater and C the less of two straight lines.", [
          P("A", A),
          P("B", B),
          segment("AB", "A", "B"),
          ...line2("lessC", [0.6, 2.4], [2.2, 2.4], { color: AMBER }),
        ]),
        step("Place", "Place AD equal to C at the point A (I.2).", [
          P("D", D),
          segment("AD", "A", "D", { color: AMBER }),
        ]),
        step("Circle", "With centre A and radius AD describe the circle DEF.", [
          circle("cA", "A", "D", { dashed: true }),
        ]),
        step(
          "Cut off",
          "The circle cuts AB at E. Since AE equals AD and AD equals C, AE equals C.",
          [P("E", E), segment("AE", "A", "E", { color: ORANGE })],
        ),
      ],
    });
  })(),
  defineProof({
    id: "i-4",
    label: "I.4",
    kind: "theorem",
    title: "The side-angle-side principle.",
    statement:
      "If two triangles have two sides equal to two sides and the included angles equal, their bases and remaining angles are equal.",
    dependencies: ["cn-4"],
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
    dependencies: ["def-20", "p-2", "i-3", "p-1", "i-4", "cn-3"],
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

  // -------------------------------------------------------------------------
  // Propositions I.6 – I.26
  // -------------------------------------------------------------------------
  (() => {
    const A: V = [1.6, 2.2];
    const B: V = [0, 0];
    const C: V = [2.4, 0];
    const D = vadd(B, vmul(vunit(vsub(A, B)), vlen(vsub(A, C))));
    return defineProof({
      id: "i-6",
      label: "I.6",
      kind: "theorem",
      title:
        "If in a triangle two angles equal one another, then the sides opposite the equal angles also equal one another.",
      statement: "Equal angles in a triangle lie opposite equal sides.",
      dependencies: ["cn-5", "i-3", "i-4", "p-1"],
      steps: [
        given("Let ABC be a triangle with angle ABC equal to angle ACB.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
          ...wedge("wB", B, C, A, 0.45, AMBER),
          ...wedge("wC", C, A, B, 0.45, AMBER),
        ]),
        step(
          "Suppose",
          "Suppose AB is not equal to AC; let AB be the greater.",
          [],
        ),
        step("Cut off", "Cut off DB from AB equal to AC (I.3).", [
          P("D", D),
          segment("DB", "D", "B", { color: CYAN }),
        ]),
        step("Join", "Join DC.", [segment("DC", "D", "C", { color: ORANGE })]),
        step(
          "Compare",
          "In triangles DBC and ACB, DB equals AC, BC is common, and angle DBC equals angle ACB. By I.4 the triangles are equal.",
          [polygon("tDBC", ["D", "B", "C"], CYAN)],
        ),
        step(
          "Absurd",
          "The less would equal the greater, which is absurd (CN.5). Hence AB equals AC.",
          [polygon("tABC", ["A", "B", "C"], GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3, 0];
    const C: V = [1, 2];
    const D = rot(C, A, -0.35);
    return defineProof({
      id: "i-7",
      label: "I.7",
      kind: "theorem",
      title:
        "Given two straight lines constructed from the ends of a straight line and meeting in a point, there cannot be constructed from the ends of the same straight line, and on the same side of it, two other straight lines meeting in another point and equal to the former two respectively.",
      statement:
        "Two lines from the ends of AB meeting at C are the only such pair on that side of AB.",
      dependencies: ["p-1", "i-5", "cn-5"],
      steps: [
        given(
          "Let AC and BC be straight lines from the ends of AB, meeting at C.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            segment("AB", "A", "B"),
            segment("AC", "A", "C", { color: AMBER }),
            segment("BC", "B", "C", { color: CYAN }),
          ],
        ),
        step(
          "Suppose",
          "Suppose there were other lines AD and BD, on the same side, meeting at D, with AD equal to AC and BD equal to BC.",
          [
            P("D", D),
            segment("AD", "A", "D", { color: AMBER, dashed: true }),
            segment("BD", "B", "D", { color: CYAN, dashed: true }),
          ],
        ),
        step(
          "Join",
          "Join CD. Since AC equals AD, angle ACD equals angle ADC (I.5).",
          [
            segment("CD", "C", "D", { color: ORANGE }),
            ...wedge("wACD", C, A, D, 0.35, AMBER),
            ...wedge("wADC", D, A, C, 0.35, AMBER),
          ],
        ),
        step(
          "Compare",
          "Angle ADC is greater than BDC, so ACD is greater than BDC. Since BC equals BD, angle BDC equals BCD (I.5).",
          [...wedge("wBDC", D, B, C, 0.5, CYAN)],
        ),
        step(
          "Absurd",
          "So ACD is greater than BCD, yet BCD is greater than ACD, which is impossible. No such D exists.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0.9, 1.8];
    const B: V = [0, 0];
    const C: V = [2.4, 0];
    const T: V = [4.2, 0];
    const D = vadd(A, T);
    const E = vadd(B, T);
    const F = vadd(C, T);
    const G = reflect(A, B, C);
    return defineProof({
      id: "i-8",
      label: "I.8",
      kind: "theorem",
      title:
        "If two triangles have the two sides equal to two sides respectively, and also have the base equal to the base, then they also have the angles equal which are contained by the equal straight lines.",
      statement: "SSS: triangles with three equal sides have equal angles.",
      dependencies: ["cn-4", "i-7"],
      steps: [
        given("Let ABC be a triangle.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B", { color: AMBER }),
          segment("AC", "A", "C", { color: CYAN }),
          segment("BC", "B", "C", { color: VIOLET }),
        ]),
        step(
          "Second triangle",
          "Let DEF have DE equal to AB, DF equal to AC, and EF equal to BC.",
          [
            P("D", D),
            P("E", E),
            P("F", F),
            segment("DE", "D", "E", { color: AMBER }),
            segment("DF", "D", "F", { color: CYAN }),
            segment("EF", "E", "F", { color: VIOLET }),
          ],
        ),
        step(
          "Apply",
          "Apply DEF to ABC with E on B and F on C. D cannot fall on the same side at a different point (I.7), so suppose it falls at G on the other side of BC.",
          [
            P("G", G),
            segment("BG", "B", "G", { color: AMBER, dashed: true }),
            segment("CG", "C", "G", { color: CYAN, dashed: true }),
          ],
        ),
        step(
          "Join",
          "Join AG. Since BA equals BG, angle BAG equals BGA; since CA equals CG, angle CAG equals CGA (I.5).",
          [segment("AG", "A", "G", { color: ORANGE })],
        ),
        step(
          "Equal angles",
          "Adding, angle BAC equals angle BGC, that is, angle EDF.",
          [
            ...wedge("wA", A, B, C, 0.5, GREEN),
            ...wedge("wG", G, B, C, 0.5, GREEN),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3.4, 0.5];
    const C: V = [1, 2.8];
    const D = vmul(vunit(B), 1.7);
    const E = vmul(vunit(C), 1.7);
    const M = mid(D, E);
    const F = vadd(
      M,
      vmul(vunit(vsub(M, A)), vlen(vsub(D, E)) * (Math.sqrt(3) / 2)),
    );
    return defineProof({
      id: "i-9",
      label: "I.9",
      kind: "theorem",
      title: "To bisect a given rectilinear angle.",
      statement: "A rectilinear angle can be bisected.",
      dependencies: ["i-1", "i-3", "p-1", "def-20", "i-8"],
      steps: [
        given("Let BAC be the given rectilinear angle.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("AC", "A", "C"),
          ...wedge("wBAC", A, B, C, 0.6, AMBER),
        ]),
        step("Take D", "Take any point D on AB.", [P("D", D)]),
        step(
          "Cut off AE",
          "Cut off AE from AC equal to AD (I.3), and join DE.",
          [P("E", E), segment("DE", "D", "E", { color: CYAN })],
        ),
        step(
          "Equilateral triangle",
          "Construct the equilateral triangle DEF on DE (I.1), on the side away from A.",
          [
            P("F", F),
            segment("DF", "D", "F", { color: CYAN }),
            segment("EF", "E", "F", { color: CYAN }),
          ],
        ),
        step("Join AF", "Join AF. Then AF bisects the angle BAC.", [
          segment("AF", "A", "F", { color: ORANGE }),
        ]),
        step(
          "Proof",
          "Triangles ADF and AEF have AD = AE, AF common, DF = EF, so the angles at A are equal (I.8).",
          [
            ...wedge("wDAF", A, D, F, 0.85, GREEN),
            ...wedge("wFAE", A, F, E, 0.85, VIOLET),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3, 0];
    const C: V = [1.5, 1.5 * Math.sqrt(3)];
    const D: V = [1.5, 0];
    return defineProof({
      id: "i-10",
      label: "I.10",
      kind: "theorem",
      title: "To bisect a given finite straight line.",
      statement: "A finite straight line can be bisected.",
      dependencies: ["i-1", "i-4", "i-9", "def-20"],
      steps: [
        given("Let AB be the given finite straight line.", [
          P("A", A),
          P("B", B),
          segment("AB", "A", "B"),
        ]),
        step(
          "Equilateral triangle",
          "Construct the equilateral triangle ABC on AB (I.1).",
          [
            circle("cA", "A", "B", { dashed: true }),
            circle("cB", "B", "A", { dashed: true }),
            P("C", C),
            segment("CA", "C", "A"),
            segment("CB", "C", "B"),
          ],
        ),
        step(
          "Bisect the angle",
          "Bisect the angle ACB by the straight line CD (I.9).",
          [
            P("D", D),
            segment("CD", "C", "D", { color: ORANGE }),
            ...wedge("wL", C, A, D, 0.5, AMBER),
            ...wedge("wR", C, D, B, 0.5, AMBER),
          ],
        ),
        step(
          "Proof",
          "In triangles ACD and BCD, AC = CB, CD is common and angle ACD = angle BCD, so AD = DB (I.4).",
          [
            polygon("tACD", ["A", "C", "D"], CYAN),
            polygon("tBCD", ["B", "C", "D"], VIOLET),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [4, 0];
    const C: V = [1.7, 0];
    const D: V = [0.9, 0];
    const E: V = [2.5, 0];
    const F: V = [1.7, 0.8 * Math.sqrt(3)];
    return defineProof({
      id: "i-11",
      label: "I.11",
      kind: "theorem",
      title:
        "To draw a straight line at right angles to a given straight line from a given point on it.",
      statement: "A perpendicular can be drawn at a point of a line.",
      dependencies: ["i-1", "i-3", "i-8", "def-20", "def-10", "p-1"],
      steps: [
        given(
          "Let AB be the given straight line and C the given point on it.",
          [P("A", A), P("B", B), P("C", C), segment("AB", "A", "B")],
        ),
        step("Take D", "Take any point D on AC.", [P("D", D)]),
        step("Make CE = CD", "Make CE equal to CD (I.3).", [P("E", E)]),
        step(
          "Equilateral triangle",
          "Construct the equilateral triangle FDE on DE (I.1).",
          [
            P("F", F),
            segment("FD", "F", "D", { color: CYAN }),
            segment("FE", "F", "E", { color: CYAN }),
          ],
        ),
        step("Join FC", "Join FC. Then FC is at right angles to AB.", [
          segment("FC", "F", "C", { color: ORANGE }),
        ]),
        step(
          "Proof",
          "Triangles DCF and ECF have DC = EC, CF common, FD = FE, so the angles DCF and ECF are equal (I.8). Equal adjacent angles are right (D.10).",
          [
            ...wedge("wDCF", C, D, F, 0.45, GREEN),
            ...wedge("wFCE", C, F, E, 0.45, GREEN),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [-3, 0];
    const B: V = [5, 0];
    const C: V = [1.3, 2.2];
    const D: V = [2.8, -1.2];
    const r = vlen(vsub(D, C));
    const F = foot(C, A, B);
    const half = Math.sqrt(r * r - vlen(vsub(C, F)) ** 2);
    const E: V = [F[0] - half, 0];
    const G: V = [F[0] + half, 0];
    return defineProof({
      id: "i-12",
      label: "I.12",
      kind: "theorem",
      title:
        "To draw a straight line perpendicular to a given infinite straight line from a given point not on it.",
      statement: "A perpendicular can be drawn to a line from a point off it.",
      dependencies: ["p-3", "p-1", "i-10", "def-15", "i-8", "def-10"],
      steps: [
        given(
          "Let AB be the given infinite straight line and C a point not on it.",
          [P("A", A), P("B", B), P("C", C), segment("AB", "A", "B")],
        ),
        step("Take D", "Take any point D on the other side of AB.", [
          P("D", D),
        ]),
        step(
          "Circle",
          "Describe the circle EFG with centre C and radius CD, cutting AB at E and G.",
          [circle("cC", "C", "D", { dashed: true }), P("E", E), P("G", G)],
        ),
        step("Bisect EG", "Bisect EG at H (I.10), and join CG, CH and CE.", [
          P("H", F),
          segment("CG", "C", "G", { color: CYAN }),
          segment("CE", "C", "E", { color: CYAN }),
          segment("CH", "C", "H", { color: ORANGE }),
        ]),
        step(
          "Proof",
          "Triangles HEC and HGC have HE = HG, HC common, CE = CG, so the angles at H are equal (I.8). They are adjacent, so each is right: CH is perpendicular to AB.",
          [
            ...wedge("wL", F, E, C, 0.35, GREEN),
            ...wedge("wR", F, C, G, 0.35, GREEN),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const C: V = [-2, 0];
    const D: V = [2, 0];
    const B: V = [0, 0];
    const A: V = [-0.7, 1.7];
    const E: V = [0, 1.8];
    return defineProof({
      id: "i-13",
      label: "I.13",
      kind: "theorem",
      title:
        "If a straight line stands on a straight line, then it makes either two right angles or angles whose sum equals two right angles.",
      statement: "Adjacent angles on a line sum to two right angles.",
      dependencies: ["def-10", "cn-2", "i-11", "cn-1"],
      steps: [
        given("Let the straight line AB stand on the straight line CD.", [
          P("C", C),
          P("D", D),
          P("B", B),
          P("A", A),
          segment("CD", "C", "D"),
          segment("BA", "B", "A", { color: SKY }),
          ...wedge("wCBA", B, C, A, 0.5, AMBER),
          ...wedge("wABD", B, A, D, 0.6, CYAN),
        ]),
        step(
          "If equal",
          "If angle CBA equals angle ABD, each is a right angle (D.10).",
          [],
        ),
        step(
          "If not",
          "Otherwise draw BE at right angles to CD from B (I.11).",
          [P("E", E), segment("BE", "B", "E", { color: ORANGE, dashed: true })],
        ),
        step("Right angles", "Angles CBE and EBD are two right angles.", [
          ...wedge("wCBE", B, C, E, 0.9, VIOLET),
          ...wedge("wEBD", B, E, D, 0.9, GREEN),
        ]),
        step(
          "Sum",
          "Angle ABD equals ABE + EBD, so CBA + ABD equals CBA + ABE + EBD, which equals CBE + EBD. That is two right angles (CN.2).",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 1.6];
    const B: V = [0, 0];
    const C: V = [-1.6, -0.5];
    const D: V = [1.5, 0.85];
    const E: V = [1.6, 0.5];
    return defineProof({
      id: "i-14",
      label: "I.14",
      kind: "theorem",
      title:
        "If with any straight line, and at a point on it, two straight lines not lying on the same side make the sum of the adjacent angles equal to two right angles, then the two straight lines are in a straight line with one another.",
      statement: "The converse of I.13.",
      dependencies: ["p-2", "cn-1", "i-13", "cn-3", "p-4"],
      steps: [
        given(
          "Let BC and BD, on opposite sides of AB, make angles ABC and ABD together equal to two right angles.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            segment("AB", "A", "B"),
            segment("BC", "B", "C", { color: AMBER }),
            segment("BD", "B", "D", { color: CYAN }),
            ...wedge("wABC", B, A, C, 0.45, AMBER),
            ...wedge("wABD", B, A, D, 0.45, CYAN),
          ],
        ),
        step(
          "Suppose",
          "Suppose BD is not in line with CB; let BE be the straight continuation of CB.",
          [P("E", E), segment("BE", "B", "E", { color: ORANGE, dashed: true })],
        ),
        step(
          "Two right angles",
          "Since CBE is straight, angles CBA and ABE equal two right angles (I.13).",
          [...wedge("wABE", B, A, E, 0.65, ORANGE)],
        ),
        step(
          "Absurd",
          "So CBA + ABE = CBA + ABD. Taking away CBA, ABE equals ABD, the less equals the greater — absurd. Hence CB and BD are in a straight line.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [-2, -0.8];
    const B: V = [2, 0.8];
    const C: V = [-1.4, 1.4];
    const D: V = [1.4, -1.4];
    const E: V = [0, 0];
    return defineProof({
      id: "i-15",
      label: "I.15",
      kind: "theorem",
      title:
        "If two straight lines cut one another, then they make the vertical angles equal to one another.",
      statement: "Vertical angles are equal.",
      dependencies: ["p-4", "cn-3", "i-13", "cn-1"],
      steps: [
        given("Let AB and CD cut one another at E.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          P("E", E),
          segment("AB", "A", "B"),
          segment("CD", "C", "D"),
        ]),
        step(
          "Adjacent angles",
          "AE stands on CD, so angles CEA and AED equal two right angles (I.13).",
          [
            ...wedge("wCEA", E, C, A, 0.45, AMBER),
            ...wedge("wAED", E, A, D, 0.45, CYAN),
          ],
        ),
        step(
          "Other pair",
          "Likewise DE stands on AB, so angles AED and DEB equal two right angles.",
          [...wedge("wDEB", E, D, B, 0.7, VIOLET)],
        ),
        step(
          "Subtract",
          "Taking away the common AED, angle CEA equals angle DEB (CN.3). Similarly CEB equals AED.",
          [...wedge("wCEB", E, C, B, 0.9, GREEN)],
        ),
        step(
          "Corollary",
          "The four angles at E together equal four right angles.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0.8, 2.2];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const D: V = [4.6, 0];
    const E = mid(A, C);
    const F = vsub(vmul(E, 2), B);
    return defineProof({
      id: "i-16",
      label: "I.16",
      kind: "theorem",
      title:
        "In any triangle, if one of the sides is produced, then the exterior angle is greater than either of the interior and opposite angles.",
      statement: "An exterior angle exceeds each opposite interior angle.",
      dependencies: ["p-2", "p-1", "cn-5", "i-4", "i-3", "i-10", "i-15"],
      steps: [
        given("Let ABC be a triangle, and produce BC to D.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
          segment("CD", "C", "D", { dashed: true }),
          ...wedge("wBAC", A, B, C, 0.45, AMBER),
          ...wedge("wACD", C, A, D, 0.5, CYAN),
        ]),
        step("Bisect AC", "Bisect AC at E (I.10) and join BE.", [
          P("E", E),
          segment("BE", "B", "E", { color: ORANGE }),
        ]),
        step(
          "Produce",
          "Produce BE to F so that EF equals BE (I.3), and join FC.",
          [
            P("F", F),
            segment("EF", "E", "F", { color: ORANGE, dashed: true }),
            segment("FC", "F", "C", { color: ORANGE }),
          ],
        ),
        step(
          "Equal triangles",
          "AE = EC, BE = EF, and the vertical angles at E are equal (I.15), so triangles ABE and CFE are equal (I.4). Hence angle BAE equals angle ECF.",
          [
            polygon("tABE", ["A", "B", "E"], VIOLET),
            polygon("tCFE", ["C", "F", "E"], SKY),
          ],
        ),
        step(
          "Greater",
          "Angle ECD is greater than ECF, so angle ACD is greater than angle BAC. Bisecting BC instead shows it is greater than ABC as well.",
          [...wedge("wECF", C, E, F, 0.8, GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [1, 2];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const D: V = [4.5, 0];
    return defineProof({
      id: "i-17",
      label: "I.17",
      kind: "theorem",
      title:
        "In any triangle the sum of any two angles is less than two right angles.",
      statement:
        "Any two angles of a triangle sum to less than two right angles.",
      dependencies: ["i-13", "i-16", "cn-5", "p-2"],
      steps: [
        given("Let ABC be a triangle.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
          ...wedge("wB", B, A, C, 0.45, AMBER),
          ...wedge("wACB", C, B, A, 0.45, VIOLET),
        ]),
        step("Produce", "Produce BC to D.", [
          P("D", D),
          segment("CD", "C", "D", { dashed: true }),
          ...wedge("wACD", C, A, D, 0.6, CYAN),
        ]),
        step(
          "Exterior angle",
          "The exterior angle ACD is greater than the interior and opposite angle ABC (I.16).",
          [],
        ),
        step(
          "Add",
          "Add ACB to each: ACD + ACB is greater than ABC + ACB. But ACD + ACB equals two right angles (I.13), so ABC + ACB is less than two right angles. The same holds for any pair.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0.5, 1.7];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const D = vadd(A, vmul(vunit(vsub(C, A)), vlen(vsub(A, B))));
    return defineProof({
      id: "i-18",
      label: "I.18",
      kind: "theorem",
      title: "In any triangle the angle opposite the greater side is greater.",
      statement: "The greater side subtends the greater angle.",
      dependencies: ["i-3", "p-1", "i-5", "i-16"],
      steps: [
        given("Let ABC be a triangle with side AC greater than AB.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B", { color: AMBER }),
          segment("BC", "B", "C"),
          segment("CA", "C", "A", { color: CYAN }),
        ]),
        step("Cut off", "Cut off AD from AC equal to AB (I.3), and join BD.", [
          P("D", D),
          segment("BD", "B", "D", { color: ORANGE }),
        ]),
        step(
          "Isosceles",
          "ABD is isosceles, so angle ABD equals angle ADB (I.5).",
          [
            ...wedge("wABD", B, A, D, 0.45, AMBER),
            ...wedge("wADB", D, A, B, 0.35, AMBER),
          ],
        ),
        step(
          "Exterior angle",
          "Angle ADB is exterior to triangle BDC, so it is greater than angle DCB (I.16).",
          [...wedge("wC", C, B, A, 0.5, VIOLET)],
        ),
        step(
          "Conclude",
          "Angle ABC is greater than ABD, hence greater than ACB.",
          [...wedge("wABC", B, A, C, 0.7, GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0.5, 1.7];
    const B: V = [0, 0];
    const C: V = [3, 0];
    return defineProof({
      id: "i-19",
      label: "I.19",
      kind: "theorem",
      title: "In any triangle the side opposite the greater angle is greater.",
      statement: "The greater angle is opposite the greater side.",
      dependencies: ["i-5", "i-18"],
      steps: [
        given("Let ABC be a triangle with angle ABC greater than angle BCA.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
          ...wedge("wB", B, A, C, 0.7, GREEN),
          ...wedge("wC", C, B, A, 0.5, VIOLET),
        ]),
        step(
          "Suppose equal",
          "If AC equalled AB, the angles at B and C would be equal (I.5), contrary to the hypothesis.",
          [circle("cA", "A", "B", { dashed: true, color: ORANGE })],
        ),
        step(
          "Suppose less",
          "If AC were less than AB, angle ABC would be less than angle ACB (I.18), also contrary to the hypothesis.",
          [],
        ),
        step("Conclude", "Both are impossible, so AC is greater than AB.", [
          segment("ACg", "A", "C", { color: GREEN }),
        ]),
      ],
    });
  })(),
  (() => {
    const A: V = [1, 1.8];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const D = vadd(A, vmul(vunit(vsub(A, B)), vlen(vsub(A, C))));
    return defineProof({
      id: "i-20",
      label: "I.20",
      kind: "theorem",
      title:
        "In any triangle the sum of any two sides is greater than the remaining one.",
      statement: "The triangle inequality.",
      dependencies: ["p-2", "i-3", "p-1", "i-5", "cn-5", "i-19"],
      steps: [
        given("Let ABC be a triangle.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
        ]),
        step(
          "Produce",
          "Produce BA to D so that AD equals CA (I.3), and join DC.",
          [
            P("D", D),
            circle("cA", "A", "C", { dashed: true }),
            segment("AD", "A", "D", { color: AMBER, dashed: true }),
            segment("DC", "D", "C", { color: ORANGE }),
          ],
        ),
        step(
          "Isosceles",
          "Since DA equals AC, angle ADC equals angle ACD (I.5).",
          [
            ...wedge("wADC", D, A, C, 0.4, AMBER),
            ...wedge("wACD", C, A, D, 0.4, AMBER),
          ],
        ),
        step(
          "Greater angle",
          "Angle BCD is greater than ACD, so greater than BDC.",
          [...wedge("wBCD", C, B, D, 0.7, GREEN)],
        ),
        step(
          "Conclude",
          "In triangle DCB the greater angle is opposite the greater side (I.19), so DB is greater than BC. DB equals BA + AC, hence BA + AC is greater than BC.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [1.5, 3];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const D: V = [1.5, 1.2];
    const E = lineInt(B, D, A, C);
    return defineProof({
      id: "i-21",
      label: "I.21",
      kind: "theorem",
      title:
        "If from the ends of one of the sides of a triangle two straight lines are constructed meeting within the triangle, then the sum of the straight lines so constructed is less than the sum of the remaining two sides of the triangle, but the constructed straight lines contain a greater angle than the angle contained by the remaining two sides.",
      statement:
        "Inner lines BD, DC are shorter in sum than BA, AC, but contain a greater angle.",
      dependencies: ["p-2", "cn-1", "i-16", "i-20"],
      steps: [
        given(
          "Let BD and CD be constructed from B and C meeting at D inside triangle ABC.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            segment("AB", "A", "B"),
            segment("BC", "B", "C"),
            segment("CA", "C", "A"),
            segment("BD", "B", "D", { color: AMBER }),
            segment("CD", "C", "D", { color: AMBER }),
          ],
        ),
        step("Produce", "Produce BD to meet AC at E.", [
          P("E", E),
          segment("DE", "D", "E", { color: ORANGE, dashed: true }),
        ]),
        step(
          "Sides",
          "BA + AE is greater than BE (I.20). Adding EC, BA + AC is greater than BE + EC.",
          [],
        ),
        step(
          "Again",
          "CE + ED is greater than CD. Adding BD, BE + EC is greater than BD + DC. So BA + AC is greater than BD + DC.",
          [],
        ),
        step(
          "Angles",
          "Angle BDC is exterior to triangle CDE, so it exceeds CED; and CED is exterior to triangle ABE, so it exceeds BAC. Hence BDC exceeds BAC.",
          [
            ...wedge("wA", A, B, C, 0.5, AMBER),
            ...wedge("wE", E, C, D, 0.35, CYAN),
            ...wedge("wD", D, B, C, 0.5, GREEN),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const lens = [1.6, 2.2, 1.8];
    const D: V = [0, 0];
    const F: V = [lens[0], 0];
    const G: V = [lens[0] + lens[1], 0];
    const Hh: V = [lens[0] + lens[1] + lens[2], 0];
    const K = circ2(F, lens[0], G, lens[2], 1);
    return defineProof({
      id: "i-22",
      label: "I.22",
      kind: "theorem",
      title:
        "To construct a triangle out of three straight lines which equal three given straight lines: thus it is necessary that the sum of any two of the straight lines should be greater than the remaining one.",
      statement:
        "A triangle can be built from three lines if any two exceed the third.",
      dependencies: ["p-3", "p-2", "p-1", "def-16", "cn-1", "i-3", "i-20"],
      steps: [
        given(
          "Let A, B and C be three given straight lines, any two of them greater than the third.",
          [
            ...line2("lineA", [0, 3], [lens[0], 3], { color: AMBER }),
            ...line2("lineB", [2.2, 3], [2.2 + lens[1], 3], { color: CYAN }),
            ...line2("lineC", [5.2, 3], [5.2 + lens[2], 3], { color: VIOLET }),
          ],
        ),
        step(
          "Lay off",
          "On a ray from D lay off DF equal to A, FG equal to B and GH equal to C (I.3).",
          [
            P("D", D),
            P("F", F),
            P("G", G),
            P("H", Hh),
            segment("DF", "D", "F", { color: AMBER }),
            segment("FG", "F", "G", { color: CYAN }),
            segment("GH", "G", "H", { color: VIOLET }),
          ],
        ),
        step(
          "Circles",
          "Describe the circle with centre F and radius FD, and the circle with centre G and radius GH.",
          [
            circle("cF", "F", "D", { dashed: true }),
            circle("cG", "G", "H", { dashed: true }),
          ],
        ),
        step(
          "Meet",
          "The circles meet at K, because the sum condition holds. Join KF and KG.",
          [
            P("K", K),
            segment("KF", "K", "F", { color: AMBER }),
            segment("KG", "K", "G", { color: VIOLET }),
          ],
        ),
        step(
          "The triangle",
          "KF equals FD, which equals A; KG equals GH, which equals C; and FG equals B. So KFG is the required triangle.",
          [polygon("tKFG", ["K", "F", "G"], GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const C: V = [0, 0];
    const D: V = [1, 1.8];
    const E: V = [2.6, 0];
    const T: V = [4, 0];
    const A = vadd(C, T);
    const F = vadd(D, T);
    const G = vadd(E, T);
    const Bb: V = [7.8, 0];
    return defineProof({
      id: "i-23",
      label: "I.23",
      kind: "theorem",
      title:
        "To construct a rectilinear angle equal to a given rectilinear angle on a given straight line and at a point on it.",
      statement: "An angle can be copied to a given line at a given point.",
      dependencies: ["p-1", "i-8", "i-22"],
      steps: [
        given(
          "Let DCE be the given angle, and AB the given line with A the given point.",
          [
            P("C", C),
            P("D", D),
            P("E", E),
            segment("CD", "C", "D", { color: AMBER }),
            segment("CE", "C", "E", { color: CYAN }),
            ...wedge("wC", C, E, D, 0.55, AMBER),
            P("A", A),
            P("B", Bb),
            segment("AB", "A", "B"),
          ],
        ),
        step("Join", "Join DE to make the triangle CDE.", [
          segment("DE", "D", "E", { color: VIOLET }),
        ]),
        step(
          "Triangle at A",
          "Construct the triangle AFG with AF equal to CD, AG equal to CE and FG equal to DE (I.22), with AG along AB.",
          [
            P("F", F),
            P("G", G),
            segment("AF", "A", "F", { color: AMBER }),
            segment("AG", "A", "G", { color: CYAN }),
            segment("FG", "F", "G", { color: VIOLET }),
          ],
        ),
        step(
          "Equal angles",
          "Triangles DCE and FAG have three sides equal, so angle FAG equals angle DCE (I.8).",
          [...wedge("wA", A, G, F, 0.55, GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [2.4, 0];
    const C: V = [2 * Math.cos(1.2217), 2 * Math.sin(1.2217)];
    const D: V = [4, 0];
    const E: V = [6.4, 0];
    const F: V = vadd(D, [
      2 * Math.cos(Math.PI / 4),
      2 * Math.sin(Math.PI / 4),
    ]);
    const G: V = vadd(D, [2 * Math.cos(1.2217), 2 * Math.sin(1.2217)]);
    return defineProof({
      id: "i-24",
      label: "I.24",
      kind: "theorem",
      title:
        "If two triangles have two sides equal to two sides respectively, but have one of the angles contained by the equal straight lines greater than the other, then they also have the base greater than the base.",
      statement: "The hinge theorem.",
      dependencies: ["i-3", "i-4", "i-5", "i-19", "i-23", "p-1"],
      steps: [
        given(
          "Let ABC and DEF have AB = DE, AC = DF, and angle BAC greater than angle EDF.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            P("F", F),
            segment("AB", "A", "B", { color: AMBER }),
            segment("AC", "A", "C", { color: CYAN }),
            segment("BC", "B", "C", { color: VIOLET }),
            segment("DE", "D", "E", { color: AMBER }),
            segment("DF", "D", "F", { color: CYAN }),
            segment("EF", "E", "F", { color: VIOLET }),
            ...wedge("wA", A, B, C, 0.5, GREEN),
            ...wedge("wD", D, E, F, 0.5, GREEN),
          ],
        ),
        step(
          "Copy the angle",
          "At D on DE construct angle EDG equal to angle BAC (I.23), and make DG equal to AC. Join EG and FG.",
          [
            P("G", G),
            segment("DG", "D", "G", { color: ORANGE }),
            segment("EG", "E", "G", { color: ORANGE }),
            segment("FG", "F", "G", { color: ORANGE, dashed: true }),
          ],
        ),
        step(
          "Equal base",
          "Triangles ABC and DEG are equal (I.4), so EG equals BC.",
          [
            polygon("tABC", ["A", "B", "C"], CYAN),
            polygon("tDEG", ["D", "E", "G"], CYAN),
          ],
        ),
        step(
          "Isosceles",
          "DF equals DG, so angle DFG equals angle DGF (I.5). Angle DGF is greater than EGF, so DFG is greater than EGF, and so EFG is greater than EGF.",
          [
            ...wedge("wDFG", F, D, G, 0.35, AMBER),
            ...wedge("wDGF", G, D, F, 0.35, AMBER),
          ],
        ),
        step(
          "Conclude",
          "Since EFG is greater than EGF, EG is greater than EF (I.19). EG equals BC, so BC is greater than EF.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [2.4, 0];
    const C: V = [2 * Math.cos(1.2217), 2 * Math.sin(1.2217)];
    const D: V = [4, 0];
    const E: V = [6.4, 0];
    const F: V = vadd(D, [
      2 * Math.cos(Math.PI / 4),
      2 * Math.sin(Math.PI / 4),
    ]);
    return defineProof({
      id: "i-25",
      label: "I.25",
      kind: "theorem",
      title:
        "If two triangles have two sides equal to two sides respectively, but have the base greater than the base, then they also have the one of the angles contained by the equal straight lines greater than the other.",
      statement: "The converse of I.24.",
      dependencies: ["i-4", "i-24"],
      steps: [
        given("Let AB = DE, AC = DF, and BC greater than EF.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          P("E", E),
          P("F", F),
          segment("AB", "A", "B", { color: AMBER }),
          segment("AC", "A", "C", { color: CYAN }),
          segment("BC", "B", "C", { color: VIOLET }),
          segment("DE", "D", "E", { color: AMBER }),
          segment("DF", "D", "F", { color: CYAN }),
          segment("EF", "E", "F", { color: VIOLET }),
        ]),
        step(
          "Not equal",
          "If angle BAC equalled angle EDF, then BC would equal EF (I.4), contrary to the hypothesis.",
          [...wedge("wA", A, B, C, 0.5, GREEN)],
        ),
        step(
          "Not less",
          "If angle BAC were less than angle EDF, then BC would be less than EF (I.24), also contrary to the hypothesis.",
          [...wedge("wD", D, E, F, 0.5, GREEN)],
        ),
        step("Conclude", "Therefore angle BAC is greater than angle EDF.", []),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [2.5, 0];
    const A: V = [0.9, 1.8];
    const T: V = [4, 0];
    const E = vadd(B, T);
    const F = vadd(C, T);
    const D = vadd(A, T);
    const G = vadd(B, vmul(vsub(A, B), 0.7));
    return defineProof({
      id: "i-26",
      label: "I.26",
      kind: "theorem",
      title:
        "If two triangles have two angles equal to two angles respectively, and one side equal to one side, then the remaining sides equal the remaining sides and the remaining angle equals the remaining angle.",
      statement: "ASA and AAS congruence.",
      dependencies: ["cn-3", "i-3", "i-4", "i-16", "p-1", "cn-1"],
      steps: [
        given(
          "Let ABC and DEF have angle B = angle E, angle C = angle F, and BC = EF.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            P("F", F),
            segment("AB", "A", "B"),
            segment("AC", "A", "C"),
            segment("BC", "B", "C", { color: VIOLET }),
            segment("DE", "D", "E"),
            segment("DF", "D", "F"),
            segment("EF", "E", "F", { color: VIOLET }),
            ...wedge("wB", B, C, A, 0.4, AMBER),
            ...wedge("wE", E, F, D, 0.4, AMBER),
            ...wedge("wC", C, A, B, 0.4, CYAN),
            ...wedge("wF", F, D, E, 0.4, CYAN),
          ],
        ),
        step(
          "Suppose",
          "Suppose AB is not equal to DE; let AB be the greater. Cut off BG equal to DE (I.3) and join GC.",
          [P("G", G), segment("GC", "G", "C", { color: ORANGE })],
        ),
        step(
          "Compare",
          "In triangles GBC and DEF, GB = DE, BC = EF and angle GBC = angle DEF, so the triangles are equal (I.4) and angle GCB equals angle DFE.",
          [polygon("tGBC", ["G", "B", "C"], ORANGE)],
        ),
        step(
          "Absurd",
          "But angle DFE equals ACB, so GCB would equal ACB, the less to the greater. Hence AB = DE, the triangles are equal by I.4, and the remaining sides and angle are equal.",
          [
            polygon("tABC", ["A", "B", "C"], GREEN),
            polygon("tDEF", ["D", "E", "F"], GREEN),
          ],
        ),
      ],
    });
  })(),

  // -------------------------------------------------------------------------
  // Propositions I.27 – I.48
  // -------------------------------------------------------------------------
  ...(() => {
    const A: V = [-2, 1];
    const B: V = [3, 1];
    const C: V = [-2, -1];
    const D: V = [3, -1];
    const E: V = [-0.6, 2.5];
    const F: V = [1.4, -2.5];
    const G: V = [0, 1];
    const Hh: V = [0.8, -1];
    const base = (): Primitive[] => [
      P("A", A),
      P("B", B),
      P("C", C),
      P("D", D),
      P("E", E),
      P("F", F),
      P("G", G),
      P("H", Hh),
      segment("AB", "A", "B"),
      segment("CD", "C", "D"),
      segment("EF", "E", "F", { color: SKY }),
    ];
    return [
      defineProof({
        id: "i-27",
        label: "I.27",
        kind: "theorem",
        title:
          "If a straight line falling on two straight lines makes the alternate angles equal to one another, then the straight lines are parallel to one another.",
        statement: "Equal alternate angles imply parallel lines.",
        dependencies: ["def-23", "i-16"],
        steps: [
          given(
            "Let EF fall on AB and CD at G and H, making the alternate angles AGH and GHD equal.",
            [
              ...base(),
              ...wedge("wG", G, A, Hh, 0.5, AMBER),
              ...wedge("wH", Hh, D, G, 0.5, AMBER),
            ],
          ),
          step(
            "Suppose they meet",
            "Suppose AB and CD, produced, meet at K on the side of B and D.",
            [],
          ),
          step(
            "Triangle GHK",
            "Then GHK is a triangle, and its exterior angle AGH is greater than the interior and opposite angle GHK (I.16).",
            [],
          ),
          step(
            "Absurd",
            "But AGH equals GHK by hypothesis, which is absurd. So the lines do not meet on the side of B and D, and likewise not on the side of A and C.",
            [],
          ),
          step(
            "Parallel",
            "Neither way do they meet, so AB and CD are parallel (D.23).",
            [
              ...line2("ext1", [-5, 1], [-2, 1], {
                color: GREEN,
                dashed: true,
              }),
              ...line2("ext2", [-5, -1], [-2, -1], {
                color: GREEN,
                dashed: true,
              }),
              ...line2("ext3", [3, 1], [6, 1], { color: GREEN, dashed: true }),
              ...line2("ext4", [3, -1], [6, -1], {
                color: GREEN,
                dashed: true,
              }),
            ],
          ),
        ],
      }),
      defineProof({
        id: "i-28",
        label: "I.28",
        kind: "theorem",
        title:
          "If a straight line falling on two straight lines makes the exterior angle equal to the interior and opposite angle on the same side, or the sum of the interior angles on the same side equal to two right angles, then the straight lines are parallel to one another.",
        statement:
          "Equal corresponding angles, or supplementary co-interior angles, imply parallels.",
        dependencies: ["cn-1", "i-13", "i-15", "i-27"],
        steps: [
          given(
            "Let EF fall on AB and CD, making the exterior angle EGB equal to the interior and opposite angle GHD.",
            [
              ...base(),
              ...wedge("wEGB", G, E, B, 0.55, AMBER),
              ...wedge("wGHD", Hh, G, D, 0.55, AMBER),
            ],
          ),
          step("Vertical angles", "Angle EGB equals angle AGH (I.15).", [
            ...wedge("wAGH", G, A, Hh, 0.35, CYAN),
          ]),
          step(
            "Alternate",
            "So AGH equals GHD. These are alternate angles, so AB is parallel to CD (I.27).",
            [],
          ),
          step(
            "Second case",
            "Suppose instead that BGH and GHD together equal two right angles. Since AGH and BGH also equal two right angles (I.13), AGH equals GHD, and again the lines are parallel (I.27).",
            [...wedge("wBGH", G, B, Hh, 0.75, VIOLET)],
          ),
        ],
      }),
      defineProof({
        id: "i-29",
        label: "I.29",
        kind: "theorem",
        title:
          "A straight line falling on parallel straight lines makes the alternate angles equal to one another, the exterior angle equal to the interior and opposite angle, and the sum of the interior angles on the same side equal to two right angles.",
        statement:
          "The converse of I.27 and I.28, using the parallel postulate.",
        dependencies: ["p-5", "cn-2", "i-13", "i-15", "i-27"],
        steps: [
          given("Let EF fall on the parallel lines AB and CD.", base()),
          step(
            "Suppose unequal",
            "Suppose angle AGH is not equal to angle GHD; let AGH be the greater.",
            [
              ...wedge("wAGH", G, A, Hh, 0.5, AMBER),
              ...wedge("wGHD", Hh, D, G, 0.5, CYAN),
            ],
          ),
          step(
            "Add",
            "Add BGH to each: AGH + BGH is greater than BGH + GHD. But AGH + BGH equals two right angles (I.13).",
            [...wedge("wBGH", G, B, Hh, 0.75, VIOLET)],
          ),
          step(
            "Meet",
            "So BGH + GHD is less than two right angles, and AB and CD would meet (P.5). But they are parallel — absurd. Hence AGH equals GHD.",
            [],
          ),
          step(
            "The rest",
            "AGH equals EGB (I.15), so EGB equals GHD; adding BGH to each shows BGH + GHD equals two right angles.",
            [...wedge("wEGB", G, E, B, 0.35, GREEN)],
          ),
        ],
      }),
    ];
  })(),
  (() => {
    const A: V = [-3, 1.5];
    const B: V = [4, 1.5];
    const E: V = [-3, 0];
    const F: V = [4, 0];
    const C: V = [-3, -1.5];
    const D: V = [4, -1.5];
    const G: V = [0, 1.5];
    const Hh: V = [0.5, 0];
    const K: V = [1, -1.5];
    return defineProof({
      id: "i-30",
      label: "I.30",
      kind: "theorem",
      title:
        "Straight lines parallel to the same straight line are also parallel to one another.",
      statement: "Parallelism is transitive.",
      dependencies: ["i-27", "i-29"],
      steps: [
        given("Let AB and CD each be parallel to EF.", [
          P("A", A),
          P("B", B),
          P("E", E),
          P("F", F),
          P("C", C),
          P("D", D),
          segment("AB", "A", "B"),
          segment("EF", "E", "F", { color: SKY }),
          segment("CD", "C", "D"),
        ]),
        step(
          "Transversal",
          "Let the straight line GK fall across them, cutting AB, EF, CD at G, H, K.",
          [
            P("G", G),
            P("H", Hh),
            P("K", K),
            segment("GK", "G", "K", { color: ORANGE }),
          ],
        ),
        step(
          "First pair",
          "AB is parallel to EF, so angle AGH equals angle GHF (I.29).",
          [
            ...wedge("wAGH", G, A, Hh, 0.45, AMBER),
            ...wedge("wGHF", Hh, G, F, 0.45, AMBER),
          ],
        ),
        step(
          "Second pair",
          "EF is parallel to CD, so angle GHF equals angle HKD (I.29). Hence AGK equals GKD.",
          [...wedge("wHKD", K, Hh, D, 0.45, AMBER)],
        ),
        step(
          "Parallel",
          "These are alternate angles, so AB is parallel to CD (I.27).",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [3, 0];
    const A: V = [1.2, 1.8];
    const D: V = [2, 0];
    const E: V = [-0.8, 1.8];
    const F: V = [3.2, 1.8];
    return defineProof({
      id: "i-31",
      label: "I.31",
      kind: "theorem",
      title:
        "To draw a straight line through a given point parallel to a given straight line.",
      statement: "A parallel can be drawn through a point.",
      dependencies: ["i-23", "i-27"],
      steps: [
        given("Let A be the given point and BC the given straight line.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("BC", "B", "C"),
        ]),
        step("Join", "Take any point D on BC and join AD.", [
          P("D", D),
          segment("AD", "A", "D", { color: SKY }),
          ...wedge("wADC", D, A, C, 0.45, AMBER),
        ]),
        step(
          "Copy the angle",
          "On DA at A construct angle DAE equal to angle ADC (I.23).",
          [
            P("E", E),
            segment("AE", "A", "E", { color: ORANGE }),
            ...wedge("wDAE", A, D, E, 0.45, AMBER),
          ],
        ),
        step("Produce", "Produce EA to F.", [
          P("F", F),
          segment("AF", "A", "F", { color: ORANGE, dashed: true }),
        ]),
        step(
          "Parallel",
          "AD falls on EF and BC making the alternate angles EAD and ADC equal, so EF is parallel to BC (I.27).",
          [...shape("band", [E, F, [3.2, 0], [-0.8, 0]], GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0.9, 2];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const D: V = [4.5, 0];
    const E = vadd(C, vmul(vsub(A, B), 0.8));
    return defineProof({
      id: "i-32",
      label: "I.32",
      kind: "theorem",
      title:
        "In any triangle, if one of the sides is produced, then the exterior angle equals the sum of the two interior and opposite angles, and the sum of the three interior angles of the triangle equals two right angles.",
      statement: "The angle sum of a triangle is two right angles.",
      dependencies: ["cn-2", "i-13", "i-29", "i-31"],
      steps: [
        given("Let ABC be a triangle and produce BC to D.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
          segment("CD", "C", "D", { dashed: true }),
        ]),
        step("Parallel", "Draw CE through C parallel to AB (I.31).", [
          P("E", E),
          segment("CE", "C", "E", { color: ORANGE }),
        ]),
        step(
          "Alternate",
          "AB is parallel to CE, so angle BAC equals angle ACE (I.29).",
          [
            ...wedge("wBAC", A, B, C, 0.45, AMBER),
            ...wedge("wACE", C, A, E, 0.45, AMBER),
          ],
        ),
        step(
          "Corresponding",
          "Likewise the exterior angle ECD equals the interior and opposite angle ABC (I.29).",
          [
            ...wedge("wABC", B, A, C, 0.45, CYAN),
            ...wedge("wECD", C, E, D, 0.45, CYAN),
          ],
        ),
        step(
          "Exterior angle",
          "So the whole exterior angle ACD equals BAC + ABC.",
          [],
        ),
        step(
          "Angle sum",
          "Add ACB to each: ACD + ACB equals BAC + ABC + ACB. But ACD + ACB equals two right angles (I.13), so the three angles of the triangle equal two right angles.",
          [...wedge("wACB", C, B, A, 0.7, VIOLET)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 2];
    const B: V = [2.5, 2];
    const C: V = [0.8, 0];
    const D: V = [3.3, 0];
    return defineProof({
      id: "i-33",
      label: "I.33",
      kind: "theorem",
      title:
        "Straight lines which join the ends of equal and parallel straight lines in the same directions are themselves equal and parallel.",
      statement:
        "Joining the ends of equal parallel segments gives equal parallel segments.",
      dependencies: ["i-4", "i-27", "i-29"],
      steps: [
        given("Let AB and CD be equal and parallel, and join AC and BD.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          segment("AB", "A", "B", { color: AMBER }),
          segment("CD", "C", "D", { color: AMBER }),
          segment("AC", "A", "C", { color: CYAN }),
          segment("BD", "B", "D", { color: CYAN }),
        ]),
        step("Join BC", "Join BC.", [
          segment("BC", "B", "C", { color: ORANGE }),
        ]),
        step(
          "Alternate",
          "AB is parallel to CD, so angle ABC equals angle BCD (I.29).",
          [
            ...wedge("wABC", B, A, C, 0.45, AMBER),
            ...wedge("wBCD", C, B, D, 0.45, AMBER),
          ],
        ),
        step(
          "Triangles",
          "In triangles ABC and DCB, AB = DC, BC is common, and the angles at B and C are equal. By I.4, AC equals BD and angle ACB equals angle DBC.",
          [
            polygon("tABC", ["A", "B", "C"], VIOLET),
            polygon("tDCB", ["D", "C", "B"], SKY),
          ],
        ),
        step(
          "Parallel",
          "Angles ACB and DBC are alternate and equal, so AC is parallel to BD (I.27).",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 2];
    const B: V = [2.5, 2];
    const C: V = [0.8, 0];
    const D: V = [3.3, 0];
    return defineProof({
      id: "i-34",
      label: "I.34",
      kind: "theorem",
      title:
        "In parallelogrammic areas the opposite sides and angles equal one another, and the diameter bisects the areas.",
      statement: "Properties of a parallelogram.",
      dependencies: ["i-4", "i-26", "i-29"],
      steps: [
        given("Let ACDB be a parallelogram with diameter BC.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          segment("AB", "A", "B"),
          segment("BD", "B", "D"),
          segment("DC", "D", "C"),
          segment("CA", "C", "A"),
          segment("BC", "B", "C", { color: ORANGE }),
        ]),
        step(
          "Alternate angles",
          "AB is parallel to CD, so angle ABC equals BCD; AC is parallel to BD, so angle ACB equals CBD (I.29).",
          [
            ...wedge("wABC", B, A, C, 0.4, AMBER),
            ...wedge("wBCD", C, B, D, 0.4, AMBER),
            ...wedge("wACB", C, A, B, 0.55, CYAN),
            ...wedge("wCBD", B, C, D, 0.55, CYAN),
          ],
        ),
        step(
          "Equal triangles",
          "Triangles ABC and DCB have two angles equal and the side BC common, so they are equal (I.26).",
          [
            polygon("tABC", ["A", "B", "C"], VIOLET),
            polygon("tDCB", ["D", "C", "B"], SKY),
          ],
        ),
        step(
          "Conclusion",
          "Hence AB equals CD, AC equals BD, angle A equals angle D, and the whole angles at B and C are equal. The diameter BC bisects the parallelogram.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [3, 0];
    const A: V = [0.2, 2];
    const D: V = [3.2, 2];
    const E: V = [4, 2];
    const F: V = [7, 2];
    const G = lineInt(D, C, E, B);
    return defineProof({
      id: "i-35",
      label: "I.35",
      kind: "theorem",
      title:
        "Parallelograms which are on the same base and in the same parallels equal one another.",
      statement:
        "Parallelograms on one base between the same parallels are equal.",
      dependencies: ["cn-2", "cn-3", "i-4", "i-34"],
      steps: [
        given(
          "Let ABCD and EBCF be parallelograms on the same base BC and between the same parallels BC and AF.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            P("F", F),
            polygon("pABCD", ["A", "B", "C", "D"], CYAN),
          ],
        ),
        step(
          "Second",
          "The parallelogram EBCF stands on BC between the same parallels.",
          [polygon("pEBCF", ["E", "B", "C", "F"], VIOLET)],
        ),
        step(
          "Equal parts",
          "AD and EF each equal BC (I.34), so AD equals EF. Add DE to each: AE equals DF.",
          [
            ...line2("topAE", A, E, { color: AMBER }),
            ...line2("topDF", D, F, { color: AMBER }),
          ],
        ),
        step(
          "Triangles",
          "AB equals DC, AE equals DF, and angle EAB equals angle FDC. So triangle EAB equals triangle FDC (I.4).",
          [
            polygon("tEAB", ["E", "A", "B"], GREEN),
            polygon("tFDC", ["F", "D", "C"], GREEN),
          ],
        ),
        step(
          "Subtract",
          "Subtract the common triangle DGE from each. The trapezia ABGD and EGCF are equal.",
          [P("G", G), polygon("tDGE", ["D", "G", "E"], ORANGE)],
        ),
        step(
          "Add",
          "Add the triangle GBC to each. Then the parallelogram ABCD equals the parallelogram EBCF.",
          [polygon("tGBC", ["G", "B", "C"], AMBER)],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [2.4, 0];
    const A: V = [0.7, 1.8];
    const D: V = [3.1, 1.8];
    const F: V = [3.4, 0];
    const G: V = [5.8, 0];
    const E: V = [4.1, 1.8];
    const Hh: V = [6.5, 1.8];
    return defineProof({
      id: "i-36",
      label: "I.36",
      kind: "theorem",
      title:
        "Parallelograms which are on equal bases and in the same parallels equal one another.",
      statement:
        "Parallelograms on equal bases between the same parallels are equal.",
      dependencies: ["cn-1", "i-33", "i-34", "i-35"],
      steps: [
        given(
          "Let ABCD and EFGH be parallelograms on equal bases BC and FG between the same parallels.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            P("F", F),
            P("G", G),
            P("H", Hh),
            polygon("pABCD", ["A", "B", "C", "D"], CYAN),
            polygon("pEFGH", ["E", "F", "G", "H"], VIOLET),
          ],
        ),
        step("Join", "Join BE and CH.", [
          segment("BE", "B", "E", { color: ORANGE }),
          segment("CH", "C", "H", { color: ORANGE }),
        ]),
        step(
          "A parallelogram",
          "BC equals FG, which equals EH, and they are parallel. So BE and CH, which join their ends, are equal and parallel (I.33), and EBCH is a parallelogram.",
          [polygon("pEBCH", ["B", "C", "H", "E"], GREEN)],
        ),
        step(
          "Equal",
          "EBCH equals ABCD (same base BC, I.35), and EBCH equals EFGH (same base EH, I.35). So ABCD equals EFGH (CN.1).",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0.8, 1.8];
    const D: V = [2.6, 1.8];
    const B: V = [0, 0];
    const C: V = [3, 0];
    const E = lineInt(B, vadd(B, vsub(A, C)), A, D);
    const F = lineInt(C, vadd(C, vsub(D, B)), A, D);
    return defineProof({
      id: "i-37",
      label: "I.37",
      kind: "theorem",
      title:
        "Triangles which are on the same base and in the same parallels equal one another.",
      statement: "Triangles on one base between the same parallels are equal.",
      dependencies: ["i-31", "i-34", "i-35"],
      steps: [
        given(
          "Let ABC and DBC be triangles on the same base BC and between the same parallels BC and AD.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            segment("BC", "B", "C"),
            segment("AD", "A", "D"),
            polygon("tABC", ["A", "B", "C"], CYAN),
            polygon("tDBC", ["D", "B", "C"], VIOLET),
          ],
        ),
        step(
          "Parallels",
          "Through B draw BE parallel to CA, and through C draw CF parallel to BD (I.31).",
          [
            P("E", E),
            P("F", F),
            segment("BE", "B", "E", { color: ORANGE }),
            segment("CF", "C", "F", { color: ORANGE }),
            segment("EA", "E", "A", { color: ORANGE, dashed: true }),
            segment("DF", "D", "F", { color: ORANGE, dashed: true }),
          ],
        ),
        step(
          "Parallelograms",
          "EBCA and DBCF are parallelograms on the same base BC and between the same parallels, so they are equal (I.35).",
          [
            polygon("pEBCA", ["E", "B", "C", "A"], AMBER),
            polygon("pDBCF", ["D", "B", "C", "F"], GREEN),
          ],
        ),
        step(
          "Halves",
          "Triangle ABC is half of EBCA, and DBC is half of DBCF (I.34). Halves of equals are equal, so ABC equals DBC.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [2.4, 0];
    const E: V = [3.4, 0];
    const F: V = [5.8, 0];
    const A: V = [0.9, 1.8];
    const D: V = [4.8, 1.8];
    const G = lineInt(B, vadd(B, vsub(A, C)), A, D);
    const Hh = lineInt(F, vadd(F, vsub(D, E)), A, D);
    return defineProof({
      id: "i-38",
      label: "I.38",
      kind: "theorem",
      title:
        "Triangles which are on equal bases and in the same parallels equal one another.",
      statement:
        "Triangles on equal bases between the same parallels are equal.",
      dependencies: ["i-31", "i-34", "i-36"],
      steps: [
        given(
          "Let ABC and DEF be triangles on equal bases BC and EF between the same parallels BF and AD.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            P("F", F),
            polygon("tABC", ["A", "B", "C"], CYAN),
            polygon("tDEF", ["D", "E", "F"], VIOLET),
          ],
        ),
        step(
          "Parallels",
          "Through B draw BG parallel to CA, and through F draw FH parallel to ED (I.31).",
          [
            P("G", G),
            P("H", Hh),
            segment("BG", "B", "G", { color: ORANGE }),
            segment("FH", "F", "H", { color: ORANGE }),
            segment("GD", "G", "D", { color: ORANGE, dashed: true }),
            segment("DH", "D", "H", { color: ORANGE, dashed: true }),
          ],
        ),
        step(
          "Parallelograms",
          "GBCA and DEFH are parallelograms on equal bases between the same parallels, so they are equal (I.36).",
          [
            polygon("pGBCA", ["G", "B", "C", "A"], AMBER),
            polygon("pDEFH", ["D", "E", "F", "H"], GREEN),
          ],
        ),
        step(
          "Halves",
          "ABC is half of GBCA, and DEF is half of DEFH (I.34). Hence ABC equals DEF.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [3, 0];
    const A: V = [0.8, 1.8];
    const D: V = [2.4, 1.3];
    const E = lineInt(B, D, A, vadd(A, [1, 0]));
    return defineProof({
      id: "i-39",
      label: "I.39",
      kind: "theorem",
      title:
        "Equal triangles which are on the same base and on the same side are also in the same parallels.",
      statement:
        "Equal triangles on one base and one side lie between the same parallels.",
      dependencies: ["cn-5", "i-31", "i-37"],
      steps: [
        given(
          "Let ABC and DBC be equal triangles on the same base BC and the same side.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            segment("BC", "B", "C"),
            segment("AD", "A", "D", { dashed: true }),
            polygon("tABC", ["A", "B", "C"], CYAN),
            polygon("tDBC", ["D", "B", "C"], VIOLET),
          ],
        ),
        step(
          "Suppose not",
          "Suppose AD is not parallel to BC. Draw AE through A parallel to BC (I.31), meeting BD at E, and join EC.",
          [
            P("E", E),
            segment("AE", "A", "E", { color: ORANGE }),
            segment("EC", "E", "C", { color: ORANGE }),
            polygon("tEBC", ["E", "B", "C"], AMBER),
          ],
        ),
        step(
          "Equal",
          "Triangles ABC and EBC are on the same base between the same parallels, so they are equal (I.37).",
          [],
        ),
        step(
          "Absurd",
          "But ABC equals DBC, so DBC equals EBC — the less equals the greater (CN.5), which is absurd. Hence AD is parallel to BC.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [2.4, 0];
    const E: V = [3.4, 0];
    const F: V = [5.8, 0];
    const A: V = [0.9, 1.8];
    const D: V = [4.5, 1.3];
    const G = vadd(E, vmul(vsub(D, E), 1.8 / 1.3));
    return defineProof({
      id: "i-40",
      label: "I.40",
      kind: "theorem",
      title:
        "Equal triangles which are on equal bases and on the same side are also in the same parallels.",
      statement:
        "Equal triangles on equal bases and one side lie between the same parallels.",
      dependencies: ["cn-5", "i-31", "i-38"],
      steps: [
        given(
          "Let ABC and DEF be equal triangles on equal bases BC and EF, on the same side.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            P("F", F),
            segment("BF", "B", "F"),
            segment("AD", "A", "D", { dashed: true }),
            polygon("tABC", ["A", "B", "C"], CYAN),
            polygon("tDEF", ["D", "E", "F"], VIOLET),
          ],
        ),
        step(
          "Suppose not",
          "Suppose AD is not parallel to BF. Draw AG through A parallel to BF (I.31), meeting ED produced at G, and join GF.",
          [
            P("G", G),
            segment("DG", "D", "G", { color: ORANGE, dashed: true }),
            segment("AG", "A", "G", { color: ORANGE }),
            segment("GF", "G", "F", { color: ORANGE }),
            polygon("tGEF", ["G", "E", "F"], AMBER),
          ],
        ),
        step(
          "Equal",
          "ABC equals GEF (I.38), since they are on equal bases between the same parallels.",
          [],
        ),
        step(
          "Absurd",
          "But ABC equals DEF, so DEF equals GEF, the less to the greater, which is absurd. Hence AD is parallel to BF.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [3, 0];
    const A: V = [0.8, 1.8];
    const D: V = [3.8, 1.8];
    const E: V = [1.9, 1.8];
    return defineProof({
      id: "i-41",
      label: "I.41",
      kind: "theorem",
      title:
        "If a parallelogram has the same base with a triangle and is in the same parallels, then the parallelogram is double the triangle.",
      statement:
        "A parallelogram is twice a triangle on the same base between the same parallels.",
      dependencies: ["i-34", "i-37"],
      steps: [
        given(
          "Let ABCD be a parallelogram and EBC a triangle on the same base BC and between the same parallels BC and AE.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("E", E),
            polygon("pABCD", ["A", "B", "C", "D"], CYAN),
            polygon("tEBC", ["E", "B", "C"], VIOLET),
          ],
        ),
        step("Join", "Join AC.", [segment("AC", "A", "C", { color: ORANGE })]),
        step(
          "Equal triangles",
          "Triangle ABC equals triangle EBC, since they are on the same base BC between the same parallels (I.37).",
          [polygon("tABC", ["A", "B", "C"], AMBER)],
        ),
        step(
          "Double",
          "The diameter AC bisects the parallelogram, so ABCD is double ABC (I.34). Hence ABCD is double EBC.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const B: V = [0, 0];
    const C: V = [3, 0];
    const A: V = [1, 2];
    const E: V = [1.5, 0];
    const th = 0.9599;
    const dir: V = [Math.cos(th), Math.sin(th)];
    const t = 2 / Math.sin(th);
    const F = vadd(E, vmul(dir, t));
    const G = vadd(C, vmul(dir, t));
    const Dv: V = [-4, 0];
    return defineProof({
      id: "i-42",
      label: "I.42",
      kind: "theorem",
      title:
        "To construct a parallelogram equal to a given triangle in a given rectilinear angle.",
      statement:
        "A triangle can be turned into an equal parallelogram with a prescribed angle.",
      dependencies: ["i-10", "i-23", "i-31", "i-38", "i-41"],
      steps: [
        given("Let ABC be the given triangle and D the given angle.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("BC", "B", "C"),
          segment("CA", "C", "A"),
          P("D", Dv),
          ...line2("armD1", Dv, vadd(Dv, [1.6, 0]), { color: SKY }),
          ...line2("armD2", Dv, vadd(Dv, vmul(dir, 1.6)), { color: SKY }),
          ...wedge(
            "wD",
            Dv,
            vadd(Dv, [1.6, 0]),
            vadd(Dv, vmul(dir, 1.6)),
            0.5,
            AMBER,
          ),
        ]),
        step("Bisect", "Bisect BC at E (I.10) and join AE.", [
          P("E", E),
          segment("AE", "A", "E", { color: ORANGE }),
        ]),
        step(
          "Angle at E",
          "At E on EC construct angle CEF equal to D (I.23).",
          [
            P("F", F),
            segment("EF", "E", "F", { color: ORANGE }),
            ...wedge("wCEF", E, C, F, 0.5, AMBER),
          ],
        ),
        step(
          "Parallels",
          "Through A draw AG parallel to EC (I.31), and through C draw CG parallel to EF.",
          [
            P("G", G),
            segment("FG", "F", "G", { color: ORANGE, dashed: true }),
            segment("CG", "C", "G", { color: ORANGE }),
          ],
        ),
        step("Parallelogram", "FECG is a parallelogram.", [
          polygon("pFECG", ["F", "E", "C", "G"], GREEN),
        ]),
        step(
          "Equal",
          "Triangles ABE and AEC are equal (I.38), so ABC is double AEC. FECG is also double AEC (I.41). Hence FECG equals ABC, and has the angle CEF equal to D.",
          [polygon("tAEC", ["A", "E", "C"], CYAN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3.2, 0];
    const C: V = [4.2, 2];
    const D: V = [1, 2];
    const K = lerp(A, C, 0.4);
    const E = lineInt(K, vadd(K, [1, 2]), A, B);
    const Hh = lineInt(K, vadd(K, [1, 2]), D, C);
    const F = lineInt(K, vadd(K, [1, 0]), A, D);
    const G = lineInt(K, vadd(K, [1, 0]), B, C);
    return defineProof({
      id: "i-43",
      label: "I.43",
      kind: "theorem",
      title:
        "In any parallelogram the complements of the parallelograms about the diameter equal one another.",
      statement:
        "The two complements of a parallelogram about its diagonal are equal.",
      dependencies: ["cn-3", "i-34"],
      steps: [
        given(
          "Let ABCD be a parallelogram with diameter AC, and let K be a point on AC.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            P("D", D),
            P("K", K),
            polygon("pABCD", ["A", "B", "C", "D"], SKY),
            segment("AC", "A", "C", { color: ORANGE }),
          ],
        ),
        step(
          "Parallels",
          "Through K draw EH parallel to AD and FG parallel to AB.",
          [
            P("E", E),
            P("H", Hh),
            P("F", F),
            P("G", G),
            segment("EH", "E", "H", { color: ORANGE }),
            segment("FG", "F", "G", { color: ORANGE }),
          ],
        ),
        step(
          "Whole triangles",
          "The diameter bisects ABCD, so triangle ABC equals triangle ADC (I.34).",
          [polygon("tABC", ["A", "B", "C"], CYAN)],
        ),
        step(
          "About the diameter",
          "AEKF and KGCH are the parallelograms about the diameter; AEK equals AFK, and KHC equals KGC (I.34).",
          [
            polygon("pAEKF", ["A", "E", "K", "F"], VIOLET),
            polygon("pKGCH", ["K", "G", "C", "H"], VIOLET),
          ],
        ),
        step(
          "Subtract",
          "Taking away AEK and KGC from ABC, and AFK and KHC from ADC, the remainders are equal: the complement EBGK equals the complement KHDF.",
          [
            polygon("cEBGK", ["E", "B", "G", "K"], GREEN),
            polygon("cKHDF", ["K", "H", "D", "F"], GREEN),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3, 0];
    const Ed: V = [-3, 0];
    const area0 = 1.6;
    const be = 2;
    const bg = area0 / (be * Math.sin(Math.PI / 3));
    const dirB: V = [Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)];
    const E = vadd(B, [be, 0]);
    const G = vadd(B, vmul(dirB, bg));
    const F = vadd(E, vmul(dirB, bg));
    const Hh = lineInt(A, vadd(A, dirB), F, G);
    const K = lineInt(Hh, B, F, E);
    const L = lineInt(Hh, A, K, vadd(K, [1, 0]));
    const M = lineInt(G, B, K, vadd(K, [1, 0]));
    const Dv: V = [-6, -1];
    const T: V[] = [
      [-6, 2],
      [-4, 2],
      [-5.2, 3.6],
    ];
    return defineProof({
      id: "i-44",
      label: "I.44",
      kind: "theorem",
      title:
        "To a given straight line in a given rectilinear angle, to apply a parallelogram equal to a given triangle.",
      statement:
        "A parallelogram equal to a triangle can be applied to a given line.",
      dependencies: ["p-5", "i-15", "i-29", "i-31", "i-42", "i-43"],
      steps: [
        given(
          "Let AB be the given line, C the given triangle and D the given angle.",
          [
            P("A", A),
            P("B", B),
            segment("AB", "A", "B"),
            ...shape("triC", T, CYAN),
            P("D", Dv),
            ...line2("armD1", Dv, vadd(Dv, [1.6, 0]), { color: SKY }),
            ...line2("armD2", Dv, vadd(Dv, vmul(dirB, 1.6)), { color: SKY }),
            ...wedge(
              "wD",
              Dv,
              vadd(Dv, [1.6, 0]),
              vadd(Dv, vmul(dirB, 1.6)),
              0.5,
              AMBER,
            ),
          ],
        ),
        step(
          "Equal parallelogram",
          "Construct the parallelogram BEFG equal to C with angle EBG equal to D (I.42), placed so that BE lies in line with AB.",
          [
            P("E", E),
            P("F", F),
            P("G", G),
            polygon("pBEFG", ["B", "E", "F", "G"], CYAN),
            segment("BE", "B", "E", { dashed: true }),
          ],
        ),
        step(
          "Parallel to BG",
          "Produce FG to H, and through A draw AH parallel to BG or EF (I.31). Join HB.",
          [
            P("H", Hh),
            segment("HG", "H", "G", { dashed: true }),
            segment("AH", "A", "H", { color: ORANGE }),
            segment("HB", "H", "B", { color: ORANGE }),
          ],
        ),
        step(
          "Meet at K",
          "HF falls on the parallels AH and EF, so AHF and HFE equal two right angles. Hence BHF and HFE are less than two right angles, and HB, FE produced meet at K (P.5).",
          [
            P("K", K),
            segment("BK", "B", "K", { color: ORANGE, dashed: true }),
            segment("EK", "E", "K", { color: ORANGE, dashed: true }),
          ],
        ),
        step(
          "Complete",
          "Through K draw KL parallel to EA, and produce HA and GB to L and M. Then HLKF is a parallelogram with diameter HK.",
          [
            P("L", L),
            P("M", M),
            segment("KL", "K", "L", { color: ORANGE }),
            segment("LA", "L", "A", { dashed: true }),
            segment("BM", "B", "M", { dashed: true }),
            polygon("pHLKF", ["H", "L", "K", "F"], SKY),
          ],
        ),
        step(
          "Complements",
          "AG and ME are the parallelograms about the diameter HK, and LB and BF are the complements. So LB equals BF (I.43).",
          [
            polygon("cBF", ["B", "E", "F", "G"], VIOLET),
            polygon("cLB", ["L", "A", "B", "M"], GREEN),
          ],
        ),
        step(
          "Applied",
          "BF equals C, so LB equals C. And angle ABM equals angle GBE (I.15), which equals D. So LB is the parallelogram applied to AB, equal to C, in the angle D.",
          [...wedge("wABM", B, A, M, 0.5, AMBER)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3, 0];
    const C: V = [3.4, 1.8];
    const D: V = [0.6, 2.2];
    const th = Math.PI / 3;
    const dirE: V = [Math.cos(th), Math.sin(th)];
    const t1 = area([A, B, D]);
    const t2 = area([D, B, C]);
    const KH = 2;
    const s1 = t1 / (KH * Math.sin(th));
    const K: V = [6, 0];
    const Hh: V = [8, 0];
    const F = vadd(K, vmul(dirE, s1));
    const G = vadd(Hh, vmul(dirE, s1));
    const w2 = t2 / (s1 * Math.sin(th));
    const M = vadd(Hh, [w2, 0]);
    const N = vadd(G, [w2, 0]);
    const Ev: V = [-4, 0];
    return defineProof({
      id: "i-45",
      label: "I.45",
      kind: "theorem",
      title:
        "To construct a parallelogram equal to a given rectilinear figure in a given rectilinear angle.",
      statement:
        "Any rectilinear figure can be turned into an equal parallelogram.",
      dependencies: [
        "p-1",
        "i-14",
        "i-29",
        "i-30",
        "i-33",
        "i-34",
        "i-42",
        "i-44",
      ],
      steps: [
        given("Let ABCD be the given figure and E the given angle.", [
          P("A", A),
          P("B", B),
          P("C", C),
          P("D", D),
          polygon("fig", ["A", "B", "C", "D"], SKY),
          P("E", Ev),
          ...line2("armE1", Ev, vadd(Ev, [1.6, 0]), { color: SKY }),
          ...line2("armE2", Ev, vadd(Ev, vmul(dirE, 1.6)), { color: SKY }),
          ...wedge(
            "wE",
            Ev,
            vadd(Ev, [1.6, 0]),
            vadd(Ev, vmul(dirE, 1.6)),
            0.5,
            AMBER,
          ),
        ]),
        step(
          "Split",
          "Join DB, dividing ABCD into the triangles ADB and DBC.",
          [
            segment("DB", "D", "B", { color: ORANGE }),
            polygon("tADB", ["A", "D", "B"], CYAN),
            polygon("tDBC", ["D", "B", "C"], VIOLET),
          ],
        ),
        step(
          "First",
          "Construct the parallelogram KFGH equal to triangle ADB, with angle HKF equal to E (I.42).",
          [
            P("K", K),
            P("H", Hh),
            P("G", G),
            P("F", F),
            polygon("pKHGF", ["K", "H", "G", "F"], CYAN),
          ],
        ),
        step(
          "Second",
          "Apply to the straight line GH the parallelogram HM equal to triangle DBC, in angle GHM equal to E (I.44).",
          [
            P("M", M),
            P("N", N),
            polygon("pHMNG", ["H", "M", "N", "G"], VIOLET),
          ],
        ),
        step(
          "In line",
          "Angles HKF and GHM each equal E, and angle HKF + KHG equals two right angles, so KH and HM are in a straight line, as are FG and GN (I.14, I.29, I.30).",
          [
            ...wedge("wK", K, Hh, F, 0.45, AMBER),
            ...wedge("wH", Hh, M, G, 0.45, AMBER),
          ],
        ),
        step(
          "Whole",
          "KFNM is a parallelogram (I.33, I.34). It equals ADB + DBC, which is the whole figure ABCD, and has the angle at K equal to E.",
          [polygon("pKMNF", ["K", "M", "N", "F"], GREEN)],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3, 0];
    const C: V = [0, 4.2];
    const D: V = [0, 3];
    const E: V = [3, 3];
    return defineProof({
      id: "i-46",
      label: "I.46",
      kind: "theorem",
      title: "To describe a square on a given straight line.",
      statement: "A square can be constructed on any given line.",
      dependencies: ["i-3", "i-11", "i-29", "i-31", "i-34"],
      steps: [
        given("Let AB be the given straight line.", [
          P("A", A),
          P("B", B),
          segment("AB", "A", "B"),
        ]),
        step("Perpendicular", "Draw AC at right angles to AB from A (I.11).", [
          P("C", C),
          segment("AC", "A", "C", { color: ORANGE }),
          ...shape(
            "sqA",
            [
              [0, 0],
              [0.3, 0],
              [0.3, 0.3],
              [0, 0.3],
            ],
            ORANGE,
          ),
        ]),
        step("Cut off", "Make AD equal to AB (I.3).", [
          P("D", D),
          circle("cA", "A", "B", { dashed: true }),
        ]),
        step(
          "Parallels",
          "Through D draw DE parallel to AB, and through B draw BE parallel to AD (I.31).",
          [
            P("E", E),
            segment("DE", "D", "E", { color: ORANGE }),
            segment("BE", "B", "E", { color: ORANGE }),
          ],
        ),
        step(
          "Parallelogram",
          "ADEB is a parallelogram, so AB equals DE and AD equals BE (I.34). AB equals AD, so all four sides are equal.",
          [polygon("pADEB", ["A", "B", "E", "D"], SKY)],
        ),
        step(
          "Right-angled",
          "Angle DAB is right, and AD falls on the parallels AB and DE, so angle ADE is also right (I.29). Likewise the angles at B and E are right. ADEB is equilateral and right-angled: a square.",
          [
            ...shape(
              "sqB",
              [
                [3, 0],
                [2.7, 0],
                [2.7, 0.3],
                [3, 0.3],
              ],
              GREEN,
            ),
            ...shape(
              "sqD",
              [
                [0, 3],
                [0.3, 3],
                [0.3, 2.7],
                [0, 2.7],
              ],
              GREEN,
            ),
            ...shape(
              "sqE",
              [
                [3, 3],
                [2.7, 3],
                [2.7, 2.7],
                [3, 2.7],
              ],
              GREEN,
            ),
          ],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const B: V = [3, 0];
    const C: V = [0, 4];
    const D = vadd(B, [4, 3]);
    const E = vadd(C, [4, 3]);
    const F = vadd(B, [0, -3]);
    const G = vadd(A, [0, -3]);
    const K = vadd(C, [-4, 0]);
    const Hh = vadd(A, [-4, 0]);
    const L = lineInt(A, vadd(A, [4, 3]), D, E);
    const M = lineInt(A, L, B, C);
    return defineProof({
      id: "i-47",
      label: "I.47",
      kind: "theorem",
      title:
        "In right-angled triangles the square on the side opposite the right angle equals the sum of the squares on the sides containing the right angle.",
      statement: "The Pythagorean theorem.",
      dependencies: ["cn-2", "i-4", "i-14", "i-31", "i-41", "i-46"],
      steps: [
        given("Let ABC be a right-angled triangle with the right angle at A.", [
          P("A", A),
          P("B", B),
          P("C", C),
          segment("AB", "A", "B"),
          segment("BC", "B", "C", { color: AMBER }),
          segment("CA", "C", "A"),
          ...wedge("wA", A, B, C, 0.4, ORANGE),
        ]),
        step(
          "Squares",
          "Describe the squares BDEC on BC, GB on AB, and HC on AC (I.46).",
          [
            P("D", D),
            P("E", E),
            P("F", F),
            P("G", G),
            P("K", K),
            P("H", Hh),
            polygon("sBC", ["B", "D", "E", "C"], AMBER),
            polygon("sAB", ["A", "B", "F", "G"], CYAN),
            polygon("sAC", ["A", "C", "K", "H"], VIOLET),
          ],
        ),
        step(
          "Perpendicular",
          "Through A draw AL parallel to BD or CE, meeting BC at M and DE at L. Join AD and FC.",
          [
            P("L", L),
            P("M", M),
            segment("AL", "A", "L", { color: ORANGE }),
            segment("AD", "A", "D", { color: ORANGE, dashed: true }),
            segment("FC", "F", "C", { color: ORANGE, dashed: true }),
          ],
        ),
        step(
          "Equal triangles",
          "Angles DBC and FBA are both right, so adding ABC, angle ABD equals angle FBC. With AB = FB and BD = BC, triangles ABD and FBC are equal (I.4).",
          [
            polygon("tABD", ["A", "B", "D"], GREEN),
            polygon("tFBC", ["F", "B", "C"], GREEN),
          ],
        ),
        step(
          "Double",
          "Parallelogram BL is double triangle ABD (I.41), and the square GB is double triangle FBC. Hence the rectangle BL equals the square GB.",
          [polygon("rBL", ["B", "D", "L", "M"], SKY)],
        ),
        step(
          "Other side",
          "In the same way, joining AE and BK, the rectangle CL equals the square HC.",
          [
            segment("AE", "A", "E", { color: ORANGE, dashed: true }),
            segment("BK", "B", "K", { color: ORANGE, dashed: true }),
            polygon("rCL", ["M", "L", "E", "C"], SKY),
          ],
        ),
        step(
          "Conclusion",
          "The whole square BDEC equals the two squares GB and HC. So the square on BC equals the sum of the squares on BA and AC.",
          [],
        ),
      ],
    });
  })(),
  (() => {
    const A: V = [0, 0];
    const C: V = [4, 0];
    const B: V = [0, 3];
    const D: V = [0, -3];
    return defineProof({
      id: "i-48",
      label: "I.48",
      kind: "theorem",
      title:
        "If in a triangle the square on one of the sides equals the sum of the squares on the remaining two sides of the triangle, then the angle contained by the remaining two sides of the triangle is right.",
      statement: "The converse of the Pythagorean theorem.",
      dependencies: ["i-3", "i-8", "i-11", "i-47"],
      steps: [
        given(
          "Let ABC be a triangle in which the square on BC equals the sum of the squares on BA and AC.",
          [
            P("A", A),
            P("B", B),
            P("C", C),
            segment("AB", "A", "B", { color: AMBER }),
            segment("AC", "A", "C", { color: CYAN }),
            segment("BC", "B", "C", { color: VIOLET }),
          ],
        ),
        step(
          "Perpendicular",
          "Draw AD at right angles to AC from A (I.11), and make AD equal to AB (I.3). Join DC.",
          [
            P("D", D),
            segment("AD", "A", "D", { color: AMBER, dashed: true }),
            segment("DC", "D", "C", { color: VIOLET, dashed: true }),
            ...wedge("wDAC", A, C, D, 0.35, ORANGE),
          ],
        ),
        step(
          "Square on DC",
          "DAC is a right angle, so the square on DC equals the squares on DA and AC (I.47). DA equals AB, so it equals the squares on BA and AC.",
          [],
        ),
        step(
          "DC equals BC",
          "That is also the square on BC, so DC equals BC.",
          [],
        ),
        step(
          "Triangles",
          "Triangles DAC and BAC have DA = BA, AC common and DC = BC. So angle DAC equals angle BAC (I.8).",
          [
            polygon("tDAC", ["D", "A", "C"], CYAN),
            polygon("tBAC", ["B", "A", "C"], VIOLET),
          ],
        ),
        step("Right angle", "DAC is right, so BAC is also a right angle.", [
          ...wedge("wBAC", A, C, B, 0.35, GREEN),
        ]),
      ],
    });
  })(),
];
