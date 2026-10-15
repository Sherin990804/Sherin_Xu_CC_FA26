let flower = {
  x: 500,
  y: 500,
  numPetals: 8,
  petalWidth: 50,
  petalLength : 100,
  centerDiameter: 30
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // print(flower.x, flower.y, flower.petalWidth, flower.petalLength, flower.centerDiameter)
  
  angleMode(DEGREES);
  push()
  translate(flower.x, flower.y)
  for(let r = 0; r < flower.numPetals; r++){
    rotate(360/flower.numPetals)
    //360度除以花瓣的数量决定了花瓣旋转的角度
    fill(255, 0, 0)
    ellipse(0, flower.petalLength/2, flower.petalWidth, flower.petalLength)
  
    //这一行为啥？
  }
  fill(255, 220, 0);
  circle(0, 0, flower.centerDiameter);
  pop()
  }
