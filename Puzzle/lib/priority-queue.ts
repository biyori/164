export class PriorityQueue {
  items: QueueItem[];
  /**
   * Priority queue
   */
  constructor() {
    this.items = [];
  }

  enqueue(item: QueueItem): void {
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

  dequeue(): QueueItem | undefined {
    // Return the front element
    if (this.items.length > 0) return this.items.shift();
  }

  print(): void {
    for (let i = 0; i < this.items.length; i++)
      console.log(this.items[i].priority);
  }
}

export interface QueueItem {
  itemData: any;
  priority: number;
}
