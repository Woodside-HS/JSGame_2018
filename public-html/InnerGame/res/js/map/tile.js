'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x * config.tile_size, this.cloc.y * config.tile_size);
    this.dir = -1;
    this.isGoal = false;
    this.tileType = tile_types.nulltype;
    this.image=new Image();
  }
  init(){
    this.image.src=this.tileType.image_src;
    this.isOccupied=this.tileType.is_occupied;
  }
  render() {
    // this.game.context.fillStyle = this.tileType.minimap_color;
    // this.game.context.fillRect(this.loc.x, this.loc.y, config.tile_size, config.tile_size);
    this.game.context.drawImage(this.image,this.loc.x, this.loc.y, config.tile_size, config.tile_size);
   }
}
