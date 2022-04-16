"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bfs_1 = require("./lib/bfs");
const PUZZLE_DIMENSION = 3;
const initialState = { state: "160273485" };
const goalState = { state: "123456780" };
let dfs = new bfs_1.BFS(initialState, goalState, PUZZLE_DIMENSION, false);
let dfs_result = dfs.search();
let a_parent = dfs_result?.parent;
let solution_actions = "";
while (a_parent != null) {
    if (a_parent.move?.length) {
        solution_actions += a_parent.move;
    }
    a_parent = a_parent.parent;
}
console.log(`Solution for [${initialState.state}] => ${solution_actions}`);
