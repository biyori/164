"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterDFS = void 0;
const node_1 = require("./node");
class IterDFS {
    initial;
    goal;
    dimension;
    debug;
    maxDepth;
    constructor(initial, goal, dimension, debug, maxDepth) {
        this.initial = initial;
        this.goal = goal;
        this.dimension = dimension;
        this.debug = debug;
        this.maxDepth = maxDepth;
    }
    search = () => {
        for (let i = 0; i < 1_000_000; i++) {
            const result = this.depthLimitedSearch(this.initial, i);
            if (result != null)
                return result;
            console.log("round ", i);
        }
        return null;
    };
    depthLimitedSearch = (problem, limit) => {
        const start_node = new node_1.node(problem.state, null, null, 0, 0);
        return this.recursiveDLS(start_node, problem, limit);
    };
    recursiveDLS = (succ, problem, limit) => {
        let cutoff_occurred = false;
        if (succ.state == this.goal.state)
            return succ;
        else if (succ.depth === limit) {
            return null;
        }
        else {
            let successor = this.expand(succ);
            for (let i = 0; i < successor.length; i++) {
                let result = this.recursiveDLS(successor[i], problem, limit);
                if (result == null)
                    cutoff_occurred = true;
                else if (result)
                    return result;
            }
        }
        if (cutoff_occurred) {
            return null;
        }
        throw new Error("Failure during iterative deepening DFS");
    };
    expand = (node) => {
        let valid_moves = this.getValidMoves(node.state);
        let newStates = this.getNewStates(node, valid_moves);
        return newStates;
    };
    getValidMoves(state) {
        let state_arr = [...state];
        const zeroTileIndex = state_arr.findIndex((str) => str === "0");
        let valid_move_index = [];
        if (this.debug)
            console.log("Testing up");
        if (zeroTileIndex >= this.dimension)
            valid_move_index.push({
                index: zeroTileIndex - this.dimension,
                move: "u",
            });
        if (this.debug)
            console.log("Testing down");
        if (zeroTileIndex < this.dimension * this.dimension - this.dimension)
            valid_move_index.push({
                index: zeroTileIndex + this.dimension,
                move: "d",
            });
        if (this.debug)
            console.log("Testing left");
        if (zeroTileIndex % this.dimension != 0)
            valid_move_index.push({ index: zeroTileIndex - 1, move: "l" });
        if (this.debug)
            console.log("Testing right");
        if (zeroTileIndex % this.dimension != this.dimension - 1)
            valid_move_index.push({ index: zeroTileIndex + 1, move: "r" });
        return valid_move_index;
    }
    getNewStates(front_node, moves) {
        const total_moves = moves.length;
        let new_states = [];
        let state_arr = [...front_node.state];
        const zeroTileIndex = state_arr.findIndex((str) => str === "0");
        if (total_moves > 0) {
            for (let i = 0; i < total_moves; i++) {
                let state_copy = state_arr.slice();
                let tileToMove = state_copy[moves[i].index];
                state_copy[zeroTileIndex] = tileToMove;
                state_copy[moves[i].index] = "0";
                if (this.debug) {
                    console.log(state_copy);
                    console.log(state_copy.join(""), "[Depth]", front_node.depth);
                }
                let child = new node_1.node(state_copy.join(""), front_node, moves[i].move, front_node.depth + 1, front_node.cost + 1);
                new_states.push(child);
            }
        }
        return new_states;
    }
}
exports.IterDFS = IterDFS;
