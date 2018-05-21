'use strict'

class TowerManager extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.towers = [];
    this.randoms = [];
    this.enemies = [];
  }
  init() {
    this.initializeTowerConfig();
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
          j / config.map_y_size * tower_config.noise_scale
        ));
        if (localPerlin > tower_config.tower_range[0] &&
          localPerlin < tower_config.tower_range[1] &&
          this.randoms[i][j] < tower_config.tower_rate &&
          !this.game.mapManager.map[i][j].isOccupied
        ) {
          this.loadTower(new FastVector(i, j));
        } else {
          this.towers[i].push(null);
        }
      }
    }
    for (let i = 0; i < this.towers.length; i++) {
      for (let j = 0; j < this.towers.length; j++) {
        if (this.towers[i][j]) {
          this.towers[i][j].init();
        }
      
    }
  }
}
update() {
  this.enemies = [];
  for (let i = 0; i < config.map_x_size; i++) {
    for (let j = 0; j < config.map_y_size; j++) {
      if (this.towers[i][j]) {
        this.enemies.push(this.towers[i][j]);
        this.towers[i][j].update();
        if (this.towers[i][j].hp <= 0) {
          this.towers[i][j] = null;
          this.game.mapManager.map[i][j].isOccupied = false;
        }
      }
    }
  }
}
render() {
  for (let i = 0; i < config.map_x_size; i++) {
    for (let j = 0; j < config.map_y_size; j++) {
      this.game.context.fillStyle = ui_config.minimap_border_color;
      if (this.towers[i][j]) {
        this.towers[i][j].render();
      }
    }
  }
}
initializeTowerConfig() {
  tower_types.asArray = [];
  tower_types.asArray.push(tower_types.nulltype);
  tower_types.asArray.push(tower_types.spitter);
  tower_types.asArray.push(tower_types.sniper);
  tower_types.asArray.push(tower_types.repeater);
  let totalFrequency = 0;
  for (let i = 0; i < tower_types.asArray.length; i++) {
    totalFrequency += tower_types.asArray[i].frequency;
  }
  for (let i = 0; i < tower_types.asArray.length; i++) {
    tower_types.asArray[i].frequency /= totalFrequency;
  }
}
loadTower(cloc) {
  let random = Math.random();
  let incrementalFrequency = 0;
  for (let i = 0; i < tower_types.asArray.length; i++) {
    if (random > incrementalFrequency && random < tower_types.asArray[i].frequency + incrementalFrequency) {
      this.towers[cloc.x].push(new Ranged(this.game, cloc, tower_types.asArray[i]));
    }
    incrementalFrequency += tower_types.asArray[i].frequency;
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
        game.mapManager.towerManager.towers[mouseCLoc.x][mouseCLoc.y] = new Tower(game, mouseCLoc.duplicate());
        break;
      case '2':
        game.mapManager.towerManager.towers[mouseCLoc.x][mouseCLoc.y] = new Ranged(game, mouseCLoc.duplicate(), tower_types.repeater);
        break;
      case '3':
        game.mapManager.towerManager.towers[mouseCLoc.x][mouseCLoc.y] = new Ranged(game, mouseCLoc.duplicate(), tower_types.sniper);
        break;
      case '4':
        game.mapManager.towerManager.towers[mouseCLoc.x][mouseCLoc.y] = new Ranged(game, mouseCLoc.duplicate(), tower_types.spitter);
        break;
    }
  }
}
}
