import { node } from "./node";

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

  private reverseString(moves: string): string {
    let arr = moves.split("");
    // flip move values to their opposite move
    for (let i = 0; i < arr.length; i++) {
      arr[i] = this.opposite(arr[i]);
    }
    return arr.reverse().join("");
    // return moves.split("").reverse().join("");
  }

  private opposite(str: string): string {
    let character = "";
    switch (str) {
      case "u":
        character = "d";
        break;
      case "d":
        character = "u";
        break;
      case "l":
        character = "r";
        break;
      case "r":
        character = "l";
        break;
    }
    return character;
  }
}
