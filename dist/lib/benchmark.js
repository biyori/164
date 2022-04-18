"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.benchmark = void 0;
class benchmark {
    startTime;
    endTime;
    constructor() {
        this.startTime = this.endTime = 0;
    }
    start() {
        this.startTime = performance.now();
    }
    stop() {
        this.endTime = performance.now();
        return this.endTime - this.startTime;
    }
}
exports.benchmark = benchmark;
