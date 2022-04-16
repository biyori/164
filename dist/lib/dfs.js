"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DFS = void 0;
const node_1 = require("./node");
class DFS {
    initial;
    goal;
    dimension;
    debug;
    constructor(initial, goal, dimension, debug) {
        this.initial = initial;
        this.goal = goal;
        this.dimension = dimension;
        this.debug = debug;
    }
    search = () => {
        const start_node = new node_1.node(this.initial.state, null, null, 0, 0);
        if (this.initial.state == this.goal.state)
            return start_node;
        let frontier = [];
        frontier.push(start_node);
        let reached = [];
        while (frontier.length != 0) {
            let nodes = frontier.pop();
            if (nodes != null) {
                reached.push(nodes);
                let children = this.expand(nodes);
                for (let i = 0; i < children.length; i++) {
                    if (children[i].state === this.goal.state) {
                        console.log("SOLUTION: ", children[i].state);
                        return children[i];
                    }
                    let in_reached = reached.some((r) => r.state === children[i].state);
                    if (!in_reached) {
                        reached.push(children[i]);
                        frontier.push(children[i]);
                    }
                }
            }
        }
        console.error("No solution was found");
    };
    expand = (node) => {
        let children = [];
        children.push(node);
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
                    console.log(state_copy.join(""));
                }
                let child = new node_1.node(state_copy.join(""), front_node, moves[i].move, front_node.depth + 1, front_node.cost + 1);
                new_states.push(child);
            }
        }
        return new_states;
    }
}
exports.DFS = DFS;
