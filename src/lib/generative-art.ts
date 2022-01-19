/* eslint-disable @typescript-eslint/no-unused-vars */

import { Art } from "./Art";

export class GenerativeArt extends Art {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	drawing = false;
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.ctx = ctx;
		//set width and height to window
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}
	draw(): void {
		const { ctx } = this;
		let { drawing } = this;
		window.addEventListener("mouseover",()=>{
			//check if in iframe
			if (window.location!=window.parent.location) {
				drawing = true;
			}
		})
		window.addEventListener("mousemove", function (e) {
			if (drawing) {
				const root = new Root(ctx, e.x, e.y);
				root.update();
			}
		});
		window.addEventListener("mousedown", (_e) => {
			drawing = true;
		});
		window.addEventListener("mouseup", (_e) => {
			drawing = false;
		});
		this.drawing = drawing;
	}
}
class Vector2D {
	constructor(public x: number, public y: number) {}
	add(v: Vector2D) {
		return new Vector2D(this.x + v.x, this.y + v.y);
	}
	sub(v: Vector2D) {
		return new Vector2D(this.x - v.x, this.y - v.y);
	}
}
class Flower {
	image: HTMLImageElement;
	maxFlowerSize: number;
    frameSize: number;
	constructor(
		public ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number,
		public size: number
	) {
		this.image = new Image();
		this.image.src = "https://frankslaboratory.co.uk/downloads/flowers.png";
		this.image.onload = () => {
			console.log("image loaded");
		};

		this.maxFlowerSize = this.size + Math.random() * 50;
        this.frameSize=50;
	}
	grow() {
		if (this.size < this.maxFlowerSize) {
			this.size += 0.3;
		
		if (this.image.loading) {
			this.image.onload = () => {
				this.flowerImage();
			};
		} else {
			this.flowerImage();
		}
        console.log("growing");
        requestAnimationFrame(this.grow.bind(this));
    }
		// console.log(this.image , this.x,this.y,this.size,this.size);
	}
    flowerImage(){
        // this.ctx.drawImage(
        //     this.image,
        //     0,0,this.frameSize,this.frameSize,
        //     this.x,
        //     this.y,
        //     50 ,
        //     50
        // );
    }
	update() {
		const { ctx, x, y } = this;
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI * 2, false);
		ctx.fill();
		console.log(this.image);
		ctx.drawImage(this.image, x - 10, y - 10, 20, 20);
		ctx.stroke();
	}
}

class Root {
	speed: Vector2D = new Vector2D(0, 0);
	maxSize: number;
	size: number;
	angle: Vector2D = new Vector2D(0, 0);
	growthspeed: number;
	velocityangle: Vector2D = new Vector2D(0, 0);
	constructor(
		public ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number
	) {
		this.speed.x = Math.random() * 4 - 2;
		this.speed.y = Math.random() * 4 - 2;
		this.maxSize = Math.random() * 5 + 5;
		this.size = Math.random() * 1 + 2;
		this.growthspeed = Math.random() * 0.1 + 0.05;
		this.angle.x = Math.random() * 2 * Math.PI;
		this.angle.y = Math.random() * 2 * Math.PI;
		this.velocityangle.x = Math.random() * 0.6 - 0.3;
		this.velocityangle.y = Math.random() * 0.6 - 0.3;
	}
	update() {
		this.x += this.speed.x + Math.sin(this.angle.x);
		this.y += this.speed.y + Math.sin(this.angle.y);
		this.size += this.growthspeed;
		this.angle = this.angle.add(this.velocityangle);
		if (this.size < this.maxSize) {
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
			this.ctx.fillStyle = `hsl(140,${
				(this.size / this.maxSize) * 60 + 40
			}%,${Math.pow(this.size / this.maxSize, 3) * 20 + 30}%)`;
			this.ctx.fill();
			this.ctx.strokeStyle = `hsl(140,${
				(this.size / this.maxSize) * 50 + 30
			}%,50%)`;
			this.ctx.stroke();

			requestAnimationFrame(this.update.bind(this));
		} else if (this.size > 8) {
			console.log("flower");
			const flower = new Flower(this.ctx, this.x, this.y, this.size);
			flower.grow();
		}
	}
}
