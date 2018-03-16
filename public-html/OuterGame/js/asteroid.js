
class Asteroid extends Mover {
	constructor(loc, radius) {
		super(loc);
		this.radius = radius;
	}

	render() {
		
		ctx.save();
		ctx.translate(this.loc.x, this.loc.y);
		ctx.rotate(this.dir)
		ctx.beginPath();
	    ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'gray';
		ctx.fill();
		ctx.restore();

	}

}