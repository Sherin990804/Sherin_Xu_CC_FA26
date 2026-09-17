let y=0;

function setup(){
    createCanvas(windowWidth, windowHeight)
 

}

function draw(){

    background(0,200,150,50)
    circle(width/2,y,70)
    fill(100,80,0)
    noStroke()
    y++
    console.log(y)
    if(y>height){
        y=0
    }



}