class Mover{

  constructor(radius, loc, vel, acc, color, numOscillators){
    this.radius = radius;
    this.color = color;
    //let volume = area and density = 1, so mass = area
    this.mass = Math.PI * this.radius * this.radius;
    this.loc = loc;
    this.vel = vel;
    this.acc = acc;
  }


  momentum(){
    return vector2d.scalarMult(this.vel, this.mass);
  }

  kineticEnergy(){
    var v = this.vel.magnitude();
    return this.mass * v * v / 2;
  }


  applyForce(f){
    this.acc.add(f);
  }

  //updates ball position
  update () {
    this.checkEdges();
    if(this !== attractor && this !== repeller){
      this.applyForce(this.attractorForce());
      this.applyForce(this.repellerForce());
    }

    this.vel.add(this.acc);
    this.vel.limit(8);
    //console.log(this.vel.magnitude());
    this.loc.add(this.vel);
    this.acc.scalarMult(0);
  }


  //reverses direction when ball hits edge
  checkEdges () {
    if(this.loc.x + this.radius >= canvas.width){
      this.loc.x = canvas.width - this.radius;
      this.vel.x *= -1;
    }
    if(this.loc.x - this.radius < 0){
      this.loc.x = this.radius;
      this.vel.x *= -1;
    }
    if(this.loc.y + this.radius >= canvas.height){
      this.loc.y = canvas.height - this.radius;
      this.vel.y *= -1;
    }
    if(this.loc.y - this.radius < 0){
      this.loc.y = this.radius;
      this.vel.y *= -1;
    }
  }

  //draws ball
  draw () {
    this.update();

    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

}
