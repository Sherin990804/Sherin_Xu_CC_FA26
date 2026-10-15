let rows = 12
let cols = 12
//行12列12

function setup() {

  createCanvas(windowWidth, windowHeight);
 
}

function draw() {

  background(0);
  fill(col);
 
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      //外层循环控制列，内层循环控制行
      stroke(255)
      fill(0)

      
      if(mouseX > x * width / cols && 
        
        mouseX < (x + 1) * width / cols && 
        mouseY > y * height / rows && 
        mouseY < (y + 1) * height / rows){
        //检查鼠标是否处于某个格子的范围内

        fill(col,0,0)
      }
    }
  }
  rect(x * width / cols, y * height / rows, width / cols, height / rows);
} 

function mousePressed() {

 
}
