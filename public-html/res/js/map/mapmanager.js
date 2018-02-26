'use strict'

class MapManager extends Updateable {
  constructor(game) {
    super();
    this.map = [];
    this.game = game;
    this.validStartTiles = [];
  }
  init() {
    noise.seed(Math.random());
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) { // columns of rows
      this.map.push([]);
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.map[i].push(new Tile(this.game, new Vector2D(i, j)));
      }
    }
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) { // columns of rows
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        if(normalizePerlin(noise.simplex2(this.map[i][j].cloc.x/this.map.length,this.map[i][j].cloc.y/this.map[i].length))<0.5){
          this.map[i][j].tileType = TILE_TYPES.ROCK;
        }
        this.map[i][j].init();
      }
    }
  }
  update() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.map[i][j].update();
      }
    }
  }
  render() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.map[i][j].render();
      }
    }
  }
}