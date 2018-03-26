
class Shield extends Mover { // Basic defensive barrier around a spaceship
	constructor(owner, radius, color) {
		super(owner.loc.clone());
		this.owner = owner;
		this.radius = radius || owner.radius * 1.25 + 3;

		this.collideWithRadius = true; // Objects only collide with the radius of shields, not with the "interior"

		this.color = color || "#0066FF";

		this.selectable = false; // Can't select shields

		this.rotation = Math.random() * Math.PI * 2;
		this.rpm = 15;

		this.visibleDuration = 0.25; // Time in seconds the shield is visible after hitting something
		this.visibleTimer = 0;

		this.offline = false;
		this.offlineRechargePercent = 1;
		this.rechargeDuration = 2.5; // Seconds it takes to recharge the shields
		this.offlineTimer = this.rechargeDuration * FPS;

		let stats = new StatBlock(20, {killable: false});
		stats.assign(this);
	}

	update() {
		if(this.stats.health() <= 0) {
			this.offline = true; // Disable shields when they run out of power
			this.offlineTimer = this.rechargeDuration * FPS;
		}

		if(this.stats.damageTaken == 0) {
			this.offlineTimer--;
			if(this.offlineTimer <= 0) {
				this.offline = false;
			}
		}

		let num = 2;
		if(this.offline) {
			num *= this.offlineRechargePercent;
		}
		this.stats.healDamage(num / FPS);

		this.loc = this.owner.loc.clone(); // Always stick rigidly to owner's position
		this.visibleTimer--;
		this.rotation += this.rpm / 60 * Math.PI * 2 / FPS;
	}

	render() {
		if(this.visibleTimer > 0 || true) {
			let segmentNum = Math.pow(this.radius, 0.8);
			if(this.collisionArc) {
				segmentNum *= this.collisionArc/360;
			}
			segmentNum = Math.round(segmentNum);
			let health = this.stats.health();
			for(let i = 0; i < segmentNum; i++) {
				let color = this.color;
				if(this.offline && (this.offlineTimer / (this.rechargeDuration * FPS)) > (i / segmentNum)) {
					color = '#444444';
				}
				if(health / this.stats.maxHp <= i / segmentNum) {
					color = '#FF0000';
				}
				ctx.beginPath();
				let arcAngle = Math.PI * 2;
				if(this.collisionArc) {
					arcAngle *= this.collisionArc/360;
				}
				ctx.arc(this.loc.x, this.loc.y, this.radius, (arcAngle / 2 / segmentNum) * (2*i) + this.rotation, (arcAngle / 2 / segmentNum) * (2*i+1) + this.rotation);
				ctx.strokeStyle = color;
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.lineWidth = 2;
			}
		}
	}
}

class ArcShield extends Shield {
	constructor(owner, arc, radius, color) {
		super(owner, radius, color);

		this.collisionArc = arc;
		this.arcCenter = 0; // From 0-360

		this.rpm = 0;
	}

	update() {
		super.update();

		this.arcCenter = Math.PI - this.owner.vel.theta();

		this.rotation = this.arcCenter;
	}
}