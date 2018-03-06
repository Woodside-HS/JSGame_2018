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
    let xContentSize = CONFIG.MAP_X_SIZE * UI_CONFIG.MINIMAP_TILE_SIZE;
    let yContentSize = CONFIG.MAP_Y_SIZE * UI_CONFIG.MINIMAP_TILE_SIZE;
    let startCoordinate = new Vector2D(this.game.canvas.width - xContentSize, this.game.canvas.height - yContentSize);
    this.game.context.fillStyle = UI_CONFIG.MINIMAP_BORDER_COLOR;
    this.game.context.fillRect(
            startCoordinate.x-UI_CONFIG.MINIMAP_BORDER_STROKE,
            startCoordinate.y-UI_CONFIG.MINIMAP_BORDER_STROKE,
            xContentSize+UI_CONFIG.MINIMAP_BORDER_STROKE,
            yContentSize+UI_CONFIG.MINIMAP_BORDER_STROKE);
    for (let i = 0; i < this.game.mapManager.map.length; i++) {
      for (let j = 0; j < this.game.mapManager.map[i].length; j++) {
        this.game.context.fillStyle = this.game.mapManager.map[i][j].tileType.MINIMAP_COLOR;
        this.game.context.fillRect(
                startCoordinate.x + UI_CONFIG.MINIMAP_TILE_SIZE * i,
                startCoordinate.y + UI_CONFIG.MINIMAP_TILE_SIZE * j,
                UI_CONFIG.MINIMAP_TILE_SIZE,
                UI_CONFIG.MINIMAP_TILE_SIZE);
      }
    }
  }
}