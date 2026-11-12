class Whale {
  constructor(x,y,size,speed,phase) {
    this.x=x; this.baseY=y; this.y=y;
    this.size=size; this.speed=speed; this.phase=phase;
  }
  update(t,dt) {
    this.x += this.speed * dt;
    this.y = this.baseY + Math.sin(t*.85+this.phase)*7;
    if (this.x + 90*this.size > 645) this.x=-150;
  }

  display() {
    push();
    translate(this.x,this.y);
    scale(-this.size,this.size); 
    noStroke(); fill(92,139,170,96);
    beginShape();
    vertex(-85,3); bezierVertex(-57,-24,8,-27,61,-7);
    bezierVertex(81,0,88,3,104,-5);
    bezierVertex(113,-12,115,-19,118,-21);
    bezierVertex(120,-5,118,12,107,19);
    bezierVertex(87,18,73,27,54,29);
    bezierVertex(1,44,-60,31,-85,3);
    endShape(CLOSE);
    fill(131,173,199,55);
    beginShape(); vertex(3,18); bezierVertex(22,21,35,28,43,40);
    bezierVertex(43,27,38,14,24,10); endShape(CLOSE);
    pop();
  }
}
