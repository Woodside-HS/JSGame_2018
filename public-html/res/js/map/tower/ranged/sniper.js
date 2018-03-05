class Sniper extends Ranged{
  constructor(game, location) {
    super(game, location);
    this.type = TOWER_TYPES.SNIPER;
    this.range = Math.pow(TOWER_TYPES.SNIPER.RANGE,2);//square of distance
    this.cooldown = TOWER_TYPES.SNIPER.COOLDOWN;
    this.cooldowntimer = 0;
    this.maxhp = TOWER_TYPES.SNIPER.HP;
    this.hp=this.maxhp;
    this.bulletspeed=TOWER_TYPES.SNIPER.BULLET_SPEED;
    this.bulletsize=TOWER_TYPES.SNIPER.BULLET_SIZE;
    this.bulletcolor=TOWER_TYPES.SNIPER.BULLET_COLOR;
    this.damage=TOWER_TYPES.SNIPER.DAMAGE
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
