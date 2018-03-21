
class Bullet extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);

		this.selectable = false; // Can't be selected
		this.color = "white";

		this.timedLife = 4; // Seconds of timed life
		this.damage = 2; // Damage dealt upon collision

		this.collisionEvents.push((other) => {
			if(other.faction == this.owner.faction || (other.owner && other.owner.faction == this.owner.faction)) {
				return; // Don't collide with the rocketship or its bullets/missiles
			}

			if(other.offline) {
				return;
			}

			if(!(other instanceof Mover)) {
				return; // Don't collide with non-movers
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

class BulletImpactVisual extends Mover {
	constructor(loc, color) {
		super(loc);
		this.color = color || 'white';
		this.maxRadius = 15;
		this.radius = 0;
		this.duration = 0.25;
		this.timer = this.duration*FPS;
	}

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