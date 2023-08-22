import type p5 from "p5";

export interface RenderOptions {
  scale: number;
  stroke?: number;
}

export class PixelGrid {
  p5: p5;
  grid: number[][];

  constructor(width: number, height: number, p5: p5) {
    this.grid = new Array(width).fill(0).map(() => new Array(height).fill(0));
    this.p5 = p5;
  }

  render(options: RenderOptions) {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        this.renderPixel(x, y, options);
      }
    }
  }

  protected renderPixel(
    x: number,
    y: number,
    { scale, stroke }: RenderOptions
  ) {
    if (stroke === undefined) {
      this.p5.noStroke();
    } else {
      this.p5.stroke(stroke);
    }

    this.p5.fill(this.grid[x][y]);
    this.p5.square(x * scale, y * scale, scale);
  }
}
