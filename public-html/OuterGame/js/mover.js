class Mover {

  constructor(loc, vel, acc, radius, color, numOscillators){
    this.radius = radius;
    this.color = color;
    //let volume = area and density = 1, so mass = area
    this.loc = loc;
    this.vel = vel || new Vector2D(0,0);
    this.acc = acc || new Vector2D(0,0);
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

  //updates ball position
  update () {
    this.checkEdges();

    this.vel.add(this.acc);
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

	checkCollide () {
		let collisions = [];
		for(let i in System().entities) {
			let ent = System().entities[i];
			if(ent == this) {
				continue;
			}
			let dist = this.loc.distance(ent.loc);
			if(dist < (this.radius + ent.radius)) {
				collisions.push(ent);
			}
		}
		return collisions;
	}

	collide (other) { // Default collision effect - the object bounces away when it's hit.

		
		
		let multiplier = other.mass()/this.mass() * 2; // Stronger bounce if the other is heavier, and vice versa
		this.loc = other.loc.clone().add(other.loc.vectorTo(this.loc).setMag(other.radius + this.radius));
		this.vel.add(other.loc.vectorTo(this.loc).setMag((other.vel.magnitude() * multiplier) + 5 /* the static number means there HAS to be some movement */)).scalarDiv(2);
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
