class Sniper extends Ranged{
  constructor(game, location) {
    super(game, location);
    this.type = TOWER_TYPES.SNIPER;
    this.range = Math.pow(SNIPER_RANGE,2);//square of distance
    this.cooldown = SNIPER_COOLDOWN;
    this.cooldowntimer = 0;
    this.maxhp = SNIPER_HP;
    this.hp=this.maxhp;
    this.bulletspeed=SNIPER_BULLET_SPEED;
    this.bulletsize=SNIPER_BULLET_SIZE;
    this.damage=SNIPER_DAMAGE
    this.projectiles=[];
    this.target = null;
  }
  update(){
    super.update();
  }
  onHit(target){
    target.hp-=this.damage;
  }
  render(){
    super.render();
  }

}
