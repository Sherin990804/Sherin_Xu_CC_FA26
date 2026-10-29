let xLoc = []
let yLoc = []
let numSegments = 100
let counter = 0
//控制虫子运动的时间参数

function setup() {

  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < numSegments; i++){
    xLoc[i] = random(width)
    yLoc[i] = random(height)
  }

  print(xLoc,yLoc)
  //随机生成100组坐标

}

function draw() {

  background(0)
  stroke(255)
  fill(0)

  xLoc[numSegments - 1] = width * noise(counter)
  yLoc[numSegments - 1] = height * noise(counter + 10)
  //numSegments - 1代表100个元素的索引是0到99。(xLoc[99],yLoc[99])代表数组的最后一个位置
  //虫自己动起来了

  // xLoc[numSegments - 1] = mouseX
  // yLoc[numSegments - 1] = mouseY
  //虫和鼠标一起动
  
  for(let i = 0; i < numSegments - 1; i++){
    xLoc[i] = xLoc[i+1]
    yLoc[i] = yLoc[i+1]
    //每运行一次 draw()，数组中较早的位置都会被后一个位置替换，数组一直在迭代

    let diameter = sin(map(i,0,numSegments - 1,0,TWO_PI)) * 200
    // 把索引i从0–99的范围转换成0–2π的范围，从而引用sin()正弦函数，再将sin值得到的-1到1，放大为-200到200
    // TWO PI 就是两条虫
    // let diameter = sin(map(i,0,numSegments - 1,0,PI)) * 200

    let r = diameter
    //r在负200-200变化，受直径影响。
    let g = 200 - diameter
    let b = 200 * cos(map(i,0,numSegments - 1,0,TWO_PI))
    stroke(r,g,b)
    ellipse(xLoc[i],yLoc[i],diameter)

  }

  counter += 0.01
  //控制运动速度，影响xLoc[i]和yLoc[i],改变虫子运动轨迹变化的快慢

}