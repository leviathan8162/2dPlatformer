import { TILE, drawGrid } from './engine.js';

fetch('levels/mainLevels.json')
  .then(r => r.json())
  .then(levels => start(levels[0]));

function start(level) {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  function loop() {
    drawGrid(ctx, level.grid);
    requestAnimationFrame(loop);
  }
  loop();
}
