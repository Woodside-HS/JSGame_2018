
'use strict'

class Tower extends Updateable{
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x*CONFIG.TILE_SIZE,this.cloc.y*CONFIG.TILE_SIZE);
    this.type = 0;
    this.fillstyle = "rgba(255,255,0,1)";
    this.fontstyle = "rgba(0,0,255,1)";
  }
  update(){
  }
  render(){
    this.game.context.fillstyle=this.fillstyle;
    this.game.context.fillRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
    this.game.context.fillstyle=this.fontstyle;
    this.game.context.fillText(type,this.loc.x, this.loc.y);
  }

}
