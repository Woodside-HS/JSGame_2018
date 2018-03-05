class Repeater extends Ranged{
  constructor(game, location) {
    super(game, location);
    this.type = TOWER_TYPES.REPEATER;
    this.range = Math.pow(TOWER_TYPES.REPEATER.RANGE,2);//square of distance
    this.cooldown = TOWER_TYPES.REPEATER.COOLDOWN;
    this.cooldowntimer = 0;
    this.maxhp = TOWER_TYPES.REPEATER.HP;
    this.hp=this.maxhp;
    this.bulletspeed=TOWER_TYPES.REPEATER.BULLET_SPEED;
    this.bulletsize=TOWER_TYPES.REPEATER.BULLET_SIZE;
    this.damage=TOWER_TYPES.REPEATER.DAMAGE;
    this.projectiles=[];
    this.bulletcolor=TOWER_TYPES.REPEATER.BULLET_COLOR;
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
