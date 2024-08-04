// image variables
let backFlask, bg, burete, dropper, frontFlask, halfWater, water;
// Extra adjustments variables
let buretteLiquidColor;

// Loading the required images material
function preload() {
  backFlask = loadImage("./images/backFlask.png");
  bg = loadImage("./images/bg.png");
  burete = loadImage("./images/burete.png");
  dropper = loadImage("./images/droper.png");
  frontFlask = loadImage("./images/frontFlask.png");
  halfWater = loadImage("./images/halfWater.png");
  water = loadImage("./images/water.png");
}

// Scale Factor of the application
let scaleX, scaleY, scaleFactor;
let originalWidth = 600,
  originalHeight = 600;
let size, liquidLevel;

// Positional variables as per my scale Factor

// BURETE AND FLASK 1
let bureteX, bureteY, bureteW, bureteH;
let frontFlaskX, frontFlaskY, frontFlaskW, frontFlaskH;

// FLASK 2 AND DROPPER 1
let ff2X, ff2Y, ff2W, ff2H;
let dX, dY, dW, dH;

// FLASK 3 AND DROPPER NUMBER 2
let ff3X, ff3Y, ff3W, ff3H;
let d2X, d2Y, d2W, d2H;

class Rectangle {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }
  display() {
    push();
    rectMode(CENTER);
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

class Dropper {
  constructor(x, y, w, h, img, rectX, rectY, rectW, rectH, rectColor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.rectangle = new Rectangle(rectX, rectY, rectW, rectH, rectColor);
  }

  display() {
    image(this.img, this.x, this.y, this.w, this.h);
    if (this.rectangle) {
      this.rectangle.display();
    }
  }
}
class Flask {
  constructor(img, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.shakingRotation = 0;
    this.shakingRotationSpeed = 1;
  }

  display() {
    image(this.img, this.x, this.y, this.w, this.h);
  }

  shake() {
    let shakingRotationOffset = sin(this.shakingRotation) * 2.8;
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(radians(shakingRotationOffset));
    image(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
    pop();
    this.shakingRotation += this.shakingRotationSpeed;
  }
}
// CLASS CREATED IMAGE VARIABLES
let bureteFilling, dropper1, dropper2, flask1, flask2, flask3;
let flaskTouched = false;

function setup() {
  // Creating Canvas for the magic
  const container = select("#simulator");
  createCanvas(container.width, container.height);
  buretteLiquidColor = color(255, 255, 255, 100); // hypo color

  // Maintaining my Scale factor
  scaleX = width / originalWidth;
  scaleY = height / originalHeight;
  scaleFactor = min(scaleX, scaleY);

  // Determine size based on container dimensions
  if (windowWidth < 500) {
    size = (container.width - 10) / 22;
  } else {
    size = (container.height - 10) / 24;
  }

  // Initial liquid level
  liquidLevel = 8 * size;

  /*Calculate positions and dimensions based on scaleFactor
  BURETE POSITION IN THE CANVAS */
  bureteX = 20 * scaleFactor;
  bureteY = 90 * scaleFactor;
  bureteW = 200 * scaleFactor;
  bureteH = 500 * scaleFactor;

  /* FLASK POSITIONS BASED ON BURETE */
  frontFlaskX = bureteX * 6.2;
  frontFlaskY = bureteY * 5 + 10;
  frontFlaskW = bureteW * 0.4;
  frontFlaskH = bureteH * 0.2;

  // FLASK 2 POSITION RELATIVE TO BURETE
  ff2X = bureteX + bureteW * 1.8 - 50; // Adjust as needed
  ff2Y = bureteY + bureteH - 150; // Adjust as needed
  ff2W = 60 * scaleFactor;
  ff2H = 80 * scaleFactor;

  // DROPPER POSSITION RELATIVE TO FLASK 2
  dX = ff2X + 12 * scaleFactor;
  dY = ff2Y - 100 * scaleFactor;
  dW = 40 * scaleFactor;
  dH = 90 * scaleFactor;

  //FLASK 3 POSITION RELATIVE TO FLASK 2
  ff3X = ff2X + ff2W + 60 * scaleFactor; // Adjust spacing as needed
  ff3Y = ff2Y + ff2H / 2;
  ff3W = ff2W;
  ff3H = ff2H;

  // DROPPER 2 POSITION RELATIVE TO FLASK 3
  d2X = ff3X + 12 * scaleFactor;
  d2Y = ff3Y - 100 * scaleFactor;
  d2W = 40 * scaleFactor;
  d2H = 90 * scaleFactor;

  bureteFilling = new Rectangle(
    width / 2 - 5.5 * size,
    8.51 * size,
    size * 0.52,
    -liquidLevel * 0.922,
    color(100, 100, 100, 100)
  );
  flask1 = new Flask(frontFlask, frontFlaskX, frontFlaskY, frontFlaskW, frontFlaskH)
  flask2 = new Flask(frontFlask, ff2X, ff2Y, ff2W, ff2H)
  flask3 = new Flask(frontFlask, ff3X, ff3Y, ff3W, ff3H)
  dropper1 = new Dropper(dX, dY, dW, dH, dropper, dX * 1.05, dY * 1.14, dW * 0.15, dH * 0.6, color(0, 255, 0, 100));
  dropper2 = new Dropper(d2X, d2Y, d2W, d2H, dropper, d2X * 1.039, d2Y * 1.13, d2W * 0.12, d2H * 0.6, color(255, 0, 0, 100));
}

function draw() {
  background(bg);
  frameRate(30);
  image(burete, bureteX, bureteY, bureteW, bureteH);

  if (flaskTouched)
    flask1.shake();
  else
    flask1.display();

  flask2.display();
  flask3.display();

  bureteFilling.display();
  dropper1.display();
  dropper2.display();
}

function mousePressed() {
  let flask_dist = dist(mouseX, mouseY, frontFlaskX + frontFlaskW / 2, frontFlaskY + frontFlaskH / 2);
  if (flask_dist <= frontFlaskW / 2 || flask_dist <= frontFlaskH / 1.2)
    flaskTouched = !flaskTouched;

  else
    flaskTouched = false; // Stop shaking if any other area is clicked
}

