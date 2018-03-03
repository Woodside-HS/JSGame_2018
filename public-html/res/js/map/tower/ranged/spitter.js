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
    this.damage=SPITTER_DAMAGE
    this.projectiles=[];
    this.target = null;
  }
  update(){
    super.update();
  }
  onHit(target){
    target.status= STATUS.POISON;
  }
  render(){
    super.render();
  }

}
