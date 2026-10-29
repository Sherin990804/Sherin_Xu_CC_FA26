function setup() {

  createCanvas(400, 400);
  pixelDensity(1)
 
}

function draw() {

  loadPixels()  
  let px= pixels;

  let index = 0;

  for( let y = 0 ; y < height; y++){
    for( let x = 0 ;x < width; x++){
      let MapX= map(x, 0, width, 0, PI*10)*255
      let MapY= map(y, 0, width, 0, PI*10)*255

      px[index] = abs(sin(MapX))*255
      px[index + 1] = random(255)
      // px[index] = map(x, 0, width, 0, 255) //r
      // px[index + 1] = 0 //g
      px[index + 2] = 0 //b
      px[index + 3] = 255 //alpha

      index += 4;
      // px[index] = sin(map(x, 0, width, 0, PI*10))*255
      // px[index + 1] = sin(map(y, 0, mouseX, 0, PI*10))*255
      // px[index + 2] = 0
      // px[index + 3] = 255

      

      // 为什么有四行？
      // let r = random(255)
      // let g = random(255)
      // let b = random(255)
      // let a = 255
      
  }  
} 
  updatePixels();
}
