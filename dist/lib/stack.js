"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    items;
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        if (this.items.length > 0)
            return this.items.pop();
    }
    print() {
        for (let i = 0; i < this.items.length; i++)
            console.log(this.items[i].itemData);
    }
}
exports.default = Stack;
