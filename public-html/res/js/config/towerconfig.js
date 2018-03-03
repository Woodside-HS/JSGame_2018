const TOWER_TYPES = {
  NULL:0,
  //spawner
  BOSS:'boss',
  NEST:'nest',
  SWARM:'swarm',

  //ranged
  SPITTER:'spitter',
  SNIPER:'sniper',
  REPEATER:'repeater'
}
const WALL_HP = 10;

//ranged
const SNIPER_HP = 10;
const SNIPER_RANGE = CONFIG.TILE_SIZE*6; //6 tiles
const SNIPER_DAMAGE = 5;
const SNIPER_COOLDOWN = CONFIG.FRAME_RATE*1; //1 sec
const SNIPER_BULLET_SPEED = 5;
const SNIPER_BULLET_SIZE = 2;//radius, in px
