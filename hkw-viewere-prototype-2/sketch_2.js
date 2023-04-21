let bx;
let by;
let boxW = 20;
let boxH = 75;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let H_animation = 50;
let K_animation = 50;
let W_animation = 50;
var startTime = 0;
// let viewer_1, viewer_2;
let viewers = [];

function setup() {
  var cnv = createCanvas(1000, 600);
  cnv.style('display', 'block');
  bx = 0;
  by = height / 2.0 + 250;
  rectMode(RADIUS);
  strokeWeight(2);
  txt = select(".text");
  for (let i = 0; i < 3; i++) {
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
  // viewer_1.hovered(boxW, boxH);
  // viewer_1.display(mouseX, mouseY);
  // viewer_2.display();
  
  //animation_viewer_1(viewer_1.x);
  txt.style( "font-variation-settings", `'LEFT' ${H_animation}, 'CENT' ${K_animation}, 'RIGH' ${W_animation}`)
 
  // text('H:' + H_animation, 100, 50);
  // text('K:' + K_animation, 100, 70);
  // text('W:' + W_animation, 100, 90);
  
}

class Viewer {
  constructor (x, y, viewer_w, viewer_h) {
    this.x = x;
    this.y = y;
    this.viewer_w = viewer_w;
    this.viewer_h = viewer_h;
    this.c = color(244, 122, 158);
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

  viewerPressed(dx, dy) {
    if (overBox) {
      locked = true;
      this.c = color(255, 39, 0);
    } else {
      locked = false;
    }
    xOffset = dx - this.x;
    yOffset = dy - this.y;
  }

  // viewerDragged(dx, dy) {
  //   if (locked) {
  //     this.x = dx - xOffset;
  //     this.y = dy - yOffset;
  //   }
  // }

  display(dx, dy) {
    fill(this.c);
    
    if (locked) {
      this.x = dx - xOffset;
      this.y = dy - yOffset;
    } 

    rect(this.x, this.y, this.viewer_w, this.viewer_h);
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


function mousePressed() {
  for (let i = 0; i < viewers.length; i++) {
    viewers[i].viewerPressed(mouseX, mouseY);
  }
  // viewer_1.viewerPressed(mouseX, mouseY);
}

function mouseDragged() {
  if (locked) {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}


