let students = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
let font
let student = ''
let col = 255

async function setup() {

  createCanvas(windowWidth, windowHeight);
  font= await loadFont('Academy Engraved LET Fonts.ttf');
  //拽一个字体进来
  textFont(font);
  textSize(100);
  textAlign(CENTER);

}

function draw() {

  background(0);
  fill(col);
  text(student,width/2, height/2);
  col *= 0.99
  // col = col*0.99 文字渐隐的效果
 
} 

function mousePressed() {
  col = 255

  if(students.length > 0){

  let length = students.length
  //students.length表示students这个数组的长度
  let i = floor(random(length))
  // random(5) 会生成一个从0到5之间的随机小数（不包含5）
  // floor() 是 p5.js 中的一个数学函数，用于把小数向下取整。

    student= students[i];
    students.splice(i,1);
    // 删除已经抽取的数字
    print(student);
    
  }
}
