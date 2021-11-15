import { Art } from "./Art";
import { Vector2D } from "./utils";
let mouse: Vector2D = new Vector2D(0, 0);
window.addEventListener("mousemove", (e) => {
	mouse = new Vector2D(e.clientX, e.clientY);
});



class ParticleManager {
    static particlesXY:Map<string,Point[]> = new Map<string,Point[]>();
    static addressMap:Map<number,string> = new Map<number,string>();
    static setParticle(p:Point){
        let x = Math.floor(p.p.x/50);
        let y = Math.floor(p.p.y/50);
        let key = `${x}-${y}`

        if(!ParticleManager.particlesXY.has(key)){
            ParticleManager.particlesXY.set(key,[p])
            this.addressMap.set(p.hash,key)
        }
        else{
            if (!this.addressMap.has(p.hash)){

            let arr = ParticleManager.particlesXY.get(key)!
            if (!arr.find(e=>e.hash==p.hash)){
                arr.push(p)
                this.addressMap.set(p.hash,key)
            }
        }else{
            let key2 = this.addressMap.get(p.hash)!
            let arr = ParticleManager.particlesXY.get(key2)!
            let old = arr.find(e=>e.hash==p.hash)!
            arr.splice(arr.indexOf(old))
            let arr2 = ParticleManager.particlesXY.get(key)!
            if (!arr2.find(e=>e.hash==p.hash)){
                arr2.push(p)
                this.addressMap.set(p.hash,key)
            }
            
        }
        }
    }
    static getParticles(p:Point){
        let x = Math.floor(p.p.x/100);
        let y = Math.floor(p.p.y/100);
        let key = `${x}-${y}`
        if(!ParticleManager.particlesXY.has(key)){
            return []
        }
        else{
            return ParticleManager.particlesXY.get(key)!
        }
    }

}

let id = 1
class Point {
	position: Vector2D;
	velocity: Vector2D;
	radius: number;
	ctx: CanvasRenderingContext2D;
	canvasSize: Vector2D;
    hash: number;
	constructor(
		ctx: CanvasRenderingContext2D,
		position: Vector2D,
		velocity: Vector2D,
		radius: number
	) {
		this.ctx = ctx;
		this.position = position;
		this.velocity = velocity;
		this.radius = radius;
		this.canvasSize = new Vector2D(ctx.canvas.width, ctx.canvas.height);
        this.hash=id+1000
        id++
	}

	public get p(): Vector2D {
		return this.position;
	}
	public set p(v: Vector2D) {
		this.position = v;
	}
	public get v(): Vector2D {
		return this.velocity;
	}
	public set v(v: Vector2D) {
		this.velocity = v;
	}
	checkBounds() {
		if (this.position.x > this.canvasSize.x || this.position.x < 0) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.position.y > this.canvasSize.y || this.position.y < 0) {
			// this.position.y = 0;
			this.velocity.y = -this.velocity.y;
		}
	}
	update() {
		this.position = this.position.add(this.velocity);
		this.checkBounds();
        ParticleManager.setParticle(this)
		// console.log("update", this.p, this.v);
	}
	draw() {
        let particles = ParticleManager.getParticles(this)
        particles.forEach(e=>{
            if (this.position.distance(e.position)<100){
                this.ctx.beginPath();
                this.ctx.moveTo(this.position.x, this.position.y);
                this.ctx.lineTo(e.position.x, e.position.y);
                this.ctx.stroke();
            }})
		if (this.position.distance(mouse) < this.radius * 50) {
			// console.log("mouse", mouse);
			//line to mouse
			this.ctx.beginPath();
			this.ctx.moveTo(this.position.x, this.position.y);
			this.ctx.lineTo(mouse.x, mouse.y);
            this.ctx.lineWidth=Math.min(50/this.position.distance(mouse),this.radius*10);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.arc(
				this.position.x,
				this.position.y,
				this.radius,
				0,
				Math.PI * 2
			);
			this.ctx.fillStyle = "#f0f";
			this.ctx.fill();
		} else {
			this.ctx.beginPath();
			this.ctx.arc(
				this.position.x,
				this.position.y,
				this.radius,
				0,
				Math.PI * 2
			);
			this.ctx.fillStyle = "#223";
			this.ctx.fill();
		}

		// console.log("draw", this.p, this.v);
	}
}

export class ParticlesDot extends Art {
	points: Point[] = [];
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		//width and height to screen
		this.ctx.canvas.width = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
		this.generatePoints(50);
	}
	generatePoints(amount: number = 30) {
		this.points = [];
		for (let i = 0; i < amount; i++) {
			const point = new Point(
				this.ctx,
				new Vector2D(
					Math.random() * this.width,
					Math.random() * this.height
				),
				new Vector2D(
					(Math.random() - 0.5) * 2,
					(Math.random() - 0.5) * 2
				),
				Math.random() * 3 + 1
			);
			this.points.push(point);
		}
	}
	draw() {
		// console.log("draw");
        this.ctx.clearRect(0, 0, this.width, this.height);
		this.points.forEach((point) => {
			point.draw();
			point.update();
		});
		requestAnimationFrame(this.draw.bind(this));
	}
}
