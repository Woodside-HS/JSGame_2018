class Minimap extends Updateable {
  constructor(game) {
    super();
    this.game = game;
  }
  init() {

  }
  update() {

  }
  render() {
    let xContentSize = config.map_x_size * ui_config.minimap_tile_size;
    let yContentSize = config.map_y_size * ui_config.minimap_tile_size;
    let startCoordinate = new Vector2D(this.game.canvas.width - xContentSize, this.game.canvas.height - yContentSize);
    this.game.context.fillStyle = ui_config.minimap_border_color;
    this.game.context.fillRect(
            startCoordinate.x - ui_config.minimap_border_stroke,
            startCoordinate.y - ui_config.minimap_border_stroke,
            xContentSize + ui_config.minimap_border_stroke,
            yContentSize + ui_config.minimap_border_stroke);
    for (let i = 0; i < this.game.mapManager.map.length; i++) {
      for (let j = 0; j < this.game.mapManager.map[i].length; j++) {
        //draw the land
        this.game.context.fillStyle = this.game.mapManager.map[i][j].tileType.minimap_color;
        this.game.context.fillRect(
                startCoordinate.x + ui_config.minimap_tile_size * i,
                startCoordinate.y + ui_config.minimap_tile_size * j,
                ui_config.minimap_tile_size,
                ui_config.minimap_tile_size);
      }
    }

    //draw the player
    this.game.context.fillStyle = player_config.minimap_color;
    this.game.context.fillRect(
            startCoordinate.x + ui_config.minimap_tile_size * this.game.player.cloc.x,
            startCoordinate.y + ui_config.minimap_tile_size * this.game.player.cloc.y,
            ui_config.minimap_tile_size,
            ui_config.minimap_tile_size);
  }
}