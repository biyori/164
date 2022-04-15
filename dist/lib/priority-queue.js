"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PriorityQueue {
    items;
    constructor() {
        this.items = [];
    }
    enqueue(item) {
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > item.priority) {
                this.items.splice(i, 0, item);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(item);
        }
    }
    dequeue() {
        if (this.items.length > 0)
            return this.items.shift();
    }
    print() {
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i].priority);
    }
}
exports.default = PriorityQueue;
