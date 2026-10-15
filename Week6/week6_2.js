//为什么小人还是不动 如何增加更多小人 让他们遍布屏幕 如何将小人图片替换成别的
let frames = []

async function setup() {
  
  createCanvas(windowWidth, windowHeight);
  frameRate(12)
  rectMode(CENTER)
  imageMode(CENTER)

  // let img = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  // image(img, width/2, height/2, 200, 200)

  for(let i = 1; i <= 12; i++){
   
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')

  }
  print(frames)

}

let counter = 0
let xLoc = 30
let xV = 7.5
let dir = 1

function draw() {

  background(200)
  let currentFrame = frames[counter % frames.length]

  fill(0)
  rect(width/2, height/2, 100, 200)
  
  if(keyIsDown(RIGHT_ARROW)){
    dir = 1
    xV = 7.5
    counter++
    xLoc += xV
  }

   if(keyIsDown(LEFT_ARROW)){
    dir = -1
    xV = 7.5
    counter++
    xLoc -= xV
  }

  currentFrame = frames[counter % frames.length];
  push()
  translate(xLoc, height/2)
  scale(dir, 1)

  image(currentFrame, 0, 0)
  pop()


  // if(dist(xLoc, height/2, width/2, height/2) < 50){
  //   fill(200, 150, 0)
  //   window.location.href = "../index.html"
  // }



  // if(xLoc > width){
  //   dir = -1
  //   xV = 7.5
  // }
  // else if(xLoc < 0){
  //   dir = 1
  //   xV = 7.5
  // }

  // if(xLoc > width || xLoc < 0){
  //   dir *= -1
  // }


  // counter++
  // xLoc += xV

}