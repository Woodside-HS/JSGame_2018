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
              let currentTile;
              if (x < 0 || x >= config.map_x_size || y < 0 || y >= config.map_y_size){
                currentTile = {tileType:tile_types.rock} //pretend borders are rocks
              } else currentTile = this.map[x][y];
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
    for(let i=0; i<config.map_x_size*config.tile_size; i+=map_config.grass_image_size)
      for(let j=0; j<config.map_y_size*config.tile_size; j+=map_config.grass_image_size)
        this.game.context.drawImage(this.grassImage,i,j,map_config.grass_image_size,map_config.grass_image_size);

    //draw border rectangles bc too much grass
    this.game.context.fillStyle=config.background_color;
    this.game.context.fillRect(config.map_x_size*config.tile_size,-map_config.grass_image_size,map_config.grass_image_size,config.map_y_size*config.tile_size+2*map_config.grass_image_size)
    this.game.context.fillRect(-map_config.grass_image_size,config.map_y_size*config.tile_size,config.map_x_size*config.tile_size+2*map_config.grass_image_size,map_config.grass_image_size)


    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i][j].render();
      }
    }
    this.towerManager.render();
  }
  reveal() {
      var cloc = positionToGrid(this.game.player.loc);
      var distSq = config.mask_radius * config.mask_radius;
      for (let i = cloc.x - (config.mask_radius + 1); i < cloc.x + (config.mask_radius + 1); i++) {
        for (let j = cloc.y - (config.mask_radius + 1); j < cloc.y + (config.mask_radius + 1); j++) {
          if(!(i < 0) && !(i > config.map_x_size - 1) && !(j < 0) && !(j > config.map_y_size - 1)){
            var tile = this.game.mapManager.map[i][j];
            var tileLoc = positionToGrid(tile.loc);
            var actualDistSq = ((cloc.x - tileLoc.x)*(cloc.x - tileLoc.x) + (cloc.y - tileLoc.y)*(cloc.y - tileLoc.y));
            if(actualDistSq <= distSq){
              tile.seen = true;
            }
          }
        }
      }
    //IF I CAN'T FIX ABOVE EDGE CASES, USE BELOW
    // this.map[this.game.player.cloc.x][this.game.player.cloc.y].seen = true; //current tile
    // for(var x = 0; x <= config.mask_radius; x++){
    //   for(var y = 0; y <= config.mask_radius; y++){
    //     if(this.game.player.cloc.x + config.mask_radius < config.map_x_size && this.game.player.cloc.y + config.mask_radius < config.map_y_size){
    //       this.map[this.game.player.cloc.x + x][this.game.player.cloc.y + y].seen = true;
    //     }
    //     if(this.game.player.cloc.x + config.mask_radius < config.map_x_size && this.game.player.cloc.y - config.mask_radius > 0){
    //       this.map[this.game.player.cloc.x + x][this.game.player.cloc.y - y].seen = true;
    //     }
    //     if(this.game.player.cloc.x - config.mask_radius > 0 && this.game.player.cloc.y + config.mask_radius < config.map_y_size){
    //       this.map[this.game.player.cloc.x - x][this.game.player.cloc.y + y].seen = true;
    //     }
    //     if(this.game.player.cloc.x - config.mask_radius > 0 && this.game.player.cloc.y - config.mask_radius > 0){
    //       this.map[this.game.player.cloc.x - x][this.game.player.cloc.y - y].seen = true;
    //     }
    //   }
    // }
  }
}
