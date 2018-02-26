'use strict'

const CONFIG = {
  INIT: function () {
    CONFIG.CANVAS_WIDTH = CONFIG.MAP_X_SIZE * CONFIG.TILE_SIZE;
    CONFIG.CANVAS_HEIGHT = CONFIG.MAP_Y_SIZE * CONFIG.TILE_SIZE;
  },
  CANVAS_NAME: "gameCanvas",
  FRAME_RATE: 60, //fps
  MAP_X_SIZE: 50, //measured in tiles
  MAP_Y_SIZE: 50, //measred in tiles
  TILE_SIZE: 15, //Measured in px
  CANVAS_WIDTH: 0, //To be reset later in the file
  CANVAS_HEIGHT: 0, //To be reset later in the file
};
