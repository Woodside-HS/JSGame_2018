'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location; //cloc = Cellular LOCation
    this.loc = new Vector2D( //pixel-relative position of top left corner to map origin
            this.cloc.x * config.tile_size,
            this.cloc.y * config.tile_size);
    this.tileType = tile_types.nulltype;
    this.image = new Image();
  }
  init() {
    this.image.src = this.tileType.image_src;
    this.isOccupied = this.tileType.is_occupied;
  }
  render() {
    if (tile_config.draw_gridlines) {

      //background becomes gridline
      this.game.context.fillStyle = tile_config.gridline_color;
      this.game.context.fillRect(this.loc.x, this.loc.y, config.tile_size, config.tile_size);

      //draw the sprite
      this.game.context.drawImage(
              this.image,
              this.loc.x + tile_config.gridline_stroke / 2,
              this.loc.y + tile_config.gridline_stroke / 2,
              config.tile_size - tile_config.gridline_stroke / 2,
              config.tile_size - tile_config.gridline_stroke / 2
              );
    } else {
      //draw sprite
      this.game.context.drawImage(this.image, this.loc.x, this.loc.y, config.tile_size, config.tile_size);
    }
  }
}
