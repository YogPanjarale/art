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
}