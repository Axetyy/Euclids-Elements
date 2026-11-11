import {
  AMBER,
  CYAN,
  GREEN,
  ORANGE,
  SKY,
  given,
  line2,
  shape,
  step,
  wedge,
} from "../math/v";
import { circle, defineProof, point, polygon, segment } from "./builders";
import type { Proof } from "./types";

export const proofs2: Proof[] = [
  // -------------------------------------------------------------------------
  // Definitions II.1 – II.2
  // -------------------------------------------------------------------------
  defineProof({
    id: "ii-def-1",
    label: "II.D.1",
    kind: "definition",
    title: "Rectangular parallelogram containment",
    statement:
      "Any rectangular parallelogram is said to be contained by the two straight lines containing the right angle.",
    steps: [
      given("Let two straight lines AB and AD contain a right angle at A.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        point("D", [0, 2]),
        segment("AB", "A", "B", { color: SKY }),
        segment("AD", "A", "D", { color: SKY }),
        ...shape(
          "ra",
          [
            [0, 0],
            [0.3, 0],
            [0.3, 0.3],
            [0, 0.3],
          ],
          ORANGE,
        ),
      ]),
      step(
        "Complete the rectangle",
        "Complete the rectangular parallelogram ABDC.",
        [point("C", [3, 2]), polygon("rect", ["A", "B", "C", "D"], AMBER)],
      ),
      step(
        "Contained",
        "The rectangle ABDC is said to be contained by AB and AD.",
        [],
      ),
    ],
  }),

  defineProof({
    id: "ii-def-2",
    label: "II.D.2",
    kind: "definition",
    title: "The Gnomon",
    statement:
      "And in any parallelogrammic area let any one whatever of the parallelograms about its diameter with the two complements be called a gnomon.",
    steps: [
      given("Let ABCD be a parallelogram with diameter AC.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        point("C", [3, 2]),
        point("D", [0, 2]),
        polygon("p", ["A", "B", "C", "D"], SKY),
        segment("AC", "A", "C", { color: ORANGE }),
      ]),
      step(
        "Parallelograms about the diameter",
        "Let K be a point on AC, and draw lines through K parallel to the sides.",
        [
          point("K", [1.8, 1.2]),
          ...line2("h", [0, 1.2], [3, 1.2], { color: CYAN, dashed: true }),
          ...line2("v", [1.8, 0], [1.8, 2], { color: CYAN, dashed: true }),
        ],
      ),
      step(
        "The Gnomon",
        "The gnomon consists of the two complements together with either parallelogram about the diameter.",
        [
          polygon(
            "gnomon",
            [
              [0, 0],
              [3, 0],
              [3, 1.2],
              [1.8, 1.2],
              [1.8, 2],
              [0, 2],
            ],
            GREEN,
          ),
        ],
      ),
    ],
  }),

  // -------------------------------------------------------------------------
  // Propositions II.1 – II.14
  // -------------------------------------------------------------------------
  defineProof({
    id: "ii-1",
    label: "II.1",
    kind: "theorem",
    title: "Proposition II.1",
    statement:
      "If there are two straight lines, and one of them is cut into any number of segments whatever, then the rectangle contained by the two straight lines equals the sum of the rectangles contained by the uncut straight line and each of the segments.",
    dependencies: ["i-11", "i-31", "ii-def-1"],
    steps: [
      given(
        "Let A and BC be two straight lines, and let BC be cut at D and E.",
        [
          // A is represented by the vertical segment A0A1; BC is the
          // horizontal segment B-D-E-C, with the same division points used below.
          point("A0", [0, 0]),
          point("A1", [0, 1.5]),
          point("B", [1, 1.5]),
          point("D", [2, 1.5]),
          point("E", [3, 1.5]),
          point("C", [4, 1.5]),
          segment("A_line", "A0", "A1", { color: ORANGE }),
          segment("BC", "B", "C", { color: SKY }),
        ],
      ),
      step(
        "Construct rectangle",
        "Construct the rectangle contained by A and BC, and drop perpendiculars at division points.",
        [
          point("p1", [1, 0]),
          point("p2", [4, 0]),
          point("D0", [2, 0]),
          point("E0", [3, 0]),
          polygon("main", ["p1", "p2", "C", "B"], SKY),
          segment("dropD", "D", "D0", { color: CYAN, dashed: true }),
          segment("dropE", "E", "E0", { color: CYAN, dashed: true }),
        ],
      ),
      step(
        "Sum of rectangles",
        "The rectangle on the whole equals the sum of the individual rectangular parts.",
        [
          polygon(
            "r1",
            [
              [1, 0],
              [2, 0],
              [2, 1.5],
              [1, 1.5],
            ],
            AMBER,
          ),
          polygon(
            "r2",
            [
              [2, 0],
              [3, 0],
              [3, 1.5],
              [2, 1.5],
            ],
            CYAN,
          ),
          polygon(
            "r3",
            [
              [3, 0],
              [4, 0],
              [4, 1.5],
              [3, 1.5],
            ],
            GREEN,
          ),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-2",
    label: "II.2",
    kind: "theorem",
    title: "Proposition II.2",
    statement:
      "If a straight line is cut at random, then the sum of the rectangles contained by the whole and each of the segments equals the square on the whole.",
    dependencies: ["i-46", "i-31"],
    steps: [
      given("Let AB be a straight line cut at C.", [
        point("A", [0, 0]),
        point("C", [1.8, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B"),
      ]),
      step("Describe square", "Describe the square ADEB on AB (I.46).", [
        point("D", [0, 3]),
        point("E", [3, 3]),
        polygon("sq", ["A", "B", "E", "D"], SKY),
      ]),
      step(
        "Rectangles",
        "Through C draw CF parallel to AD, dividing the square into rectangles contained by AB, AC and AB, CB.",
        [
          point("F", [1.8, 3]),
          point("C_sq", [1.8, 0]),
          polygon(
            "rectAC",
            [
              [0, 0],
              [1.8, 0],
              [1.8, 3],
              [0, 3],
            ],
            AMBER,
          ),
          polygon(
            "rectCB",
            [
              [1.8, 0],
              [3, 0],
              [3, 3],
              [1.8, 3],
            ],
            CYAN,
          ),
          segment("CF", "C_sq", "F", { color: ORANGE }),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-3",
    label: "II.3",
    kind: "theorem",
    title: "Proposition II.3",
    statement:
      "If a straight line is cut at random, then the rectangle contained by the whole and one of the segments equals the sum of the rectangle contained by the segments and the square on the aforesaid segment.",
    dependencies: ["i-31", "i-46"],
    steps: [
      given("Let AB be cut at C.", [
        point("A", [0, 0]),
        point("C", [2, 0]),
        point("B", [3.2, 0]),
        segment("AB", "A", "B"),
      ]),
      step(
        "Rectangles",
        "Describe the square on CB and partition the rectangle contained by AB and CB into the rectangle AC by CB and the square on CB.",
        [
          polygon(
            "sqCB",
            [
              [2, 0],
              [3.2, 0],
              [3.2, 1.2],
              [2, 1.2],
            ],
            AMBER,
          ),
          polygon(
            "rectAC",
            [
              [0, 0],
              [2, 0],
              [2, 1.2],
              [0, 1.2],
            ],
            CYAN,
          ),
        ],
      ),
      step(
        "Equality",
        "The rectangle AB by CB equals the rectangle AC by CB plus the square on CB.",
        [],
      ),
    ],
  }),

  defineProof({
    id: "ii-4",
    label: "II.4",
    kind: "theorem",
    title: "Proposition II.4",
    statement:
      "If a straight line is cut at random, the square on the whole equals the squares on the segments plus twice the rectangle contained by the segments.",
    dependencies: ["i-5", "i-29", "i-46"],
    steps: [
      given("Let AB be cut at random at C.", [
        point("A", [0, 0]),
        point("C", [1.8, 0]),
        point("B", [3.2, 0]),
        segment("AB", "A", "B"),
      ]),
      step(
        "Construct square",
        "Describe a square on AB (I.46), keeping C as the point of division on AB.",
        [
          point("E_sq", [3.2, 3.2]),
          point("D_sq", [0, 3.2]),
          polygon("sq", ["A", "B", "E_sq", "D_sq"], SKY),
        ],
      ),
      step(
        "Subdivide",
        "Through the cut point C draw parallels to the sides. The two squares are on AC and CB; the remaining two rectangles are equal.",
        [
          polygon(
            "sq1",
            [
              [0, 0],
              [1.8, 0],
              [1.8, 1.8],
              [0, 1.8],
            ],
            AMBER,
          ),
          polygon(
            "sq2",
            [
              [1.8, 1.8],
              [3.2, 1.8],
              [3.2, 3.2],
              [1.8, 3.2],
            ],
            GREEN,
          ),
          polygon(
            "comp1",
            [
              [0, 1.8],
              [1.8, 1.8],
              [1.8, 3.2],
              [0, 3.2],
            ],
            CYAN,
          ),
          polygon(
            "comp2",
            [
              [1.8, 0],
              [3.2, 0],
              [3.2, 1.8],
              [1.8, 1.8],
            ],
            ORANGE,
          ),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-5",
    label: "II.5",
    kind: "theorem",
    title: "Proposition II.5",
    statement:
      "If a straight line is cut into equal and unequal segments, then the rectangle contained by the unequal segments of the whole together with the square on the straight line between the points of section equals the square on the half.",
    dependencies: ["i-43", "i-46", "ii-def-2"],
    steps: [
      given("Let AB be bisected at C and cut unequally at D.", [
        point("A", [0, 0]),
        point("C", [1.5, 0]),
        point("D", [2.2, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B"),
      ]),
      step(
        "Square on half",
        "Describe square on CB and complete subdivisions.",
        [
          polygon(
            "sqCB",
            [
              [1.5, 0],
              [3, 0],
              [3, 1.5],
              [1.5, 1.5],
            ],
            AMBER,
          ),
          polygon(
            "sqCD",
            [
              [3.35, -0.1],
              [4.05, -0.1],
              [4.05, 0.6],
              [3.35, 0.6],
            ],
            GREEN,
          ),
        ],
      ),
      step(
        "Rectangle and square",
        "The rectangle AD by DB together with the square on CD equals the square on CB.",
        [
          polygon(
            "rectADDB",
            [
              [0, -1.1],
              [2.2, -1.1],
              [2.2, -0.3],
              [0, -0.3],
            ],
            CYAN,
          ),
          segment("CD", "C", "D", { color: ORANGE, dashed: true }),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-6",
    label: "II.6",
    kind: "theorem",
    title: "Proposition II.6",
    statement:
      "If a straight line is bisected and a straight line is added to it in a straight line, then the rectangle contained by the whole with the added straight line and the added straight line together with the square on the half equals the square on the straight line made up of the half and the added straight line.",
    dependencies: ["i-43", "i-46", "ii-def-2"],
    steps: [
      given("Let AB be bisected at C, and BD added in a straight line.", [
        point("A", [0, 0]),
        point("C", [1.5, 0]),
        point("B", [3, 0]),
        point("D", [4.2, 0]),
        segment("AD", "A", "D"),
      ]),
      step(
        "Construction",
        "Construct squares and rectangles corresponding to the segments.",
        [
          polygon(
            "sqHalf",
            [
              [0, 1.8],
              [1.5, 1.8],
              [1.5, 3.3],
              [0, 3.3],
            ],
            AMBER,
          ),
          polygon(
            "sqCD",
            [
              [4.5, 1.8],
              [7.2, 1.8],
              [7.2, 4.5],
              [4.5, 4.5],
            ],
            GREEN,
          ),
        ],
      ),
      step(
        "Sum relation",
        "Rectangle AD by BD plus square on CB equals square on CD.",
        [
          polygon(
            "rectTotal",
            [
              [0, -1.5],
              [4.2, -1.5],
              [4.2, -0.3],
              [0, -0.3],
            ],
            SKY,
          ),
          polygon(
            "sqCB",
            [
              [4.5, -1.5],
              [6, -1.5],
              [6, 0],
              [4.5, 0],
            ],
            AMBER,
          ),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-7",
    label: "II.7",
    kind: "theorem",
    title: "Proposition II.7",
    statement:
      "If a straight line is cut at random, then the sum of the square on the whole and that on one of the segments equals twice the rectangle contained by the whole and the said segment plus the square on the remaining segment.",
    dependencies: ["i-46", "ii-def-2"],
    steps: [
      given("Let AB be cut at C.", [
        point("A", [0, 0]),
        point("C", [2, 0]),
        point("B", [3.2, 0]),
        segment("AB", "A", "B"),
      ]),
      step(
        "Squares on whole and segment",
        "Describe square on AB and square on CB.",
        [
          polygon(
            "sqAB",
            [
              [0, 0],
              [3.2, 0],
              [3.2, 3.2],
              [0, 3.2],
            ],
            SKY,
          ),
          polygon(
            "sqCB",
            [
              [2, 0],
              [3.2, 0],
              [3.2, 1.2],
              [2, 1.2],
            ],
            AMBER,
          ),
        ],
      ),
      step(
        "Twice rectangle",
        "The two square areas are represented by two equal rectangles AB by BC together with the square on AC.",
        [
          polygon(
            "rect1",
            [
              [0, -1.5],
              [3.2, -1.5],
              [3.2, -0.3],
              [0, -0.3],
            ],
            CYAN,
          ),
          polygon(
            "rect2",
            [
              [0, -2.9],
              [3.2, -2.9],
              [3.2, -1.7],
              [0, -1.7],
            ],
            GREEN,
          ),
          polygon(
            "sqAC",
            [
              [3.6, -2.9],
              [5.6, -2.9],
              [5.6, -0.9],
              [3.6, -0.9],
            ],
            ORANGE,
          ),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-8",
    label: "II.8",
    kind: "theorem",
    title: "Proposition II.8",
    statement:
      "If a straight line is cut at random, then four times the rectangle contained by the whole and one of the segments plus the square on the remaining segment equals the square described on the whole and the aforesaid segment as on one straight line.",
    dependencies: ["i-46", "ii-def-2"],
    steps: [
      given("Let AB be cut at C.", [
        point("A", [0, 0]),
        point("C", [2, 0]),
        point("B", [3.2, 0]),
        segment("AB", "A", "B"),
      ]),
      step("Extension", "Produce AB to D so that BD equals BC.", [
        point("D", [4.4, 0]),
        segment("AD", "A", "D", { dashed: true }),
      ]),
      step(
        "Four times rectangle",
        "Four times the rectangle AB by BC plus square on AC equals square on AD.",
        [
          polygon(
            "sqAD",
            [
              [0, 0],
              [4.4, 0],
              [4.4, 4.4],
              [0, 4.4],
            ],
            SKY,
          ),
          polygon(
            "sqAC",
            [
              [0, 0],
              [2, 0],
              [2, 2],
              [0, 2],
            ],
            AMBER,
          ),
          polygon(
            "rem1",
            [
              [2, 0],
              [4.4, 0],
              [4.4, 2],
              [2, 2],
            ],
            CYAN,
          ),
          polygon(
            "rem2",
            [
              [0, 2],
              [2, 2],
              [2, 4.4],
              [0, 4.4],
            ],
            GREEN,
          ),
          polygon(
            "rem3",
            [
              [2, 2],
              [4.4, 2],
              [4.4, 4.4],
              [2, 4.4],
            ],
            ORANGE,
          ),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-9",
    label: "II.9",
    kind: "theorem",
    title: "Proposition II.9",
    statement:
      "If a straight line is cut into equal and unequal segments, then the sum of the squares on the unequal segments of the whole is double the sum of the square on the half and the square on the straight line between the points of section.",
    dependencies: ["i-5", "i-11", "i-27", "i-29"],
    steps: [
      given("Let AB be bisected at C and cut unequally at D.", [
        point("A", [0, 0]),
        point("C", [1.5, 0]),
        point("D", [2.2, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B"),
      ]),
      step(
        "Perpendicular",
        "Draw CE at right angles to AB, making CE equal to AC or CB. Join EA and EB.",
        [
          point("E", [1.5, 1.5]),
          segment("EC", "E", "C", { color: CYAN }),
          segment("EA", "E", "A", { color: ORANGE }),
          segment("EB", "E", "B", { color: ORANGE }),
          ...shape(
            "ra",
            [
              [1.5, 0],
              [1.8, 0],
              [1.8, 0.3],
              [1.5, 0.3],
            ],
            ORANGE,
          ),
        ],
      ),
      step(
        "Sum of squares",
        "The squares on AD and DB equal double the sum of squares on AC and CD.",
        [
          segment("ED", "E", "D", { color: CYAN }),
          segment("CD", "C", "D", { color: CYAN }),
        ],
      ),
    ],
  }),

  defineProof({
    id: "ii-10",
    label: "II.10",
    kind: "theorem",
    title: "Proposition II.10",
    statement:
      "If a straight line is bisected, and a straight line is added to it in a straight line, then the square on the whole with the added straight line and the square on the added straight line both together are double the sum of the square on the half and the square described on the straight line made up of the half and the added straight line as on one straight line.",
    dependencies: ["i-5", "i-11", "i-27", "i-29"],
    steps: [
      given("Let AB be bisected at C, and BD added in a straight line.", [
        point("A", [0, 0]),
        point("C", [1.5, 0]),
        point("B", [3, 0]),
        point("D", [4.5, 0]),
        segment("AD", "A", "D"),
      ]),
      step(
        "Perpendicular",
        "Draw CE at right angles to AB, and join EA and EB.",
        [
          point("E", [1.5, 1.5]),
          segment("EC", "E", "C", { color: CYAN }),
          segment("EA", "E", "A", { color: ORANGE }),
          segment("EB", "E", "B", { color: ORANGE }),
          ...shape(
            "ra",
            [
              [1.5, 0],
              [1.8, 0],
              [1.8, 0.3],
              [1.5, 0.3],
            ],
            ORANGE,
          ),
        ],
      ),
      step(
        "Double relation",
        "Square on AD plus square on BD equals double the square on AC plus double the square on CD.",
        [segment("ED", "E", "D", { color: CYAN })],
      ),
    ],
  }),

  defineProof({
    id: "ii-11",
    label: "II.11",
    kind: "theorem",
    title: "Proposition II.11 (Golden Section)",
    statement:
      "To cut a given straight line so that the rectangle contained by the whole and one of the segments equals the square on the remaining segment.",
    dependencies: ["i-46", "i-47", "ii-6"],
    steps: [
      given("Let AB be the given straight line.", [
        point("A", [0, 0]),
        point("B", [3, 0]),
        segment("AB", "A", "B"),
      ]),
      step(
        "Construct square",
        "Describe the square ABDC on AB (I.46). Bisect AC at E, and join BE.",
        [
          point("C", [0, 3]),
          point("D", [3, 3]),
          point("E", [0, 1.5]),
          segment("BE", "B", "E", { color: ORANGE }),
          polygon("sq", ["A", "B", "D", "C"], SKY),
        ],
      ),
      step(
        "Produce and cut",
        "Produce CA to F such that EF equals EB, and describe square AGHF on AF.",
        [
          // EB = sqrt(3^2 + 1.5^2); EF = EB, so AF = EB - AE.
          point("F", [0, -1.854101966]),
          point("G", [1.854101966, -1.854101966]),
          point("H", [1.854101966, 0]),
          segment("AF", "A", "F", { dashed: true }),
          segment("EF", "E", "F", { color: CYAN }),
          segment("EB", "E", "B", { color: ORANGE }),
          polygon("sq_small", ["A", "H", "G", "F"], AMBER),
        ],
      ),
      step(
        "Conclusion",
        "AB is cut at H such that the rectangle AB by BH equals the square on AH.",
        [],
      ),
    ],
  }),

  defineProof({
    id: "ii-12",
    label: "II.12",
    kind: "theorem",
    title: "Proposition II.12 (Law of Cosines - Obtuse)",
    statement:
      "In obtuse-angled triangles the square on the side opposite the obtuse angle is greater than the sum of the squares on the sides containing the obtuse angle by twice the rectangle contained by one of the sides about the obtuse angle, namely that on which the perpendicular falls, and the straight line cut off outside by the perpendicular towards the obtuse angle.",
    dependencies: ["i-11", "i-47", "ii-4"],
    steps: [
      given("Let ABC be an obtuse-angled triangle with obtuse angle BAC.", [
        point("A", [0, 0]),
        point("B", [2.5, 0]),
        point("C", [-1.2, 2.2]),
        segment("AB", "A", "B"),
        segment("BC", "B", "C", { color: AMBER }),
        segment("CA", "C", "A"),
        ...wedge("wA", [0, 0], [2.5, 0], [-1.2, 2.2], 0.45, ORANGE),
      ]),
      step(
        "Perpendicular",
        "Draw BD perpendicular to CA produced from B (I.12).",
        [
          point("D", [0.573248408, -1.050955414]),
          segment("AD", "A", "D", { color: CYAN, dashed: true }),
          segment("BD", "B", "D", { color: CYAN, dashed: true }),
          ...shape(
            "ra",
            [
              [0.573248408, -1.050955414],
              [0.429592768, -0.787586742],
              [0.69296144, -0.643931103],
              [0.83661708, -0.907299774],
            ],
            CYAN,
          ),
        ],
      ),
      step(
        "Relation",
        "The square on BC equals the sum of the squares on AB and AC plus twice the rectangle contained by CA and AD.",
        [],
      ),
    ],
  }),

  defineProof({
    id: "ii-13",
    label: "II.13",
    kind: "theorem",
    title: "Proposition II.13 (Law of Cosines - Acute)",
    statement:
      "In acute-angled triangles the square on the side opposite the acute angle is less than the sum of the squares on the sides containing the acute angle by twice the rectangle contained by one of the sides about the acute angle, namely that on which the perpendicular falls, and the straight line cut off within by the perpendicular towards the acute angle.",
    dependencies: ["i-11", "i-46", "ii-7"],
    steps: [
      given("Let ABC be an acute-angled triangle with angle at B acute.", [
        point("A", [1.2, 2]),
        point("B", [0, 0]),
        point("C", [3, 0]),
        segment("AB", "A", "B"),
        segment("BC", "B", "C"),
        segment("CA", "C", "A", { color: AMBER }),
      ]),
      step("Perpendicular", "Draw AD perpendicular to BC from A (I.12).", [
        point("D", [1.2, 0]),
        segment("AD", "A", "D", { color: CYAN, dashed: true }),
        ...shape(
          "ra",
          [
            [1.2, 0],
            [1.2, 0.3],
            [1.5, 0.3],
            [1.5, 0],
          ],
          CYAN,
        ),
      ]),
      step(
        "Relation",
        "The square on AC equals the sum of the squares on AB and BC less twice the rectangle contained by BC and BD.",
        [],
      ),
    ],
  }),

  defineProof({
    id: "ii-14",
    label: "II.14",
    kind: "theorem",
    title: "Proposition II.14",
    statement: "To construct a square equal to a given rectilinear figure.",
    dependencies: ["i-45", "i-47", "ii-5"],
    steps: [
      given("Let A be the given rectilinear figure.", [
        point("fig_center", [1.5, 1.5]),
        ...shape(
          "rectFig",
          [
            [0, 0],
            [3, 0],
            [3, 2],
            [0, 2],
          ],
          SKY,
        ),
      ]),
      step(
        "Equivalents",
        "Construct a rectangular parallelogram BCDE equal to figure A (I.45).",
        [
          point("B", [5, 0]),
          point("C", [8, 0]),
          point("D", [8, 2]),
          point("E", [5, 2]),
          polygon("rectBCDE", ["B", "C", "D", "E"], AMBER),
        ],
      ),
      step(
        "Square construction",
        "Produce BE to F making EF equal to ED, bisect BF at G, and describe the semicircle on BF (shown by its dashed construction circle). Use the right-hand semicircle: its intersection H with ED gives EH perpendicular to BF, and the square on EH equals rectangle BE by ED, hence the given figure.",
        [
          point("F", [5, 5]),
          point("G", [5, 2.5]),
          point("H", [7.449489743, 2]),
          point("H2", [7.449489743, -0.449489743]),
          point("E2", [5, -0.449489743]),
          segment("BF", "B", "F", { color: ORANGE }),
          circle("sem", "G", "F", { dashed: true }),
          segment("GE", "G", "E", { color: CYAN }),
          segment("EH", "E", "H", { color: GREEN }),
          ...shape(
            "ra",
            [
              [5, 2],
              [5.3, 2],
              [5.3, 2.3],
              [5, 2.3],
            ],
            CYAN,
          ),
          polygon("equalSquare", ["E", "H", "H2", "E2"], GREEN),
        ],
      ),
    ],
  }),
];
