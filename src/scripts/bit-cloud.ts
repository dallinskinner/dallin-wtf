import p5 from "p5";
import { NoiseGrid } from "../class/NoiseGrid";
import type { PixelGrid } from "../class/PixelGrid";

const baseWidth = 128;
const baseHeight = 64;

const scale = 13;
let noiseGrid: PixelGrid;

new p5((p5: p5) => {
  p5.setup = () => {
    p5.createCanvas(baseWidth * scale, baseHeight * scale);
    p5.frameRate(2);
    // p5.noLoop();
    noiseGrid = new NoiseGrid(baseWidth, baseHeight, p5, {
      background: p5.color(0, 0, 255),
    });
  };

  p5.draw = () => {
    noiseGrid.render({ scale, stroke: 0 });
  };
});
