export default class Stack {
  items: Item[];
  /**
   * Stack
   */
  constructor() {
    this.items = [];
  }

  push(item: Item): void {
    this.items.push(item);
  }

  pop(): Item | undefined {
    // Return the front element
    if (this.items.length > 0) return this.items.pop();
  }

  print(): void {
    for (let i = 0; i < this.items.length; i++)
      console.log(this.items[i].itemData);
  }
}

export interface Item {
  itemData: any;
}
