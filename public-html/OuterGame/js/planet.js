class Planet{

  constructor(radius, location){
    this.radius = radius;
    this.loc = location;
    this.planetImageNum = Math.floor(Math.random()*5+1);
    this.planetImage = Images['Planet' + this.planetImageNum];
    this.storyImage = Images["panel0" + this.planetImageNum];
    this.storyPanelDiv = document.getElementById("gamepanel" + this.planetImageNum);
    this.storyPanelDiv.appendChild(this.storyImage);
    // issue 118 create inner games on demand
    // this.game = new Game();
    // this.game.init();
  }

  render () {
    var dx = this.loc.x-this.radius;
    var dy = this.loc.y-this.radius;
    var dw = this.radius*2;
    var dh = this.radius*1.75;
    ctx.drawImage(this.planetImage, dx, dy, dw, dh);
  }

  showPanel(){
    let panel = this.storyPanelDiv;
    gameState = "transition";
    panel.style.display = "block";
    document.addEventListener("keypress", function handler(event) {
      switch(event.key) {
        case " ":
          document.removeEventListener("keypress", handler);
          panel.style.display = "none";
          gameState = "inner";
          game.startup();
          break;
        default:
          return;
      }
    });
  }

}
