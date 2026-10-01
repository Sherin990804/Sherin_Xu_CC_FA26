p5.disableFriendlyErrors = true;
let bDoExportSvg = false; 
let w, h;
let numX = 6;
let numY = 4;
let r = 1.0; 

function setup(){
    createCanvas(576,384)
    w = width / numX;   
    h = height / numY;  
    background(255);
    strokeWeight(2);

    noFill();
    rectMode(CENTER);
    angleMode(DEGREES);
    frameRate(30);

}

function draw(){

    if (bDoExportSvg){
    beginRecordSvg("myOutput.svg");
    } 

    background(255);
    r = map(mouseX, 0, width, 0.2, 5)

    push();
    translate(w / 2, h / 2);
    for (let x = 0; x < numX; x++) {
  
        for (let y = 0; y < numY; y++) {
        stroke(r * y * 50, 20, 150);    
            for (let i = 0; i < numX; i++) {
                push();
                translate(w * x, h * y); 
                rotate(r * y * i * 2);
                rect(0, 0, w - 12 * i, h - 12 * i);
                pop();
            }
        }
    }
    pop();

    if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
    } 
  }

function keyPressed(){
  if (key == 's'){ 
    bDoExportSvg = true; 
  }
}

