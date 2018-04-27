class Planet{

  constructor(radius, location){
    this.radius = radius;
    this.loc = location;
    var planetImageNum = Math.floor(Math.random()*10+1);
    this.planetImage = Images['Planet' + planetImageNum];
    this.game = new Game();
  }

  render () {
    var dx = this.loc.x-this.radius;
    var dy = this.loc.y-this.radius;
    var dw = this.radius*2;
    var dh = this.radius*2;
    ctx.drawImage(this.planetImage, dx, dy, dw, dh);
  }
}
