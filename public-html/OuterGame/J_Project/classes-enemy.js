
// Contains code for enemies (turrets, ships, local aliens, anything we need). Template is provided below, enemies can be made as variations on the template.

class EnemyTemplate extends Entity { // Feel free to either copy or extend this class when making an enemy! That's what it's for.
	constructor(p, v, f, a) {
		super(p, v, f, a);

		// TODO: add more
	}
}

class EnemyShip extends EnemyTemplate {
	constructor(p, v, f, a) {
		super(p, v, f, a);

		this.maximumSpeed = 150;
		this.accelerationSpeed = 100;
		this.deaccelerationSpeed = 20;

		this.fireRate = 0.5; // Period (in seconds) between shots
		this.fireCD = this.fireRate;

		this.addStatBlock(5);

		this.engageDistance = 200; // Distance at which ship stops and shoots at player

		this.graphicsBlocks.push(() => {
			World.ctx.strokeStyle = "blue";
			World.ctx.beginPath();
			World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			World.ctx.stroke();
		});

		this.logicEvents.push(() => {

			let decayRate = this.deaccelerationSpeed / 100 / World.LFPS;

			this.velocity = this.velocity.mult(1-decayRate);

			let targetPos = World.player.position.add(World.player.position.vectorTo(this.position).setLength(this.engageDistance));

			let desired = this.position.vectorTo(targetPos);
			let dist = desired.length();

			if(dist > 500) {
				return; // Can't see the player, so won't chase the player.
			}

			desired = desired.normalize();
			if (dist < 100) {
				let m = Numbers.map(dist, 0, 100, 0, this.maximumSpeed);
				desired = desired.mult(m);
			} else {
				desired = desired.mult(this.maximumSpeed);
			}
 
			let steer = desired.subtract(this.velocity);
			steer = steer.limit(this.accelerationSpeed);
			steer = steer.divide(World.LFPS);
			this.velocity = this.velocity.add(steer);

			if(this.fireCD <= 0) {
				this.fireMissile();
				this.fireCD = this.fireRate;
			} else {
				this.fireCD -= 1/World.LFPS;
			}
		});
	}

	fireMissile() {
		let miss = new Missile();
		miss.position = this.position.add(this.position.vectorTo(World.player.position).setLength(this.radius + miss.radius + 1));
		miss.velocity = miss.position.vectorTo(World.player.position).setLength(miss.maximumSpeed);
		miss.owner = this;
		World.addEntity(miss);
	}
}

class EnemyCruiser extends EnemyShip {
	constructor(p, v, f, a) {
		super(p, v, f, a);

		this.addStatBlock(30);

		this.radius = 50;

		this.bodyDamage = 2;

		this.maximumSpeed = 80;
		this.accelerationSpeed = 50;
		this.deaccelerationSpeed = 20;

		this.fireRate = 1.5;
	}

	fireMissile() {
		let vectors = [
			new Vector(1, 0),
			new Vector(0, 1),
			new Vector(-1, 0),
			new Vector(0, -1)
		];

		for(let i = 0; i < 4; i++) {
			let miss = new GuidedMissile();
			miss.position = this.position.add(vectors[i].setLength(this.radius + miss.radius + 1));
			miss.velocity = vectors[i].setLength(miss.maximumSpeed / 2);
			miss.owner = this;
			miss.target = World.player;
			World.addEntity(miss);
		}
	}
}

class GuidedMissile extends Missile {
	constructor(p, v, f, a) {
		super(p, v, f, a);

		this.radius = 6;

		this.timedLife = 8;

		this.accelerationSpeed = 250;
		this.maximumSpeed = 400;
		this.deaccelerationSpeed = 10;

		this.bodyDamage = 0.5;

		this.graphicsBlocks.push(() => {
			World.ctx.strokeStyle = "purple";
			World.ctx.lineWidth = 5;
			World.ctx.beginPath();
			World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			World.ctx.stroke();
			World.ctx.fillStyle = "blue";
			World.ctx.fill();
			World.ctx.lineWidth = 1;
		});

		this.logicEvents.push(() => {
			let decayRate = this.deaccelerationSpeed / 100 / World.LFPS;

			this.velocity = this.velocity.mult(1-decayRate);

			let targetPos = World.player.position.clone();

			let desired = this.position.vectorTo(targetPos);
			let dist = desired.length();

			desired = desired.normalize();
			if (dist < 100) {
				let m = Numbers.map(dist, 0, 100, 0, this.maximumSpeed);
				desired = desired.mult(m);
			} else {
				desired = desired.mult(this.maximumSpeed);
			}
 
			let steer = desired.subtract(this.velocity);
			steer = steer.limit(this.accelerationSpeed);
			steer = steer.divide(World.LFPS);
			this.velocity = this.velocity.add(steer);
		});
	}
}

