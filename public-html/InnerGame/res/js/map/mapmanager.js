'use strict'
/*
 *  Hold thae array of all tiles
 init the map
 *  Owns the tower manager (towers are on the map)
 *  Owns anything that is contained by a cell objects (cells are tiles)
 */
class MapManager extends Updateable {
  constructor(game) {
    super();
    this.map = [];
    this.game = game;
    this.validStartTiles = [];
    this.towerManager = new TowerManager(this.game);
    this.grassImage=map_config.grass_image;
  }
  init() {
    //create grass image
    this.grassImage.src=map_config.grass_image_src;

    noise.seed(map_config.noise_seed);
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
        /*
         *  noise perlin2--> in util
         *  all tile type chosen according to perlin noise
         */
        this.map[i][j].perlin = normalizePerlin(noise.perlin2(
                i / this.map.length * map_config.noise_scale,
                j / this.map[i].length * map_config.noise_scale
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
        //  Only spawn player, minions
        if (!this.map[i][j].tileType.is_occupied) {
          this.validStartTiles.push(this.map[i][j]);
        }

        //Initialize

      }
    }

    //set normal vectors
    for (let a = 0; a < config.map_x_size; a++) {
      for (let b = 0; b < config.map_y_size; b++) {
        let tile = this.map[a][b]
        if (tile.tileType == tile_types.rock) {
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              //if(i!=0&&j!=0) continue;
              let x = a + i;
              let y = b + j;
              if (x < 0 || x >= config.map_x_size || y < 0 || y >= config.map_y_size)
                continue;
              let currentTile = this.map[x][y];
              if (currentTile.tileType == tile_types.rock) {
                tile.normalVector.add(new Vector2D(-i, -j));
              }
              if (currentTile.tileType == tile_types.rock && (i == 0 || j == 0)) {
                tile.quadNormal.add(new Vector2D(-i, -j));
              }
            }
          }
        }
        //intitialize
        this.map[a][b].init();
      }
    }


    this.towerManager.init();

    let startTile = this.validStartTiles[Math.floor(randIn(0, this.validStartTiles.length))];
    this.game.player.loc = startTile.loc.duplicate();
  }
  update() {
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i][j].update();
      }
    }
    this.towerManager.update();
  }
  render() {
    //draw grass
    this.game.context.drawImage(this.grassImage,0,0,config.map_x_size*config.tile_size,config.map_y_size*config.tile_size);

    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i][j].render();
      }
    }
    this.towerManager.render();
  }
}
