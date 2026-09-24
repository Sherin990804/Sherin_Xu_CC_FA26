function setup(){
    createCanvas(800, 800)

    rectMode(CENTER)
    angleMode(DEGREES)

    noFill()
    frameRate(50)
    
}

function draw(){

    background(10,20,200)
    stroke(random(0,255),random(0,255),random(0,255))
    strokeWeight(random(1,5))

    for (let x = 0; x < 20; x++){

        push()
        translate(random(0,width), random(0,height))
        rect(0,0,random(100), random(100))
        pop()
    }


}