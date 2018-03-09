class Planet{

  constructor(radius, location){
    this.radius = radius;
    this.loc = location;
  }

  render () {
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'brown';
    ctx.fill();
  }

}
