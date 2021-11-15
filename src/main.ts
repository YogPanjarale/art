import { Art } from './Art';
import { Paper, PaperDisplaced } from './Paper';
import './style.css'
import { Swastik } from './Swastik';
import { TileSlant } from './Tiles/TilesSlant';
import { TileStraight } from './Tiles/TileStraight';

export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');


type route = "swastik"| "tile-straight" | "tile-slant"| "paper-rulled" | "paper-displaced";
function getArt(route:route, ctx:CanvasRenderingContext2D): Art{
  switch(route){
    case 'swastik':
      return new Swastik(ctx);
    case 'tile-slant':
      return new TileSlant(ctx);
    case 'tile-straight':
      return new TileStraight(ctx);
    case 'paper-rulled':
      return new Paper(ctx);
    case 'paper-displaced':
      return new PaperDisplaced(ctx);
    default:
      return new Art(ctx);
  }
}
export { Art}
const urlSearchParams = new URLSearchParams(window.location.search) as any;
const params = Object.fromEntries(urlSearchParams.entries());
console.log(params.art);
const art = getArt(params.art,ctx as CanvasRenderingContext2D);
art.draw();
