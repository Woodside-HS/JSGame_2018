const player_config = {
  size: 30, //px
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

  // //god
  // shot_cooldown: 1*config.frame_rate/30, //in sec
  // bullet_size: 2, //in px
  // spread_count: 40,
  // bullet_spread: Math.PI/8, //in radians
  // bullet_color: 'rgba(0,200,100,1)',
  // bullet_speed: 5, //in px/frame
  // bullet_distance: 20*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 20,
  // bullet_wander: Math.PI/8,
  // accuracy_time: 0, //in frames
  // bullet_acceleration: 1.01

  // //multi laser
  // shot_cooldown: 1*config.frame_rate/30, //in sec
  // bullet_size: 4, //in px
  // spread_count: 3,
  // bullet_spread: Math.PI/5, //in radians
  // bullet_color: "rgba(200,200,255,.2)",
  // bullet_speed: 10, //in px/frame
  // bullet_distance: 10*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 5,
  // bullet_wander: 0,
  // accuracy_time: 1, //in frames
  // penetrating:true,
  // damage_dropoff:0, //0 to 1
  // bullet_acceleration: 0,
  // render_bullet: function() {
  //   game.context.strokeStyle = "rgba(100,100,255,.05)"
  //   game.context.lineWidth=5;
  //   game.context.beginPath();
  //   game.context.moveTo(game.player.loc.x,game.player.loc.y)
  //   let diff = game.player.loc.duplicate();
  //   diff.subtract(this.loc);
  //   diff.m=-.9*10*config.tile_size //range*.9
  //   diff.upComps();
  //   let drawAt = game.player.loc.duplicate();
  //   drawAt.add(diff);
  //   game.context.lineTo(drawAt.x,drawAt.y);
  //   game.context.stroke();
  //   //middle laser
  //   game.context.strokeStyle = player_config.bullet_color;
  //   game.context.lineWidth=Math.log(resources.innerWeaponsLevel);
  //   game.context.beginPath();
  //   game.context.moveTo(game.player.loc.x,game.player.loc.y)
  //   diff.m*=1/9 //the last bit
  //   diff.upComps();
  //   drawAt.add(diff);
  //   game.context.lineTo(drawAt.x,drawAt.y);
  //   game.context.stroke();
  // }

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

  //flamethrower
  shot_cooldown: 1*config.frame_rate/30, //in sec
  bullet_size: 3, //in px
  spread_count: 50,
  bullet_spread: Math.PI/30, //in radians
  bullet_color: 'rgba(255,150,50,.5)',
  bullet_speed: 10, //in px/frame
  bullet_distance: 15*config.tile_size, //in px
  auto_fire: true,
  bullet_damage: .02,
  bullet_wander: Math.PI/9,
  accuracy_time: 15, //in frames
  bullet_acceleration: .985

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

  // // laser
  // shot_cooldown: 1*config.frame_rate/30, //in sec
  // bullet_size: 10, //in px
  // spread_count: 1,
  // bullet_spread: 0, //in radians
  // bullet_color: 'rgba(0,200,100,1)',
  // bullet_speed: 30, //in px/frame
  // bullet_distance: 20*config.tile_size, //in px
  // auto_fire: true,
  // bullet_damage: 2,
  // bullet_wander: 0,
  // accuracy_time: 1, //in frames
  // penetrating:true,
  // damage_dropoff:1, //0 to 1
  // render_bullet: function() {
  //   game.context.strokeStyle = "rgba(100,100,255,.01)"
  //   game.context.lineWidth=8;
  //   game.context.beginPath();
  //   game.context.moveTo(game.player.loc.x,game.player.loc.y)
  //   let diff = game.player.loc.duplicate();
  //   diff.subtract(game.mouseLocationAbsolute);
  //   diff.m=-.9*20*config.tile_size //range*.9
  //   diff.upComps();
  //   let drawAt = game.player.loc.duplicate();
  //   drawAt.add(diff);
  //   game.context.lineTo(drawAt.x,drawAt.y);
  //   game.context.stroke();
  //   //middle laser
  //   game.context.strokeStyle = player_config.bullet_color;
  //   game.context.lineWidth=1+2*Math.log(resources.innerWeaponsLevel);
  //   game.context.beginPath();
  //   game.context.moveTo(game.player.loc.x,game.player.loc.y)
  //   diff.m*=1/9 //the last bit
  //   diff.upComps();
  //   drawAt.add(diff);
  //   game.context.lineTo(drawAt.x,drawAt.y);
  //   game.context.stroke();
  // }

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

if(config.debug_mode)
  player_config.max_hp*=1000;
