//如何叠加layer 方块画画和虫虫运动如何切换

let xLoc = []
let yLoc = []
let numSegments = 100


let rows = 50
let cols = 50
let boxed = []

let counter = 0
let onoff = 0
let num = 0
let index = 0

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i<numSegments; i++){
    xLoc[i] = random(width)
    yLoc[i] = random(height)
  }

  print(xLoc,yLoc)

  layer1 = createGraphics(width, height);
  layer2 = createGraphics(width, height);
  

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
    layer1.stroke(r,g,b)

    layer1.ellipse(xLoc[i],yLoc[i],diameter)

  }


 
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      stroke(255)
      layer2.fill(0)

      if(mouseX > x * width / cols && 
        mouseX < (x + 1) * width / cols && 
        mouseY > y * height / rows && 
        mouseY < (y + 1) * height / rows)
        {
          boxed[index] = 255
        }

      fill(boxed[index],random(100),random(100))
      // rect(x * width / cols, y * height / rows, width / cols, height / rows);

      let n= index 
      text(n, x * width / cols, y * height / rows);
      boxed[index] *= 0.99
      //写字后的渐隐效果
      index++
    }
  }
  counter += 0.01

  if (onoff == 0){

    image(layer1, 0, 0, width, height);
    
  } 
  
  else if (onoff == 1){

    image(layer2, 0, 0, width, height);

  } 
 

function mousePressed() { 

  onoff = onoff % num
  num++

}
}