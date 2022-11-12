function drawGrid() {
  const canvas = document.getElementById('gridCanvas');

  if (!canvas) {
    throw new Error('No canvas found!');
  }

  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const numberOfSpaces = { x: 5, y: 5 };

  const ctx = canvas.getContext('2d');

  ctx.strokeStyle = isDarkMode ? 'white' : 'black';
  ctx.setLineDash([2, 4]);

  function drawBorder() {
    ctx.beginPath();
    ctx.setTransform(1,0,0,1, 0, 0);
    ctx.roundRect(0, 0, canvas.width, canvas.height, 20);
    ctx.stroke();
    ctx.closePath();
  }

  function drawLines() {
    const distanceBetweenLines = {
      x: canvas.width / numberOfSpaces.x,
      y: canvas.height / numberOfSpaces.y,
    };

    // Draw vertical lines
    for (let line = 1; line < numberOfSpaces.x; line += 1) {
      const x = line * distanceBetweenLines.x;

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, x, 0);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvas.height);
      ctx.stroke();
      ctx.closePath();
    }

    // Draw horizontal lines
    for (let line = 1; line < numberOfSpaces.y; line += 1) {
      const y = line * distanceBetweenLines.y;

      ctx.beginPath();
      ctx.setTransform(1,0,0,1, 0, y);
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawBorder();
  drawLines();
}

window.onload = drawGrid;
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', drawGrid);
