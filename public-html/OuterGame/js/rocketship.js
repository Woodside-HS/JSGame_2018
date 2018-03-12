class Rocketship extends Mover {

	constructor(location){
		super(location);
		this.loc = location;
		this.radius = 15;
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
	}

	update(){

		//execute appropriate functions if keys are down
		if(System().playerControl == 0) { // Controlled by arrow keys
			if(this.up) { this.accelerate(); }
			if(this.down) { this.decelerate(); }
			if(this.right) { this.turnRight(); }
			if(this.left) { this.turnLeft(); }
		} else {

			let cursorPos = new Vector2D(System().cursorX, System().cursorY);
			let distance = this.loc.distance(cursorPos);
			let multiplier = Math.pow(distance*0.01, 3);

			let vect = this.loc.vectorTo(cursorPos);
			vect.normalize();
			vect.scalarMult(multiplier);
			this.applyForce(vect);

			ctx.beginPath();
			ctx.moveTo(System().cursorX, System().cursorY);
			ctx.lineTo(this.loc.x, this.loc.y);
			ctx.strokeStyle="white";
			ctx.lineWidth=(multiplier/4);
			ctx.stroke();
		}

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
