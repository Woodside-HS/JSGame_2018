
class Asteroid extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);
		// this.radius = radius;
	}

	render() {
		ctx.beginPath();
	  ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'gray';
		ctx.fill();
	}

}
