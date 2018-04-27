"use strict"

class Mask extends Updateable {
  constructor(game) {
    super();
    this.game = game;

  }
  render() {
    for (let i = 0, tile = null; i < this.game.mapManager.map.length; i++) {
      for (let j = 0; j < this.game.mapManager.map[i].length; j++) {
        tile = this.game.mapManager.map[i][j];
        if (!tile.seen) {
          let realSize = new FastVector(
                  tile_types.mask.image.width,
                  tile_types.mask.image.height
                  );
          let maskStart = new FastVector(
                  (tile.cloc.x * tile_types.mask.size) % realSize.x,
                  (tile.cloc.y * tile_types.mask.size) % realSize.y
                  );
          this.game.context.drawImage(
                  tile_types.mask.image,
                  maskStart.x,
                  maskStart.y,
                  tile_types.mask.size,
                  tile_types.mask.size,
                  tile.loc.x,
                  tile.loc.y,
                  config.tile_size,
                  config.tile_size
                  );

        }
      }
    }
  }
}