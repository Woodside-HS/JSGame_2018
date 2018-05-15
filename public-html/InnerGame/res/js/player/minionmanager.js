'use strict'

class MinionManager extends Updateable {
  constructor(game) {
    super();
    this.minions = [];
    this.respawnTimer = minion_config.respawn_cooldown;
    this.respawnCooldown = minion_config.respawn_cooldown;
    this.followMouse = false;
    this.followPlayer = true;
    this.followTimer = minion_config.follow_timer;
  }
  init() {
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
  }
  update() {
    //respawn minions
    if (config.debug_mode) {
      if (this.respawnTimer > 0)
        this.respawnTimer--;
      if (this.respawnTimer <= 0 && this.minions.length < minion_config.min_count) {
        this.spawnMinion();
        this.respawnTimer = this.respawnCooldown;
      }
    }
/*
    //send minions
    if (this.followTimer > 0)
      this.followTimer--;
    if (!this.followMouse && this.followPlayer && this.followTimer <= 0) {
      this.sendMinions(this.minions, game.player.cloc)
      this.followTimer = minion_config.follow_timer;
    }
    if (this.followMouse && !this.followPlayer) {
      this.sendMinions(this.minions, positionToGrid(game.mouseLocationAbsolute))
      this.followTimer = 0;
    }*/



    for (let i = 0; i < this.minions.length; i++) {
      this.minions[i].update();
      //check if minions are dead
      if (this.minions[i].hp <= 0) {
        this.minions.splice(i, 1);//kill minions
        i--;
      }
      if (i > minion_config.limit) {//check for overpopulation
        this.minions.splice(i, 1);//kill overpopulators
        i--;
      }
    }
  }
  render() {
    for (let i = 0; i < this.minions.length; i++) {
      this.minions[i].render();
    }
  }
  sendMinions(minions, gridloc) {
    let path;
    if(minions.length==0) return;
    if (minions[0].path) {//Optimization to prevent creation of new Path object
      path = minions[0].path;
    }
    path = new Path();
    path.target = new FastVector(gridloc.x, gridloc.y);
    path.dijkstra();
    for (let i = 0; i < minions.length; i++) {
      minions[i].path = path;
    }
  }
  spawnMinion() {
    let minion = new Minion(game, game.player.loc)
    minion.v.m = minion_config.initial_speed;
    minion.v.th = Math.random() * 2 * Math.PI
    minion.v.upComps();
    this.minions.push(minion);
  }
  docKeyDown(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case '': //shift key
        game.minionManager.followMouse = true;
        game.minionManager.followPlayer = false;
        break;
    }
  }

  docKeyUp(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case '': //shift key
        game.minionManager.followMouse = false;
        game.minionManager.followPlayer = true;
        break;
    }
  }
}
