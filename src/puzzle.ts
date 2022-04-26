import { state, test_state } from "./lib/search";
import { AyyStar } from "./lib/ayy-star";
import { moves } from "./lib/moves";
import { benchmark } from "./lib/benchmark";

// Tested only for 3x3 and 4x4 puzzles
// 3x3 = 8 piece
// 4x4 = 15 piece
const SOLVE_PUZZLE_DIMENSION = 4; // solves 4x4 and 3x3

// 3x3
// 1 2 3
// 4 5 6
// 7 8 0
const goalState_3x3: state = { state: "123456780" };
const initialState_3x3: state[] = [
  { state: "160273485" },
  { state: "462301587" },
  { state: "821574360" },
  { state: "840156372" },
  { state: "530478126" },
  { state: "068314257" },
  { state: "453207186" },
  { state: "128307645" },
  { state: "035684712" },
  { state: "684317025" },
  { state: "028514637" },
  { state: "618273540" },
  { state: "042385671" },
  { state: "420385716" },
  { state: "054672813" },
  { state: "314572680" },
  { state: "637218045" },
  { state: "430621875" },
  { state: "158274036" },
  { state: "130458726" },
];

// 4x4
// 1 2 3 4
// 5 6 7 8
// 9 A B C
// D E F 0
const goalState4x4: state = { state: "123456789ABCDEF0" };
const initialState_4x4: state[] = [
  { state: "16235A749C08DEBF" }, // Easy
  { state: "0634217859ABDEFC" }, //
  { state: "012456379BC8DAEF" }, //
  { state: "51246A38097BDEFC" }, //
  { state: "12345678D9CFEBA0" }, //
  { state: "71A92CE03DB4658F" }, // Hard
  { state: "02348697DF5A1EBC" }, //
  { state: "39A1D0EC7BF86452" }, //
  { state: "EAB480FC19D56237" }, //
  { state: "7DB13C52F46E80A9" }, //
];

// Run some tests
let test_moves = new moves(null);
// Test cases
const test_cases: test_state[] = [
  {
    state: "287135640",
    solution:
      "uldrullurrddluruldldrurulddlururdllurrddlurdlluurrdlurddluuldrurddlluurrdldrululdrdruullddrruulldrrd",
  },
  {
    state: "316207548",
    solution:
      "ldrurdllururdlldruulddrruuldrdluldrurdluurdlldrruulldrrullddruulddruurddluulddrruuldlurrddlluurdldrr",
  },
  {
    state: "140673285",
    solution:
      "ldldrruullddrruullddrrulldruldruurdlldrruullddrruulldrrulddluurdrdluldrrulldrulurrddluulddrruldlurrd",
  },
  {
    state: "134507628",
    solution:
      "rdluuldrurddlluurdruldlurrddluldruuldrrdllurdlurrdlurdlluruldrurddlulurrdldlurdrullurdldrurdlurulddr",
  },
  {
    state: "178402635",
    solution:
      "uldrulddrrulurdluldrdlurdrullurdrdlluurdldrrululdrdlurdruulldrdruuldrdlluurrddllurrdluldruurdllurddr",
  },
  {
    state: "837256410",
    solution:
      "ulurdlldrruulldrurdldlurrulddruuldlurrddlurulldrruldlurrdldruuldrdllurrdlulurrdllurrddluruldldrruldr",
  },
  {
    state: "360125748",
    solution:
      "ddlluurdlurddlurdluurrddlulurrddluldrruldluurrdldruullddrurdlulurdldruurdldlurrdlluurrddluldrulurrdd",
  },
];

// Test all cases
let testing = test_cases.length;
for (let i = 0; i < testing; i++) {
  let test = test_moves.applyMoves(test_cases[i], 3);
  console.assert(test === goalState_3x3.state);
}

console.log("Solving puzzles");

let bench = new benchmark();
bench.start();
// Solve the 3x3 puzzle states
for (let i = 0; i < initialState_3x3.length; i++) {
  let ayy = new AyyStar(initialState_3x3[i], goalState_3x3, 3, false);
  let result = ayy.search();
  let mv = new moves(result);
  console.log(
    `[${i + 1}/${initialState_3x3.length}] Solution for [${
      initialState_3x3[i].state
    }] => ${mv.getMoves()}`
  );
}
console.log("Benchmark: ", bench.stop(), "ms");

// Solve the 4x4 puzzle states
if (SOLVE_PUZZLE_DIMENSION > 3) {
  for (let i = 0; i < initialState_4x4.length; i++) {
    bench.start(); // Time each hard puzzle individually
    let ayy = new AyyStar(initialState_4x4[i], goalState4x4, 4, false);
    let result = ayy.search();
    let mv = new moves(result);
    console.log(
      `[${i + 1}/${initialState_4x4.length}] Solution for [${
        initialState_4x4[i].state
      }] => ${mv.getMoves()}`
    );
    console.log("Benchmark: ", bench.stop(), "ms");
  }
}
