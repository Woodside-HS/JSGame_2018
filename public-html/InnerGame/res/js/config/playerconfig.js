const player_config = {
  size: 40, //px
  max_speed: 270/config.frame_rate, //px/sec
  water_speed: 100/config.frame_rate, //in px/sec
  minimap_color: "#FF0000",
  movement_loss: 0.85, //amount of friction on movement, px/f^2
  color: 'rgba(200,75,150,1)', //Any color string
  dash_speed:.1, //fraction of dash distance per frame
  dash_time:8, //dash time, in frames
  dash_cost: 10,//cost in energy units of dashing
  max_hp: 100,
  max_energy: 50,
  dash_cooldown: 20, //in frames
  energy_recovery_rate: 0.05,
  image_src: 'res/sprites/tractor.png',
  image: new Image(), //comes back later, don't touch it unless you have mastered black magic

  //god
  shot_cooldown: 2*config.frame_rate/30, //in sec
  bullet_size: 3, //in px
  spread_count: 20,
  bullet_spread: Math.PI/8, //in radians
  bullet_color: 'rgba(0,200,100,1)',
  bullet_speed: 5, //in px/frame
  bullet_distance: 20*config.tile_size, //in px
  auto_fire: true,
  bullet_damage: 20,
  bullet_wander: Math.PI/8,
  accuracy_time: 0, //in frames
  bullet_acceleration: 1.01

  // //shotgun
  // shot_cooldown: 30*config.frame_rate/30, //in sec
  // bullet_size: 3, //in px
  // spread_count: 12,
  // bullet_spread: Math.PI/8, //in radians
  // bullet_color: 'rgba(0,200,100,1)',
  // bullet_speed: 20, //in px/frame
  // bullet_distance: 8*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 2,
  // bullet_wander: 0,
  // accuracy_time: 0 //in frames

  // //flamethrower
  // shot_cooldown: 1*config.frame_rate/30, //in sec
  // bullet_size: 3, //in px
  // spread_count: 30,
  // bullet_spread: Math.PI/30, //in radians
  // bullet_color: 'yellow',
  // bullet_speed: 10, //in px/frame
  // bullet_distance: 15*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: .02,
  // bullet_wander: Math.PI/9,
  // accuracy_time: 15, //in frames
  // bullet_acceleration: .985

  // // machine gun
  // shot_cooldown: 2*config.frame_rate/30, //in sec
  // bullet_size: 5, //in px
  // spread_count: 1,
  // bullet_spread: Math.PI/16, //in radians
  // bullet_color: 'rgba(0,200,100,1)',
  // bullet_speed: 10, //in px/frame
  // bullet_distance: 16*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 2,
  // bullet_wander: 0,
  // accuracy_time: 1 //in frames

  // //bomb
  // shot_cooldown: 20*config.frame_rate/30, //in sec
  // bullet_size: 3, //in px
  // spread_count: 20,
  // bullet_spread: 0, //in radians
  // bullet_color: 'rgba(200,200,150,1)',
  // bullet_speed: 10, //in px/frame
  // bullet_distance: 20*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 1,
  // bullet_wander: Math.PI*3/4,
  // accuracy_time: 20, //in frames

  // //sonic
  // shot_cooldown: 2*config.frame_rate/30, //in sec
  // bullet_size: 2, //in px
  // spread_count: 80,
  // bullet_spread: Math.PI*2, //in radians
  // bullet_color: 'rgba(200,200,150,1)',
  // bullet_speed: 6, //in px/frame
  // bullet_distance: 4*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 1.5,
  // bullet_wander: Math.PI/4,
  // accuracy_time: 0 //in frames

  // //cannon
  // shot_cooldown: 30*config.frame_rate/30, //in sec
  // bullet_size: 8, //in px
  // spread_count: 1,
  // bullet_spread: Math.PI/64, //in radians
  // bullet_color: 'rgba(200,200,150,1)',
  // bullet_speed: 2, //in px/frame
  // bullet_distance: 15*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 20,
  // bullet_wander: Math.PI/64,
  // accuracy_time: 5, //in frames
  // bullet_acceleration: 1.1
};
