export const TILE = { EMPTY:0, GROUND:1, SPIKE:2, PLAYER:3 };

export function drawGrid(ctx, grid) {
  const size = 32;
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[0].length; x++) {
      ctx.fillStyle = ["#000","#654321","#aa0000","#00aaff"][grid[y][x]];
      ctx.fillRect(x*size, y*size, size, size);
    }
  }
}
