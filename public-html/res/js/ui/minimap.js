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
    this.game.context.fillStyle = "green";
    this.game.context.fillRect(startCoordinate.x,startCoordinate.y,xContentSize,yContentSize);
  }
}