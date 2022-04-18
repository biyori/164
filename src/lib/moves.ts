import { node } from "./node";
import { test_state } from "./search";

export class moves {
  tile: node | null;
  constructor(tile: node | null) {
    this.tile = tile;
  }

  getMoves(): string {
    let _parent = this.tile;
    let solution = "";
    while (_parent != null) {
      if (_parent.move?.length) {
        solution += _parent.move;
      }
      _parent = _parent.parent;
    }
    if (solution) return this.reverseString(solution);
    return "N/A";
  }

  applyMoves(problem: test_state, dimension: number): string {
    const action_length = problem.solution.length;
    let new_state = "";
    for (let i = 0; i < action_length; i++) {
      let validMove = this.isValidMove(
        problem.state,
        problem.solution[i],
        dimension
      );
      if (validMove.index != -1) {
        new_state = this.applyMove(problem.state, validMove);
        problem.state = new_state;
      } else {
        throw new Error(
          problem.solution[i] + " is an invalid move in state " + problem.state
        );
      }
    }
    return new_state;
  }

  private isValidMove(
    state: string,
    action: string,
    dimension: number
  ): { index: number; move: string } {
    let state_arr = [...state];
    const zeroTileIndex = state_arr.findIndex((str) => str === "0");
    let valid_move_index: { index: number; move: string } = {
      index: -1,
      move: "",
    };

    switch (action) {
      case "u":
        // up
        if (zeroTileIndex >= dimension)
          valid_move_index = { index: zeroTileIndex - dimension, move: "u" };
        break;

      case "d":
        // down
        if (zeroTileIndex < dimension * dimension - dimension)
          valid_move_index = { index: zeroTileIndex + dimension, move: "d" };
        break;

      case "l":
        // left
        if (zeroTileIndex % dimension != 0)
          valid_move_index = { index: zeroTileIndex - 1, move: "l" };
        break;

      case "r":
        // right
        if (zeroTileIndex % dimension != dimension - 1)
          valid_move_index = { index: zeroTileIndex + 1, move: "r" };
        break;
    }
    return valid_move_index;
  }

  // Apply the moves to get new states
  private applyMove(
    state: string,
    moves: { index: number; move: string }
  ): string {
    let state_arr = [...state]; // convert string to array
    const zeroTileIndex = state_arr.findIndex((str) => str === "0"); // calculate 0 tile again for swapping

    let state_copy = state_arr.slice(); // copy the state

    let tileToMove = state_copy[moves.index]; // tile to move
    state_copy[zeroTileIndex] = tileToMove;
    state_copy[moves.index] = "0";

    return state_copy.join("");
  }

  private reverseString(moves: string): string {
    // let arr = moves.split("");
    // // flip move values to their opposite move
    // for (let i = 0; i < arr.length; i++) {
    //   arr[i] = this.opposite(arr[i]);
    // }
    // return arr.reverse().join("");
    return moves.split("").reverse().join("");
  }

  // private opposite(str: string): string {
  //   let character = "";
  //   switch (str) {
  //     case "u":
  //       character = "d";
  //       break;
  //     case "d":
  //       character = "u";
  //       break;
  //     case "l":
  //       character = "r";
  //       break;
  //     case "r":
  //       character = "l";
  //       break;
  //   }
  //   return character;
  // }
}
