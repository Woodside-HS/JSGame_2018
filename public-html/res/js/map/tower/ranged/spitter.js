class Spitter extends Ranged{
  constructor(game, location) {
    super(game, location);
    this.type = TOWER_TYPES.SPITTER;
    this.range = Math.pow(SPITTER_RANGE,2);//square of distance
    this.cooldown = SPITTER_COOLDOWN;
    this.cooldowntimer = 0;
    this.maxhp = SPITTER_HP;
    this.hp=this.maxhp;
    this.bulletspeed=SPITTER_BULLET_SPEED;
    this.bulletsize=SPITTER_BULLET_SIZE;
    this.damage=SPITTER_DAMAGE;
    this.splashrangesqrd=Math.pow(SPITTER_SPLASH_RANGE,2);
    this.projectiles=[];
    this.target = null;
  }
  update(){
    super.update();
  }
  onHit(target){
    for(let i=0;i<this.game.minionManager.minions.length;i++){
      let minion=this.game.minionManager.minions[i];
      console.log(this.splashrangesqrd);
      if(distsqrd(target.loc,minion.loc)<this.splashrangesqrd)
        minion.status = STATUS.POISON;
    }
  }
  render(){
    super.render();
  }

}
