// DroneShips are enemies of the player ship and fire at it
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

		this.image = Images['enemyShip'];
	}

	initialize() {
		let shield = new Shield(this);
		shield.stats.maxHp /= 2;
		shield.offlineRechargePercent = 3; // Recovers from going offline faster
		this.addShield(shield);
	}

	// Update()
	// Called from World.update() for every entity every frame
	update(){
		// Did this droneship just die?
		if(this.stats.health() <= 0) {
			this.kill();	// Mover.kill()
			// Add a visual of an expanding circle -- bullet.js
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

		// How far is this droneship from the player ship?
		// If it's within 800 we want to steer towards the player ship
		// and possibly start firing at it.
		let distance = this.loc.distance(playerShip.loc);
		if(distance < 800) {
			// Within 800px from the player ship so steer
			// towards the player ship.
			// For a steering acceleration, start with a vector from
			// this droneship toward the playership and give it
			// a magnitude of 75px per second.
			let vector = this.loc.vectorTo(playerShip.loc).setMag(75/FPS);
			let addition = this.vel.clone().setMag(vector.magnitude());
			// Take the current velocity of this droneship and give it
			// the same magnitude -- 75 per second
			vector.add(addition);
			// Add those two vectors and then add that steering acceleration
			// to the velocity of this droneship.
			this.vel.add(vector);
			// If the angle between the velocity of this droneship
			// and the direction toward the player ship
			// is within 45 degrees, start firing at the player ship.
			let angleBetween = Math.abs(this.loc.vectorTo(playerShip.loc).theta() - this.vel.theta());
			let angleRange = ((this.allowedFireArc/2) / 180) * Math.PI;	// radian equivalent of half of 45 degrees
			if(angleBetween <= angleRange) { // Angled less than +- 22.5 degrees away
				this.firing = true;
			}
			// If the angle between the velocity of this droneship
			// and the direction toward the player ship
			// is within 90 degrees, slow down.
			if(angleBetween <= Math.PI / 2) {
				// Deaccelerate to help them turn
				this.vel.scalarDiv(1 + 3/FPS);
			}
		}
		// keep the velocity of this droneship within limits
		this.vel.limit(this.maxVel);
		// Only recalculate direction if velocity is greater than 0
		// A velocity of 0 is always an angle of 0 but we don't want
		// this droneship to suddenly face in a different direction
		// when it comes to a stop.
		if(this.vel.magnitude() > 0){
			this.dir = this.vel.theta();
		}
		// Update the location of this droneship after adjusting
		// its velocity from per second to per frame.
		this.loc.add(this.vel.clone().scalarDiv(FPS));

		//vvv issue 98, wrap around edge of world
		if(Math.abs(this.loc.x)>(System().width*5/4)){
			let sign = this.loc.x/Math.abs(this.loc.x);
			if(sign<0){ //if sign is negative, droneship is at top edge of world, go to bottom
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

		// ctx.save();
		// ctx.translate(this.loc.x, this.loc.y);
		// ctx.rotate(this.vel.theta());
		// ctx.beginPath();
		// ctx.moveTo(8, 0);
		// ctx.lineTo(-12, -12);
		// ctx.lineTo(-4, 0);
		// ctx.lineTo(-12, 12);
		// ctx.lineTo(8, 0);
		//
		// ctx.fillStyle = 'red';
		// ctx.fill();
		//
		// ctx.restore();

		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.dir+ Math.PI/2)
		ctx.scale(this.shipScalingFactor,this.shipScalingFactor);
		ctx.drawImage(this.image, this.image.width/(-2), this.image.height/(-2));
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
		super.update();	// DroneShip.update()

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
