class Planet{

  constructor(radius, location){
    this.radius = radius;
    this.loc = location;
    this.planetImage = Math.floor(Math.Random()*7);
  }

  render () {
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'brown';
    ctx.fill();
    var pre = this.imageArray[this.planetImage];
    ctx.drawImage(game.shownImage, pre.x, pre.y, pre.w, pre.h, this.loc.x-(this.loc.x/2), this.loc.y-(this.loc.y/2), this.rad*2, this.rad*2);
  }

}
