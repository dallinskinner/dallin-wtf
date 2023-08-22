import type p5 from "p5";
import { PixelGrid, RenderOptions } from "./PixelGrid";

export class NoiseGrid extends PixelGrid {
  counter = 0;
  width: number;
  height: number;
  inc: number;
  background: p5.Color;

  constructor(
    width: number,
    height: number,
    p5: p5,
    {
      inc = 0.05,
      background = p5.color(0),
    }: { inc?: number; background?: p5.Color } = {}
  ) {
    super(width, height, p5);

    this.width = width;
    this.height = height;
    this.inc = inc;
    this.background = background;
  }

  render(options: RenderOptions) {
    this.p5.background(this.background);
    this.fill();
    super.render(options);
    this.counter++;
  }

  private fill() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.grid[x][y] =
          this.p5.noise(x * this.inc, (y + this.counter) * this.inc) * 255;
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

    this.p5.fill(255, this.grid[x][y]);
    this.p5.square(x * scale, y * scale, scale);
  }
}
