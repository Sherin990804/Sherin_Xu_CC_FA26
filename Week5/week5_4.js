let rows = 50
let cols = 50
let radius = 60
let boxed = []

function setup() {

  createCanvas(windowWidth, windowHeight);
  let index = 0
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      boxed[index] = 0
      index++

    }
  }
}

function draw() {

  background(0);
  let index = 0
 
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      stroke(255)
      fill(0)

      let px = x * width / cols
      let py = y * height / rows
      let d = dist(mouseX, mouseY, px, py)
      if (d < radius) {

        let brightness = map(d, 10, radius, 255, 100)
        boxed[index] = max(boxed[index], brightness)
      }


      if(mouseX > x * width / cols && 
        mouseX < (x + 1) * width / cols && 
        mouseY > y * height / rows && 
        mouseY < (y + 1) * height / rows)
        {
          boxed[index] = 255
        }

       fill(boxed[index], 50 + boxed[index] * 0.6, 0)
       
       textSize(10)
       text(index, px, py)
      boxed[index] *= 0.99
      index++
    }
  }
  
} 

