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

  // Heap structure is faster by ~10 seconds (consistent) for solving all of the 8-puzzles
  heapPush(newKey: pNode) {
    this.items.push(newKey);

    let curr = this.items.length - 1;

    while (curr > 0) {
      let parent = Math.floor((curr - 1) / 2);
      if (this.items[curr].priority < this.items[parent].priority) {
        // quick swap
        [this.items[curr], this.items[parent]] = [
          this.items[parent],
          this.items[curr],
        ];
        curr = parent;
      } else {
        break;
      }
    }
  }

  heapPop(): pNode | undefined {
    // swap root with last node
    const n = this.items.length;
    [this.items[0], this.items[n - 1]] = [this.items[n - 1], this.items[0]];

    // remove the last item
    const removedKey = this.items.pop();

    let curr = 0;

    while (2 * curr + 1 < this.items.length) {
      const leftIndex = 2 * curr + 1;
      const rightIndex = 2 * curr + 2;
      const minChildIndex =
        rightIndex < this.items.length &&
        this.items[rightIndex].priority < this.items[leftIndex].priority
          ? rightIndex
          : leftIndex;
      if (this.items[minChildIndex].priority < this.items[curr].priority) {
        [this.items[minChildIndex], this.items[curr]] = [
          this.items[curr],
          this.items[minChildIndex],
        ];
        curr = minChildIndex;
      } else {
        break;
      }
    }
    // finally return the removed key
    return removedKey;
  }
}

export interface pNode {
  item: node;
  priority: number;
}
