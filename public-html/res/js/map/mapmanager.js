'use strict'

class MapManager extends Updateable {
  constructor(game) {
    super();
    this.map = [];
    this.game = game;
    this.validStartTiles = [];
    this.towermanager = new TowerManager(this.game);
  }
  init() {
    noise.seed(Math.random());
    //Create map array
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      this.map.push([]);
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.map[i].push(new Tile(this.game, new Vector2D(i, j)));
      }
    }
    //Initialize tiles
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {

        //Set the seed
        this.map[i][j].perlin = normalizePerlin(noise.perlin2(
                this.map[i][j].cloc.x / this.map.length * MAP_CONFIG.NOISE_SCALE,
                this.map[i][j].cloc.y / this.map[i].length * MAP_CONFIG.NOISE_SCALE
                ));

        //Set tile types
        if (this.map[i][j].perlin > 1 - MAP_CONFIG.ROCK_PROBABILITY) {
          this.map[i][j].tileType = TILE_TYPES.ROCK;
        } else if (this.map[i][j].perlin > MAP_CONFIG.WATER_RANGE[0] &&
                this.map[i][j].perlin < MAP_CONFIG.WATER_RANGE[1]) {
          this.map[i][j].tileType = TILE_TYPES.WATER;
        } else {
          this.map[i][j].tileType = TILE_TYPES.GRASS;
        }

        //Create valid starts
        if (!this.map[i][j].tileType.IS_OCCUPIED) {
          this.validStartTiles.push(this.map[i][j]);
        }

        //Initialize
        this.map[i][j].init();
      }
    }

    this.towermanager.init();

    let startTile = this.validStartTiles[Math.floor(randIn(0, this.validStartTiles.length))];
    this.game.player.loc = startTile.loc.duplicate();
  }
  update() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.map[i][j].update();
      }
    }
    this.towermanager.update();
  }
  render() {
    for (let i = 0; i < CONFIG.MAP_X_SIZE; i++) {
      for (let j = 0; j < CONFIG.MAP_Y_SIZE; j++) {
        this.map[i][j].render();
      }
    }
    this.towermanager.render();
  }
  getStartLocation() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (map[i][j].tileType == TILE_TYPES.GRASS) {
          return new Vector2D(i, j);
        }
      }
    }
  }
}
