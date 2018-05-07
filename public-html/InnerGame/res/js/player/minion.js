'use strict'

class Minion extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.loc = location.duplicate();
    this.cloc = positionToGrid(this.loc);
    this.fillStyle = minion_config.color;
    this.maxhp = minion_config.hp;
    this.hp = this.maxhp;
    this.speed = minion_config.speed;
    this.damage = minion_config.damage;
    this.radius = minion_config.size;
    this.size = minion_config.size; // so other things can reference it
    this.status = status.nullstatus;
    this.statusTimer = null;
    this.isSelected = false;
    this.v = new InnerVector2D(0, 0);
    this.a = new InnerVector2D(0, 0);
    this.path;
    this.followMode = true; //whether or not to follow the player
    this.target = null;
    this.cooldown = minion_config.cooldown;
    this.timer = this.cooldown;
    this.damage = minion_config.damage;
    this.attackFrame = false; //whether to attack that frame
  }
  update() {
    this.cloc = positionToGrid(this.loc);
    if (this.timer > 0)
      this.timer--;

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

    //check for target
    let targetDistance = 2 * minion_config.viewrange + 1 //max distance
    for (let i = this.cloc.x - minion_config.viewrange; i <= this.cloc.x + minion_config.viewrange; i++) {
      for (let j = this.cloc.y - minion_config.viewrange; j <= this.cloc.y + minion_config.viewrange; j++) {
        let towers = game.mapManager.towerManager.towers
        if (i >= 0 && j >= 0 && i < towers.length && j < towers[i].length) {
          if (towers[i][j] && (Math.abs(i - this.cloc.x) + Math.abs(j - this.cloc.y) < targetDistance)) {
            this.target = towers[i][j];
          }
        }
      }
    }

    //attack target
    if (this.target && this.timer <= 0) {
      this.timer = this.cooldown;
      this.attackFrame = true;
      this.target.hp -= this.damage;
    }

    //movement logic
    this.a = new InnerVector2D(0, 0);
    //follow the path
    if (this.path && this.target == null && !this.attackFrame &&
       (this.path.map[this.cloc.x][this.cloc.y].direction.x!=0 || this.path.map[this.cloc.x][this.cloc.y].direction.y!=0)) {
      let accel = this.path.map[this.cloc.x][this.cloc.y].direction.toInnerVector2D();
      accel.m = minion_config.turn_speed;
      accel.upComps();
      this.a.add(accel);
    } else {
      let slowDown = this.v.duplicate();
      slowDown.multiply(-.1);
      this.a.add(slowDown);
    }

    this.v.add(this.a);
    if (this.v.m > minion_config.speed) {
      this.v.m = minion_config.speed
      this.v.upComps();
    }

    this.loc.add(this.v);
    //collision detection
    let vDir = this.v.duplicate(); //normalized version of velocity
    vDir.m = minion_config.size * 5;
    vDir.upComps();
    let hitBoxPos = this.loc.duplicate();
    hitBoxPos.add(vDir);
    let hitboxCloc = positionToGrid(hitBoxPos);

    //check for corner collision
    if (false&& //turned off for now
            (hitboxCloc.y >= 0 &&
                    hitboxCloc.y < config.map_y_size &&
                    hitboxCloc.x >= 0 &&
                    hitboxCloc.x < config.map_x_size &&
                    this.game.mapManager.map[hitboxCloc.x][hitboxCloc.y].isOccupied
                    )
            ) {
      this.loc.subtract(this.v);//hol up
      this.v.multiply(-.1);//stop going that way
      this.v.upPols();
      this.loc.add(this.v);
    }
    //check for a collision in the x direction
    if (
            hitboxCloc.x < 0 ||
            hitboxCloc.x >= config.map_x_size ||
            this.game.mapManager.map[hitboxCloc.x][this.cloc.y].isOccupied && !this.game.mapManager.map[hitboxCloc.x][this.cloc.y].isWater
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
            this.game.mapManager.map[this.cloc.x][hitboxCloc.y].isOccupied && !this.game.mapManager.map[this.cloc.x][hitboxCloc.y].isWater
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
    this.game.context.arc(this.loc.x, this.loc.y, this.radius, 0, 2 * Math.PI);
    this.game.context.fill();
    // this.game.context.fillStyle = minion_config.healthbar_negative_color;
    // this.game.context.fillRect(this.loc.x - this.radius, this.loc.y + 2 / 3 * this.radius, 2 * this.radius, this.radius);
    // this.game.context.fillStyle = minion_config.healthbar_positive_color
    // this.game.context.fillRect(this.loc.x - this.radius, this.loc.y + 2 / 3 * this.radius, this.hp / this.maxhp * 2 * this.radius, this.radius);

    if (this.attackFrame && this.target) {
      this.game.context.strokeStyle = minion_config.laser_color;
      this.game.context.lineWidth = minion_config.laser_width;
      this.game.context.beginPath();
      this.game.context.moveTo(this.loc.x, this.loc.y)
      this.game.context.lineTo(this.target.loc.x, this.target.loc.y)
      this.game.context.stroke();
      if (this.target.hp <= 0)
        this.target = null;
      this.attackFrame = false;
    }
  }
}
