'use strict'

class Minion extends Updateable{
  constructor(game, location) {
    super();
    this.game = game;
    this.loc = location;
    this.fillStyle = "rgba(255,0,0,1)";
    this.maxhp=MINION_HP;
    this.hp=this.maxhp;
    this.speed=MINION_SPEED;
    this.damage=MINION_DAMAGE;
    this.radius=MINION_SIZE;
    this.status=STATUS.NULL;
    this.statusTimer=null;
  }
  update(){
    switch(this.status){
      case STATUS.POISON:
        this.hp-=this.status.DPS/CONFIG.FRAME_RATE;
        this.fillStyle="rgba(225,100,0,1)";
        break;
      case STATUS.NULL:
        this.fillStyle="rgba(255,0,0,1)";
        break;
    }
    if(this.statusTimer>0) this.statusTimer--;
    if(this.statusTimer==0){
      this.status=STATUS.NULL;
    }

  }
  setStatus(status){
    this.status=status;
    this.statusTimer=status.duration;
  }
  render(){
    this.game.context.fillStyle=this.fillStyle;
    this.game.context.beginPath();
    this.game.context.arc(this.loc.x,this.loc.y,CONFIG.TILE_SIZE/2,0,2*Math.PI);
    this.game.context.fill();
    this.game.context.fillStyle='rgba(255,0,0,1)';
    this.game.context.fillRect(this.loc.x-1.5*this.radius, this.loc.y+2/3*this.radius, 3*this.radius, this.radius);
    this.game.context.fillStyle='rgba(0,255,0,1)';
    this.game.context.fillRect(this.loc.x-1.5*this.radius, this.loc.y+2/3*this.radius, this.hp/this.maxhp*3*this.radius, this.radius);

  }
}
