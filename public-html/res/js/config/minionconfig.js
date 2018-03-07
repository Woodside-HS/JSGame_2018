const STATUS = {
  NULL:{
    DURATION:0
  },
  POISON:{
    DURATION:CONFIG.FRAME_RATE*3, // fps * # of seconds
    DPS:8
  }
}

const MINION_HP = 20;
const MINION_SPEED = 2;
const MINION_DAMAGE = 1;
const MINION_SIZE = 3;//radius, in px
