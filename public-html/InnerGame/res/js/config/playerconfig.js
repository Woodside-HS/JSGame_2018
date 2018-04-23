const player_config = {
  size: 40, //px
  max_speed: 7, //px/frame
  minimap_color: "#FF0000",
  movement_loss: 0.9, //amount of friction on movement, px/f^2
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

  shot_cooldown: 5, //in frames
  bullet_size: 3, //in px
  spread_count: 3,
  bullet_spread: Math.PI/6, //in radians
  bullet_color: 'rgba(0,200,200,1)',
  bullet_speed: 10, //in px/frame
  bullet_distance: 6*config.tile_size, //in px
  bullet_damage: 2,
  bullet_wander: Math.PI/24
};
