export class Queue<T> {
  items: T[];
  /**
   * Queue (FIFO)
   */
  constructor() {
    this.items = [];
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    // Return the front element
    if (this.items.length > 0) return this.items.shift();
    return undefined;
  }

  empty(): boolean {
    return this.items.length === 0;
  }

  print(): void {
    for (let i = 0; i < this.items.length; i++) console.log(this.items[i]);
  }
}
