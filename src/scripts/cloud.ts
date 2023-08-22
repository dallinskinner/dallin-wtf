import p5 from "p5";

const inc = 0.005;
let xoff = 0;
let yoff = 0;
let counter = 0;

let scrollSlider: p5.Element;
let densitySlider: p5.Element;

new p5((p5: p5) => {
  p5.setup = () => {
    p5.createCanvas(500, 500);
    p5.frameRate(60);
    scrollSlider = p5.createSlider(1, 5, 1, 0.5);
    densitySlider = p5.createSlider(0.01, 0.1, inc, 0.005);
    // p5.noLoop();
  };

  p5.draw = () => {
    p5.loadPixels();
    p5.background(100);
    p5.noFill();

    const density = densitySlider.value() as number;
    const scroll = scrollSlider.value() as number;

    yoff = counter * (density / scroll);

    for (let y = 0; y < p5.height; y++) {
      xoff = 0;

      for (let x = 0; x < p5.width; x++) {
        let index = (x + y * p5.width) * 4;
        let alpha = p5.noise(xoff, yoff) * 255;

        p5.pixels[index] = 255;
        p5.pixels[index + 1] = 255;
        p5.pixels[index + 2] = 255;
        p5.pixels[index + 3] = alpha;

        xoff += density;
      }
      yoff += density;
    }

    p5.updatePixels();
    counter++;
  };
});
