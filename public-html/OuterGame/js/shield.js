
class Shield extends Mover { // Basic defensive barrier around a spaceship
	constructor(owner) {
		super(owner.loc.clone());
		this.owner = owner;
		this.radius = owner.radius * 1.25 + 3;

		this.selectable = false; // Can't select shields

		this.rotation = Math.random() * Math.PI * 2;

		this.visibleDuration = 0.25; // Time in seconds the shield is visible after hitting something
		this.visibleTimer = 0;

		this.offline = false;
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

		this.stats.healDamage(2 / FPS);

		this.loc = this.owner.loc.clone(); // Always stick rigidly to owner's position
		this.visibleTimer--;
		this.rotation += Math.PI / 2 / FPS;
	}

	render() {
		if(this.visibleTimer > 0 || true) {
			let segmentNum = 12;
			let health = this.stats.health();
			for(let i = 0; i < segmentNum; i++) {
				let color = '#0066FF';
				if(this.offline && (this.offlineTimer / (this.rechargeDuration * FPS)) > (i / segmentNum)) {
					color = '#444444';
				}
				if(health / this.stats.maxHp <= i / segmentNum) {
					color = '#FF0000';
				}
				ctx.beginPath();
				ctx.arc(this.loc.x, this.loc.y, this.radius, (Math.PI / segmentNum) * (2*i) + this.rotation, (Math.PI / segmentNum) * (2*i+1) + this.rotation);
				ctx.strokeStyle = color;
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.lineWidth = 2;
			}
		}
	}
}