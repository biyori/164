import { node } from "./node";
import { moves, state } from "./search";

export class DFS {
  initial: state;
  goal: state;
  dimension: number;
  debug: boolean;
  constructor(initial: state, goal: state, dimension: number, debug: boolean) {
    this.initial = initial;
    this.goal = goal;
    this.dimension = dimension;
    this.debug = debug;
  }

  search = (): node | undefined => {
    const start_node = new node(this.initial.state, null, null, 0, 0);

    if (this.initial.state == this.goal.state) return start_node;
    let frontier: node[] = [];
    frontier.push(start_node);
    let reached: node[] = [];
    while (frontier.length != 0) {
      let nodes = frontier.pop();
      if (nodes != null) {
        reached.push(nodes);
        let children = this.expand(nodes);
        for (let i = 0; i < children.length; i++) {
          if (children[i].state === this.goal.state) {
            // return the goal
            console.log("SOLUTION: ", children[i].state);
            return children[i];
          }

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

  expand = (node: node): node[] => {
    let children = [];
    children.push(node);
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
          console.log(state_copy.join(""));
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
