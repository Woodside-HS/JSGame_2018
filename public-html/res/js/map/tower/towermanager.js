'use strict'

class TowerManager extends Updateable {
  constructor(game) {
    super();
    this.towers = [];
  }
  init() {
    document.addEventListener("keypress", this.docKeyPress);
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) { // columns of rows
      this.towers.push([]);
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.towers[i].push(null);
      }
    }
  }
  update() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        if (this.towers[i][j]) {
          this.towers[i][j].update();
        }
      }
    }
  }
  render() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        if (this.towers[i][j]) {
          this.towers[i][j].render();
        }
      }
    }
  }
  docKeyPress(e) {
    if (CONFIG.DEBUG_MODE) {
      let key = String.fromCharCode(e.keyCode);
      let mouseCLoc = positionToGrid(game.mouseLocation);
      switch (key) {
        case 'q':
          game.minionManager.minions.push(new Minion(game, new Vector2D(game.mouseLocation)));
          break;
        case '1':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Tower(game, mouseCLoc.duplicate());
          break;
        case'2':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Sniper(game, mouseCLoc.duplicate());
          break;
        case'3':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Repeater(game, mouseCLoc.duplicate());
          break;
        case'4':
          game.mapManager.towermanager.towers[mouseCLoc.x][mouseCLoc.y] = new Spitter(game, mouseCLoc.duplicate());
          break;
      }
    }
  }
}
