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
  render(){
    this.game.context.fillStyle="#AABBAA";
    this.game.context.strokeStyle="#001122";
    if(this.tileType==TILE_TYPES.ROCK){
      this.game.context.fillStyle="#000000";
    }
    this.game.context.fillRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
    this.game.context.strokeRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
  }
}
