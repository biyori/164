"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
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
        return undefined;
    }
    empty() {
        return this.items.length === 0;
    }
    print() {
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i].priority);
    }
    heapPush(newKey) {
        this.items.push(newKey);
        let curr = this.items.length - 1;
        while (curr > 0) {
            let parent = Math.floor((curr - 1) / 2);
            if (this.items[curr].priority < this.items[parent].priority) {
                [this.items[curr], this.items[parent]] = [
                    this.items[parent],
                    this.items[curr],
                ];
                curr = parent;
            }
            else {
                break;
            }
        }
    }
    heapPop() {
        const n = this.items.length;
        [this.items[0], this.items[n - 1]] = [this.items[n - 1], this.items[0]];
        const removedKey = this.items.pop();
        let curr = 0;
        while (2 * curr + 1 < this.items.length) {
            const leftIndex = 2 * curr + 1;
            const rightIndex = 2 * curr + 2;
            const minChildIndex = rightIndex < this.items.length &&
                this.items[rightIndex].priority < this.items[leftIndex].priority
                ? rightIndex
                : leftIndex;
            if (this.items[minChildIndex].priority < this.items[curr].priority) {
                [this.items[minChildIndex], this.items[curr]] = [
                    this.items[curr],
                    this.items[minChildIndex],
                ];
                curr = minChildIndex;
            }
            else {
                break;
            }
        }
        return removedKey;
    }
}
exports.PriorityQueue = PriorityQueue;
