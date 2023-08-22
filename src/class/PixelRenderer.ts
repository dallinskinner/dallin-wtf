import type { PixelGrid } from "./NewPixelGrid";

export class PixelRenderer {
  ctx: CanvasRenderingContext2D;
  scale: number;

  constructor(pixelWidth: number, pixelHeight: number, scale: number) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelWidth * scale;
    canvas.height = pixelHeight * scale;
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get 2d context");
    this.ctx = ctx;
    this.scale = scale;
  }

  public render(
    pixels: PixelGrid,
    fillStyle: (
      value: number
    ) => string | CanvasGradient | CanvasPattern = defaultFillStyle,
    strokeStyle: (
      value: number
    ) => string | CanvasGradient | CanvasPattern = defaultStrokeStyle
  ) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    for (let x = 0; x < pixels.grid.length; x++) {
      for (let y = 0; y < pixels.grid[x].length; y++) {
        this.ctx.fillStyle = fillStyle(pixels.grid[x][y]);
        // console.log(x, y);
        // this.ctx.strokeStyle = strokeStyle(pixels.grid[x][y]);
        // this.ctx.lineWidth = 2;
        this.ctx.fillRect(
          x * this.scale,
          y * this.scale,
          this.scale,
          this.scale
        );

        // this.ctx.strokeRect(
        //   x * this.scale,
        //   y * this.scale,
        //   this.scale,
        //   this.scale
        // );
      }
    }
  }
}

function defaultFillStyle(value: number) {
  return `rgba(255, 255, 255, ${value})`;
}

function defaultStrokeStyle() {
  return "#000";
}
