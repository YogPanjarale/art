import { TileStraight } from "./TileStraight";

export class TileSlant extends TileStraight {
    constructor(ctx: CanvasRenderingContext2D) {
      super(ctx);
    }
    draw(){
        this.tiles(20)
    }
    leftRightRandomLine(cx:number, cy:number,length:number){
      let x1 = cx - (length/2);
      let y1 = cy - (length/2);
      let x2 = cx + (length/2);
      let y2 = cy + (length/2);
      let leftToRight = Math.random() >= 0.5;
      if (leftToRight) {
        this.line(x1, y1, x2, y2);
      } else {
        this.line(x2, y1, x1, y2);
      }
    }
  }