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
    this.a = new Vector2D(0, 0);
    this.lastTile = this.cloc //to check when tile changes
    this.followCooldown = minion_config.follow_timer;
    this.followTimer = minion_config.follow_timer;
    this.hp = player_config.max_hp;
    this.energy = player_config.max_energy;
    this.image=player_config.image;
    this.size=player_config.size;
  }
  init() {
    this.image.src=player_config.image_src;
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
  }
  update() {
    this.cloc = positionToGrid(this.loc);
    this.game.mapManager.reveal();
    this.v.add(this.a);
    //set max velocity
    if (this.v.m > player_config.max_speed) {
      this.v.m = player_config.max_speed;
      this.v.upComps();
    }
    if(this.dashV) this.v.add(this.dashV);

    this.loc.add(this.v);//because v=ds/dt
    if(this.dashTimer<=0){
      this.v=this.storedV;
      this.dashV=undefined;
    }


    //collision detection
    let vDir = this.v.duplicate(); //normalized version of velocity
    vDir.m = this.size / 2;
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
    }


    if(!this.dashV) this.v.multiply(player_config.movement_loss);//gradual loss
    if(this.dashTimer>0) this.dashTimer--;
  }
  render() {
    this.game.context.save();
    this.game.context.translate(this.loc.x,this.loc.y);
    this.game.context.rotate(this.v.th+Math.PI/2);
    this.game.context.drawImage(this.image,-this.size/2,-this.size/2,this.size,this.size)
    this.game.context.restore();
  }
  dashTo(loc){
    let diff = loc.duplicate();
    diff.subtract(this.loc);
    diff.multiply(player_config.dash_speed);
    this.dashV=diff.duplicate();
    this.dashTimer=player_config.dash_time;
    this.storedV=this.v;
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
      case' ':
        let loc=game.mouseLocationAbsolute;
        let cloc=positionToGrid(loc);
        game.player.dashTo(game.mouseLocationAbsolute)
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
