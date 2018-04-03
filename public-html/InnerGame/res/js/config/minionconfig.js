const status = {
  nullstatus: {
    duration: 0,
    color: "#FF0000"
  },
  poison: {
    duration: config.frame_rate * 3, // fps * # of seconds
    dps: 8
  }
};
const minion_config = {
  hp: 20,
  speed: 2 / config.frame_rate,
  damage: 1,
  size: 3,
  color: "#FF0000",
  healthbar_positive_color: "#00FF00",
  healthbar_negative_color: "#FF0000",
  limit: 150
};
