import { Art } from '../Art';

export class TileStraight extends Art {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
  draw(): void {
    this.tiles(20);
  }
  tiles(n: number): void {
    n++;
    this.loopXY(n, n, (x: number, y: number) => {
      this.leftRightRandomLine(x * (this.width / n), y * (this.height / n), (this.width / n));
    });
  }
  leftRightRandomLine(cx: number, cy: number, length: number): void {
    const x1 = cx - (length / 2);
    const y1 = cy - (length / 2);
    const x2 = cx + (length / 2);
    const y2 = cy + (length / 2);
    const strightToSlant = Math.random() >= 0.5;
    if (strightToSlant) {
      this.line(cx, y1, cx, y2);
    } else {
      this.line(x2, cy, x1, cy);
    }
  }
}
