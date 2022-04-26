import { node } from "./node";
import { PriorityQueue } from "./priority-queue";
import { moves, state } from "./search";

// A* Search
export class AyyStar {
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

  search = (): node | null => {
    const start_node = new node(this.initial.state, null, null, 0, 0);
    let expanded = 0;
    let frontier: PriorityQueue = new PriorityQueue();
    frontier.heapPush({ item: start_node, priority: start_node.cost }); // min-heap is faster than searching the entire array for a place to insert into
    let reached: string[] = []; // Only keep track of the node states
    reached.push(start_node.state);
    while (!frontier.empty()) {
      expanded++;
      let nodes = frontier.heapPop();
      if (nodes?.item != null) {
        if (nodes.item.state == this.goal.state) {
          console.log(
            "Total items in reached",
            reached.length,
            "Expanded",
            expanded
          );
          return nodes.item;
        }

        let children = this.expand(nodes.item);
        for (let i = 0; i < children.length; i++) {
          let child = children[i];

          // Check if the child node already exists in the reached list
          //let in_reached = reached.some((r) => r.state === child.state);
          let in_reached = reached.includes(child.state); // Tons faster than filtering an array of objects

          // Sum the cost of each node
          //let reach_cost = reached.filter((n) => n.state === child.state);
          //let sum = reach_cost.reduce((sum, f) => sum + f.cost, 0);

          // If the node is not in reached explore
          if (!in_reached) {
            reached.push(child.state);
            frontier.heapPush({
              item: child,
              priority: child.cost + (child.parent?.cost ?? 0),
            });
          }
        }
      }
    }
    console.error("No solution was found");
    return null;
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

        let outOfPlaceTiles = this.outOfPlace({ state: state_copy.join("") });
        let manhattanDistance = this.ManhattanDistance({
          state: state_copy.join(""),
        });
        if (this.debug) {
          console.log(state_copy);
          console.log(state_copy.join(""), "[Depth]", front_node.depth);
          console.log("Out of place tiles:", outOfPlaceTiles);
          console.log("Manhattan distance", manhattanDistance);
        }
        let child = new node(
          state_copy.join(""),
          front_node,
          moves[i].move,
          front_node.depth + 1,
          front_node.cost + manhattanDistance // Add weight to the priority queue
        );
        new_states.push(child);
      }
    }
    return new_states;
  }

  /**
   * Out of Place
   * @param node_state
   * @returns number of tiles out of place of the goal state
   */
  outOfPlace(node_state: state): number {
    let goal = this.goal.state;
    let check = node_state.state;
    let state_length = check.length;
    let out_of_place = 0;
    for (let i = 0; i < state_length; i++) {
      if (check[i] === goal[i] && goal[i] != "0") continue;
      out_of_place++;
    }
    return out_of_place;
  }

  SingleTileManhattanDistance(tile_index: number, node_state: state): number {
    let initial_state: number = node_state.state.indexOf(tile_index.toString());
    let goal_state: number = this.goal.state.indexOf(tile_index.toString());
    let dist =
      Math.abs(
        Math.floor(initial_state / this.dimension) -
          Math.floor(goal_state / this.dimension)
      ) +
      Math.abs(
        (initial_state % this.dimension) - (goal_state % this.dimension)
      );
    // console.log("Comparing", initial_state, goal_state, dist);
    return dist;
  }

  /**
   * Manhattan Distance
   * @param node_state
   * @returns Manhattan distance of the current state of the tiles
   */
  ManhattanDistance(node_state: state) {
    let lent = node_state.state.length;
    let sum = 0;
    // Start at 1 to ignore the index of "0"
    for (let i = 1; i < lent; i++) {
      sum += this.SingleTileManhattanDistance(i, node_state);
    }
    return sum;
  }
}
