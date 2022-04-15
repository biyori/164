"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node = void 0;
class node {
    state;
    parent;
    move;
    depth;
    cost;
    constructor(state, parent, move, depth, cost) {
        this.state = state;
        this.parent = parent;
        this.move = move;
        this.depth = depth;
        this.cost = cost;
    }
}
exports.node = node;
