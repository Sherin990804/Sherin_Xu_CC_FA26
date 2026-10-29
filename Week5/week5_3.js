let rows = 50
let cols = 50
let boxed = []
//boxed[] 数组可以记录之前经过的格子，鼠标移动，经过的格子会留下红色轨迹
//而col是单一变量，只有鼠标所在格子变黄

function setup() {

  createCanvas(windowWidth, windowHeight);
  let index = 0
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      boxed[index] = 0
      index++
      //为每个格子设置初始颜色值为黑色0

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
      
      if(mouseX > x * width / cols && 
        mouseX < (x + 1) * width / cols && 
        mouseY > y * height / rows && 
        mouseY < (y + 1) * height / rows)
        {
          boxed[index] = 255
          //当鼠标在格子内，格子颜色值是红色255
        }

      fill(boxed[index],0,0)
      rect(x * width / cols, y * height / rows, width / cols, height / rows);
      boxed[index] *= 0.99
      //渐隐效果
      index++
    }
  }
} 

function mousePressed() {
 
}
