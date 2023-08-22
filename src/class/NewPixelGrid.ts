export class PixelGrid {
  grid: number[][];

  constructor(width: number, height: number) {
    this.grid = new Array(width).fill(0).map(() => new Array(height).fill(0));
  }

  width() {
    return this.grid.length;
  }

  height() {
    return this.grid[0].length;
  }
}
