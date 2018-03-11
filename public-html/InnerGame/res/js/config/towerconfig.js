const TOWER_TYPES = {
  NULL:{
    NAME:0,
    hp:10
  },
  //spawner
  BOSS:'boss',
  NEST:'nest',
  SWARM:'swarm',

  //ranged
  SPITTER:{
    NAME:'spitter',
    hp:10,
    RANGE:config.tile_size*5, //6 tiles
    damage:1,
    COOLDOWN:config.frame_rate*.75, //.75 sec
    BULLET_SPEED:2,
    BULLET_SIZE:3,//radius, in px
    BULLET_COLOR:'orange',
    SPLASH_RANGE:config.tile_size*1,
    onHit: function(target){
      target.hp-=this.damage;
      for(let i=0;i<game.minionManager.minions.length;i++){
        let minion=game.minionManager.minions[i];
        console.log(Math.pow(this.SPLASH_RANGE,2));
        if(distsqrd(target.loc,minion.loc)<Math.pow(this.SPLASH_RANGE,2))
          minion.status = status.poison;
      }
    }
  },
  SNIPER:{
    NAME:'sniper',
    hp:10,
    RANGE:config.tile_size*10, //6 tiles
    damage:9,
    COOLDOWN:config.frame_rate*1, //1 sec
    BULLET_SPEED:7,
    BULLET_SIZE:2,//radius, in px
    BULLET_COLOR:'orange',
    onHit: function(target){
      target.hp-=this.damage;
    }
  },
  REPEATER:{
    NAME:'repeater',
    hp:10,
    RANGE:config.tile_size*5, //6 tiles
    damage:2,
    COOLDOWN:config.frame_rate*.25, //1 sec
    BULLET_SPEED:4,
    BULLET_SIZE:1.5,//radius, in px
    BULLET_COLOR:'orange',
    onHit: function(target){
      target.hp-=this.damage;
    }
  }
}
