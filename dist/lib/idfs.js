"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IDFS {
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
    search = () => { };
    depthLimitedSearch = () => { };
    recursiveDLS = () => { };
}
