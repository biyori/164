import { node } from "./node";

export class PriorityQueue {
  items: pNode[];
  /**
   * Priority queue
   */
  constructor() {
    this.items = [];
  }

  enqueue(item: pNode): void {
    let contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > item.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, item);
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push(item);
    }
  }

  dequeue(): pNode | undefined {
    // Return the front element
    if (this.items.length > 0) return this.items.shift();
    return undefined;
  }

  empty(): boolean {
    return this.items.length === 0;
  }

  print(): void {
    for (let i = 0; i < this.items.length; i++)
      console.log(this.items[i].priority);
  }
}

export interface pNode {
  item: node;
  priority: number;
}
