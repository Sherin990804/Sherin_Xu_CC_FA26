let xLoc = []
let yLoc = []
let numSegments = 100
let counter = 0

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i<numSegments; i++){
    xLoc[i] = random(width)
    yLoc[i] = random(height)
  }

  print(xLoc,yLoc)

}

function draw() {

  background(0)
  stroke(255)
  fill(0)

  xLoc[numSegments - 1] = width * noise(counter)
  yLoc[numSegments - 1] = height * noise(counter + 10)
  //虫自己动起来了

  // xLoc[numSegments - 1] = mouseX
  // yLoc[numSegments - 1] = mouseY
  //虫和鼠标一起动
  
  for(let i = 0; i<numSegments - 1; i++){
    xLoc[i] = xLoc[i+1]
    yLoc[i] = yLoc[i+1]

    let diameter = sin(map(i,0,numSegments - 1,0,TWO_PI)) * 200
    // TWO PI 就是两条虫
    // let diameter = sin(map(i,0,numSegments - 1,0,PI)) * 200
    let r = diameter
    let g = 200 - diameter
    let b = 200 * cos(map(i,0,numSegments - 1,0,TWO_PI))
    stroke(r,g,b)

    ellipse(xLoc[i],yLoc[i],diameter)

  }

  counter += 0.01

}