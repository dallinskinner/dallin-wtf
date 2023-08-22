import type { PixelGrid } from "./NewPixelGrid";

export class Effects {
  public static darken(pixels: PixelGrid, increment: number) {
    pixels.grid.forEach((row, x) =>
      row.forEach((cell, y) => (pixels.grid[x][y] = cell - increment))
    );
  }

  public static brighten(pixels: PixelGrid, increment: number) {
    pixels.grid.forEach((row, x) =>
      row.forEach((cell, y) => (pixels.grid[x][y] = cell + increment))
    );
  }
}
