class Planet{

  constructor(radius, location){
    this.radius = radius;
    this.loc = location;
    this.planetImage = Math.floor(Math.random()*7);
  }

  render () {
    var pre = imageArray[this.planetImage];
    var dx = this.loc.x-this.radius;
    var dy = this.loc.y-this.radius;
    var dw = this.radius*2;
    var dh = this.radius*2;
    ctx.drawImage(planet, pre.x, pre.y, pre.w, pre.h, dx, dy, dw, dh);
  }
}
