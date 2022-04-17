"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    items;
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        if (this.items.length > 0)
            return this.items.shift();
        return undefined;
    }
    empty() {
        return this.items.length === 0;
    }
    print() {
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i]);
    }
}
exports.Queue = Queue;
