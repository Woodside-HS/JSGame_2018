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
    this.projectiles=[];
    this.target = {loc:new Vector2D(50,50)};
  }
  update(){
    super.update();
  }
  onHit(){
    
  }
  render(){
    super.render();
  }

}
