import { Art } from './Art';

export class Swastik extends Art {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
  draw() {
    this.line(this.width / 2, 50, this.width / 2, this.height - 50);
    this.line(50, this.height / 2, this.width - 50, this.height / 2);
    this.line(50, this.height / 2, 50, 50);
    this.line(this.width / 2, this.height - 50, 50, this.height - 50);
    this.line(this.width - 50, this.height / 2, this.width - 50, this.height - 50);
    this.line(this.width / 2, 50, this.width - 50, 50);
  }
}
