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
  }
  init() {
    //set world-specific config
    map_config.noise_scale=Math.random()*-(map_config.noise_scale_range[0]-map_config.noise_scale_range[1])+map_config.noise_scale_range[0];
    map_config.rock_probability=Math.random()*-(map_config.rock_probability_range[0]-map_config.rock_probability_range[1])+map_config.rock_probability_range[0];
    map_config.water_range=[
      Math.random()*-(map_config.water_range_ranges[0]-map_config.water_range_ranges[1])+map_config.water_range_ranges[0],
      Math.random()*-(map_config.water_range_ranges[2]-map_config.water_range_ranges[3])+map_config.water_range_ranges[2]];
    if(map_config.rock_probability>1-map_config.water_range[1])
      map_config.water_range[1]=(1-map_config.rock_probability)*.9;
    tower_config.tower_range=[
      Math.random()*-(tower_config.tower_range_ranges[0]-tower_config.tower_range_ranges[1])+tower_config.tower_range_ranges[0],
      Math.random()*-(tower_config.tower_range_ranges[2]-tower_config.tower_range_ranges[3])+tower_config.tower_range_ranges[2]];
    tower_config.tower_rate=Math.random()*-(tower_config.tower_rate_range[0]-tower_config.tower_rate_range[1])+tower_config.tower_rate_range[0];
    tower_config.tower_rate/=tower_config.tower_range[1]-tower_config.tower_range[0]
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
                tile.normalVector.add(new InnerVector2D(-i, -j));
              }
              if (currentTile.tileType == tile_types.rock && (i == 0 || j == 0)) {
                tile.quadNormal.add(new InnerVector2D(-i, -j));
              }
            }
          }
        }
        //intitialize
        this.map[a][b].init();
      }
    }


    this.towerManager.init();
    this.powerupManager.init();

    // initialiaze start location
    let startTile = this.validStartTiles[Math.floor(randIn(0, this.validStartTiles.length))];
    startTile.isStart = true;
//    startTile.seen = true;

    this.game.player.loc = startTile.loc.duplicate();
    var cloc = positionToGrid(this.game.player.loc);
    this.game.mapManager.map[cloc.x][cloc.y + 1].seen = true;
    this.game.mapManager.map[cloc.x][cloc.y - 1].seen = true;
    this.game.mapManager.map[cloc.x - 1][cloc.y].seen = true;
    this.game.mapManager.map[cloc.x + 1][cloc.y].seen = true;
    this.game.mapManager.map[cloc.x - 1][cloc.y + 1].seen = true;
    this.game.mapManager.map[cloc.x - 1][cloc.y - 1].seen = true;
    this.game.mapManager.map[cloc.x + 1][cloc.y + 1].seen = true;
    this.game.mapManager.map[cloc.x + 1][cloc.y - 1].seen = true;
    if(playerStats.reveal == 'reveal1' || playerStats.reveal == 'reveal2'){
      this.game.player.revealCone();
    }else if(playerStats.reveal == 'reveal3' || playerStats.reveal == 'reveal4'){
      this.game.mapManager.revealCircle();
    }else if(playerStats.reveal == 'reveal5'){
      this.game.mapManager.revealAll();
    }
    let animalTile = this.validStartTiles[Math.floor(randIn(0, this.validStartTiles.length))];
    animalTile.hasAnimal = true;
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
    this.powerupManager.render();
  }
  revealCircle() {
      var cloc = positionToGrid(this.game.player.loc);
      if(playerStats.reveal == 'reveal3'){
        var distSq = 50;
      }else if(playerStats.reveal == 'reveal4'){
        var distSq = 120;
      }
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
  }
  revealAll(){
    for (let i = 0; i < this.game.mapManager.map.length; i++) {
      for (let j = 0; j < this.game.mapManager.map.length; j++) {
        var tile = this.game.mapManager.map[i][j];
        tile.seen = true;
      }
    }
  }
}
