
class Bullet extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);

		this.selectable = false; // Can't be selected

		this.timedLife = 4; // Seconds of timed life
	}

	update() {
		super.update();
		this.timedLife -= 1/FPS;
		if(this.timedLife <= 0) {
			this.destroy();
		}
	}

	render() {
		ctx.beginPath();
		ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'yellow';
		ctx.fill();
	}
}