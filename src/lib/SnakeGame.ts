import { randRange, Vector2D } from "./utils"

const snake:Vector2D[] =[ ...Array.from({length:1},(v,i)=>new Vector2D(i,0))]
const food = [new Vector2D(5,5) ]
const d = {
    up: new Vector2D(0,-1),
    down: new Vector2D(0,1),
    left: new Vector2D(-1,0),
    right: new Vector2D(1,0),
    zero: new Vector2D(0,0)
}
let dir : Vector2D = d.zero
let c:CanvasRenderingContext2D

window.addEventListener("keydown",{

    handleEvent(e:KeyboardEvent){
        const k = e.key
        console.log(k);
        
        switch(e.key){
            case "ArrowUp":
                dir = d.up
                break
            case "ArrowDown":
                dir = d.down
                break
            case "ArrowLeft":
                dir = d.left
                break
            case "ArrowRight":
                dir = d.right
                break
        }
        // console.log(dir);
    }

})
function generateFood():Vector2D{
    const x = randRange(0,10);
    const y = randRange(0,10);
    const f = new Vector2D(x,y)
    if(snake.some(s=>s.equals(f))){
        return generateFood()
    }
    console.log(f);
    
    return f
}

function psy(){
    // move snake
    // console.log(snake)
    const head = snake[0]
    const newHead = head.add(dir)
    // check if snake is eating food
    const ate = food.some(f=>f.equals(newHead))
    if (ate) {
        food.splice(food.indexOf(newHead), 1)
        // add new food
        const newFood = generateFood()
        food.push(newFood)
    }
    else {
        // remove tail
        snake.pop()
    }
    // check if snake is dead
    const dead = snake.some(s=>s.equals(newHead))
    if (dead) {
        console.log("dead")
        dir = d.zero
    }
    // check collision with wall
    const wall = newHead.x < 0 || newHead.x > 9 || newHead.y < 0 || newHead.y > 9
    if (wall) {
        console.log("wall")
        dir = d.zero
    }
    
    
    snake.unshift(newHead)

}

function draw(){
    
    // console.log("draw",);
        
        // draw a grid of 10x10 squares alternating color
        const gridSize = 10
        const s = DrawGrid(gridSize, c)
        // draw snake of variable width
        drawPoints(c,[...snake],s)
        // draw food
        DrawFood(c,[...food],s)
}
export default class SnakeGame {
    constructor(public ctx:CanvasRenderingContext2D) {
        c = ctx
    }
    public draw():void {
        setInterval(() => {
            psy()
            draw()
        }, 1000/3);

       
    }

   
}
function DrawGrid(gridSize: number, c: CanvasRenderingContext2D) {
    const w = c.canvas.width
    const h = c.canvas.height
    const n = gridSize
    const s = w / n
    c.fillStyle = "rgb(115,155,55)"
    c.fillRect(0, 0, w, h)
    c.fillStyle = "rgb(215,255,155)"
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if ((i + j) % 2) {
                c.fillRect(i * s, j * s, s, s)
            }
        }
    }
    // draw brown border 
    c.strokeStyle = "black"
    c.lineWidth = 12
    c.strokeRect(0, 0, w, h)
    return s
}
function DrawFood(c: CanvasRenderingContext2D,foods:Vector2D[], s: number) {
    foods.forEach(fb=>{
        c.fillStyle = 'red'
        let f = new Vector2D(fb.x*s,fb.y*s)
        f= f.add(new Vector2D(s/5,s/5))
        c.fillRect(f.x, f.y, s *0.6, s*0.6)
    })

}
function lerp(a: number, b: number, t: number):number {
    return (1 - t) * a + t * b;
  }
function drawPoints(ctx:CanvasRenderingContext2D,points_in:Vector2D[],s:number) {
    const points:Vector2D[] = []
    
    points_in = points_in.map(p=>{
        const p2 = new Vector2D(p.x*s,p.y*s)
        return p2.add(new Vector2D(s/2,s/2))
    })

    for (let i = 0; i < points_in.length; i++) {
        const p = points_in[i];
        if (i === 0) {
            points.push(p)
        }
        else {
            const prev = points_in[i-1]
            const avg = new Vector2D(
                lerp(prev.x,p.x,0.5),
                lerp(prev.y,p.y,0.5)
            )

            points.push(p,avg)
        }
    }

    
    ctx.lineWidth = 5
    ctx.strokeStyle = "#F30B37";
    points.forEach((p,i)=>{
        ctx.fillStyle = "#F39B37"
        const isEnd = i === points.length  || i === 0
        // circle 
        ctx.beginPath()
        const r = map(i,points.length,0,s/5,s/4)
        // ctx.arc(p.x,p.y,r,0,2*Math.PI)
        ctx.ellipse(p.x,p.y,r,r,0,0,2*Math.PI)
        if (!isEnd){
            const prev = points[i-1]
            // check angle between prev and current
            const angle = Math.atan2(p.y-prev.y,p.x-prev.x)
            // draw arc 
            ctx.moveTo(p.x,p.y)
            ctx.lineTo(p.x+Math.cos(angle)*r,p.y+Math.sin(angle)*r)
            ctx.stroke()
        }

        ctx.fill()

    })

}
export function clamp(input: number, min: number, max: number): number {
    return input < min ? min : input > max ? max : input;
  }
  
  export function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    return clamp(mapped, out_min, out_max);
  }