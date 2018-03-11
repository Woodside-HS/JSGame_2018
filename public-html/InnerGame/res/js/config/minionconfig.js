const STATUS = {
  NULL: {
    DURATION: 0,
    COLOR: "#FF0000"
  },
  POISON: {
    DURATION: config.frame_rate * 3, // fps * # of seconds
    DPS: 8
  }
};
const MINION_CONFIG = {
  HP: 20,
  SPEED: 2 / config.frame_rate,
  DAMAGE: 1,
  SIZE: 3,
  COLOR: "#FF0000",
  HEALTHBAR_POSITIVE_COLOR: "#00FF00",
  HEALTHBAR_NEGATIVE_COLOR: "#FF0000"
};
