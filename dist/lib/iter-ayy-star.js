"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterAyyStar = void 0;
const node_1 = require("./node");
class IterAyyStar {
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
        let f_max = this.ManhattanDistance(this.initial) + this.outOfPlace(this.initial);
        for (let i = 0; i < 1_000_000; i++) {
            const result = this.depthLimitedAyySearch(this.initial, f_max);
            f_max = result.cost;
            if (result.node != null) {
                return result.node;
            }
        }
        return null;
    };
    depthLimitedAyySearch = (problem, limit) => {
        const start_node = new node_1.node(problem.state, null, null, 0, 0);
        return {
            node: this.recursiveAyyDLS(start_node, problem, limit),
            cost: limit,
        };
    };
    recursiveAyyDLS = (succ, problem, limit) => {
        if (succ.state == this.goal.state || succ.cost > limit)
            return succ;
        else {
            let successor = this.expand(succ);
            let maximum = Infinity;
            for (let i = 0; i < successor.length; i++) {
                let child = this.recursiveAyyDLS(successor[i], problem, limit);
                if (child) {
                    if (child.cost < maximum) {
                        maximum = child.cost;
                    }
                    if (child.state == this.goal.state)
                        return child;
                }
            }
        }
        throw new Error("Failure during iterative deepening a*");
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
                let child = new node_1.node(state_copy.join(""), front_node, moves[i].move, front_node.depth + 1, front_node.cost + outOfPlaceTiles + manhattanDistance);
                new_states.push(child);
            }
        }
        return new_states;
    }
    outOfPlace(node_state) {
        let goal = this.goal.state;
        let check = node_state.state;
        let state_length = check.length;
        let out_of_place = 0;
        for (let i = 0; i < state_length; i++) {
            if (check[i] === goal[i] && goal[i] != "0")
                continue;
            out_of_place++;
        }
        return out_of_place;
    }
    SingleTileManhattanDistance(tile_index, node_state) {
        let initial_state = node_state.state.indexOf(tile_index.toString());
        let goal_state = this.goal.state.indexOf(tile_index.toString());
        let dist = Math.abs(Math.floor(initial_state / this.dimension) -
            Math.floor(goal_state / this.dimension)) +
            Math.abs((initial_state % this.dimension) - (goal_state % this.dimension));
        return dist;
    }
    ManhattanDistance(node_state) {
        let lent = node_state.state.length;
        let sum = 0;
        for (let i = 1; i < lent; i++) {
            sum += this.SingleTileManhattanDistance(i, node_state);
        }
        return sum;
    }
}
exports.IterAyyStar = IterAyyStar;
