
class Asteroid extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);
		// this.radius = radius;
		var asteroidImageNum = Math.floor(Math.random()*10+1);
    this.asteroidImage = Images['Asteroid' + asteroidImageNum];
	this.angle = Math.random(Math.PI*2);
	this.rotation = Math.random()*0.2;

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
			System().makeAsteroids(1, true); // Issue 136 regenerate
		});
	}

	mass() {
		return 10 * Math.PI * Math.pow(this.radius, 2);
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
		this.angle += this.rotation;

		//vvv issue 98, wrap around edge of world
		if(Math.abs(this.loc.x)>(System().width*5/4)){
			let sign = this.loc.x/Math.abs(this.loc.x);
			if(sign<0){ //if sign is negative, asteroid is at top edge of world, go to bottom
				this.loc.x = this.loc.x + (System().width*5/2);
			} else{ //sign is positive, at bottom edge, show up at top
				this.loc.x = this.loc.x - (System().width*5/2);
			}
		}
		if(Math.abs(this.loc.y)>(System().height*5/4)){
			let sign = this.loc.y/Math.abs(this.loc.y);
			if(sign<0){ //left edge, show up on right
				this.loc.y = this.loc.y + (System().height*5/2);
			} else{ //right edge, show left
				this.loc.y = this.loc.y - (System().height*5/2);
			}
		}
	}

	render() {
		/* Issue 136 Draw only if the asteroid is within the canvas bounds
		let cnvLoc = System().canvasLoc;
		let cnvLeft = cnvLoc.x - canvas.width/2;
		let cnvTop = cnvLoc.y - canvas.height/2;
		let cnvRight = cnvLoc.x  + canvas.width/2;
		let cnvBottom = cnvLoc.y + canvas.height/2;
		if(this.loc.x - this.radius < cnvRight &&
			this.loc.x + this.radius > cnvLeft &&
			this.loc.y - this.radius < cnvBottom &&
			this.loc.y + this.radius < cnvTop) {
		*/
			ctx.save();
			ctx.translate(this.loc.x, this.loc.y);
			ctx.rotate(this.angle);
			ctx.drawImage(this.asteroidImage, -this.radius, -this.radius, this.radius*2, this.radius*2);
			ctx.restore();
		/* Issue 136 Draw only if the asteroid is within the canvas bounds
		}
		*/
	}
}
