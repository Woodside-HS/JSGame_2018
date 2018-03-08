
class Camera {
	constructor() {
		this.loc = playerShip.loc.clone();
		this.vel = new Vector2D(0,0);
		this.acc = new Vector2D(0,0);
	}

	update() {
		if(this.loc.distance(System().ship.loc) < 1) {
			if(this.vel.magnitude() > 0) {
				this.vel = new Vector2D();
			}
		} else {

			let vectorTo = this.loc.vectorTo(System().ship.loc);

			let scale = this.loc.distance(System().ship.loc);
			let vel = vectorTo.clone().scalarMult(scale);
			vel.scalarDiv(FPS*2).add(vectorTo.clone().setMag(40)).limit(800);
			this.velocity = this.loc.vectorTo(System().ship.loc).scalarMult(this.loc.distance(System().ship.loc)).scalarDiv(World.FPS*2)
			.add(this.loc.vectorTo(System().ship.loc).setMag(40)).limit(800);

			this.vel = vel;

		}
		if(this.loc.distance(System().ship.loc) < 10) {
			this.vel.scalarMult(0.25);
		}

		this.loc.add(this.vel);
	}
}