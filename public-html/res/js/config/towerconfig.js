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
const SNIPER_RANGE = CONFIG.TILE_SIZE*10; //6 tiles
const SNIPER_DAMAGE = 9;
const SNIPER_COOLDOWN = CONFIG.FRAME_RATE*1; //1 sec
const SNIPER_BULLET_SPEED = 7;
const SNIPER_BULLET_SIZE = 2;//radius, in px

const REPEATER_HP = 10;
const REPEATER_RANGE = CONFIG.TILE_SIZE*5; //6 tiles
const REPEATER_DAMAGE = 2;
const REPEATER_COOLDOWN = CONFIG.FRAME_RATE*.25; //1 sec
const REPEATER_BULLET_SPEED = 4;
const REPEATER_BULLET_SIZE = 1.5;//radius, in px

const SPITTER_HP = 10;
const SPITTER_RANGE = CONFIG.TILE_SIZE*5; //6 tiles
const SPITTER_DAMAGE = 1;
const SPITTER_COOLDOWN = CONFIG.FRAME_RATE*.75; //1 sec
const SPITTER_BULLET_SPEED = 2;
const SPITTER_BULLET_SIZE = 3;//radius, in px
const SPITTER_SPLASH_RANGE = CONFIG.TILE_SIZE*1;//radius, in px
