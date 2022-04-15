"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./lib/node");
const breadthFirstSearch = (initial, goal) => {
    const start_node = new node_1.node(initial.state, null, null, 0, 0);
    if (initial.state == goal.state)
        return start_node;
    let frontier = [start_node];
    let reached = [start_node];
    while (frontier.length > 0) {
        let _node = frontier.pop();
        if (_node?.state == goal.state)
            return _node;
    }
};
