export class Art {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}
	/** Make the canvas size to fullscreen*/
	fullScreen(): void {
		this.ctx.canvas.width = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
		this.width = this.ctx.canvas.width;
		this.height = this.ctx.canvas.height;
	}
	/**
	 * draws a line from (x1,y1) to (x2,y2)
	 */
	line(x1: number, y1: number, x2: number, y2: number): void {
		// this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
	/**
	 * Clears the canvas and fill it with a color
	 * @param color : string;
	 * 
	 */
	background(color: string): void {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
	/**
	 * 
	 * @param x x-coordinate
	 * @param y y-coordinate
	 * @param r radius
	 */
	circle(x: number, y: number, r: number): void {
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2);
		this.ctx.stroke();
	}
	rect(x: number, y: number, w: number, h: number, color: string): void {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);
		
	}
	point(x: number, y: number, thickness = 1): void {
		this.ctx.beginPath();
		this.ctx.arc(x, y, thickness, 0, 2 * Math.PI);
		this.ctx.fill();
	}
	getColor(x: number, y: number): Uint8ClampedArray {
		return this.ctx.getImageData(x, y, 1, 1).data;
	}
	clear(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	draw(): void {
		console.log(this);
	}
	loopXY(x: number, y: number, cb: (x: number, y: number,i:number) => void): void {
		for (let i = 1; i < x; i++) {
			for (let j = 1; j < y; j++) {
				cb(i, j,i*j);
			}
		}
	}
	loopYX(x: number, y: number, cb: (x: number, y: number,i:number) => void): void {
		for (let i = 1; i < y; i++) {
			for (let j = 1; j < x; j++) {
				cb(i, j,i*j);
			}
		}
	}
}
