import { Art } from './Art';
import {Vector2D} from './utils'
const pi = Math.PI
export class Saraswati extends Art {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }
  draw(): void {
    
    const s = new Vector2D(400,250) //start point (bottom anchor)
    const c = new Vector2D(375,175)
    const r = 25
    
    const path = this.Ear(s,c, r,true);
    this.ctx.strokeStyle = "rgb(10,10,10)"
    this.ctx.lineWidth = 1
    this.ctx.stroke(path)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const svg = `
    <svg width="120" height="277" viewBox="0 0 120 277" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M107.5 3C12.9998 29 -75.5 58 118 274.5" stroke="black" stroke-width="5"/>
</svg>
`
    
  }
    private Ear(start: Vector2D, center:Vector2D,radius: number,debug=false) {
        const [s,c,r] =[ start,center,radius]
        const path = new Path2D();
        path.moveTo(50,50)
        const p1 = new Vector2D(s.x, s.y);
        //pivot
        const pv = new Vector2D(c.x-r,c.y+r);
        //destination
        const p2 = new Vector2D(c.x-r,c.y);
        this.bezier(path, p1, pv, p2);
        // arc center
        const ac = new Vector2D(p2.x + r, p2.y);
        path.arc(ac.x, ac.y, r, pi*.9, pi * 2.25);
        if (debug){
            this.pointv(p1);
            this.pointv(p2);
            this.pointv(pv);
            this.pointv(ac);
            console.table({ start,center,radius,p1, p2, pv ,arc_center:ac });
        }
        return path;
    }

  pointv(p:Vector2D): void{
      this.point(p.x,p.y,2)
  }
  bezier(path:Path2D,cp1:Vector2D,cp2:Vector2D,p:Vector2D):void{
    path.bezierCurveTo(cp1.x,cp1.y,cp2.x,cp2.y,p.x,p.y)
  }
}
