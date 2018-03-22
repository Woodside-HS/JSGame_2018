
class DroneShip extends Mover {
	constructor(loc){
		super(loc);
		this.radius = 12;

		this.vel = new Vector2D(Math.random() * 20 - 10, Math.random() * 20 - 10);

		let stats = new StatBlock(40);
		stats.assign(this);

		this.faction = 1; // HOSTILE faction, disables friendly fire

		this.maxVel = 100;

		this.firing = false;

		this.burstInterval = 0.8; // Seconds between burst attacks
		this.burstCount = 2; // Shots per burst
		this.burstDelay = this.burstInterval*FPS; // Frames since last burst was fired
		this.shotsFired = this.burstCount; // Number of shots fired in current burst

		this.fireRate = 20; // Shots per second during burst
		this.fireDelay = FPS/this.fireRate; // Frames since last shot was fired

		// Shield setup

		this.shield = new Shield(this);
		System().addEntity(this.shield);
	}

	update(){

		if(this.stats.health() <= 0) {
			this.destroy();

			let collisionVisual = new BulletImpactVisual(this.loc.clone(), 'red');
			collisionVisual.maxRadius = this.radius * 1.5;
			System().addVisual(collisionVisual);
			return;
		}

		if(this.firing) { // If ship is actively in shooting mode...
			if(this.shotsFired < this.burstCount) { // If it hasn't completed its burst yet...
				this.fireDelay++;
				if(this.fireDelay >= FPS / this.fireRate) {
					this.fireDelay -= FPS / this.fireRate;
					this.shotsFired++;
					this.fireBullet(); // Fire a bullet!
				}
			}
		} else {
			this.shotsFired = this.burstCount; // Whenever the ship stops firing, it cancels the current burst. This just looks nicer, it's not a big change.
		}
		if(this.shotsFired == this.burstCount) {
			this.burstDelay++;
			if(this.burstDelay >= this.burstInterval*FPS) { // Once the burst interval is over, it's ready to start the next burst
				this.shotsFired = 0;
				this.burstDelay = 0;
			}
		}

		this.firing = false;

		let distance = this.loc.distance(System().ship.loc);
		if(distance < 800) {
			let vector = this.loc.vectorTo(System().ship.loc).setMag(50/FPS);
			let addition = this.vel.clone().setMag(vector.magnitude());
			vector.add(addition);
			this.vel.add(vector);
			if(Math.abs(this.loc.vectorTo(System().ship.loc).theta() - this.vel.theta()) <= Math.PI / 8) { // Angled less than 45 degrees away
				this.firing = true;
			} else if(Math.abs(this.loc.vectorTo(System().ship.loc).theta() - this.vel.theta()) <= Math.PI / 2) {
				// Deaccelerate to help them turn
				this.vel.scalarMult(1 - 3/FPS);
			}
		}

		this.vel.limit(this.maxVel);
		//only recalculate direction if velocity is greater than 0
		if(this.vel.magnitude() > 0){
			this.dir = this.vel.theta();
		}

		this.loc.add(this.vel.clone().scalarDiv(FPS));
	}

	fireBullet() {
		let angle = this.vel.theta();
		angle += -Math.PI/8 + Math.random() * Math.PI/4;
		let velocity = new AngularVector2D(250, angle);
		let bullet = new Bullet(this.loc.clone().add(this.vel.clone().setMag(8)), this.vel.clone().add(velocity), new Vector2D(0,0), 3);
		bullet.owner = this;
		bullet.color = "#AA0000";
		System().addEntity(bullet);
	}

	render(){

		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.vel.theta());
		ctx.beginPath();
		ctx.moveTo(8, 0);
		ctx.lineTo(-12, -12);
		ctx.lineTo(-4, 0);
		ctx.lineTo(-12, 12);
		ctx.lineTo(8, 0);

		ctx.fillStyle = 'red';
		ctx.fill();

		ctx.restore();

	}
}