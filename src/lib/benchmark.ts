export class benchmark {
  private startTime: number;
  private endTime: number;
  constructor() {
    this.startTime = this.endTime = 0;
  }

  start(): void {
    this.startTime = performance.now();
  }
  stop(): number {
    this.endTime = performance.now();
    return this.endTime - this.startTime;
  }
}
