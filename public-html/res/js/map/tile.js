'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(this.cloc.x * CONFIG.TILE_SIZE, this.cloc.y * CONFIG.TILE_SIZE);
    this.dir = -1;
    this.isGoal = false;
    this.isOccupied = false;
    this.tileType = TILE_TYPES.NULL;
  }
  render() {
    this.game.context.fillStyle = this.tileType.MINIMAP_COLOR;
    this.loc.x, this.loc.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
  }
}
