class Minimap extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.contentSize = new FastVector(
            config.map_x_size * ui_config.minimap_tile_size,
            config.map_y_size * ui_config.minimap_tile_size
            );
    this.imgData = null;
    this.startCoordinate = null;
  }
  init() {
    this.startCoordinate = new FastVector(
            this.game.canvas.width - this.contentSize.x,
            this.game.canvas.height - this.contentSize.y);
    this.imgData = this.game.context.createImageData(
            this.contentSize.x,
            this.contentSize.y);
    for (let i = 0, pixelIndex = 0, currentColor = null; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        pixelIndex = 4 * (i + config.map_x_size*j);
        //draw the land
        currentColor = this.game.mapManager.map[i][j].tileType.minimap_color;
        // or draw towers
        if (this.game.mapManager.towerManager.towers[i][j]) {
          currentColor = tower_config.minimap_color;

        }

        // //update image
        // this.imgData.data[pixelIndex + 0] = currentColor.red();
        // this.imgData.data[pixelIndex + 1] = currentColor.green();
        // this.imgData.data[pixelIndex + 2] = currentColor.blue();
        // this.imgData.data[pixelIndex + 3] = 255;

        if(!this.game.mapManager.map[i][j].seen){
          this.imgData.data[pixelIndex + 0] = currentColor.red();
          this.imgData.data[pixelIndex + 1] = currentColor.green();
          this.imgData.data[pixelIndex + 2] = currentColor.blue();
          this.imgData.data[pixelIndex + 3] = 255;
          this.game.context.fillStyle = "#000000";
        }
        //fill the tile
        this.game.context.fillRect(
                this.startCoordinate.x + ui_config.minimap_tile_size * i,
                this.startCoordinate.y + ui_config.minimap_tile_size * j,
                ui_config.minimap_tile_size,
                ui_config.minimap_tile_size);


        //update image

      }
    }
  }
  update() {

  }

  render() {
    this.game.context.fillStyle = ui_config.minimap_border_color;
    this.game.context.fillRect(
            this.startCoordinate.x - ui_config.minimap_border_stroke,
            this.startCoordinate.y - ui_config.minimap_border_stroke,
            this.contentSize.x + ui_config.minimap_border_stroke,
            this.contentSize.y + ui_config.minimap_border_stroke);

    //draw the map
    this.game.context.putImageData(
            this.imgData,
            this.startCoordinate.x,
            this.startCoordinate.y);

    //draw the player
    this.game.context.fillStyle = player_config.minimap_color;
    this.game.context.fillRect(
            this.startCoordinate.x + ui_config.minimap_tile_size * this.game.player.cloc.x,
            this.startCoordinate.y + ui_config.minimap_tile_size * this.game.player.cloc.y,
            ui_config.minimap_tile_size,
            ui_config.minimap_tile_size);
  }
}
