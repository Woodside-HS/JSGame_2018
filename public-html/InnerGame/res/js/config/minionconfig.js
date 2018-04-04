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
  hp: 40,
  speed: 400 / config.frame_rate,
  turn_speed: 100 / config.frame_rate,
  damage: 1,
  size: 5,
  color: "#FF0000",
  healthbar_positive_color: "#00FF00",
  healthbar_negative_color: "#FF0000",
  limit: 150, //maximimum minion count
  viewrange: 3, //in tiles
  cooldown: .2*config.frame_rate,
  laser_color:'rgba(150,200,255,.3)',
  laser_width:4
};
