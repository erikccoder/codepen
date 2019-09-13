let points;
let rotations = [3.142*.5,0];
function setup() {
  createCanvas(400, 400);
  points = [
    createVector(200, 200),
    createVector(200, 250),
    createVector(200, 250),
    createVector(200, 250),
    createVector(200, 250),
    createVector(200, 250),
    createVector(200, 250),
  ];
}


const SIZE = 20;
function show(pt, i)
{
  push();
  
  fill(240, 196, 32);
  translate(pt.x, pt.y)
  circle(0, 0, SIZE + (SIZE*i*0.2));
  
  rotate(rotations[i]);
  line(0, 0, SIZE*.5, 0);
  
  pop();
  return pt;
}

const LERP_SPEED = 0.1;
const DIST_THESHOLD = 50;

function lerpPoint( pt, i, arr )
{
  if(i<=0) return pt;

  const prev = arr[i-1];
  const prevAngle = rotations[i-1];

  const d = p5.Vector.sub(prev, pt);
  rotations[i] = d.heading();
  
  const prev_back = createVector(prev.x, prev.y);//p5.Vector.rotate(prev, prevAngle + PI); 
  prev_back.normalize();  
  prev_back.x += DIST_THESHOLD;
  prev_back.rotate(prevAngle + PI);
  
  prev_back.add(prev);
  
  
  
  // if(d.mag() > DIST_THESHOLD)
  {
    // p5.Vector.lerp(pt, arr[i-1], LERP_SPEED, pt);    
  }
  // else
  {    
    p5.Vector.lerp(pt, prev_back, LERP_SPEED, pt);   
  }
    
  
  
  return pt;
  //return p5.Vector.lerp(pt, arr[i-1], LERP_SPEED);
}

function draw() {
  background(0, 124, 183);
  
  const mouse = createVector(mouseX, mouseY);
  const dir = p5.Vector.sub(mouse, points[0]);
  p5.Vector.lerp(points[0], mouse, LERP_SPEED, points[0]);
  
  if(mouseIsPressed){
    rotations[0] += 0.09;
  }
  else{
    rotations[0] = dir.heading();
  }
  
  points.map(lerpPoint)
    //.reverse()
    .map(show);
  
}
