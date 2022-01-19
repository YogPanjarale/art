import { TileStraight } from "./TileStraight";

export class TileSlant extends TileStraight {
    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
    }
    draw(): void{
        this.tiles(20)
    }
    leftRightRandomLine(cx:number, cy:number,length:number): void{
      const x1 = cx - (length/2);
      const y1 = cy - (length/2);
      const x2 = cx + (length/2);
      const y2 = cy + (length/2);
      const leftToRight = Math.random() >= 0.5;
      if (leftToRight) {
        this.line(x1, y1, x2, y2);
      } else {
        this.line(x2, y1, x1, y2);
      }
    }
  }