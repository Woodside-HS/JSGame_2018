
class Camera {
	constructor() {
		this.loc = playerShip.loc.clone();
		this.vel = new Vector2D(0,0);
		this.acc = new Vector2D(0,0);
		this.friction = 5;
		this.player_attraction = 1;
	}

	update() {
		if(this.loc.distance(System().ship.loc) < 1) {
			if(this.vel.magnitude() > 0) {
				this.vel = new Vector2D();
			}
		} else {
			let travelVector = this.loc.vectorTo(System().ship.loc);//point toward player
			//travelVector.scalarMult(travelVector.magnitude());
			travelVector.scalarMult(1/FPS);//move slower at lower framerate
			travelVector.scalarMult(this.player_attraction);
			travelVector.limit(100);
			this.acc = travelVector;
		}

		if(this.acc.magnitude()>this.friction){
			let frictionForce = this.vel.clone();
			frictionForce.setDirection(frictionForce.theta()+Math.PI);
			frictionForce.setMag(this.friction);
			this.acc.add(frictionForce);
		}
		else{
			this.vel.setMag(0);
		}
		this.vel.add(this.acc)
		this.loc.add(this.vel);
	}
}
