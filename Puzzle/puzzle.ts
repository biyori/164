// https://colab.research.google.com/drive/1zT2ZYm1yky7ql1Zk5pIEwclubGZGd7Oi?authuser=1
// State Space Search
import { state } from "./lib/search";
import { BFS } from "./lib/bfs";

/*
  Breadth-First Search
  Depth-First Search
  Iterative-Deepening Depth-First Search
  A* w/ Out-Of-Place, and Manhattan Distance Heuristics
  Iterative Deepening A* w/ Out-Of-Place, and Manhattan Distance Heuristics

  Develop search code with requirements:

  Input puzzle as a two strings, initial state and goal state.
  Produce the solution as a string of "udlr" representing the move "up", "down", "left", and "right" for the movement of the blank.
  Produce the number of expanded nodes required to find solution.

  In addition, develop code to test a solution with requirements:

  Input initial puzzle state as string.
  Input move sequence as string.
  Produce output state from applying move sequence to initial state.
*/

//const PUZZLE_DIMENSION = 3; // 8 piece puzzle
const PUZZLE_DIMENSION = 4; // 15 piece puzzle

// 1 2 3
// 4 5 6
// 0 7 8
const initialState: state = { state: "12345678D9CFEBA0" };

// 1 2 3
// 4 5 6
// 7 8 0
//const goalState = "123456780";
const goalState: state = { state: "123456789ABCDEF0" }; // 15 piece puzzle

let bfs_config = {
  initial: initialState,
  goal: goalState,
  dimension: PUZZLE_DIMENSION,
  debug: false,
};
let a = new BFS(initialState, goalState, PUZZLE_DIMENSION, false);
let searched = a.search();
let a_parent = searched?.parent;
let solution_actions = "";
while (a_parent != null) {
  if (a_parent.move?.length) {
    solution_actions += a_parent.move;
  }
  a_parent = a_parent.parent;
}
console.log(`Solution for [${initialState}] => ${solution_actions}`);
