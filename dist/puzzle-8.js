"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./lib/node");
const queue_1 = require("./lib/queue");
const PUZZLE_DIMENSION = 3;
const initialState = "123456078";
const goalState = "123456780";
const breadthFirstSearch = (initial, goal) => {
    const start_node = new node_1.node(initial.state, null, null, 0, 0);
    if (initial.state == goal.state)
        return start_node;
    let frontier = new queue_1.Queue();
    frontier.push(start_node);
    let reached = [];
    while (!frontier.empty()) {
        let nodes = frontier.pop();
        if (nodes != null) {
            reached.push(nodes);
            let children = expand(nodes);
            for (let i = 0; i < children.length; i++) {
                if (children[i].state === goal.state)
                    return children[i];
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
const expand = (node) => {
    let children = [];
    children.push(node);
    let valid_moves = getValidMoves(node.state);
    let newStates = getNewStates(node, valid_moves);
    return newStates;
};
function getValidMoves(state) {
    let state_arr = [...state];
    const zeroTileIndex = state_arr.findIndex((str) => str === "0");
    let valid_move_index = [];
    console.log("Testing up");
    if (zeroTileIndex >= PUZZLE_DIMENSION)
        valid_move_index.push({
            index: zeroTileIndex - PUZZLE_DIMENSION,
            move: "u",
        });
    console.log("Testing down");
    if (zeroTileIndex < PUZZLE_DIMENSION * PUZZLE_DIMENSION - PUZZLE_DIMENSION)
        valid_move_index.push({
            index: zeroTileIndex + PUZZLE_DIMENSION,
            move: "d",
        });
    console.log("Testing left");
    if (zeroTileIndex % PUZZLE_DIMENSION != 0)
        valid_move_index.push({ index: zeroTileIndex - 1, move: "l" });
    console.log("Testing right");
    if (zeroTileIndex % PUZZLE_DIMENSION != PUZZLE_DIMENSION - 1)
        valid_move_index.push({ index: zeroTileIndex + 1, move: "r" });
    return valid_move_index;
}
function getNewStates(front_node, moves) {
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
            console.log(state_copy);
            console.log(state_copy.join(""));
            let child = new node_1.node(state_copy.join(""), front_node, moves[i].move, front_node.depth + 1, front_node.cost + 1);
            new_states.push(child);
        }
    }
    return new_states;
}
let a = breadthFirstSearch({ state: initialState }, { state: goalState });
