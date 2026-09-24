let r = 0
let lerpMouseX = 0
let lerpMouseY = 0

function setup(){
    createCanvas(800,800)

    rectMode(CENTER)
    angleMode(DEGREES)
}

function draw(){
    background(0)
    noFill()
    strokeWeight(2)
    stroke(255)

    translate(mouseX-width/2,0)

    push();
    translate(200,400)
    rotate(map(sin(r), -1, 1, -30, 180))
    rect(0,0,50)

    line(0,0,0,150)
    // x1=0, x2=0, y1=0, y2=200 Extend 150 down along the y-axis

    translate(0,150)
    rotate(map(sin(r), -1, 1, 0, 180))
    rect(0,0,50)

    line(0,0,0,150)
    
    translate(0,150)
    rotate(map(sin(r), -1, 1, 0, 180))
    rect(0,0,50)
    pop();

    push();
    translate(600,400)
    rotate(map(sin(r), -1, 1, 30, -180))
    rect(0,0,50)

    line(0,0,0,150)

    translate(0,150)
    rotate(map(sin(r), -1, 1, 0, -180))
    rect(0,0,50)

    line(0,0,0,150)
    
    translate(0,150)
    rotate(map(sin(r), -1, 1, 0, -180))
    rect(0,0,50)
    pop();


    push();
    translate(320,120)
    rotate(map(sin(r), -1, 1, 0, 90))
    rect(0,0,20)

    line(0,0,0,100)

    translate(0,100)
    rotate(map(sin(r), -1, 1, 0, 45))
    rect(0,0,20)

    line(0,0,0,100)
    
    translate(0,100)
    rotate(map(sin(r), -1, 1, 0, 45))
    rect(0,0,20)
    pop();

    push();
    translate(480,120)
    rotate(map(sin(r), -1, 1, 0, -90))
    rect(0,0,20)

    line(0,0,0,100)

    translate(0,100)
    rotate(map(sin(r), -1, 1, 0, -45))
    rect(0,0,20)

    line(0,0,0,100)
    
    translate(0,100)
    rotate(map(sin(r), -1, 1, 0, -45))
    rect(0,0,20)
    pop();

    translate(400,600)
    rect(0,0,400,400)

    translate(0,-250)
    rect(0,0,60,100)

    translate(0,-150)
    rect(0,0,180,200,40)

    translate(-40,0)
    rect(0,0,20,20,40)

    translate(80,0)
    rect(0,0,20,20,40)

    translate(-40,40)
    rect(0,0,60,20,40)
    
    translate(0,280)
    rect(0,0,20,20,40)

    translate(0,80)
    rect(0,0,20,20,40)

    translate(0,80)
    rect(0,0,20,20,40)

    r++

}