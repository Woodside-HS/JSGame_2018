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
    //this.grassImage=map_config.grass_image;
    // issue 118 use image loaded only once
    this.grassImage = Images.grass;
    this.powerupManager = new PowerUpManager(this.game);
    this.startTile = null;
  }
  init() {
    //set world-specific config
    this.setWorldConfig();
    //create grass image
    // issue 118 dont load these images every time
    // this.grassImage.src=map_config.grass_image_src;

    noise.seed(map_config.noise_seed);
    //Create map array
    for (let i = 0; i < config.map_x_size; i++) {
      this.map.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i].push(new Tile(this.game, new InnerVector2D(i, j)));
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

      this.fixMap();
      this.fixMap(true);
      for (let i = 0; i < config.map_x_size; i++)
        for (let j = 0; j < config.map_y_size; j++)
          this.map[i][j].init();

        // initialiaze start location
      this.startTile = this.getValidStartTile();
      while(this.startTile.cloc.x*this.startTile.cloc.y==0||this.startTile.cloc.x>=config.map_x_size-1||this.startTile.cloc.y>=config.map_y_size-1)
        this.startTile = this.getValidStartTile();
      this.startTile.isStart = true;

      this.towerManager.init();
      this.powerupManager.init();




      for (let i = 0; i < loot_config.animal_count; i++) {
        let animalTile = this.getValidStartTile();
        animalTile.loot = loot_types.animals[this.game.planet.planetImageNum-1];
      }
      this.game.player.loc = this.startTile.loc.duplicate();
      let cloc = positionToGrid(this.game.player.loc);
      for (let i = cloc.x - 2; i <= cloc.x + 2; i++)
      for (let j = cloc.y - 2; j <= cloc.y + 2; j++)
      if ((Math.abs(i - cloc.x) + Math.abs(j - cloc.y)) <= 2 && i >= 0 && i < config.map_x_size && j >= 0 && j < config.map_y_size)
      this.game.mapManager.map[i][j].seen = true;
      this.game.player.revealCone();
    }

    fixMap(final){
      //set normal vectors
      let mustFix=false;
      for (let a = 0; a < config.map_x_size; a++) {
        for (let b = 0; b < config.map_y_size; b++) {
          let tile = this.map[a][b]
          tile.normalVector = new InnerVector2D(0,0);
          tile.quadNormal = new InnerVector2D(0,0);
          if (tile.tileType == tile_types.rock) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                //if(i!=0&&j!=0) continue;
                let x = a + i;
                let y = b + j;
                let currentTile;
                if (x < 0 || x >= config.map_x_size || y < 0 || y >= config.map_y_size) {
                  currentTile = { tileType: tile_types.rock } //pretend borders are rocks
                } else currentTile = this.map[x][y];
                if (currentTile.tileType == tile_types.rock) {
                  tile.normalVector.add(new InnerVector2D(-i, -j));
                }
                if (currentTile.tileType == tile_types.rock && (i == 0 || j == 0)) {
                  tile.quadNormal.add(new InnerVector2D(-i, -j));
                }
              }
            }
          }
          if (tile.tileType == tile_types.water) {
            for (let i = -1; i < 2; i++) {
              for (let j = -1; j < 2; j++) {
                //if(i!=0&&j!=0) continue;
                let x = a + i;
                let y = b + j;
                let currentTile;
                if (x < 0 || x >= config.map_x_size || y < 0 || y >= config.map_y_size) {
                  currentTile = { tileType: tile_types.water } //pretend borders are water
                } else currentTile = this.map[x][y];
                if (currentTile.tileType == tile_types.water) {
                  tile.normalVector.add(new InnerVector2D(-i, -j));
                }
                if (currentTile.tileType == tile_types.water && (i == 0 || j == 0)) {
                  tile.quadNormal.add(new InnerVector2D(-i, -j));
                }
              }
            }
        }
          //check tile
          let k=0;
          for(let n=-1; n<=1; n++)
          for(let m=-1; m<=1; m++){
            if(tile.cloc.x+n < 0 || tile.cloc.x+n >= config.map_x_size || tile.cloc.y+m < 0 || tile.cloc.y+m >= config.map_y_size){
              k++;
            } else if(this.map[tile.cloc.x+n][tile.cloc.y+m].tileType==tile_types.water || this.map[tile.cloc.x+n][tile.cloc.y+m].tileType==tile_types.rock)
            k++;
          }
          if(tile.normalVector.m == 3 && tile.quadNormal.m == 1)
          console.log(k);
          if (tile.tileType == tile_types.rock || tile.tileType == tile_types.water)
          if((tile.normalVector.m == 3 && tile.quadNormal.m == 1 && k==4)
            ||(k<=3)){
              tile.tileType=tile_types.grass;
            mustFix=true;
          }
        }
      }
      if(mustFix)
        this.fixMap();
    }
    /**set world-specific config
    * called only on mapManager.init()
    */
    setWorldConfig() {
      map_config.noise_scale = Math.random() * -(map_config.noise_scale_range[0] - map_config.noise_scale_range[1]) + map_config.noise_scale_range[0];
      map_config.rock_probability = Math.random() * -(map_config.rock_probability_range[0] - map_config.rock_probability_range[1]) + map_config.rock_probability_range[0];
      map_config.water_range = [
        Math.random() * -(map_config.water_range_ranges[0] - map_config.water_range_ranges[1]) + map_config.water_range_ranges[0],
        Math.random() * -(map_config.water_range_ranges[2] - map_config.water_range_ranges[3]) + map_config.water_range_ranges[2]
      ];
      if (map_config.rock_probability > 1 - map_config.water_range[1])
      map_config.water_range[1] = (1 - map_config.rock_probability) * .9;
      tower_config.tower_range = [
        Math.random() * -(tower_config.tower_range_ranges[0] - tower_config.tower_range_ranges[1]) + tower_config.tower_range_ranges[0],
        Math.random() * -(tower_config.tower_range_ranges[2] - tower_config.tower_range_ranges[3]) + tower_config.tower_range_ranges[2]
      ];
      tower_config.tower_rate = Math.random() * -(tower_config.tower_rate_range[0] - tower_config.tower_rate_range[1]) + tower_config.tower_rate_range[0];
      tower_config.tower_rate /= tower_config.tower_range[1] - tower_config.tower_range[0];
    }

    update() {
      for (let i = 0; i < config.map_x_size; i++) {
        for (let j = 0; j < config.map_y_size; j++) {
          this.map[i][j].update();
        }
      }
      this.towerManager.update();
      this.powerupManager.update();
    }
    render() {
      //draw grass
      for (let i = 0; i < config.map_x_size * config.tile_size; i += map_config.grass_image_size)
      for (let j = 0; j < config.map_y_size * config.tile_size; j += map_config.grass_image_size)
      this.game.context.drawImage(Images['grass'], i, j, map_config.grass_image_size, map_config.grass_image_size);

      //draw border rectangles bc too much grass
      this.game.context.fillStyle = config.background_color;
      this.game.context.fillRect(config.map_x_size * config.tile_size, -map_config.grass_image_size, map_config.grass_image_size, config.map_y_size * config.tile_size + 2 * map_config.grass_image_size)
      this.game.context.fillRect(-map_config.grass_image_size, config.map_y_size * config.tile_size, config.map_x_size * config.tile_size + 2 * map_config.grass_image_size, map_config.grass_image_size)


      for (let i = 0; i < config.map_x_size; i++) {
        for (let j = 0; j < config.map_y_size; j++) {
          this.map[i][j].render();
        }
      }
      this.towerManager.render();
      this.powerupManager.render();
    }
    getValidStartTile() {
      let index = Math.floor(randIn(0, this.validStartTiles.length));
      let tile = this.validStartTiles.splice(index, 1);
      return tile[0];
    }
  }
