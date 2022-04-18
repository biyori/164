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
    applyMoves(problem, dimension) {
        const action_length = problem.solution.length;
        let new_state = "";
        for (let i = 0; i < action_length; i++) {
            let validMove = this.isValidMove(problem.state, problem.solution[i], dimension);
            if (validMove.index != -1) {
                new_state = this.applyMove(problem.state, validMove);
                problem.state = new_state;
            }
            else {
                throw new Error(problem.solution[i] + " is an invalid move in state " + problem.state);
            }
        }
        return new_state;
    }
    isValidMove(state, action, dimension) {
        let state_arr = [...state];
        const zeroTileIndex = state_arr.findIndex((str) => str === "0");
        let valid_move_index = {
            index: -1,
            move: "",
        };
        switch (action) {
            case "u":
                if (zeroTileIndex >= dimension)
                    valid_move_index = { index: zeroTileIndex - dimension, move: "u" };
                break;
            case "d":
                if (zeroTileIndex < dimension * dimension - dimension)
                    valid_move_index = { index: zeroTileIndex + dimension, move: "d" };
                break;
            case "l":
                if (zeroTileIndex % dimension != 0)
                    valid_move_index = { index: zeroTileIndex - 1, move: "l" };
                break;
            case "r":
                if (zeroTileIndex % dimension != dimension - 1)
                    valid_move_index = { index: zeroTileIndex + 1, move: "r" };
                break;
        }
        return valid_move_index;
    }
    applyMove(state, moves) {
        let state_arr = [...state];
        const zeroTileIndex = state_arr.findIndex((str) => str === "0");
        let state_copy = state_arr.slice();
        let tileToMove = state_copy[moves.index];
        state_copy[zeroTileIndex] = tileToMove;
        state_copy[moves.index] = "0";
        return state_copy.join("");
    }
    reverseString(moves) {
        return moves.split("").reverse().join("");
    }
}
exports.moves = moves;
