
class Asteroid extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);

		let stats = new StatBlock(this.radius); // Health based on radius
		stats.assign(this);

		this.deathEvents.push(() => {
			let collisionVisual = new BulletImpactVisual(this.loc.clone(), 'gray');
			collisionVisual.maxRadius = this.radius * 2;
			System().addVisual(collisionVisual);


			if(this.radius <= 8) {
				return;
			}
			let num = Math.round(Math.random()) + 2;
			for(let i = 0; i < num; i++) {
				let vel = new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1).setMag(this.vel.magnitude());
				let newAsteroid = new Asteroid(this.loc.clone().add(vel.scalarMult(1)), vel, new Vector2D(0,0), (Math.random() * 1 + 0.5) * this.radius / num);
				System().addEntity(newAsteroid);
			}
		});
	}

	render() {
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'gray';
		ctx.fill();
	}

}
