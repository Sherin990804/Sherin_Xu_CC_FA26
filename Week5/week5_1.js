let students = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
let font
let student = ''
let col = 255

async function setup() {

  createCanvas(windowWidth, windowHeight);
  font= await 
  loadFont('Academy Engraved LET Fonts.ttf');
  //拽一个字体进来
  textfont(font);
  textsize(100);
  textalign(CENTER);

}

function draw() {

  background(255);
  fill(col);
  // fill(255);
  text(student,width/2, height/2);

  col *= 0.99
  // col = col*0.99
 
} 

function mousePressed() {

  let length = students.length()
  let i = floor(random(length - 1))
  // student= students[i];
  // print(student);

  if(students.length>0){
    student= students[i];
    students.splice(i,1);
    
  }
  print(student);
  col = 255


}
