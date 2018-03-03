
'use strict'

class Tower extends Updateable{
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x*CONFIG.TILE_SIZE,this.cloc.y*CONFIG.TILE_SIZE);
    this.type = TOWER_TYPES.NULL;
    this.fillStyle = "rgba(255,255,0,1)";
    this.fontstyle = "rgba(0,0,255,1)";
    this.maxhp=WALL_HP;
    this.hp=this.maxhp;
  }
  update(){
  }
  render(){
    this.game.context.fillStyle=this.fillStyle;
    this.game.context.beginPath();
    this.game.context.arc(this.loc.x+CONFIG.TILE_SIZE/2,this.loc.y+CONFIG.TILE_SIZE/2,CONFIG.TILE_SIZE/2,0,2*Math.PI);
    this.game.context.fill();
    this.game.context.fillStyle=this.fontstyle;
    this.game.context.fillText(this.type,this.loc.x, this.loc.y+CONFIG.TILE_SIZE/2);
    this.game.context.fillStyle='rgba(255,0,0,1)';
    this.game.context.fillRect(this.loc.x, this.loc.y+4*CONFIG.TILE_SIZE/5, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE/5);
    this.game.context.fillStyle='rgba(0,255,0,1)';
    this.game.context.fillRect(this.loc.x, this.loc.y+4*CONFIG.TILE_SIZE/5, this.hp/this.maxhp*CONFIG.TILE_SIZE, CONFIG.TILE_SIZE/5);

  }

}
