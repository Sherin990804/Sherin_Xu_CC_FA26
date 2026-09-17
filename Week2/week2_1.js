function setup(){
    createCanvas(windowWidth,windowHeight, WEBGL);
    background(0)
}

function draw(){
    push();
     fill(100,0,0,50)
     strokeWeight(3)
     stroke(random(0,255),random(0,255),random(0,255),80)
     ellipse(mouseX-width/2,mouseY-height/2,66,66)
    pop();

    push();
     fill(0,0,0,0)
     stroke(random(0,255),random(0,255),random(0,255),80)
     rotateY(frameCount * 0.08);
     triangle(0,-height/2,-width/2,height/2,width/2,height/2);
    pop();
}

function keyReleased(){
    background(0)
}