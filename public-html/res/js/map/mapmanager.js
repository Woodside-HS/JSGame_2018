'use strict'

class MapManager extends Updateable{
  constructor(game){
    super();
    this.map = [];
    this.game = game;
    this.validStartTiles = [];
  }
  init(){
    for(let i = 0; i < CONFIG.MAP_X_SIZE; i++){ // columns of rows
      this.map.push([]);
      for(let j = 0; j < CONFIG.MAP_Y_SIZE; j++){
        this.map[i].push(new Tile(this.game, new Vector2D(i, j)));
      }
    }
    for(let i = 0; i < CONFIG.MAP_X_SIZE; i++){ // columns of rows
      for(let j = 0; j < CONFIG.MAP_Y_SIZE; j++){
        this.map[i][j].init();
      }
    }
    this.game.canvas.addEventListener("click",this.onClick);
  }
  update(){
    for(let i = 0; i < CONFIG.MAP_X_SIZE; i++){
      for(let j = 0; j < CONFIG.MAP_Y_SIZE; j++){
        this.map[i][j].update();
      }
    }
  }
  render(){
    for(let i = 0; i < CONFIG.MAP_X_SIZE; i++){
      for(let j = 0; j < CONFIG.MAP_Y_SIZE; j++){
        this.map[i][j].render();
      }
    }
  }
}
