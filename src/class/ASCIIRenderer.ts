import rangeMap from "range-map";
import type { PixelGrid } from "./NewPixelGrid";

export const DEFAULT_RAMP =
  "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
export const INVERT_RAMP = Array.from(DEFAULT_RAMP).reverse().join("");

export const JGS_RAMP = "▓▒#«%░(|/=-:. ";
export const JGS_INVERT_RAMP = Array.from(JGS_RAMP).reverse().join("");

export const LINE_RAMP = "/\\/\\/\\/\\/\\/\\";
// export const LINE_RAMP = "_/_\\_/_\\_/_\\_/_\\_/_\\_/_\\_";
// export const LINE_RAMP = "/(\\)/(\\)/(\\)/(\\)/(\\)/(\\)";

interface Options {
  classList?: string[];
}

export class ASCIIRenderer {
  ramp: string;
  element: HTMLElement;

  constructor(ramp = DEFAULT_RAMP, { classList = [] }: Options = {}) {
    this.ramp = ramp;
    this.element = document.createElement("pre");
    this.element.classList.add(...classList);
    document.body.prepend(this.element);
  }

  private getStringFromPixels(pixels: PixelGrid) {
    let s = "";
    for (let y = 0; y < pixels.height(); y++) {
      for (let x = 0; x < pixels.width(); x++) {
        const index = Math.floor(
          rangeMap(pixels.grid[x][y], 0, 1, 0, this.ramp.length - 1, true)
        );

        s += this.ramp[index];
      }
      s += "\n";
    }

    return s;
  }

  public render(pixels: PixelGrid) {
    const newString = this.getStringFromPixels(pixels);

    const previousString = this.element.innerText;

    if (newString !== previousString) {
      this.element.innerText = newString;
    }
  }
}