class EnemyDevourer extends EnemyShip {
	constructor(p, v, f, a) {
		super(p, v, f, a);

		this.addStatBlock(20);

		this.radius = 35;

		this.bodyDamage = 3;

		this.maximumSpeed = 60;
		this.accelerationSpeed = 40;
		this.deaccelerationSpeed = 20;

		this.fireRate = 3;

		this.graphicsBlocks.push(() => {
			World.ctx.strokeStyle = "purple";
			World.ctx.beginPath();
			World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			World.ctx.stroke();
		});

		this.logicEvents.push(() => {

			let decayRate = this.deaccelerationSpeed / 100 / World.LFPS;

			this.velocity = this.velocity.mult(1-decayRate);

			let targetPos = World.player.position.add(World.player.position.vectorTo(this.position).setLength(this.engageDistance));

			let desired = this.position.vectorTo(targetPos);
			let dist = desired.length();

			if(dist > 500) {
				return; // Can't see the player, so won't chase the player.
			}

			desired = desired.normalize();
			if (dist < 100) {
				let m = Numbers.map(dist, 0, 100, 0, this.maximumSpeed);
				desired = desired.mult(m);
			} else {
				desired = desired.mult(this.maximumSpeed);
			}
 
			let steer = desired.subtract(this.velocity);
			steer = steer.limit(this.accelerationSpeed);
			steer = steer.divide(World.LFPS);
			this.velocity = this.velocity.add(steer);

			if(this.fireCD <= 0) {
				this.fireMissile();
				this.fireCD = this.fireRate;
			} else {
				this.fireCD -= 1/World.LFPS;
			}
		});
	}

	fireMissile() {
		let miss = new EnemyDevourerChild();
		let vector = this.position.vectorTo(World.player.position);
		miss.position = this.position.add(vector.setLength(this.radius + miss.radius + 1));
		miss.velocity = vector.setLength(miss.maximumSpeed);
		miss.owner = this;
		miss.target = World.player;
		World.addEntity(miss);
	}
}

class EnemyDevourerChild extends Missile {
	constructor(p, v, f, a) {
		super(p, v, f, a);

		this.addStatBlock(3);
		this.owner;

		this.radius = 15;
		this.timedLife = 5;

		this.flags.dealsBodyDamage = false;
		this.flags.takesBodyDamage = false;

		this.mass = 5;

		this.maximumSpeed = 600;
		this.accelerationSpeed = 80;
		this.deaccelerationSpeed = 20;

		this.graphicsBlocks.push(() => {
			World.ctx.strokeStyle = "purple";
			World.ctx.lineWidth = 5;
			World.ctx.beginPath();
			World.ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
			World.ctx.stroke();
			World.ctx.fillStyle = "#FF0055";
			World.ctx.fill();
			World.ctx.lineWidth = 1;
		});

		this.collideEvents.push((other) => {
			if(other == this.owner) {
				return;
			}
			if(other instanceof Missile) {
				return;
			}
			let timer = 5;
			let logicEvent = () => {
				other.velocity = other.velocity.add(other.position.vectorTo(this.owner.position).setLength(this.maximumSpeed/2/World.FPS)); // Pull to owner's position
				
				timer -= 1/World.LFPS;
				if(timer <= 0) {
					other.frameEvents.splice(other.frameEvents.indexOf(logicEvent), 1);
					other.collideEvents.splice(other.collideEvents.indexOf(collideEvent), 1);
					other.graphicsBlocks.splice(other.graphicsBlocks.indexOf(graphicBlock), 1);
				}
			};
			let collideEvent = (other) => {
				if(other == this.owner) {
					timer = 0;
				}
			}
			let graphicBlock = () => {
				World.ctx.strokeStyle = "purple";
				World.ctx.lineWidth = 5;
				World.ctx.beginPath();
				World.ctx.arc(0, 0, other.radius/2, 0, 2 * Math.PI);
				World.ctx.stroke();
				World.ctx.fillStyle = "#FF0055";
				World.ctx.fill();
				World.ctx.lineWidth = 1;

				World.ctx.strokeStyle = "#FF0055";
				World.ctx.lineWidth = 3;
				World.ctx.beginPath();
				World.ctx.moveTo(this.owner.position.x, this.owner.position.y);
				World.ctx.lineTo(this.position.x, this.position.y);
				World.ctx.stroke();
			}
			other.frameEvents.push(logicEvent);
			other.collideEvents.push(collideEvent);
			other.graphicsBlocks.push(graphicBlock);
			
			this.destroy();
		});
	}
}