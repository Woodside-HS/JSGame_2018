'use strict'

class TowerManager extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.towers = [];
    this.randoms = [];
  }
  init() {
    document.addEventListener("keydown", this.docKeyDown);
    noise.seed(tower_config.noise_seed);
    let localPerlin;
    for (let i = 0; i < config.map_x_size; i++) { // columns of rows
      this.towers.push([]);
      this.randoms.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.randoms[i].push(Math.random());
        localPerlin = normalizePerlin(noise.perlin2(
                i / config.map_x_size * tower_config.noise_scale,
                j / config.map_y_size * tower_config.noise_scale,
                ));
        if (localPerlin > tower_config.tower_range[0] &&
                localPerlin < tower_config.tower_range[1] &&
                this.randoms[i][j] < tower_config.tower_rate &&
                !this.game.mapManager.map[i][j].isOccupied
                ) {
          this.towers[i].push(new Tower(this.game, new Vector2D(i, j)));
        } else {
          this.towers[i].push(null);
        }
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
    // use the keyboard for placing towers (Only in debug mode)
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
