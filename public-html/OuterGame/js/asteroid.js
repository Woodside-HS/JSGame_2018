
class Asteroid extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);
		// this.radius = radius;
		var asteroidImageNum = Math.floor(Math.random()*10+1);
    this.asteroidImage = Images['Asteroid' + asteroidImageNum];

		let stats = new StatBlock(1000, {killable: false}); // Health based on radius
		stats.assign(this);

		this.deathEvents.push(() => {
			let collisionVisual = new BulletImpactVisual(this.loc.clone(), 'gray');
			collisionVisual.maxRadius = 8;
			System().addVisual(collisionVisual);
		});
	}

	update() {
		this.radius -= this.stats.damageTaken / 3;
		this.stats.damageTaken = 0;
		if(this.radius <= 5) {
			this.kill();
		}
	}

	render() {
    var dx = this.loc.x-this.radius;
    var dy = this.loc.y-this.radius;
    var dw = this.radius*2;
    var dh = this.radius*2;
    //ctx.drawImage(asteroid, 0, 0, asteroid.width, asteroid.height, dx, dy, dw, dh);
		ctx.drawImage(this.asteroidImage, dx, dy, dw, dh);
	}
}
