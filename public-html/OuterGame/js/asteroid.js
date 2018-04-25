
class Asteroid extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);

		let stats = new StatBlock(1000, {killable: false}); // Health based on radius
		stats.assign(this);

		// All functions in the deathEvents array will execute
		// from Mover.kill()
		this.deathEvents.push(
			// add a visual to run when this asteroid dies
			() => {
			let collisionVisual = new BulletImpactVisual(this.loc.clone(), 'gray');
			collisionVisual.maxRadius = 8;
			System().addVisual(collisionVisual);
		});
	}

	update() {
		// reduce the radius of this asteroid when it takes damage
		this.radius -= this.stats.damageTaken / 3;
		this.stats.damageTaken = 0;
		if(this.radius <= 5) {
			this.kill();	// Mover.kill()
		}

		this.vel.add(this.acc);
    this.loc.add(this.vel.clone().scalarDiv(FPS));
    this.acc.scalarMult(0);
	}

	render() {
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'gray';
		ctx.fill();
	}

}
