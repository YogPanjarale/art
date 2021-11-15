import { Art } from '../Art';

export class TileStraight extends Art {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
  draw() {
    this.tiles(20);
  }
  tiles(n: number) {
    n++;
    this.loopXY(n, n, (x: number, y: number) => {
      this.leftRightRandomLine(x * (this.width / n), y * (this.height / n), (this.width / n));
    });
  }
  leftRightRandomLine(cx: number, cy: number, length: number) {
    let x1 = cx - (length / 2);
    let y1 = cy - (length / 2);
    let x2 = cx + (length / 2);
    let y2 = cy + (length / 2);
    let strightToSlant = Math.random() >= 0.5;
    if (strightToSlant) {
      this.line(cx, y1, cx, y2);
    } else {
      this.line(x2, cy, x1, cy);
    }
  }
}
