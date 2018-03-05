class Spitter extends Ranged{
  constructor(game, location) {
    super(game, location);
    this.type = TOWER_TYPES.SPITTER;
    this.range = Math.pow(TOWER_TYPES.SPITTER.RANGE,2);//square of distance
    this.cooldown = TOWER_TYPES.SPITTER.COOLDOWN;
    this.cooldowntimer = 0;
    this.maxhp = TOWER_TYPES.SPITTER.HP;
    this.hp=this.maxhp;
    this.bulletspeed=TOWER_TYPES.SPITTER.BULLET_SPEED;
    this.bulletsize=TOWER_TYPES.SPITTER.BULLET_SIZE;
    this.damage=TOWER_TYPES.SPITTER.DAMAGE;
    this.splashrangesqrd=Math.pow(TOWER_TYPES.SPITTER.SPLASH_RANGE,2);
    this.projectiles=[];
    this.target = null;
    this.bulletcolor=TOWER_TYPES.SPITTER.BULLET_COLOR;
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
