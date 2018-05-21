class Ranged extends Tower {
  constructor(game, location, type) {
    super(game, location);
    this.type = type;
    this.range = this.type.range;
    this.cooldown = this.type.cooldown;
    this.cooldowntimer = 0;
    this.maxhp = this.type.hp;
    this.hp = this.maxhp;
    this.bulletspeed = this.type.bullet_speed;
    this.bulletsize = this.type.bullet_size;
    this.projectiles = [];
    this.target = null;
    this.targetdist = this.range + 1;
    this.bulletcolor = this.type.bullet_color;
  }
  update() {
    super.update();
    //decrement cooldown
    if (this.cooldowntimer > 0)
      this.cooldowntimer--;
    //check target distance
    if (this.target) {
      let diff = this.loc.toFastVector();
      diff.subtract(this.target.loc);
      if (diff.x < this.range || diff.y < this.range) {
        diff = this.loc.duplicate();
        diff.subtract(this.target.loc);
        if (diff.m > this.range || this.target.hp <= 0) {
          // find new target
          this.target = null;
          for (let i = -1; i < this.game.minionManager.minions.length; i++) {
            let minion;
            if(i==-1){ minion=game.player;
            } else{    minion=game.minionManager.minions[i];
            }
            let diff = this.loc.duplicate();
            diff.subtract(minion.loc);
            if (diff.m < this.range && (this.target == null || diff.m < this.targetdist)) {
              this.targetdist = diff.m;
              this.target = minion;
            }
          }
        }
      }
    } else {
      // find new target
      for (let i = -1; i < this.game.minionManager.minions.length; i++) {
        let minion;
        if(i==-1){ minion=game.player;
        } else{    minion=game.minionManager.minions[i];
        }
        let diff = this.loc.duplicate();
        diff.subtract(minion.loc);
        if (diff.m < this.range && (this.target == null || diff.m < this.targetdist)) {
          this.targetdist = diff.m;
          this.target = minion;
        }
      }
    }

    if (this.target && this.cooldowntimer <= 0) {
      this.cooldowntimer = this.cooldown;
      let diff = this.target.loc.duplicate();
      diff.subtract(this.loc);
      let dir = diff.duplicate();
      dir.multiply(1 / diff.m);
      dir.multiply(this.bulletspeed);
      let projectileStart = this.loc.duplicate();
      projectileStart.add(new Vector2D(config.tile_size/2, config.tile_size/2));
      let projectile = {
        loc: projectileStart,
        v: dir,
        life: Math.floor(diff.m / this.bulletspeed) + 1
      }
      this.projectiles.push(projectile);
    }

    //update projectiles
    for (let i = 0; i < this.projectiles.length; i++) {
      let bullet = this.projectiles[i];
      if (bullet.life <= 0) {
        this.projectiles.splice(i, 1);
        i--;
        continue;
      }
      bullet.life--;
      bullet.loc.add(bullet.v);
      for(let j=-1; j<game.minionManager.minions.length; j++){
        let minion;
        if(j==-1){ minion=game.player;
        } else{    minion=game.minionManager.minions[j];
        }
        let diff=bullet.loc.duplicate();
        diff.subtract(minion.loc);
        if(diff.m<this.bulletsize+minion.size/2){
          this.onHit(minion);
          this.projectiles.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }
  onHit(target) {
    this.type.onHit(target);
  }
  render() {
    super.render();
    //render projectiles
    for (let i = 0; i < this.projectiles.length; i++) {
      let bullet = this.projectiles[i];
      this.game.context.fillStyle = this.bulletcolor;
      this.game.context.beginPath();
      this.game.context.arc(bullet.loc.x, bullet.loc.y, this.bulletsize, 0, 2 * Math.PI);
      this.game.context.fill();
    }
  }

}
