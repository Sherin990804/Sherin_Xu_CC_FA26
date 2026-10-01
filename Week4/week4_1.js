let WavesPerCanvas = 10
let amplitude = 400
let offset = 0
let yLoc
// let wavesPerCanvas = 2：控制频率，表示整个画布横向上完整显示 2 个波浪周期
// let amplitude = 100：控制振幅，正弦波上下波动的最大高度为 100 像素
// let offset = 0：波浪的初始相位/偏移量，用来控制波浪左右平移运动
// let yLoc：声明波浪的 Y 轴基准线位置变量


function setup(){
    createCanvas(windowWidth,windowHeight)
    noFill()
    stroke(0)
    strokeWeight(2)
    yLoc = height/2

}

function draw(){

    background(230)

    push()
    translate(0,yLoc)

    beginShape()
    for(let i=0; i<width;i++){

        let mappedI = map(i,0,width,0,WavesPerCanvas)
        let y = sin(mappedI-offset)*amplitude
        let x = i
        vertex(x,y)

    }
    endShape()   
    
    pop()
    
    offset = frameCount*0.1
    // offset += 0.01

}