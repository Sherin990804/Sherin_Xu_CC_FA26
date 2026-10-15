function setup(){
    createCanvas(400,400)
    noFill();
}

let i = 0;

function draw(){

    background(255)

    // yPos = height/2 + noise(n)*200
    // yPos = height/2 + random(200)
    // noise() 返回的数值在0 ~ 1之间,x/100变成了 0.01, 0.02, 0.03...，采样点非常密集，生成的波浪平滑自然。


    // ellipse(width/2, yPos, 20, 20)

    beginShape()

    for(let x = 0; x < 100; x++)
    {
        let xPos = x*8
        // 计算当前点的 X 轴坐标。每个点间隔 4 像素
        let yPos = height/5 + noise(x/100)*50
        

        let n = x % 2 
        // 当 x 是偶数时,n = 0; 当 x 是奇数时,n = 1
        if(n == 0){
            // yPos = height/4 + random(-50,50)
            yPos = height/4 + 100 * noise(x/50 + i )
        }

        else{
            // yPos = 3*height/4 + random(-50, 50)
            yPos = height/4 - 100 * noise(x/50 + i)
        }
        vertex(xPos,yPos)
        // 放置顶点

    }

    endShape()

    i-=0.01
}