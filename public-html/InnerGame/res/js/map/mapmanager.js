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
    for (let i = 0; i < config.map_x_size; i++) {
      this.map.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i].push(new Tile(this.game, new Vector2D(i, j)));
      }
    }
    //Initialize tiles
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {

        //Set the seed
        this.map[i][j].perlin = normalizePerlin(noise.perlin2(
                this.map[i][j].cloc.x / this.map.length * map_config.noise_scale,
                this.map[i][j].cloc.y / this.map[i].length * map_config.noise_scale
                ));

        //Set tile types
        if (this.map[i][j].perlin > 1 - map_config.rock_probability) {
          this.map[i][j].tileType = tile_types.rock;
        } else if (this.map[i][j].perlin > map_config.water_range[0] &&
                this.map[i][j].perlin < map_config.water_range[1]) {
          this.map[i][j].tileType = tile_types.water;
        } else {
          this.map[i][j].tileType = tile_types.grass;
        }

        //Create valid starts
        if (!this.map[i][j].tileType.is_occupied) {
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
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i][j].update();
      }
    }
    this.towermanager.update();
  }
  render() {
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i][j].render();
      }
    }
    this.towermanager.render();
  }
  getStartLocation() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (map[i][j].tileType == tile_types.grass) {
          return new Vector2D(i, j);
        }
      }
    }
  }
}
