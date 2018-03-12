'use strict'

class TowerManager extends Updateable {
  constructor(game) {
    super();
    this.towers = [];
  }
  init() {
    document.addEventListener("keydown", this.docKeyDown);
    for (let i = 0; i < config.map_x_size; i++) { // columns of rows
      this.towers.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.towers[i].push(null);
      }
    }
  }
  update() {
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        if (this.towers[i][j]) {
          this.towers[i][j].update();
        }
      }
    }
  }
  render() {
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        if (this.towers[i][j]) {
          this.towers[i][j].render();
        }
      }
    }
  }
  docKeyDown(e) {
    if (config.debug_mode) {
      let key = String.fromCharCode(e.keyCode);
      let mouseCLoc = positionToGrid(game.mouseLocationAbsolute);
      switch (key) {
        case 'Q':
          game.minionManager.minions.push(new Minion(game, game.mouseLocationAbsolute.duplicate()));
          break;
        case '1':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Tower(game, mouseCLoc.duplicate());
          break;
        case'2':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Ranged(game, mouseCLoc.duplicate(), tower_types.repeater);
          break;
        case'3':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Ranged(game, mouseCLoc.duplicate(), tower_types.sniper);
          break;
        case'4':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Ranged(game, mouseCLoc.duplicate(), tower_types.spitter);
          break;
      }
    }
  }
}
