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
    rectMode(CENTER);
    fill(this.color);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }
}

class Dropper{
  constructor(x, y, w,h, img){
    this.x=x;
    this.y=y;
    this.w=w
    this.h=h;
    this.img=img;
  }

  createRectangle(rx,ry,rw,rh,rcolor){
    this.rectangle= new Rectangle(rx,ry,rw,rh,rcolor);
  }

  display(){
    image(this.img, this.x, this.y, this.w, this.h)
    fill(0,255,0,100)
    rectMode(CENTER)
    if (this.rectangle){
      this.rectangle.display();
    }
  }
}
// CLASS CREATED IMAGE VARIABLES
let bureteFilling;

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

  dropper1= new Dropper(dX,dY,dW,dH,dropper)
}

function draw() {
  frameRate(30);
  background(bg);
  image(burete, bureteX, bureteY, bureteW, bureteH);
  // image(backFlask, frontFlaskX, frontFlaskY, frontFlaskW, frontFlaskH);
  image(frontFlask, frontFlaskX, frontFlaskY, frontFlaskW, frontFlaskH);
  image(frontFlask, ff2X, ff2Y, ff2W, ff2H);
 
  // image(dropper, dX, dY, dW, dH);
  image(frontFlask, ff3X, ff3Y, ff3W, ff3H); // Drawing Flask 3
  image(dropper, d2X, d2Y, d2W, d2H);

  // Inside burete liquid
  bureteFilling.display();

  dropper1.createRectangle(dX * 1.05, dY * 1.14, dW * 0.1, dH * 0.6, color(0,255,0,100));
  dropper1.display();

  // rect(dX * 1.05, dY * 1.14, dW * 0.1, dH * 0.6);

  // rect(d2X * 1.04, d2Y * 1.13, d2W * 0.14, d2H * 0.6);

}
