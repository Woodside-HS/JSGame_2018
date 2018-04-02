
class Asteroid extends Mover {
	constructor(loc, vel,acc,radius) {
		super(loc,vel,acc,radius);
		// this.radius = radius;
		var asteroidImageNum = Math.floor(Math.random()*10+1);
    this.asteroidImage = Images['Asteroid' + asteroidImageNum];
	}

	render() {
    var dx = this.loc.x-this.radius;
    var dy = this.loc.y-this.radius;
    var dw = this.radius*2;
    var dh = this.radius*2;
    //ctx.drawImage(asteroid, 0, 0, asteroid.width, asteroid.height, dx, dy, dw, dh);
		ctx.drawImage(this.asteroidImage, dx, dy, dw, dh);
	}

}
