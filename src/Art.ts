export class Art {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}
	fullScreen() {
		this.ctx.canvas.width = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
	}
	line(x1: number, y1: number, x2: number, y2: number) {
		// this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
	circle(x: number, y: number, r: number) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2);
		this.ctx.stroke();
	}
	rect(x: number, y: number, w: number, h: number, color: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);
		
	}
	point(x: number, y: number, thickness: number = 1) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, thickness, 0, 2 * Math.PI);
		this.ctx.fill();
	}
	getColor(x: number, y: number) {
		return this.ctx.getImageData(x, y, 1, 1).data;
	}
	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	draw() {
		console.log(this);
	}
	loopXY(x: number, y: number, cb: (x: number, y: number,i:number) => void) {
		for (let i = 1; i < x; i++) {
			for (let j = 1; j < y; j++) {
				cb(i, j,i*j);
			}
		}
	}
	loopYX(x: number, y: number, cb: (x: number, y: number,i:number) => void) {
		for (let i = 1; i < y; i++) {
			for (let j = 1; j < x; j++) {
				cb(i, j,i*j);
			}
		}
	}
}
