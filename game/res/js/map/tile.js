
'use strict'

class Tile extends Updateable{
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x*CONFIG.TILE_SIZE,this.cloc.y*CONFIG.TILE_SIZE);
    this.dir=-1;
    this.isGoal = false;
    this.isOccupied = false;
    this.tileType = TILE_TYPES.NULL;
  }
  init(){
  }
  update(){
  }
  render(){
    this.game.context.fillStyle="#AABBAA";
    this.game.context.strokeStyle="#001122";
    this.game.context.fillRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
    this.game.context.strokeRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
  }
  dirToVector(){
    switch (this.dir){
      case 0:
      return new Vector2D(0,CONFIG.TILE_ACCELERATION);
      case 1:
      return new Vector2D(-CONFIG.TILE_ACCELERATION,0);
      case 2:
      return new Vector2D(0,-CONFIG.TILE_ACCELERATION);
      case 3:
      return new Vector2D(CONFIG.TILE_ACCELERATION,0);
    }
    throw "No direction for this tile!";
  }


}
