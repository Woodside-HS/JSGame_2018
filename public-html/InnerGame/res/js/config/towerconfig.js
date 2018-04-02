const tower_types = {
  nulltype: {
    name: 0,
    hp: 10,
    frequency: 0
  },
  //spawner
  boss: 'boss',
  nest: 'nest',
  swarm: 'swarm',

  //ranged
  spitter: {
    name: 'spitter',
    hp: 10,
    frequency: 15,
    range: config.tile_size * 5, //6 tiles
    damage: 1,
    cooldown: config.frame_rate * .75, //.75 sec
    bullet_speed: 2,
    bullet_size: 3, //radius, in px
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
    hp: 10,
    frequency: 50,
    range: config.tile_size * 10, //6 tiles
    damage: 9,
    cooldown: config.frame_rate * 1, //1 sec
    bullet_speed: 7,
    bullet_size: 2, //radius, in px
    bullet_color: 'orange',
    onHit: function (target) {
      target.hp -= this.damage;
    }
  },
  repeater: {
    name: 'repeater',
    hp: 100,
    frequency: 75,
    range: config.tile_size * 5, //6 tiles
    damage: 2,
    cooldown: config.frame_rate * .25, //1 sec
    bullet_speed: 4,
    bullet_size: 1.5, //radius, in px
    bullet_color: 'orange',
    onHit: function (target) {
      target.hp -= this.damage;
    }
  }
};
const tower_config = {
  noise_seed: Math.random(),
  noise_scale: 3,
  tower_range: [0.5, 0.55],
  tower_rate: 0.15,
  minimap_color: "yellow"
};
