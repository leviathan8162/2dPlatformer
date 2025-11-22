export function createDefaultLevel(w=16,h=12){
return {w,h,tiles:new Array(w*h).fill(0),player:{x:2,y:2}};
}
export function tileAt(level,x,y){
if(x<0||y<0||x>=level.w||y>=level.h) return 0;
return level.tiles[y*level.w + x] || 0;
}
export function loadJSON(url){return fetch(url).then(r=>r.json());}
