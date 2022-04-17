import { node } from "./node";
import { moves, state } from "./search";

// Iterative-Deepening Depth-First Search
export class IterDFS {
  initial: state;
  goal: state;
  dimension: number;
  debug: boolean;
  maxDepth: number;
  constructor(
    initial: state,
    goal: state,
    dimension: number,
    debug: boolean,
    maxDepth: number
  ) {
    this.initial = initial;
    this.goal = goal;
    this.dimension = dimension;
    this.debug = debug;
    this.maxDepth = maxDepth;
  }

  search = (): node | null => {
    for (let i = 0; i < 1_000_000; i++) {
      const result = this.depthLimitedSearch(this.initial, i);
      if (result != null) return result;
      console.log("round ", i);
    }
    return null;
  };

  depthLimitedSearch = (problem: state, limit: number): node | null => {
    const start_node = new node(problem.state, null, null, 0, 0);
    return this.recursiveDLS(start_node, problem, limit);
  };

  private recursiveDLS = (
    succ: node,
    problem: state,
    limit: number
  ): node | null => {
    let cutoff_occurred = false;
    if (succ.state == this.goal.state) return succ;
    else if (succ.depth === limit) {
      // cutoff
      return null;
    } else {
      let successor = this.expand(succ);
      for (let i = 0; i < successor.length; i++) {
        let result = this.recursiveDLS(successor[i], problem, limit);
        if (result == null) cutoff_occurred = true;
        else if (result) return result;
      }
    }
    if (cutoff_occurred) {
      return null;
    }
    throw new Error("Failure during iterative deepening DFS");
  };

  expand = (node: node): node[] => {
    let valid_moves = this.getValidMoves(node.state);
    let newStates = this.getNewStates(node, valid_moves);
    return newStates;
  };

  getValidMoves(state: string): moves[] {
    let state_arr = [...state];
    const zeroTileIndex = state_arr.findIndex((str) => str === "0");
    let valid_move_index: moves[] = [];

    if (this.debug) console.log("Testing up");
    if (zeroTileIndex >= this.dimension)
      valid_move_index.push({
        index: zeroTileIndex - this.dimension,
        move: "u",
      });

    if (this.debug) console.log("Testing down");
    if (zeroTileIndex < this.dimension * this.dimension - this.dimension)
      valid_move_index.push({
        index: zeroTileIndex + this.dimension,
        move: "d",
      });

    if (this.debug) console.log("Testing left");
    if (zeroTileIndex % this.dimension != 0)
      valid_move_index.push({ index: zeroTileIndex - 1, move: "l" });

    if (this.debug) console.log("Testing right");
    if (zeroTileIndex % this.dimension != this.dimension - 1)
      valid_move_index.push({ index: zeroTileIndex + 1, move: "r" });

    return valid_move_index;
  }

  // Apply the moves to get new states
  getNewStates(front_node: node, moves: moves[]): node[] {
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
        if (this.debug) {
          console.log(state_copy);
          console.log(state_copy.join(""), "[Depth]", front_node.depth);
        }
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
}
