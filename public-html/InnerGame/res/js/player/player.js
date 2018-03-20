/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Player extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.loc = new Vector2D(0, 0);//pixel-relative position to map origin
    this.cloc = positionToGrid(this.loc); //cloc = Cellular LOCation
    this.v = new Vector2D(0, 0);//velocity, pixels/frame
    player_config.color = 'rgba(255,0,0,1)';
    this.a = new Vector2D(0, 0); //acceleration
  }
  init() {
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
  }
  reveal(){
    var cloc = positionToGrid(this.loc);
    var distSq = 1*1;
    console.log(cloc);
    for (let i = 0; i < config.map_x_size; i++) {
      for (let j = 0; j < config.map_y_size; j++) {
        var tile = this.game.mapManager.map[i][j];
        var tileLoc = positionToGrid(tile.loc);
        var actualDistSq = ((cloc.x - tileLoc.x)^2 + (cloc.y - tileLoc.y)^2);
        if(actualDistSq <= distSq){
          tile.fog = false;
        }
      }
    }
  }
  update() {
    this.cloc = positionToGrid(this.loc);
    var cloc = this.cloc;
    this.v.add(this.a);
    //set max velocity
    if (this.v.m > player_config.max_speed) {
      this.v.m = player_config.max_speed;
      this.v.upComps();
    }
    this.loc.add(this.v);//because v=ds/dt
    var newCloc = positionToGrid(this.loc);
    if(newCloc.x != cloc.x || newCloc.y != cloc.y){
      this.reveal();
    }

    //collision detection
    let vDir = this.v.duplicate(); //normalized version of velocity
    vDir.m = player_config.size / 2;
    vDir.upComps();
    let hitBoxPos = this.loc.duplicate();
    hitBoxPos.add(vDir);
    let hitboxCloc = positionToGrid(hitBoxPos);
    //check for a collision in the x direction
    if (
            hitboxCloc.x < 0 ||
            hitboxCloc.x >= config.map_x_size ||
            this.game.mapManager.map[hitboxCloc.x][this.cloc.y].isOccupied
            ) {
      this.loc.subtract(this.v);//hold it!
      this.v.x = 0;//stop going that way
      this.v.upPols();
      this.loc.add(this.v);
      var newCloc = positionToGrid(this.loc);
      if(newCloc.x != cloc.x || newCloc.y != cloc.y){
        this.reveal();
      }
    }
    //check for a collision in the y direction
    if (
            hitboxCloc.y < 0 ||
            hitboxCloc.y >= config.map_y_size ||
            this.game.mapManager.map[this.cloc.x][hitboxCloc.y].isOccupied
            ) {
      this.loc.subtract(this.v);//hol up
      this.v.y = 0;//stop going that way
      this.v.upPols();
      this.loc.add(this.v);
      var newCloc = positionToGrid(this.loc);
      if(newCloc.x != cloc.x || newCloc.y != cloc.y){
        this.reveal();
      }
    }
    this.v.multiply(player_config.movement_loss);//gradual loss
  }
  render() {
    //for debugging purposes
    if (config.debug_mode) {
      //draw the collision hitbox
      let vDir = this.v.duplicate();
      vDir.m = player_config.size / 2;
      vDir.upComps();
      let hitBoxPos = this.loc.duplicate();
      hitBoxPos.add(vDir);
      this.game.context.fillStyle = player_config.color;
      //draw y-relative hitnox
      this.game.context.fillRect(
              this.loc.x - player_config.size / 4,
              hitBoxPos.y - player_config.size / 4,
              player_config.size / 2,
              player_config.size / 2
              );
      //draw x-relative hitbox
      this.game.context.fillRect(
              hitBoxPos.x - player_config.size / 4,
              this.loc.y - player_config.size / 4,
              player_config.size / 2,
              player_config.size / 2
              );
    }
    this.game.context.fillStyle = player_config.color;
    this.game.context.fillRect(
            this.loc.x - player_config.size / 2,
            this.loc.y - player_config.size / 2,
            player_config.size,
            player_config.size
            );
  }
  docKeyDown(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case 'W':
        if (game.player.a.y != -1)
          game.player.a.y = -1;//go up
        break;
      case 'A':
        if (game.player.a.x != -1)
          game.player.a.x = -1;//go left
        break;
      case'S':
        if (game.player.a.y != 1)
          game.player.a.y = 1;//go down
        break;
      case'D':
        if (game.player.a.x != 1)
          game.player.a.x = 1;//go right
        break;
    }
  }
  docKeyUp(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case 'W':
        game.player.a.y = 0;//stop going up
        break;
      case 'A':
        game.player.a.x = 0;//stop going left
        break;
      case'S':
        game.player.a.y = 0;//stop going down
        break;
      case'D':
        game.player.a.x = 0;//stop going right
        break;
    }
  }
}
