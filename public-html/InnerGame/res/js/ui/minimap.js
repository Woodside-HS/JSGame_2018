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
    let xContentSize = config.map_x_size * UI_CONFIG.MINIMAP_TILE_SIZE;
    let yContentSize = config.map_y_size * UI_CONFIG.MINIMAP_TILE_SIZE;
    let startCoordinate = new Vector2D(this.game.canvas.width - xContentSize, this.game.canvas.height - yContentSize);
    this.game.context.fillStyle = UI_CONFIG.MINIMAP_BORDER_COLOR;
    this.game.context.fillRect(
            startCoordinate.x-UI_CONFIG.MINIMAP_BORDER_STROKE,
            startCoordinate.y-UI_CONFIG.MINIMAP_BORDER_STROKE,
            xContentSize+UI_CONFIG.MINIMAP_BORDER_STROKE,
            yContentSize+UI_CONFIG.MINIMAP_BORDER_STROKE);
    for (let i = 0; i < this.game.mapManager.map.length; i++) {
      for (let j = 0; j < this.game.mapManager.map[i].length; j++) {
        //draw the land
        this.game.context.fillStyle = this.game.mapManager.map[i][j].tileType.minimap_color;
        this.game.context.fillRect(
                startCoordinate.x + UI_CONFIG.MINIMAP_TILE_SIZE * i,
                startCoordinate.y + UI_CONFIG.MINIMAP_TILE_SIZE * j,
                UI_CONFIG.MINIMAP_TILE_SIZE,
                UI_CONFIG.MINIMAP_TILE_SIZE);
      }
    }
    
    //draw the player
    this.game.context.fillStyle = player_config.minimap_color;
    this.game.context.fillRect(
            startCoordinate.x+UI_CONFIG.MINIMAP_TILE_SIZE*this.game.player.cloc.x,
            startCoordinate.y+UI_CONFIG.MINIMAP_TILE_SIZE*this.game.player.cloc.y,
            UI_CONFIG.MINIMAP_TILE_SIZE,
            UI_CONFIG.MINIMAP_TILE_SIZE);
  }
}