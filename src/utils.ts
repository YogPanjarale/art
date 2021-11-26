export const repeat = (n: number, action: (n:number) => void) => {
    for (let i = 1; i <= n; i++) {
        action(n);
    }
}
export class Vector2D {
	constructor(public x: number, public y: number) {}
	add(v: Vector2D) {
		return new Vector2D(this.x + v.x, this.y + v.y);
	}
	sub(v: Vector2D) {
		return new Vector2D(this.x - v.x, this.y - v.y);
	}
    distance(v: Vector2D) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }
	normalize() {
		const length = this.length();
		return new Vector2D(this.x / length, this.y / length);
	}
	multiply(n: number) {
		return new Vector2D(this.x * n, this.y * n);
	}
	length() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	toString() {
		return { x: this.x, y: this.y };
	}
}
export const randRange = (min: number, max?: number) => {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	if (min%1 !== 0 || max%1 !== 0) {
		throw new Error('randRange requires integer arguments , use randFloat');
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const randFloat = (min: number, max?: number) => {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	return Math.random() * (max - min) + min;
}
export const randInt = (min: number, max?: number) => {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const randBool = () => {
	return Math.random() < 0.5;
}