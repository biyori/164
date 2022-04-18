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
        return moves.split("").reverse().join("");
    }
}
exports.moves = moves;
