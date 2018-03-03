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
    switch (this.tileType){
      case TILE_TYPES.ROCK:
        this.game.context.fillStyle = "#000000";
        break;
      case TILE_TYPES.WATER:
        this.game.context.fillStyle="#0000FF";
        break; 
    }
    this.game.context.fillRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
  }
}
