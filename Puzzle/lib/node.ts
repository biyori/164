export class node {
  state: string;
  parent: node | null;
  move: string | null;
  depth: number;
  cost: number;
  /**
   * Puzzle nodes
   */
  constructor(
    state: string,
    parent: node | null,
    move: string | null,
    depth: number,
    cost: number
  ) {
    this.state = state;
    this.parent = parent;
    this.move = move;
    this.depth = depth;
    this.cost = cost;
  }
}
