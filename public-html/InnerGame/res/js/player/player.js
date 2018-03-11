/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Player extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.loc = new Vector2D(0,0);
    this.cloc = positionToGrid(this.loc);
    this.v = new Vector2D(0, 0);
    this.fillStyle = 'rgba(255,0,0,1)'
    this.a = new Vector2D(0, 0);
  }
  init() {
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
  }
  update() {
    this.cloc=positionToGrid(this.loc);
    this.v.add(this.a);
    //set max v
    if (this.v.m > player_config.max_speed) {
      this.v.m = player_config.max_speed;
      this.v.upComps();
    }
    this.loc.add(this.v);
    let vDir = this.v.duplicate();
    vDir.m = player_config.size / 2;
    vDir.upComps();
    let hitBoxPos = this.loc.duplicate();
    hitBoxPos.add(vDir);
    let hitboxCloc = positionToGrid(hitBoxPos);;
      if (hitboxCloc.x < 0 ||
          hitboxCloc.x >= config.map_x_size ||
          this.game.mapManager.map[hitboxCloc.x][this.cloc.y].isOccupied){
        this.loc.subtract(this.v);
        this.v.x=0;
        this.v.upPols();
        this.loc.add(this.v);
      }
      if (hitboxCloc.y < 0 ||
          hitboxCloc.y >= config.map_y_size ||
          this.game.mapManager.map[this.cloc.x][hitboxCloc.y].isOccupied){
        this.loc.subtract(this.v);
        this.v.y=0;
        this.v.upPols();
        this.loc.add(this.v);
      }
    this.v.multiply(.9);
  }
  render() {
    //for debugging purposes
    if (config.debug_mode) {
      let vDir = this.v.duplicate();
      vDir.m = player_config.size / 2;
      vDir.upComps();
      let hitBoxPos = this.loc.duplicate();
      hitBoxPos.add(vDir);
      this.game.context.fillStyle = this.fillStyle;
      this.game.context.fillRect(this.loc.x - player_config.size / 4,hitBoxPos.y - player_config.size / 4, player_config.size/2, player_config.size/2);
      this.game.context.fillRect(hitBoxPos.x - player_config.size / 4,this.loc.y - player_config.size / 4, player_config.size/2, player_config.size/2);
    }
    this.game.context.fillStyle = this.fillStyle;
    this.game.context.fillRect(this.loc.x - player_config.size / 2, this.loc.y - player_config.size / 2, player_config.size, player_config.size);
  }
  docKeyDown(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case 'W':
        if (game.player.a.y != -1)
          game.player.a.y = -1;
        break;
      case 'A':
        if (game.player.a.x != -1)
          game.player.a.x = -1;
        break;
      case'S':
        if (game.player.a.y != 1)
          game.player.a.y = 1;
        break;
      case'D':
        if (game.player.a.x != 1)
          game.player.a.x = 1;
        break;
    }
  }
  docKeyUp(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case 'W':
        game.player.a.y = 0;
        break;
      case 'A':
        game.player.a.x = 0;
        break;
      case'S':
        game.player.a.y = 0;
        break;
      case'D':
        game.player.a.x = 0;
        break;
    }
  }
}
