'use strict'

const map_config = {
  noise_seed: Math.random(),
  noise_scale_range:[3,5],
  noise_scale: 3,
  rock_probability_range:[.2,.3],
  rock_probability: 0, //to be set later
  water_range_ranges: [-1,.1,.3,.4],
  water_range: [0, 0.3],
  grass_image_src: 'res/sprites/grass.png',
  grass_image: new Image(),
  grass_image_size:400,
  powerup_count: 20,
  mask_border_size: 1
};
