'use strict'

class Minion extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.loc = location;
    this.cloc = positionToGrid(this.loc);
    this.fillStyle = minion_config.color;
    this.maxhp = minion_config.hp;
    this.hp = this.maxhp;
    this.speed = minion_config.speed;
    this.damage = minion_config.damage;
    this.radius = minion_config.size;
    this.status = status.nullstatus;
    this.statusTimer = null;
    this.isSelected = false;
    this.v = new Vector2D(0, 0);
    this.a = new Vector2D(0, 0);
    this.path;
    this.followMode=true; //whether or not to follow the player
  }
  update() {
    this.cloc = positionToGrid(this.loc);

    //status logic
    switch (this.status) {
      case status.poison:
      this.hp -= this.status.dps / config.frame_rate;
      this.fillStyle = "rgba(225,100,0,1)";
      break;
      case status.nullstatus:
      this.fillStyle = "rgba(255,0,0,1)";
      break;
    }
    if (this.statusTimer > 0)
    this.statusTimer--;
    if (this.statusTimer == 0) {
      this.status = status.nullstatus;
    }
    if (this.isSelected) {
      this.fillStyle = "rgba(255,100,100,1)";
    }


    //movement logic
    this.a = new Vector2D(0, 0);
    //follow the path
    if(this.path){
      let accel = this.path.map[this.cloc.x][this.cloc.y].direction.toVector2D();
      accel.m = minion_config.turn_speed;
      accel.upComps();
      this.a.add(accel);
    }

    this.v.add(this.a);
    if(this.v.m>minion_config.speed){
      this.v.m=minion_config.speed
      this.v.upComps();
    }

    this.loc.add(this.v);
    //collision detection
    let vDir = this.v.duplicate(); //normalized version of velocity
    vDir.m = minion_config.size*5;
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
  }
  setStatus(status) {
    this.status = status;
    this.statusTimer = status.duration;
  }
  render() {
    this.game.context.fillStyle = this.fillStyle;
    this.game.context.beginPath();
    this.game.context.arc(this.loc.x, this.loc.y, config.tile_size / 2, 0, 2 * Math.PI);
    this.game.context.fill();
    this.game.context.fillStyle = minion_config.healthbar_negative_color;
    this.game.context.fillRect(this.loc.x - 2 * this.radius, this.loc.y + 2 / 3 * this.radius, 4 * this.radius, 2 * this.radius);
    this.game.context.fillStyle = minion_config.healthbar_positive_color
    this.game.context.fillRect(this.loc.x - 2 * this.radius, this.loc.y + 2 / 3 * this.radius, this.hp / this.maxhp * 4 * this.radius, 2 * this.radius);

  }
}
