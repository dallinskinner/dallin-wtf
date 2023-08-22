import type { RenderOptions } from "./PixelGrid";
import { NoiseGrid } from "./NoiseGrid";

export class AsciiNoiseGrid extends NoiseGrid {
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
    this.p5.textSize(scale);
    this.p5.text("◼", x * scale, y * scale, scale, scale);
  }
}
