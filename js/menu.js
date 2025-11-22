import { createDefaultLevel, loadJSON } from './engine.js';
import { Editor } from './editor.js';
import { Game } from './game.js';


export class Menu{
constructor(container){ this.container = container; this.levels = []; }
async init(){
this.container.innerHTML = '';
const root = document.createElement('div'); root.className='container';
const panel = document.createElement('div'); panel.className='panel';
const main = document.createElement('div'); main.className='canvas-wrap';
panel.innerHTML = `<h3>Main Menu</h3><div class='toolbar'>
<button class='btn' id='playBtn'>Play Game</button>
<button class='btn' id='editBtn'>Level Editor</button>
</div>`;
main.innerHTML = `<div style='padding:12px;color:#cfefff'>Select an option from the left.</div>`;
root.appendChild(panel); root.appendChild(main); this.container.appendChild(root);


try{ const data = await loadJSON('levels/mainLevels.json'); this.levels = data.levels || []; }catch(e){ this.levels = []; }
const local = localStorage.getItem('custom_levels'); if(local) try{ this.levels = JSON.parse(local); }catch(e){}


panel.querySelector('#playBtn').addEventListener('click', ()=>this.openGame(main));
panel.querySelector('#editBtn').addEventListener('click', ()=>this.openEditor(main));
}
openGame(container){ container.innerHTML=''; const game=new Game(container,this.levels); game.init(); }
openEditor(container){ container.innerHTML=''; const editor=new Editor(container,this.levels,updated=>{ this.levels=updated; localStorage.setItem('custom_levels', JSON.stringify(this.levels)); }); editor.init(); }
}
