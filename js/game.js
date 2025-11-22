import { fitCanvas, drawLevel } from './renderer.js';
import { keys } from './input.js';
export class Game{
constructor(container,levels){this.container=container;this.levels=levels||[];this.tileSize=48;}
init(){
this.container.innerHTML=`<canvas id='gameCanvas'></canvas>`;
this.canvas=this.container.querySelector('canvas'); this.ctx=this.canvas.getContext('2d'); this.DPR=fitCanvas(this.canvas);
this.current=JSON.parse(JSON.stringify(this.levels[0]||createDefaultLevel()));
this.player={x:this.current.player.x,y:this.current.player.y,vx:0,vy:0,w:0.8,h:0.9,onGround:false};
requestAnimationFrame(this.loop.bind(this));
}
loop(t){this.update(16); this.draw(); requestAnimationFrame(this.loop.bind(this));}
update(dt){const gravity=0.45; const moveSpeed=3.2; const jumpSpeed=-12.5;
let left=keys['a']||keys['arrowleft'], right=keys['d']||keys['arrowright'], up=keys['w']||keys['arrowup']||keys[' '];
if(left) this.player.vx=-moveSpeed; else if(right) this.player.vx=moveSpeed; else this.player.vx=0;
this.player.vy+=gravity;
this.player.x+=this.player.vx*dt/16; this.resolve('x');
if(up&&this.player.onGround){ this.player.vy=jumpSpeed; this.player.onGround=false;}
this.player.y+=this.player.vy*dt/16; this.resolve('y');
}
resolve(axis){ const left=Math.floor(this.player.x), right=Math.floor(this.player.x+this.player.w-0.0001), top=Math.floor(this.player.y), bottom=Math.floor(this.player.y+this.player.h-0.0001); this.player.onGround=false;
for(let y=top;y<=bottom;y++) for(let x=left;x<=right;x++){ if(this.tileAt(x,y)===1){ if(axis==='x'){if(this.player.vx>0)this.player.x=x-this.player.w; else if(this.player.vx<0)this.player.x=x+1; this.player.vx=0;} else {if(this.player.vy>0){this.player.y=y-this.player.h; this.player.vy=0; this.player.onGround=true;} else if(this.player.vy<0){this.player.y=y; this.player.vy=0;}}}}
tileAt(x,y){ if(x<0||y<0||x>=this.current.w||y>=this.current.h) return 0; return this.current.tiles[y*this.current.w+x]||0; }
draw(){ drawLevel(this.ctx,this.canvas,this.current,this.tileSize,'play',this.player); }
}
