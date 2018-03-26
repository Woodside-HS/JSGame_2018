
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
		this.fireSpread = 45; // Inaccuracy of firing, in degrees
		this.allowedFireArc = 45; // Arc within which the ship will start firing
	}

	initialize() {
		let shield = new Shield(this);
		shield.stats.maxHp /= 2;
		shield.offlineRechargePercent = 3; // Recovers from going offline faster
		this.addShield(shield);
	}

	update(){

		if(this.stats.health() <= 0) {
			this.kill();

			let collisionVisual = new BulletImpactVisual(this.loc.clone(), 'red');
			collisionVisual.maxRadius = this.radius * 1.5;
			System().addVisual(collisionVisual);
			return;
		}

		if(this.firing) { // If ship is actively in shooting mode...
			if(this.shotsFired < this.burstCount) { // If it hasn't completed its burst yet...
				this.fireDelay++;
				while(this.fireDelay >= FPS / this.fireRate) {
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
			let vector = this.loc.vectorTo(System().ship.loc).setMag(75/FPS);
			let addition = this.vel.clone().setMag(vector.magnitude());
			vector.add(addition);
			this.vel.add(vector);
			if(Math.abs(this.loc.vectorTo(System().ship.loc).theta() - this.vel.theta()) <= (this.allowedFireArc / 180 * Math.PI / 2)) { // Angled less than 45 degrees away
				this.firing = true;
			}
			if(Math.abs(this.loc.vectorTo(System().ship.loc).theta() - this.vel.theta()) <= Math.PI / 2) {
				// Deaccelerate to help them turn
				this.vel.scalarDiv(1 + 3/FPS);
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
		angle += -this.fireSpread/360*Math.PI + Math.random() * this.fireSpread/180*Math.PI;
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

class TorpedoCruiser extends DroneShip {
	constructor(loc) {
		super(loc);

		this.radius = 25;

		let stats = new StatBlock(80);
		stats.assign(this);

		this.burstInterval = 0.3;
		this.burstCount = 8;
		this.fireRate = 40;
		this.fireSpread = 90;
		this.allowedFireArc = 90;

		this.torpedoCooldown = 4;
		this.torpedoTimer = 0;
	}

	initialize() {
		let shield = new Shield(this, 35, "#4400FF");
		shield.stats.maxHp *= 2;
		this.addShield(shield);
	}

	update() {
		super.update();
		
		this.torpedoTimer--;
		let distance = this.loc.distance(System().ship.loc);
		if(this.torpedoTimer <= 0 && distance <= 800) {
			this.fireTorpedo();
			this.torpedoTimer = this.torpedoCooldown * FPS;
		}
	}

	fireTorpedo() {
		let angle = this.vel.theta();
		for(let i = 0; i < 2; i++) {
			angle += -Math.PI/4 + (i * Math.PI/2);
			let velocity = new AngularVector2D(120, angle);
			let bullet = new Torpedo(this.loc.clone().add(this.vel.clone().setMag(8)), this.vel.clone().add(velocity), new Vector2D(0,0), 6);
			bullet.owner = this;
			bullet.target = System().ship;
			bullet.color = "red";
			System().addEntity(bullet);
		}
	}

	render(){

		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.vel.theta());
		ctx.beginPath();
		ctx.moveTo(16, 0);
		ctx.lineTo(-20, -24);
		ctx.lineTo(-4, 0);
		ctx.lineTo(-20, 24);
		ctx.lineTo(16, 0);

		ctx.fillStyle = 'red';
		ctx.fill();

		ctx.restore();

	}
}

class ShieldPlatform extends DroneShip {
	constructor(loc) {
		super(loc);

		this.radius = 25;

		let stats = new StatBlock(80);
		stats.assign(this);

		this.burstInterval = 0.5;
		this.burstCount = 10;
		this.fireRate = 50;
		this.fireSpread = 360;

		this.allowedFireArc = 360;

		this.torpedoCooldown = 4;
		this.torpedoTimer = 0;

		this.rotation = Math.random() * Math.PI * 2;
		this.rpm = 30;
	}

	initialize() {
		let shield = new Shield(this);
		this.addShield(shield);
		
		shield = new Shield(this, 150, "#AAFFFF");
		shield.rpm = 5;
		shield.stats.maxHp = 120;
		this.addShield(shield);
	}

	update() {
		super.update();

		this.rotation += this.rpm * Math.PI * 2 / 60 / FPS;
	}

	render(){

		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.rotation);
		
		for(let i = 0; i < 2; i++) {

			ctx.beginPath();

			let radiusRatio = 3 + 3*i;
			ctx.moveTo(0, this.radius);
			ctx.lineTo(-this.radius/radiusRatio, this.radius/radiusRatio);
			ctx.lineTo(-this.radius, 0);
			ctx.lineTo(-this.radius/radiusRatio, -this.radius/radiusRatio);
			ctx.lineTo(0, -this.radius);
			ctx.lineTo(this.radius/radiusRatio, -this.radius/radiusRatio);
			ctx.lineTo(this.radius, 0);
			ctx.lineTo(this.radius/radiusRatio, this.radius/radiusRatio);
			ctx.lineTo(0, this.radius);

			ctx.fillStyle = i == 1 ? 'red' : '#0066FF';
			if(i==1) {
				ctx.fillStyle = 'red';
			}
			ctx.fill();
		}

		ctx.restore();

	}
}