'use strict'
// int properties of the condig object
const config = {
  init: function () {
    if (config.debug_mode) {
      config.canvas_width = window.innerWidth - 4;
      config.canvas_height = window.innerHeight - 4;
    }
    // config.scaling_factor_x = config.map_x_size / config.view_range;
    // config.scaling_factor_y = config.map_y_size / config.view_range;
    tile_types.init();
  },
  scaling_factor_x: 1,
  scaling_factor_y: 1,
  debug_mode: false, // used when we debugging
  view_range: 40, //measured in tiles
  canvas_name: "gameCanvas",
  frame_rate: 30, //fps
  map_x_size: 100, //measured in tiles
  map_y_size: 100, //measred in tiles
  mask_radius: 4, //measured in tiles
  tile_size: 25, //Measured in px
  canvas_width: 1024, //Measured in px
  canvas_height: 576, //Measured in px
  background_color: "#101010" //Hex color
};
