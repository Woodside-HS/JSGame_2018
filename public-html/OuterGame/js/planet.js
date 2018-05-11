class Planet{

  constructor(radius, location){
    this.radius = radius;
    this.loc = location;
    var planetImageNum = Math.floor(Math.random()*5+1);
    this.planetImage = Images['Planet' + planetImageNum];
    this.storyImage = Images["panel0" + planetImageNum];
    this.storyPanelDiv = document.getElementById("gamepanel" + planetImageNum);
    this.storyPanelDiv.appendChild(this.storyImage);
    this.listenForClick();
    // issue 118 create inner games on demand
    // this.game = new Game();
    // this.game.init();
  }

  render () {
    var dx = this.loc.x-this.radius;
    var dy = this.loc.y-this.radius;
    var dw = this.radius*2;
    var dh = this.radius*2;
    ctx.drawImage(this.planetImage, dx, dy, dw, dh);
  }

  showPanel(){
    this.storyPanelDiv.style.display = "block";
  }

  listenForClick(){
    this.storyPanelDiv.addEventListener("click", function(){
      this.style.display = "none";
      gameState = 'inner';
      game.startup();
    });
  }
}
