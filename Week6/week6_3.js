let frames = []
let people = []

let counter = 0
let totalPeople = 0
let finishedPeople = 0

async function setup() {
  
  createCanvas(windowWidth, windowHeight);
  frameRate(12)
  rectMode(CENTER)
  imageMode(CENTER)

  // let img = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  // image(img, width/2, height/2, 200, 200)

  for(let i = 1; i <= 12; i++){
   
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')

  }
  print(frames)

}


let xLoc = 30
let xV = 7.5
let dir = 1

function mousePressed() {

  for (let i = 0; i < 5; i++) {

    let x = mouseX + random(-50, 50)
    let y = mouseY + random(-50, 50)

    people.push(new Person(x, y))
    totalPeople++

  }
}

function draw() {

  background(200)
  counter++
  fill(100, 150, 0)
  stroke(0)
  rect(width - 50, height/2, 100, windowHeight)

  for (let i = 0; i < people.length; i++) {

    people[i].move()
    people[i].display()

  }
  if (totalPeople > 0 && finishedPeople == totalPeople) {
    window.location.href = "week6.html"
  }
}



class Person {

  constructor(x, y) {

    this.x = x
    this.y = y
    this.speed = random(4, 9)
    this.finished = false
    this.offset = int(random(12))

  }

  move() {

    if (this.finished == false) {

      this.x += this.speed

      if (this.x >= width - 100) {

        this.finished = true
        finishedPeople++

      }
    }
  }

  display() {

    if (this.finished == false) {

      let currentFrame =
        frames[(counter + this.offset) % frames.length]

      image(currentFrame, this.x, this.y)

    }
  }
}

