'use strict'

class TowerManager extends Updateable {
  constructor(game){
    super();
    this.towers=[];
  }
  init() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) { // columns of rows
      this.towers.push([]);
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.towers[i].push(null);
      }
    }
  }
  update() {

  }
  render() {

  }
}
