import { Art } from "./Art";

export class BloodVessels extends Art {
    ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
		this.ctx = ctx;
        //set width and height to window 
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}
    draw(): void{
        const ctx = this.ctx;
        window.addEventListener('mousemove', function (e){
            const root = new Root(ctx,e.x,e.y);
            root.update();
        })

    }
}
class Vector2D {
    constructor(public x: number, public y: number) { }
    add(v: Vector2D) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }
    sub(v: Vector2D) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }
}

class Root {
    speed: Vector2D = new Vector2D(0, 0);
    maxSize:number;
    size:number;
    angle: Vector2D = new Vector2D(0, 0);
    decreaseSpeed: number;
    velocityangle: Vector2D = new Vector2D(0, 0);
    isGreen: boolean;
    hue:number;
    constructor(public ctx:CanvasRenderingContext2D,public x:number,public y:number) {
        this.speed.x = Math.random() * 4 - 2;
        this.speed.y = Math.random() * 4 -2;
        this.maxSize = Math.random() * 5 + 5;
        this.size = Math.random() * 1 +2;
        this.decreaseSpeed = Math.random() * 0.1 + 0.05;
        this.angle.x = Math.random() * 2 * Math.PI;
        this.angle.y = Math.random() * 2 * Math.PI;
        this.velocityangle.x = Math.random() * 0.6 -0.3;
        this.velocityangle.y = Math.random() * 0.6 -0.3;
        this.size = this.maxSize;
        this.isGreen = Math.random() > 0.6;
        // if (this.isGreen){
        //     this.decreaseSpeed *=0.02;
        //     this.size*=0.2
        // }
        this.hue = this.isGreen ? 0: 240;
    }
    update(){
        this.x += this.speed.x + Math.sin(this.angle.x);
        this.y += this.speed.y + Math.sin(this.angle.y);
        this.size -= this.decreaseSpeed;
        this.angle = this.angle.add(this.velocityangle);
        if(this.size > 0){
            this.ctx.beginPath() 
            this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            this.ctx.fillStyle = `hsl(${this.hue},${(this.size/this.maxSize)*30+70}%,50%)`
            this.ctx.fill();
            this.ctx.strokeStyle = `hsl(${this.hue+10},${(this.size/this.maxSize)*50+30}%,40%)`;
            this.ctx.stroke();
            

            requestAnimationFrame(this.update.bind(this));
        }

    }
}