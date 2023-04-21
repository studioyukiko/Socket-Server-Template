let bx;
let by;
let boxW = 30;
let boxH = 75;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let H_animation = 50;
let K_animation = 50;
let W_animation = 50;
var startTime = 0;
let viewer_1;

function setup() {
  // var cnv = createCanvas(1000, 600);
  var cnv = createCanvas(1000, 600);
  cnv.style('display', 'block');
  bx = width / 2.0;
  by = height / 2.0 + 250;
  rectMode(RADIUS);
  strokeWeight(2);
  txt = select(".text");
}

function draw() {

  background(255, 255, 255);

  line(110,0,110,100);
  line(340,0,340,100);
  line(550,0,550,100);
  line(885,0,885,100);
  // line(0,200,100,200);
  // line(0,500,100,500);

  hoverBox();
  //animation1();
  viewer_1 = new Viewer(bx, by, boxW, boxH);
  viewer_1.display();
   animation1();

  txt.style( "font-variation-settings", `'LEFT' ${H_animation}, 'CENT' ${K_animation}, 'RIGH' ${W_animation}`)
 
  text('H:' + H_animation, 100, 50);
  text('K:' + K_animation, 100, 70);
  text('W:' + W_animation, 100, 90);
  
}

class Viewer {
  constructor (x, y, viewer_w, viewer_h) {
    this.x = x;
    this.y = y;
    this.viewer_w = viewer_w;
    this.viewer_h = viewer_h;
  }
  
  display() {
    rect(this.x, this.y, this.viewer_w, this.viewer_h);
  }
}

function animation1(){

  if (
    mouseX > 110 && mouseX < 335 
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
    mouseX > 340 && mouseX < 545 
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
    mouseX > 550 && mouseX < 885 
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

function hoverBox() {
  if (
    mouseX > bx - boxW &&
    mouseX < bx + boxW &&
    mouseY > by - boxH &&
    mouseY < by + boxH
  ) {
    overBox = true;
    if (!locked) {
      stroke(255, 39, 0);
      fill(244, 122, 158);
    }
  } else {
    stroke(156, 39, 176);
    fill(244, 122, 158);
    overBox = false;
  }

}
function mousePressed() {
  if (overBox) {
    locked = true;
    fill(255, 39, 0);
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
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


