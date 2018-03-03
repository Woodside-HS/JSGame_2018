class Repeater extends Ranged{
  constructor(game, location) {
    super(game, location);
    this.type = TOWER_TYPES.REPEATER;
    this.range = Math.pow(REPEATER_RANGE,2);//square of distance
    this.cooldown = REPEATER_COOLDOWN;
    this.cooldowntimer = 0;
    this.maxhp = REPEATER_HP;
    this.hp=this.maxhp;
    this.bulletspeed=REPEATER_BULLET_SPEED;
    this.bulletsize=REPEATER_BULLET_SIZE;
    this.damage=REPEATER_DAMAGE;
    this.projectiles=[];
    this.target = {loc:new Vector2D(50,50)};
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
