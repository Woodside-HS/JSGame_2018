class Rocketship extends Mover {

	constructor(location){
		super(location);
		this.loc = location;
		this.radius = 15;

		this.name = "Explorer";

		this.faction = 0; // FRIENDLY faction. Disables friendly fire.

		let stats = new StatBlock(100);
		stats.assign(this);

		this.vel = new Vector2D(0.0001,0.0001); // issue 3
		this.acc = new Vector2D(0,0);
		//dir keeps track of direction ship is pointing when velocity is 0 or too small
		//ship starts pointing right
		this.dir = 0;
		this.maxVel = 180;
		//booleans keep track of when the ship is accelerating/decelerating/turning
		//turned on in main.js when asdw keys are pressed
		this.up = false; //w key
		this.down = false; //s key
		this.right = false; //d key
		this.left = false; //a key

		// Setup scanner

		this.targetScanDuration = 1;
		this.targetScanTimer = 0;

		this.firing = false; // E key

		this.burstInterval = 0.3; // Seconds between burst attacks
		this.burstCount = 3; // Shots per burst
		this.burstDelay = this.burstInterval*FPS; // Frames since last burst was fired
		this.shotsFired = this.burstCount; // Number of shots fired in current burst

		this.fireRate = 12; // Shots per second during burst
		this.fireDelay = FPS/this.fireRate; // Frames since last shot was fired

		// Torpedo settings

		this.torpedoCooldown = 1.5; // Seconds between torpedo launches
		this.torpedoTimer = 0;

		// Shield setup

		this.shield = new Shield(this);
		System().addEntity(this.shield);
	}

	update(){

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
		
		this.torpedoTimer--;
		if(this.torpedoPrimed) {
			this.attemptTorpedoLaunch();
		}

		//execute appropriate functions if keys are down
		if(this.up) { this.accelerate(); }
		if(this.down) { this.decelerate(); }
		if(this.right) { this.turnRight(); }
		if(this.left) { this.turnLeft(); }

		this.vel.add(this.acc);
		this.vel.limit(this.maxVel);
		//only recalculate direction if velocity is greater than 0
		if(this.vel.magnitude() > 0.00001){ // issue 3
			this.dir = this.vel.theta();
		}
		// removed a condition for issue 3

		this.loc.add(this.vel.clone().scalarDiv(FPS));
		this.acc.scalarMult(0);
	}

	applyForce(f){
		this.acc.add(f);
	}

	turnRight(){
		//console.log('r');
		var m;
		if(this.vel.magnitude() > 0){
			m = this.vel.magnitude()/30;
		} else{
			m = 0.001;
		}
		var f = new AngularVector2D(m, this.dir + Math.PI/2);
		this.applyForce(f);
	}

	turnLeft(){
		//console.log('l');
		var m;
		if(this.vel.magnitude() > 0){
			m = this.vel.magnitude()/30;
		} else{
			m = 0.001;
		}
		var f = new AngularVector2D(m, this.dir - Math.PI/2);
		this.applyForce(f);
	}

	accelerate(){
		//apply a force in the direction the ship is traveling
		var f = new AngularVector2D(6, this.dir);
		this.applyForce(f);
	}

	decelerate(){
		//apply a force in the opposite direction of the ship
		//checks velocity to make ship stop, not travel backward
		if(this.vel.magnitude() > 0.0001){
			var f = new AngularVector2D(this.vel.magnitude()/30 + 1, this.vel.theta() + Math.PI);
			f.limit(this.vel.magnitude()-0.0001);
			this.applyForce(f);
		}
	}

	fireBullet() {
		let angle = this.vel.theta();
		angle += -Math.PI/12 + Math.random() * Math.PI/6;
		let velocity = new AngularVector2D(250, angle);
		let bullet = new Bullet(this.loc.clone().add(this.vel.clone().setMag(8)), this.vel.clone().add(velocity), new Vector2D(0,0), 3);
		bullet.owner = this;
		bullet.color = "yellow";
		System().addEntity(bullet);
	}

	attemptTorpedoLaunch() {
		if(this.torpedoTimer <= 0) {
			this.fireTorpedo();
			this.torpedoPrimed = false;
			this.torpedoTimer = this.torpedoCooldown * FPS;
		} else {
			this.torpedoPrimed = true; // Prepare to fire a torpedo as soon as it's off cooldown
		}
	}

	fireTorpedo() {
		let angle = this.vel.theta();
		angle += -Math.PI/12 + Math.random() * Math.PI/6;
		let velocity = new AngularVector2D(120, angle);
		let bullet = new Torpedo(this.loc.clone().add(this.vel.clone().setMag(8)), this.vel.clone().add(velocity), new Vector2D(0,0), 6);
		bullet.owner = this;
		if(System().cursorTarget) {
			bullet.target = System().cursorTarget;
		}
		bullet.color = "yellow";
		System().addEntity(bullet);
	}

	render(){

		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.dir)
		ctx.beginPath();
		ctx.moveTo(8, 0);
		ctx.lineTo(-12, -8);
		ctx.lineTo(-4, 0);
		ctx.lineTo(-12, 8);
		ctx.lineTo(8, 0);

		ctx.fillStyle = 'gray';
		ctx.fill();

		ctx.restore();

	}

}
