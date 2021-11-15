import { Art } from "./Art";

export class Paper extends Art {
	padding: number = 50;
    points :number[][]=[[]];
    n:number=9;
    gap: number;
    showpoints=false;
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
        this.padding = this.width/10;
        this.generatePoints(this.n);
        this.gap = this.width/this.n;
	}
    generatePoints(n:number){
        this.points = [];
        // two level loop with i and j
        for (let i=1;i<n;i++){
            for (let j=1;j<n;j++){
                let gap = this.width/n;
                this.points.push([j*gap,i*gap]);
            }
        }
    }
	draw() {
        this.points.forEach((point:number[],i)=>{
            const[x1,y1] = point;
            if (this.showpoints)this.point(x1,y1,3)
            const[x2,y2] = this.points[(i+1)%this.points.length];
            if ((i+1)%(this.n-1)==0)return
            this.line(x1,y1,x2,y2);
        });
	}

}
function clamp(num: number, min: number, max: number) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }
const randomRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};
export class PaperDisplaced extends Paper {

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.n=30
        this.generatePoints(this.n);
        this.displacePoints();
    }
    displacePoints(){
        const {n}= this
        // return2
        // console.log(this.points);
        
        for (let i=0;i<(n-1)*(n-1);i++){
                const x = this.points[i][0];
                const y = this.points[i][1];
                let m = clamp((x/this.width)*(y/this.height)*25,0,this.width/(n*2
                    ));
                
                const x1 = x + randomRange(-m,m);
                const y1 = y + randomRange(-m,m);
                this.points[i][0]=x1;
                this.points[i][1]=y1;
        }
        
        // this.loopYX(n,n,(x:number,y:number,i:number)=>{
        //     x*=this.width/n;
        //     y*=this.height/n;
        //     let randdist = Math.random()*2 -1;
        //     this.point(x,y,i)
        //     this.points[i-1][1]+= randdist*10
        // });
    }
}