"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AyyStar = void 0;
const node_1 = require("./node");
const priority_queue_1 = require("./priority-queue");
class AyyStar {
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
        let expanded = 0;
        let frontier = new priority_queue_1.PriorityQueue();
        frontier.heapPush({ item: start_node, priority: start_node.cost });
        let reached = [];
        reached.push(start_node.state);
        while (!frontier.empty()) {
            expanded++;
            let nodes = frontier.heapPop();
            if (nodes?.item != null) {
                if (nodes.item.state == this.goal.state) {
                    console.log("Total items in reached", reached.length, "Expanded", expanded);
                    return nodes.item;
                }
                let children = this.expand(nodes.item);
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    let in_reached = reached.includes(child.state);
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
exports.AyyStar = AyyStar;
