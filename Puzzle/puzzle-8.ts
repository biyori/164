import { node } from "./lib/node";
import PriorityQueue from "./lib/priority-queue";
import { state } from "./lib/search";
// https://colab.research.google.com/drive/1zT2ZYm1yky7ql1Zk5pIEwclubGZGd7Oi?authuser=1
// State Space Search

/*
  Breadth-First Search
  Depth-First Search
  Iterative-Deepening Depth-First Search
  A* w/ Out-Of-Place, and Manhattan Distance Heuristics
  Iterative Deepening A* w/ Out-Of-Place, and Manhattan Distance Heuristics

  Develop search code with requirements:

  Input puzzle as a two strings, initial state and goal state.
  Produce the solution as a string of "udlr" representing the move "up", "down", "left", and "right" for the movement of the blank.
  Produce the number of expanded nodes required to find solution.

  In addition, develop code to test a solution with requirements:

  Input initial puzzle state as string.
  Input move sequence as string.
  Produce output state from applying move sequence to initial state.
*/

// https://kicat.net/i/XPmnNOmhCR.png
const breadthFirstSearch = (initial: state, goal: state) => {
  const start_node = new node(initial.state, null, null, 0, 0);

  if (initial.state == goal.state) return start_node;
  let frontier: node[] = [start_node];
  let reached = [start_node];

  while (frontier.length > 0) {
    let _node = frontier.pop();
    // foreach
    // Goal state return
    if (_node?.state == goal.state) return _node;
  }
};
