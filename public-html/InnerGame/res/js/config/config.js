'use strict'
// int properties of the condig object
const config = {
  init: function () {
    //config.canvas_width=window.innerWidth-4;
    //config.canvas_height=window.innerHeight-4;
    config.scaling_factor_x = config.map_x_size / config.view_range;
    config.scaling_factor_y = config.map_y_size / config.view_range;
    tile_types.init();
  },
  debug_mode: true,// used when we debugging
  view_range: 40, //measured in tiles
  canvas_name: "gameCanvas",
  frame_rate: 60, //fps
  map_x_size: 100, //measured in tiles
  map_y_size: 100, //measred in tiles
  tile_size: 10, //Measured in px
  canvas_width: 1280, //Measured in px
  canvas_height: 720, //Measured in px
  background_color: "#000000" //Hex color
};
