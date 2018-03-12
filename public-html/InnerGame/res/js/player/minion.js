'use strict'

class Minion extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.loc = location;
    this.fillStyle = minion_config.color;
    this.maxhp = minion_config.hp;
    this.hp = this.maxhp;
    this.speed = minion_config.speed;
    this.damage = minion_config.damage;
    this.radius = minion_config.size;
    this.status = status.nullstatus;
    this.statusTimer = null;
    this.isSelected = false;
  }
  update() {
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
    this.game.context.fillRect(this.loc.x - 1.5 * this.radius, this.loc.y + 2 / 3 * this.radius, 3 * this.radius, this.radius);
    this.game.context.fillStyle = minion_config.healthbar_positive_color
    this.game.context.fillRect(this.loc.x - 1.5 * this.radius, this.loc.y + 2 / 3 * this.radius, this.hp / this.maxhp * 3 * this.radius, this.radius);

  }
}
