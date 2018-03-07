'use strict'

const CONFIG = {
  INIT: function () {
    CONFIG.SCALING_FACTOR_X = CONFIG.MAP_X_SIZE/CONFIG.VIEW_RANGE;
    CONFIG.SCALING_FACTOR_Y = CONFIG.MAP_Y_SIZE/CONFIG.VIEW_RANGE;
  },
  DEBUG_MODE: true,
  VIEW_RANGE: 40, //measured in tiles
  CANVAS_NAME: "gameCanvas",
  FRAME_RATE: 60, //fps
  MAP_X_SIZE: 100, //measured in tiles
  MAP_Y_SIZE: 100, //measred in tiles
  TILE_SIZE: 10, //Measured in px
  CANVAS_WIDTH: 700, //Measured in px
  CANVAS_HEIGHT: 700 //Measured in px
};
