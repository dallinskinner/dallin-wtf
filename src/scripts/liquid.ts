import { ASCIIRenderer, INVERT_RAMP } from "../class/ASCIIRenderer";
import { PerlinNoiseGrid } from "../class/PerlinNoiseGrid";
import { Effects } from "../class/Effects";
import { PixelRenderer } from "../class/PixelRenderer";

const width = 100;
const height = 100;

const renderer = new ASCIIRenderer(INVERT_RAMP);
// const renderer = new PixelRenderer(width, height, 10);
const pixels = new PerlinNoiseGrid(width, height, 0.1);

const speed = 0.01;

let brightening = true;

function draw() {
  renderer.render(pixels);

  if (brightening) {
    Effects.brighten(pixels, speed);
  } else {
    Effects.darken(pixels, speed);
  }

  if (brightening && pixels.min() >= 1) {
    brightening = false;
    pixels.mutate("white");
  }

  if (!brightening && pixels.max() <= 0) {
    brightening = true;
    pixels.mutate("black");
  }
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
