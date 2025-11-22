import { fitCanvas, drawLevel } from './renderer.js';
import { createDefaultLevel } from './engine.js';
export class Editor{
constructor(container,levels,onSave){ this.container=container; this.levels=levels||[]; this.onSave=onSave; this.tileSize=48; }
init(){
this.container.innerHTML=`<div class='toolbar'>
<button class='btn' id='modeToggle'>EDIT</button>
<button class='btn' id='copyBtn'>COPY</button>
<button class='btn' id='pasteBtn'>PASTE</button>
<button class='btn' id='saveLevel'>SAVE LEVEL</button>
</div><canvas id='editorCanvas'></canvas>`;
this.canvas=this.container.querySelector('canvas'); this.ctx=this.canvas.getContext('2d'); this.DPR=fitCanvas(this.canvas);
this.level=this.levels[0]?JSON.parse(JSON.stringify(this.levels[0])):createDefaultLevel(); this.paint=1; this.isDown=false; this.last=null; this.attach(); requestAnimationFrame(()=>this.draw());
}
attach(){
this.canvas.addEventListener('pointerdown',e=>{this.isDown=true; this.paintAt(e);});
window.addEventListener('pointerup',()=>{this.isDown=false; this.last=null;});
this.canvas.addEventListener('pointermove',e=>{if(this.isDown)this.paintAt(e);});
this.container.querySelector('#saveLevel').addEventListener('click',()=>{this.save();});
this.container.querySelector('#copyBtn').addEventListener('click',()=>{navigator.clipboard.writeText(JSON.stringify(this.level)); alert('copied');});
this.container.querySelector('#pasteBtn').addEventListener('click',async()=>{const t=await navigator.clipboard.readText(); try{this.level=JSON.parse(t); alert('pasted');}catch(e){alert('invalid');}});
}
paintAt(e){ const r=this.canvas.getBoundingClientRect(); const x=Math.floor(((e.clientX-r.left)/r.width)*(this.canvas.width/this.DPR)/this.tileSize); const y=Math.floor(((e.clientY-r.top)/r.height)*(this.canvas.height/this.DPR)/this.tileSize); if(this.last&&this.last.x===x&&this.last.y===y) return; this.last={x,y}; if(x<0||x>=this.level.w||y<0||y>=this.level.h) return; const idx=y*this.level.w+x; if(this.paint===3){this.level.player.x=x; this.level.player.y=y;} else this.level.tiles[idx]=this.paint; }
save(){ const name=prompt('Level name',this.level.name||'New Level'); if(!name) return; this.level.name=name; const existingIndex=this.levels.findIndex(l=>l.name===name); if(existingIndex>=0)this.levels[existingIndex]=this.level; else this.levels.push(this.level); if(this.onSave)this.onSave(this.levels); alert('Saved');}
draw(){ fitCanvas(this.canvas); drawLevel(this.ctx,this.canvas,this.level,this.tileSize,'edit'); requestAnimationFrame(()=>this.draw()); }
}
