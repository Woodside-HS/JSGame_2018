'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x * CONFIG.TILE_SIZE, this.cloc.y * CONFIG.TILE_SIZE);
    this.dir = -1;
    this.isGoal = false;
    this.tileType = TILE_TYPES.NULL;
    this.image=new Image();
  }
  init(){
    this.image.src=this.tileType.IMAGE_SRC;
    this.isOccupied=this.tileType.IS_OCCUPIED;
  }
  render() {
    // this.game.context.fillStyle = this.tileType.MINIMAP_COLOR;
    // this.game.context.fillRect(this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
    this.game.context.drawImage(this.image,this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
   }
}
