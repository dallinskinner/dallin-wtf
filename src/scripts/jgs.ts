import { ASCIIRenderer, JGS_INVERT_RAMP } from "../class/ASCIIRenderer";
import { PerlinNoiseGrid } from "../class/PerlinNoiseGrid";
import { Effects } from "../class/Effects";

const width = 150;
const height = 50;

const renderer = new ASCIIRenderer(JGS_INVERT_RAMP, { classList: ["jgs"] });
const pixels = new PerlinNoiseGrid(width, height, 0.0075);

const speed = 0.00075;

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
