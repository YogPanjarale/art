import { Art } from './Art';
import { GenerativeArt } from './generative-art';
import { Germs } from './germs';
import { BloodVessels } from './BloodVessels';
import { Paper, PaperDisplaced } from './Paper';
import { ParticlesDot } from './particles-dots';
// import './style.css'
import { Swastik } from './Swastik';
import { TileSlant } from './Tiles/TilesSlant';
import { TileStraight } from './Tiles/TileStraight';
import { Bubbles } from './bubbles';
import { LineX } from './LineX';
import { Matrix } from './matrix';
import  {Circle} from './Circle'
import {Saraswati} from './Saraswati'
import SnakeGame from './SnakeGame';
export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');


type route = "swastik"|"saraswati"| "tile-straight" | "tile-slant"| "paper-rulled" | "paper-displaced" | "generative-art" | "germs" | "particle-dots" | "blood-vessels"|"bubbles"| "linex"|"matrix"|"circle"|"snake";

function getArt(route:route, ctx:CanvasRenderingContext2D): Art{
  switch(route){
    case 'swastik':
      return new Swastik(ctx);
    case 'saraswati':
      return new Saraswati(ctx)
    case 'tile-slant':
      return new TileSlant(ctx);
    case 'tile-straight':
      return new TileStraight(ctx);
    case 'paper-rulled':
      return new Paper(ctx);
    case 'paper-displaced':
      return new PaperDisplaced(ctx);
    case 'generative-art':
      return new GenerativeArt(ctx);
    case 'germs':
      return new Germs(ctx);
    case 'particle-dots':
      return new ParticlesDot(ctx);
    case 'blood-vessels':
      return new BloodVessels(ctx);
    case 'bubbles':
      return new Bubbles(ctx);
    case 'linex':
      return new LineX(ctx);
    case 'matrix':
      return new Matrix(ctx);
    case 'circle':
      return new Circle(ctx);
    case 'snake':
      return new SnakeGame(ctx);
    default:
      return new Art(ctx);
  }
}
export { Art}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const urlSearchParams = new URLSearchParams(window.location.search) as any as Record<string, any>;
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params.art);

const art = getArt(params.art,ctx as CanvasRenderingContext2D);
art.draw();
