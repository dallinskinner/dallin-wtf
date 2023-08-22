import { makeNoise2D } from "fast-simplex-noise";
import { PixelGrid } from "./NewPixelGrid";
import { max as ld_max, min as ld_min } from "lodash";
import rangeMap from "range-map";

type Brightness = "black" | "white";

export class PerlinNoiseGrid extends PixelGrid {
  inc: number;
  seed = Math.random();

  constructor(
    width: number,
    height: number,
    inc = 0.01,
    brightness: Brightness | null = "black"
  ) {
    super(width, height);
    this.inc = inc;
    this.generateNoiseValues(brightness);
  }

  private generateNoiseValues(brightness: Brightness | null = null) {
    const noise = makeNoise2D(() => this.seed);

    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        this.grid[x][y] = rangeMap(
          noise(x * this.inc, y * this.inc),
          -1,
          1,
          0,
          1
        );
      }
    }

    if (brightness) {
      this.adjustBrightnessTo(brightness);
    }
  }

  private adjustBrightnessTo(brightness: Brightness) {
    const offset = this.getBrightnessOffset(brightness);

    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        this.grid[x][y] = this.grid[x][y] + offset;
      }
    }
  }

  private getBrightnessOffset(brightness: Brightness) {
    if (brightness === "black") {
      return 0 - this.max();
    } else {
      return 1 - this.min();
    }
  }

  mutate(brightness: Brightness | null = null) {
    this.seed = Math.random();
    this.generateNoiseValues(brightness);
  }

  public max() {
    return ld_max(this.grid.map(ld_max)) ?? 1;
  }

  public min() {
    return ld_min(this.grid.map(ld_min)) ?? 0;
  }
}
