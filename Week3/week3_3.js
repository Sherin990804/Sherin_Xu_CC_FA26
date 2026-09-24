let r = 0
let w,h;
let numRects = 10

function setup(){
    createCanvas(800,800)

    w = width/numRects
    h = height/numRects

    rectMode(CENTER)
    angleMode(DEGREES)

    background(0)
    fill(0)
    stroke(255)
    strokeWeight(2)

    frameRate(12)
    
}

function draw(){

    background(0)
    translate(w/2,h/2)
    for (let x = 0; x < numRects; x++){

        for (let y = 0; y < numRects; y++){

            for (let i = 0; i < numRects; i++){
                push()
                translate(w*x,h*y)
                rotate(r*y*i)
                rect(0,0,w-6*i,h-6*i)
                pop()
            }
        }
    }

    r++

}