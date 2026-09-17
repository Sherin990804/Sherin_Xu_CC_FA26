let x,y;
let diameter = 200
let yV = 6, xV = 6

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(0)
    noStroke()
    y = diameter / 2;   
    x = width / 2;
}
function draw(){
    let r= map(x,diameter/2,width-diameter/2,0,255)
    let b= map(y,diameter/2,height-diameter/2,0,255)
    let g= map(y,diameter/2,height-diameter/2,255,0)
    
    fill(r,g,b+random(-6,6),50)
    ellipse(x,y,diameter+random(-16,16));
    x += xV
    y += yV
    if(y > height- diameter/2){
        yV= -yV;
    }
    if(y < diameter/2){
        yV= -yV;
    }
    if(x > width- diameter/2){
        xV= -xV;
    }
    if(x < diameter/2){
        xV= -xV;
    }
}

function keyReleased(){
    background(0)
}
