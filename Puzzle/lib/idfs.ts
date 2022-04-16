import { state } from "./search";

class IDFS {
  initial: state;
  goal: state;
  dimension: number;
  debug: boolean;
  constructor(initial: state, goal: state, dimension: number, debug: boolean) {
    this.initial = initial;
    this.goal = goal;
    this.dimension = dimension;
    this.debug = debug;
  }
  search = () => {};
  depthLimitedSearch = () => {};
  private recursiveDLS = () => {};
}
