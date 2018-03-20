class Mover {

  constructor(loc, vel, acc, radius, color, numOscillators){
    this.radius = radius;
    this.color = color;
    //let volume = area and density = 1, so mass = area
    this.loc = loc;
    this.vel = vel || new Vector2D(0,0);
    this.acc = acc || new Vector2D(0,0);

	this.collisionEvents = [];

	this.selectable = true; // Whether the player can select it - disable for e.g. visual effects, bullets, etc.
  }

	mass() {
		return Math.PI * Math.pow(this.radius, 2);
	}

  momentum(){
    return Vector2D.scalarMult(this.vel, this.mass());
  }

  kineticEnergy(){
    var v = this.vel.magnitude();
    return this.mass() * Math.pow(v, 2) / 2;
  }


  applyForce(f){
    this.acc.add(f);
  }

  destroy() {
	let idx = System().entities.indexOf(this);
	if(idx == -1) {
		idx = System().visuals.indexOf(this);
		if(idx == -1) {
			return; // If it's not in the world, no point in destroying it
		}
		System().visuals.splice(idx, 1);
	} else {
		System().entities.splice(idx, 1);
	}
  }

  //updates ball position
  update () {
    // this.checkEdges();
    //^^ take out because not being used for mover subclass objects, issue 12

    this.vel.add(this.acc);
    this.loc.add(this.vel.clone().scalarDiv(FPS));
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

	checkCollide () {
		let collisions = [];
		for(let i in System().entities) {
			let ent = System().entities[i];
			if(ent == this) {
				continue;
			}
			let dist = this.loc.distance(ent.loc);
			if(dist < (this.radius + ent.radius)) {
				collisions.push({source: this, other: ent});
			}
		}
		return collisions;
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
