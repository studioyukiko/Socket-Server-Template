let bx;
let by;
let boxW = 20;
let boxH = 75;
let overBox = false;
let locked = false;
let H_animation = 50;
let K_animation = 50;
let W_animation = 50;
var startTime = 0;
let viewers = [];

function setup() {
  var cnv = createCanvas(1000, 600);
  cnv.style('display', 'block');
  bx = 0;
  by = height / 2.0 + 250;
  rectMode(RADIUS);
  strokeWeight(2);
  txt = select(".text");
  for (let i = 0; i < 2; i++) {
  let v = new Viewer(bx + random(0, 100), by, boxW, boxH);
  viewers.push(v);
  }
}

function draw() {

  background(255, 255, 255);

  line(110,0,110,100);
  line(340,0,340,100);
  line(550,0,550,100);
  line(885,0,885,100);
  // line(0,200,100,200);
  // line(0,500,100,500);
  
  for (let i = 0; i < viewers.length; i++) {
    viewers[i].hovered(boxW, boxH);
    viewers[i].display(mouseX, mouseY);
  }
  for (let i = 0; i < viewers.length; i++) {
  animation_viewer_1(viewers[i].x);
  }
  txt.style( "font-variation-settings", `'LEFT' ${H_animation}, 'CENT' ${K_animation}, 'RIGH' ${W_animation}`)
  
  text('H:' + H_animation, 100, 50);
  text('K:' + K_animation, 100, 70);
  text('W:' + W_animation, 100, 90);
  
}

function mousePressed() {
  for (let i = 0; i < viewers.length; i++) {
  viewers[i].pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (i = 0; i < viewers.length; i++) {
  viewers[i].notPressed();
  }
}

class Viewer {
  constructor (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = color(244, 122, 158);
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }
  
  hovered(w, h) {
    if (
      mouseX > this.x - w &&
      mouseX < this.x + w &&
      mouseY > this.y - h &&
      mouseY < this.y + h
    ) {
      overBox = true;
      if (!locked) {
        this.c = color(244, 122, 258);
      } else {
        this.c = color(244, 122, 158);
      }
    }
  }

  display(px, py) {
    fill(this.c);
    
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    rect(this.x, this.y, this.w, this.h);
  }

  pressed(px, py) {
    if (px > this.x - this.w && px < this.x + this.w && py > this.y - this.h && py < this.y + this.h) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed() {
    this.dragging = false;
  } 
}

function animation_viewer_1(x) {
  //H
  if (
    x > 110 && x < 335 
  ) {
      if(H_animation < 100){
       H_animation++;
    }
  } else {
    if(H_animation > 50){
      H_animation--;
    }
  }
  // K
  if (
    x > 340 && x < 545 
  ) {
      if(K_animation < 100){
       K_animation++;        
      }
  } else {
    if(K_animation > 50){
      K_animation--;
    }
  }
  // W
  if (
    x > 550 && x < 885 
  ) {
      if(W_animation < 100){
        W_animation++;
        
      }
  } else {
    if(W_animation > 50){
      W_animation--;
    }
  }
}



