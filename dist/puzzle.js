"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bfs_1 = require("./lib/bfs");
const PUZZLE_DIMENSION = 4;
const initialState = { state: "12345678D9CFEBA0" };
const goalState = { state: "123456789ABCDEF0" };
let bfs_config = {
    initial: initialState,
    goal: goalState,
    dimension: PUZZLE_DIMENSION,
    debug: false,
};
let a = new bfs_1.BFS(initialState, goalState, PUZZLE_DIMENSION, false);
let searched = a.search();
let a_parent = searched?.parent;
let solution_actions = "";
while (a_parent != null) {
    if (a_parent.move?.length) {
        solution_actions += a_parent.move;
    }
    a_parent = a_parent.parent;
}
console.log(`Solution for [${initialState}] => ${solution_actions}`);
