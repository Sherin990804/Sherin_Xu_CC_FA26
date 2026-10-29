let cam
let scale = 16;

function setup() {

  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO)
  // cam.hide() 
  cam.size(width/scale, height/scale)
 
}

function draw() {

  cam.loadPixels()  
  loadPixels()  
  let px= pixels;
  let index = 0;

  for( let y = 0 ; y < cam.height; y++){
    for( let x = 0 ;x < cam.width; x++){
    

      let r = cam.pixels[index]
      let g = cam.pixels[index + 1] 
      let b = cam.pixels[index + 2] 
      px[index + 3] = 255 //alpha

      index += 4;

      
  }  
} 
cam.updatePixels()  
updatePixels();
}
