import { ASCIIRenderer, LINE_RAMP } from "../class/ASCIIRenderer";
import { PerlinNoiseGrid } from "../class/PerlinNoiseGrid";
import { Effects } from "../class/Effects";

const width = 64;
const height = 40;

const renderer = new ASCIIRenderer(LINE_RAMP, { classList: ["jgs"] });
const pixels = new PerlinNoiseGrid(width, height, 0.025, null);

const speed = 0.0025;

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
