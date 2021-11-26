import { Art } from "./Art";
import { Vector2D } from "./utils";

class LineX extends Art{
    thicknes:number = 50;
    turns: number = 10;
    constructor(ctx: CanvasRenderingContext2D, ) {
        super(ctx);
    }
    getRandomVectorOnCanvas(): Vector2D {
        const x = Math.random() * this.width;
        const y = Math.random() * this.height;
        return new Vector2D(x, y);
    }
    draw(){
        let previousPoint = this.getRandomVectorOnCanvas();
        // alert("ad")
        // set background to black
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.turns; i++) {
            const p = previousPoint
            let v = this.getRandomVectorOnCanvas();
            while(v.distance(previousPoint) < 100){
                v = this.getRandomVectorOnCanvas();
            }
            for (let j = 0; j < p.distance(v); j+=2) {
                const p = previousPoint
                const m1 = (p.distance(v));
                const m2 = (j);
                const p1 = this.sectionFormula(previousPoint.x,previousPoint.y,v.x,v.y,m1,m2);
                this.ctx.fillStyle = "rgba(255,255,255,0.5)";
            let w =  this.thicknes/this.turns * 10;

                this.circle(p1.x,p1.y,w/2);
            }
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(v.x, v.y);
            this.ctx.strokeStyle = "#ffa";
            this.ctx.lineWidth= this.thicknes/this.turns * 10;
            this.ctx.stroke();
            this.ctx.fillStyle = "rgba(0,0,0,0.1)"
            this.ctx.fillRect(0, 0, this.width, this.height);
            previousPoint = v;
        }
        // a retangle with a random size at vector prviousPoint
        // this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        // this.ctx.fillRect(previousPoint.x, previousPoint.y, this.thicknes, this.thicknes);

    }
    
    sectionFormula(x1: number,y1: number,x2: number,y2: number,m1: number,m2: number){
        const x = (m1*x1 + m2*x2)/(m1+m2);
        const y = (m1*y1 + m2*y2)/(m1+m2);
        return new Vector2D(x,y);
    }
}
export { LineX };