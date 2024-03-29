
class Bullet extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);

		this.selectable = false; // Can't be selected
		this.color = "white";

		let stats = new StatBlock(1);
		stats.assign(this);

		this.timedLife = 4; // Seconds of timed life
		this.damage = 2; // Damage dealt upon collision

		this.collisionEvents.push((other) => {
			if(other.faction == this.owner.faction || (other.owner && other.owner.faction == this.owner.faction)) {
				return; // Don't collide with the rocketship or its bullets/missiles
			}

			if(other.offline) {
				return;
			}

			let collisionVisual = new BulletImpactVisual(this.loc.clone(), this.color);
			System().addVisual(collisionVisual);

			if(other.stats) {
				other.stats.takeDamage(this.damage);
			}
			this.destroy();
		});

	}

	update() {
		super.update();
		this.timedLife -= 1/FPS;
		if(this.timedLife <= 0) {
			this.destroy();
		}
	}

	render() {
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

// BulletImpactVisual
// A colored circle begins with a radius of 0 and
// expands until it reaches its maximum radius
// at which point it is destroyed.
class BulletImpactVisual extends Mover {
	constructor(loc, color) {
		super(loc);
		this.color = color || 'white';
		this.maxRadius = 10;
		this.radius = 0;
		this.duration = 0.175;	// default duraton .175 seconds
		this.timer = this.duration*FPS;
	}

	// update() --
	// Expand the circle by an increment or die
	// when time is up and that would be when the
	// max radius is reached.
	update() {
		this.timer--;
		this.radius += this.maxRadius / (this.duration*FPS);
		if(this.timer <= 0) {
			this.destroy();
			return;
		}
	}

	render() {
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}
}

class Torpedo extends Bullet {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);

		this.color = "white";

		let stats = new StatBlock(4);
		stats.assign(this);

		this.accelRate = 160;
		this.maxVel = 400;

		this.timedLife = 10; // Seconds of timed life
		this.damage = 8; // Damage dealt upon collision

		this.collisionEvents.push((other) => {
			if(other.faction == this.owner.faction || (other.owner && other.owner.faction == this.owner.faction)) {
				return; // Don't collide with the rocketship or its bullets/missiles
			}

			if(other.offline) {
				return;
			}

			if(other instanceof Bullet) {
				return;
			}

			let collisionVisual = new BulletImpactVisual(this.loc.clone(), this.color);
			collisionVisual.maxRadius *= 1.5;
			System().addVisual(collisionVisual);

			if(other.stats) {
				other.stats.takeDamage(this.damage);
			}
			this.destroy();
		});

	}

	update() {
		super.update();

		if(this.target && !this.target.isAlive()) {
			this.target = false; // Stop pursuing a target once it's been destroyed
		}

		let vector = this.vel.clone();
		if(this.target && (this.target.targetScanned || this.owner != System().ship)) {
			vector = this.loc.vectorTo(this.target.loc);

			ctx.beginPath();
			let pos = System().getScreenPosition(this);
			let tPos = System().getScreenPosition(this.target);
			let distance = pos.distance(tPos);
			pos.add(pos.vectorTo(tPos).setMag(this.radius));
			tPos.add(tPos.vectorTo(pos).setMag(this.target.radius));
			ctx.moveTo(pos.x, pos.y);
			ctx.lineTo(tPos.x, tPos.y);
			ctx.strokeStyle = this.color;
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.lineWidth = 2;

		}
		vector.setMag(this.accelRate/FPS);
		this.vel.add(vector);

		this.vel.limit(this.maxVel);
	}

	render() {
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius/2, 0, Math.PI * 2);
		ctx.fillStyle = "black";
		ctx.fill();
	}
}
