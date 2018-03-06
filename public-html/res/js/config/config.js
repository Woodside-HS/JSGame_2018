'use strict'

const CONFIG = {
  INIT: function () {
    // CONFIG.CANVAS_WIDTH = CONFIG.MAP_X_SIZE * CONFIG.TILE_SIZE;
    // CONFIG.CANVAS_HEIGHT = CONFIG.MAP_Y_SIZE * CONFIG.TILE_SIZE;
    CONFIG.SCALING_FACTOR_X = CONFIG.MAP_X_SIZE/CONFIG.VIEW_RANGE
    CONFIG.SCALING_FACTOR_Y = CONFIG.MAP_Y_SIZE/CONFIG.VIEW_RANGE
  },
  VIEW_RANGE: 20, //measured in tiles
  CANVAS_NAME: "gameCanvas",
  FRAME_RATE: 60, //fps
  MAP_X_SIZE: 60, //measured in tiles
  MAP_Y_SIZE: 60, //measred in tiles
  TILE_SIZE: 10, //Measured in px
  CANVAS_WIDTH: 500, //To be reset later in the file
  CANVAS_HEIGHT: 500 //To be reset later in the file
};
