let x,y;
let diameter= 200
let yv=6

function setup(){
createCanvas(windowWidth,windowHeight)
y= 0
}

function draw(){
    background(255)
    noStroke()
    x= random(width)
    ellipse(x,y,random(10,255));
    let r= map(x,diameter/2,width-diameter/2,0,255)
    let b= map(y,diameter/2,height-diameter/2,255,0)
    let g= map(y,diameter/2,height-diameter/2,0,255)
    fill(r,g,b)
   
    y+= yv
    if(y > height){
         yv= -yv;
    }
    if(y < 0){
         yv= -yv;
    }

print(y)
}

function keyReleased(){
    background(0)
}