let r = 0
let w,h;
let numRects = 80

function setup(){
    createCanvas(1000,600)

    w = width/numRects
    h = w

    rectMode(CENTER)
    angleMode(DEGREES)

    background(0)
    fill(0)
    stroke(255)
    strokeWeight(2)
    // frameRate(10)
}

function draw(){

    // background(0,20)
    translate(w/2,h/2)
    for (let x = 0; x < numRects; x++){

        for (let y = 0; y < numRects; y++){

            let d = dist(mouseX,mouseY,w*x,h*y)

            d=map(d,0,100,1,0)
            d=constrain(d,0.3,1.8)
                push()
                translate(w*x,h*y)
                rotate(r*d)

                rect(0,0,w*d,h*d)
                pop()
            }
        }

        r++
        
    }
    
function keyReleased(){
    background(0)
}

    
