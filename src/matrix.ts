import { Art } from "./Art";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const NUMBERS = "0123456789".split("");
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;':,./<>?".split("");

const getLetters = () => LETTERS[Math.floor(Math.random() * LETTERS.length)];
const getNumbers = () => NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
const getSymbols = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

const getRandomChar = () => {
	const types = [getLetters, getNumbers, getSymbols];
	return types[Math.floor(Math.random() * types.length)]();
};
export class Matrix extends Art {
	strips: Strip[];
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.fullScreen();
		this.background("#000");
		let texts = ["Made By Yog Panjarale","I hope you are doing well if you are reading this!","nice observation skills of you to observe this text and thank you"]
        this.strips= texts.map(text=>this.getStripFromText(text))
        fetch("/data/quotes.json").then(res => res.json()).then(data => {
            texts = data;
            this.strips = [...this.strips,...texts.map((text) => this.getStripFromText("   "+text))];
        });
	}
    getStripFromText(text: string) {
        let randomX = Math.random() * this.width;
        let w = this.width
			let randomSpeed = getRandomSpeed();
			// const randomSize = getRandomSize()
        let cb = () => {
            return {
                letters: Array.from(text),
                speed: getRandomSpeed(),
                x:Math.random() * w/10 * 10
            };
        }
        let strip = new Strip(
            this.ctx,
            Array.from(text),
            randomX,
            randomSpeed,
            cb
        )
        return strip;
    }
            
    getCB = () => {
        return () => this.newStripCB(this.width);
    }
	newStripCB(width: number) {
		let randomX = Math.random() * width/10 * 10;
        let randomSpeed = getRandomSpeed();
        const randomSize = getRandomSize();
		const randomChars = Array.from({ length: randomSize }, () => getRandomChar());
        // console.log({randomChars});
        
		return {
			letters: randomChars,
			speed: randomSpeed,
			x: randomX,
		};
	}
	getRandomCharArr(size: number) {
		return Array.from({ length: size }, () => getRandomChar());
	}

	draw() {
		this.background("rgb(0,0,0)");
		this.strips.forEach((strip) => strip.update());
		this.strips.forEach((strip) => strip.draw());
		requestAnimationFrame(this.draw.bind(this));
	}
}
class Strip {
	height: number = Math.floor(Math.random()*10)+15;
	y = 0;
	constructor(
		public ctx: CanvasRenderingContext2D,
		public letters: string[],
		public x: number,
		public speed: number,
		public cb: () => { letters: string[]; speed: number; x: number }
	) {}
	update() {
		this.y += this.speed;
		if (this.y > this.ctx.canvas.height) {
			let d = this.cb();
			this.letters = d.letters;
			this.speed = d.speed;
            this.x = d.x;
            // console.log(this);
            
            this.y=-(this.height+this.letters.length);
		}
	}
	draw() {
		this.letters.forEach((letter, i) => {
			this.ctx.fillStyle = `rgba(0,255,0,${
				((i + 1) / this.letters.length)
			})`;
			let y = this.y + i * this.height;
            this.ctx.font = `${Math.floor(this.height*0.9)}px 'Fira Code'`;
			this.ctx.fillText(letter, this.x, y);
			// console.log(letter, this.x, y);
		});
	}
}
function getRandomSize() {
    return Math.floor(Math.random() * 50);
}

function getRandomSpeed() {
    return 1 + Math.random() * 5;
}

