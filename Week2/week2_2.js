function setup(){
    createCanvas(windowWidth,windowHeight)
    background(0)
}

// function mouseDragged(){
//     line(pmouseX,pmouseY,mouseX,mouseY)
// }

function mousePressed(){
    line(windowWidth/2,windowHeight/2,mouseX,mouseY)
    stroke(mouseX,mouseY,random(0,255),random(20,50))
    strokeWeight(random(2,10))
}

function keyReleased(){
    background(0)
}
