
class Shield extends Mover { // Basic defensive barrier around a spaceship
	constructor(owner) {
		super(owner.loc.clone());
		this.owner = owner;
		this.radius = owner.radius * 1.25 + 3;

		this.rotation = Math.random() * Math.PI * 2;

		this.visibleDuration = 0.25; // Time in seconds the shield is visible after hitting something
		this.visibleTimer = 0;

		this.collisionEvents.push((other) => {
			if(!(other instanceof Bullet)) {
				return;
			}
			if(other == this.owner || other.owner == this.owner) {
				return;
			}
			other.destroy();
			this.visibleTimer = this.visibleDuration * FPS;
		})
	}

	update() {
		this.loc = this.owner.loc.clone(); // Always stick rigidly to owner's position
		this.visibleTimer--;
		this.rotation += Math.PI / 2 / FPS;
	}

	render() {
		if(this.visibleTimer > 0 || true) {
			let segmentNum = 12;
			for(let i = 0; i < segmentNum; i++) {
				ctx.beginPath();
				ctx.arc(this.loc.x, this.loc.y, this.radius, (Math.PI / segmentNum) * (2*i) + this.rotation, (Math.PI / segmentNum) * (2*i+1) + this.rotation);
				ctx.strokeStyle = '#0066FF';
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.lineWidth = 2;
			}
		}
	}
}