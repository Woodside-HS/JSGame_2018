class Rocketship extends Mover {

	constructor(location) {
		super(location);
		this.loc = location;
		this.radius = 15;
		this.damagePower = 3;

		this.name = "Explorer";

		this.faction = 0; // FRIENDLY faction. Disables friendly fire.

		let stats = new StatBlock(100);
		stats.assign(this);

		this.vel = new Vector2D(0.0001, 0.0001); // issue 3
		this.acc = new Vector2D(0, 0);
		this.frictionAcc = 3;

		//dir keeps track of direction ship is pointing when velocity is 0 or too small
		//ship starts pointing right
		this.dir = 0;
		this.configMaxVel = 300;
		this.maxVel = this.configMaxVel;
		this.kEngineUpgrade = 1;
		this.maxVel = this.configMaxVel;
		this.mouseLoc = null;
		this.minMovementRange = 1;
		this.mouseAccel = .1
		this.image = Images['playerShip'];
		this.shipScalingFactor = .33;

		// Setup scanner

		this.targetScanDuration = 1;
		this.targetScanTimer = 0;

		this.firing = false; // E key

		this.burstInterval = 0.3; // Seconds between burst attacks
		this.burstCount = 3; // Shots per burst
		this.burstDelay = this.burstInterval * FPS; // Frames since last burst was fired
		this.shotsFired = this.burstCount; // Number of shots fired in current burst

		this.fireRate = 12; // Shots per second during burst
		this.fireDelay = FPS / this.fireRate; // Frames since last shot was fired
		this.fireSpread = 45; // Inaccuracy of firing, in degrees

		// Torpedo settings

		this.torpedoCooldown = 1.5; // Seconds between torpedo launches
		this.torpedoTimer = 0;

		// Shield setup

		let shield = new Shield(this);
		this.addShield(shield);
	}

	mass() {
		//return Math.PI * Math.pow(this.radius, 2);
		return 100;
	}

	update() {

		this.maxVel = this.getEngineModifier()*this.configMaxVel;

		if (this.firing) { // If ship is actively in shooting mode...
			if (this.shotsFired < this.burstCount) { // If it hasn't completed its burst yet...
				this.fireDelay++;
				if (this.fireDelay >= FPS / this.fireRate) {
					this.fireDelay -= FPS / this.fireRate;
					this.shotsFired++;
					this.fireBullet(); // Fire a bullet!
				}
			}
		} else {
			this.shotsFired = this.burstCount; // Whenever the ship stops firing, it cancels the current burst. This just looks nicer, it's not a big change.
		}
		if (this.shotsFired == this.burstCount) {
			this.burstDelay++;
			if (this.burstDelay >= this.burstInterval * FPS) { // Once the burst interval is over, it's ready to start the next burst
				this.shotsFired = 0;
				this.burstDelay = 0;
			}
		}

		this.torpedoTimer--;
		if (this.torpedoPrimed) {
			this.attemptTorpedoLaunch();
		}

		if (this.mouseLoc) {
			let movementVector = worlds[currentLevel].worldCursorPos();
			movementVector.subtract(this.loc);
			if (2*movementVector.magnitude() < this.maxVel) {
				this.maxVel=2*movementVector.magnitude();
			}
			if (movementVector.magnitude() > this.minMovementRange) {
				this.acc = movementVector.clone();
				this.acc.setMag(this.mouseAccel*(movementVector.magnitude() - this.minMovementRange));
				this.acc.scalarMult(this.getEngineModifier());
			}
		}
		/*let frictionAcc = this.vel.clone();
		frictionAcc.setMag(-1 * this.frictionAcc);
		this.vel.add(frictionAcc);*/
		this.vel.add(this.acc);
		this.vel.limit(this.maxVel);

		//only recalculate direction if velocity is greater than 0
		if (this.vel.magnitude() > 0.001) { // issue 3
			this.dir = this.vel.theta();
		}
		// removed a condition for issue 3
		//System().pastVels.push(this.vel.clone().scalarDiv(FPS));

		this.loc.add(this.vel.clone().scalarDiv(FPS));
		this.acc.scalarMult(0);

		//vvv issue 98, stop rocketship at edge of world
		var edge = false;
		if (Math.abs(this.loc.x) >= (System().width)) {
			edge = true;
			this.loc.x -= this.vel.clone().scalarDiv(FPS).x;

		}
		if (Math.abs(this.loc.y) >= (System().height)) {
			edge = true;
			this.loc.y -= this.vel.clone().scalarDiv(FPS).y;
		}
	}

	applyForce(f) {
		this.acc.add(f);
	}


	fireBullet() {
		let angle = this.vel.theta();
		angle += -this.fireSpread / 360 * Math.PI + Math.random() * this.fireSpread / 180 * Math.PI;
		let velocity = new AngularVector2D(250, angle);
		let bullet = new Bullet(this.loc.clone().add(this.vel.clone().setMag(8)), this.vel.clone().add(velocity), new Vector2D(0, 0), 3);
		bullet.owner = this;
		bullet.color = "yellow";
		System().addEntity(bullet);
	}

	attemptTorpedoLaunch() {
		if (this.torpedoTimer <= 0) {
			this.fireTorpedo();
			this.torpedoPrimed = false;
			this.torpedoTimer = this.torpedoCooldown * FPS;
		} else {
			this.torpedoPrimed = true; // Prepare to fire a torpedo as soon as it's off cooldown
		}
	}

	fireTorpedo() {
		let angle = this.vel.theta();
		angle += -Math.PI / 12 + Math.random() * Math.PI / 6;
		let velocity = new AngularVector2D(120, angle);
		let bullet = new Torpedo(this.loc.clone().add(this.vel.clone().setMag(8)), this.vel.clone().add(velocity), new Vector2D(0, 0), 6);
		bullet.owner = this;
		if (System().cursorTarget) {
			bullet.target = System().cursorTarget;
		}
		bullet.color = "yellow";
		System().addEntity(bullet);
	}

	render() {

		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.dir+ Math.PI/2)
		ctx.scale(this.shipScalingFactor,this.shipScalingFactor);
		ctx.drawImage(this.image, this.image.width/(-2), this.image.height/(-2));
		ctx.restore();

	}

	getEngineModifier(){
		return this.kEngineUpgrade*Math.log(resources.outerEngineLevel)+1;
	}

}
