const TOWER_TYPES = {
  NULL:{
    NAME:0,
    HP:10
  },
  //spawner
  BOSS:'boss',
  NEST:'nest',
  SWARM:'swarm',

  //ranged
  SPITTER:{
    NAME:'spitter',
    HP:10,
    RANGE:CONFIG.TILE_SIZE*5, //6 tiles
    DAMAGE:1,
    COOLDOWN:CONFIG.FRAME_RATE*.75, //.75 sec
    BULLET_SPEED:2,
    BULLET_SIZE:3,//radius, in px
    BULLET_COLOR:'orange',
    SPLASH_RANGE:CONFIG.TILE_SIZE*1,
    onHit: function(target){
      target.hp-=this.DAMAGE;
      for(let i=0;i<game.minionManager.minions.length;i++){
        let minion=game.minionManager.minions[i];
        console.log(Math.pow(this.SPLASH_RANGE,2));
        if(distsqrd(target.loc,minion.loc)<Math.pow(this.SPLASH_RANGE,2))
          minion.status = STATUS.POISON;
      }
    }
  },
  SNIPER:{
    NAME:'sniper',
    HP:10,
    RANGE:CONFIG.TILE_SIZE*10, //6 tiles
    DAMAGE:9,
    COOLDOWN:CONFIG.FRAME_RATE*1, //1 sec
    BULLET_SPEED:7,
    BULLET_SIZE:2,//radius, in px
    BULLET_COLOR:'orange',
    onHit: function(target){
      target.hp-=this.DAMAGE;
    }
  },
  REPEATER:{
    NAME:'repeater',
    HP:10,
    RANGE:CONFIG.TILE_SIZE*5, //6 tiles
    DAMAGE:2,
    COOLDOWN:CONFIG.FRAME_RATE*.25, //1 sec
    BULLET_SPEED:4,
    BULLET_SIZE:1.5,//radius, in px
    BULLET_COLOR:'orange',
    onHit: function(target){
      target.hp-=this.DAMAGE;
    }
  }
}
