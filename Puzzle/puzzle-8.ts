import { node } from "./lib/node";
import { PriorityQueue } from "./lib/priority-queue";
import { Queue } from "./lib/queue";
import { state, moves } from "./lib/search";
// https://colab.research.google.com/drive/1zT2ZYm1yky7ql1Zk5pIEwclubGZGd7Oi?authuser=1
// State Space Search

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

const PUZZLE_DIMENSION = 3; // 8 piece puzzle
//const PUZZLE_DIMENSION = 4; // 15 piece puzzle

// 1 2 3
// 4 5 6
// 0 7 8
const initialState = "123456078";

// 1 2 3
// 4 5 6
// 7 8 0
const goalState = "123456780";
//const goalState = "123456789ABCDEF0"; // 15 piece puzzle

// https://kicat.net/i/XPmnNOmhCR.png
const breadthFirstSearch = (initial: state, goal: state) => {
  const start_node = new node(initial.state, null, null, 0, 0);

  if (initial.state == goal.state) return start_node;
  let frontier: Queue<node> = new Queue<node>();
  frontier.push(start_node);
  let reached: node[] = [];
  while (!frontier.empty()) {
    let nodes = frontier.pop();
    if (nodes != null) {
      reached.push(nodes);
      let children = expand(nodes);
      for (let i = 0; i < children.length; i++) {
        if (children[i].state === goal.state) return children[i]; // return the goal

        // Check if the child node already exists in the reached list
        let in_reached = reached.some((r) => r.state === children[i].state);
        // If the node is not in reached explore
        if (!in_reached) {
          reached.push(children[i]);
          frontier.push(children[i]);
        }
      }
    }
  }
  console.error("No solution was found");
};

const expand = (node: node): node[] => {
  let children = [];
  children.push(node);
  let valid_moves = getValidMoves(node.state);
  let newStates = getNewStates(node, valid_moves);
  return newStates;
};

function getValidMoves(state: string): moves[] {
  let state_arr = [...state];
  const zeroTileIndex = state_arr.findIndex((str) => str === "0");
  let valid_move_index: moves[] = [];

  console.log("Testing up");
  if (zeroTileIndex >= PUZZLE_DIMENSION)
    valid_move_index.push({
      index: zeroTileIndex - PUZZLE_DIMENSION,
      move: "u",
    });

  console.log("Testing down");
  if (zeroTileIndex < PUZZLE_DIMENSION * PUZZLE_DIMENSION - PUZZLE_DIMENSION)
    valid_move_index.push({
      index: zeroTileIndex + PUZZLE_DIMENSION,
      move: "d",
    });

  console.log("Testing left");
  if (zeroTileIndex % PUZZLE_DIMENSION != 0)
    valid_move_index.push({ index: zeroTileIndex - 1, move: "l" });

  console.log("Testing right");
  if (zeroTileIndex % PUZZLE_DIMENSION != PUZZLE_DIMENSION - 1)
    valid_move_index.push({ index: zeroTileIndex + 1, move: "r" });

  return valid_move_index;
}

// Apply the moves to get new states
function getNewStates(front_node: node, moves: moves[]): node[] {
  const total_moves = moves.length;
  let new_states: node[] = [];
  let state_arr = [...front_node.state]; // convert string to array
  const zeroTileIndex = state_arr.findIndex((str) => str === "0"); // calculate 0 tile again for swapping
  if (total_moves > 0) {
    for (let i = 0; i < total_moves; i++) {
      let state_copy = state_arr.slice(); // copy the state

      let tileToMove = state_copy[moves[i].index]; // tile to move
      state_copy[zeroTileIndex] = tileToMove;
      state_copy[moves[i].index] = "0";
      console.log(state_copy);
      console.log(state_copy.join(""));
      let child = new node(
        state_copy.join(""),
        front_node,
        moves[i].move,
        front_node.depth + 1,
        front_node.cost + 1
      );
      new_states.push(child);
    }
  }
  return new_states;
}

// let moves1 = getValidMoves(initialState);
// let newStates = getNewStates(new node(initialState, null, null, 0, 0), moves1);
// console.log(moves1);
// console.log(newStates);
let a = breadthFirstSearch({ state: initialState }, { state: goalState });
