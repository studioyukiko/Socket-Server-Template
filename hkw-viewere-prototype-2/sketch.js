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
let HKWbox = [];
var distances = [];
var counters = [50, 50, 50];
var countersOn = [1, 1, 1];
var countersSum = [];
let HKWCheck = [];

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

  HKWbox[0] = new HKW(225, 350, 115, 145);
  HKWbox[1] = new HKW(455, 350, 112, 145);
  HKWbox[2] = new HKW(725, 350, 158, 145);

}

function draw() {
  background(255, 255, 255);
  countersSum = [true, true, true];
  
  //create interactive section
  for (let i = 0; i <HKWbox.length; i++) {
    HKWbox[i].display();
  }
  
  //create viewers blobs
  for (let i = 0; i < viewers.length; i++) {
    viewers[i].hovered(boxW, boxH);
    viewers[i].display(mouseX, mouseY);
  }

  //relationship between blob and interactive part
  for (let x = 0; x < HKWbox.length; x++) {
  
    distances[x] = [];
    countersOn[x] = [];

    for (let y = 0; y < viewers.length; y++) {  
       
      distances[x][y] = dist(HKWbox[x].x,HKWbox[x].y, viewers[y].x, viewers[y].y);    
      //turn on and off 
      if (distances[x][y] < HKWbox[x].w + viewers[y].w) {
        countersOn[x][y] = 0;
      } else {
        countersOn[x][y] = 1;
      }
      text(countersOn[x][y] + '', 300 + y*150, 50 + x*30); 

      //debug
      text('H:' + H_animation, 100, 50);
      text('K:' + K_animation, 100, 70);
      text('W:' + W_animation, 100, 90);
      
    }
  }
  HKWCheckValue();
  animateHKW();
}

function HKWCheckValue() {
  HKWCheck = [];
  for(i = 0; i < countersOn.length; i++) {
    let temp = 1;
    for(j = 0; j < countersOn[i].length; j++) {
    temp = temp * countersOn[i][j];
    }
    HKWCheck.push(temp);
    text(HKWCheck, 50, 100);  
  }
}

function animateHKW() {
  if (!HKWCheck[0]) {
    if(H_animation < 100) { H_animation++; }
  } else { if(H_animation > 50) { H_animation--; }}

  if (!HKWCheck[1]) {
    if(K_animation < 100) { K_animation++; }
  } else { if(K_animation > 50) { K_animation--; }}
  if (!HKWCheck[2]) {
    if(W_animation < 100) { W_animation++; }
  } else { if(W_animation > 50) { W_animation--; }}
  txt.style( "font-variation-settings", `'LEFT' ${H_animation}, 'CENT' ${K_animation}, 'RIGH' ${W_animation}`)
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

class HKW {
  constructor (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    noFill();
    stroke(1);
    rect(this.x, this.y, this.w, this.h);
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





