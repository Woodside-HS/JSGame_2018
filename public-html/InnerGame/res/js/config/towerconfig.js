const tower_types = {
  nulltype: {
    name: 0,
    hp: 10,
    frequency: 50
  },
  //spawner
  boss: 'boss',
  nest: 'nest',
  swarm: 'swarm',

  //ranged
  spitter: {
    name: 'spitter',
    hp: 15,
    frequency: 10,
    range: config.tile_size * 7, // in tiles
    damage: 1,
    cooldown: config.frame_rate * .75, //.75 sec
    bullet_speed: 2,
    bullet_size: 6, //radius, in px
    bullet_color: 'orange',
    splash_range: config.tile_size * 1,
    onHit: function (target) {
      target.hp -= this.damage;
      for (let i = 0; i < game.minionManager.minions.length; i++) {
        let minion = game.minionManager.minions[i];
        if (distsqrd(target.loc, minion.loc) < Math.pow(this.splash_range, 2))
          minion.status = status.poison;
      }
    }
  },
  sniper: {
    name: 'sniper',
    hp: 15,
    frequency: 20,
    range: config.tile_size * 11, //6 tiles
    damage: 9,
    cooldown: config.frame_rate * 1, //1 sec
    bullet_speed: 7,
    bullet_size: 4, //radius, in px
    bullet_color: 'orange',
    onHit: function (target) {
      target.hp -= this.damage;
    }
  },
  repeater: {
    name: 'repeater',
    hp: 30,
    frequency: 20,
    range: config.tile_size * 9, //6 tiles
    damage: 2,
    cooldown: config.frame_rate * .25, //1 sec
    bullet_speed: 4,
    bullet_size: 3, //radius, in px
    bullet_color: 'orange',
    onHit: function (target) {
      target.hp -= this.damage;
    }
  }
};
const tower_config = {
  noise_seed: Math.random(),
  noise_scale: 3,
  tower_range_ranges:[.45,.5,.5,.6],
  tower_range: [0.5, 0.6],
  tower_rate_range: [.1,.2],
  tower_rate: 0.15,
  minimap_color: new Color("yellow")
};
