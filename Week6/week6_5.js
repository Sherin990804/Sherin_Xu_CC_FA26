//让小人走进门跳转的html变成这个四散花的界面

let f;
let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  angleMode(DEGREES);
  
  }

  function draw(){
    
    // let f = new Flower(mouseX, mouseY)
    // print(f)
    background(0)
    for(let i = 0; i < flowers.length; i++){
      let d = map(mouseX, 0, width, -5, 5)

      flowers[i].move()
      flowers[i].display()
    }

  }

  function mouseDragged(){
    // let f = new Flower(mouseX, mouseY)
    // f.display()
    flowers.push(new Flower(mouseX, mouseY))
    for(let i = 0; i < flowers.length; i++){
      flowers[i].display()
    }
  }

  class Flower{
    constructor(x, y){
      this.x = x
      this.y = y
      this.numPetals = random(3,16) 
      this.petalWidth = random(20,40)
      this.petalLength = random(30,80)
      this.centerDiameter = random(30,40)
      this.centerCol = color(random(255), random(255), random(255))
      this.petalCol = color(random(255), random(255), random(255))
      this.xV = random(-10, 10)
      this.yV = random(-10, 10)
      this.r = random(-10, 10)
      this.rotations = 0
    }

    move(d){
      this.x += this.xV
      this.y += this.yV
      this.rotations += this.r
    }

    display(){
      push()
      translate(this.x, this.y)
      rotate(this.rotations)  
      fill(this.petalCol)

      for(let r = 0; r < this.numPetals; r++){
        
        rotate(360/this.numPetals)
        ellipse(0, this.petalLength/2, this.petalWidth, this.petalLength)
      }
      fill(this.centerCol);
      circle(0, 0, this.centerDiameter);
      pop()
    }
  
  }