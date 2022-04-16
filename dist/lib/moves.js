"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moves = void 0;
class moves {
    tile;
    constructor(tile) {
        this.tile = tile;
    }
    getMoves() {
        let _parent = this.tile;
        let solution = "";
        while (_parent != null) {
            if (_parent.move?.length) {
                solution += _parent.move;
            }
            _parent = _parent.parent;
        }
        if (solution)
            return this.reverseString(solution);
        return "N/A";
    }
    reverseString(moves) {
        let arr = moves.split("");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = this.opposite(arr[i]);
        }
        return arr.reverse().join("");
    }
    opposite(str) {
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
exports.moves = moves;
