import { Art } from "./Art";
import { randFloat, randRange, Vector2D } from "./utils";

export class Bubbles extends Art {
	particles: Particle[] = [];
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.fullScreen();
        this.genrateParticles(100);
	}
    genrateParticles(count: number): void {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this.ctx, {x:randRange(20,this.width-20),y:randRange(50,randRange(this.height-50))}, {x:randFloat(-0.2,0.2),y:randFloat(0.2,1)},randRange(5,25),"#eeeeee"));
        }
    }
	draw(): void {
        this.ctx.fillStyle="rgba(0,0,0,0.5)"
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.fill();
        //loop through particles and draw them
        this.particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(this.draw.bind(this));
    }
}
class Particle {
	velocity: Vector2D = new Vector2D(0, 0);
	position: Vector2D = new Vector2D(0, 0);

	constructor(
		public ctx: CanvasRenderingContext2D,
		position: { x: number; y: number },
		velocity: { x: number; y: number },
		public size: number,
		public color: string
	) {
		this.velocity = new Vector2D(velocity.x, velocity.y);
		this.position = new Vector2D(position.x, position.y);
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
	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.p.x, this.p.y, this.size, 0, Math.PI * 2, false);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
	update() {
		const { width, height } = this.ctx.canvas;
		if (this.p.x + this.size > width || this.p.x - this.size < 0) {
			this.v.x = -this.v.x;
		}
		if (this.p.y + this.size > height || this.p.y - this.size < 0) {
			this.v.y = -this.v.y;
		}
        // console.log('update',);
        
		this.p=this.p.add(this.v);
	}
}
