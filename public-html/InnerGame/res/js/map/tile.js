'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x * config.tile_size, this.cloc.y * config.tile_size);
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
    // this.game.context.fillStyle = this.tileType.minimap_color;
    // this.game.context.fillRect(this.loc.x, this.loc.y, config.tile_size, config.tile_size);
    this.game.context.drawImage(this.image,this.loc.x, this.loc.y, config.tile_size, config.tile_size);
   }
}
