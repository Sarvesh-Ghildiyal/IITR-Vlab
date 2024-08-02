let canvas;
function setup() {
  const container= select('#simulation');
  canvas= createCanvas(container.width, container.height);
  canvas.parent(container);
}

function draw() {
  background(100)
}
