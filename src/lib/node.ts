export class node {
  state: string;
  parent: node | null;
  move: string | null;
  depth: number;
  cost: number;

  /**
   * A node object for the tile solvers
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
