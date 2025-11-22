import { TILE, drawGrid } from './engine.js';

const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");
const jsonBox = document.getElementById("jsonBox");

let level = { grid: Array.from({length:15},()=>Array(25).fill(0)) };

canvas.addEventListener("click", e => {
  const r = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX-r.left)/32);
  const y = Math.floor((e.clientY-r.top)/32);
  level.grid[y][x] = (level.grid[y][x] + 1) % 4;
  drawGrid(ctx, level.grid);
});

document.getElementById("saveBtn").onclick = () => {
  jsonBox.value = JSON.stringify(level);
};

document.getElementById("loadBtn").onclick = () => {
  try {
    level = JSON.parse(jsonBox.value);
    drawGrid(ctx, level.grid);
  } catch {}
};

drawGrid(ctx, level.grid);
