import { Art } from "./Art";
import { Vector2D } from "./utils";

export class Circle extends Art {
    position: Vector2D;
    radius = 200;
    ticks = 10;
    angle = 0;
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.setup();
    }
    setup(): void {
        this.position = new Vector2D(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        
     }
    draw(): void {
        const {width,height} = this.ctx.canvas;
        this.ctx.strokeStyle = "rbga(0,0,0,0.01)";
        this.ctx.lineWidth = 0.1;
        const center = new Vector2D(width / 2, height / 2);
        const path = new Path2D();
        const {x,y} = this.position;
        path.moveTo(x,y);
        const p = {
            x: center.x + this.radius * Math.cos(this.angle),
            y: center.y + this.radius * Math.sin(this.angle)
        }
        this.position.x = p.x;
        this.position.y = p.y;
        path.lineTo(p.x, p.y);
        this
        this.ctx.stroke(path);
        // delay(1 000);
        this.angle += Math.PI*(1+Math.random());
        this.ticks++;
        // if thick > 200 
        if (this.ticks > 2) {
            this.ticks = 0;
            // this.radius = Math.random() * 2;
        }
        console.log(this.angle);
        if (this.angle < Math.PI * 20000) {
        setTimeout(() => {
            this.draw();
        }, 25);
        }

    }
}