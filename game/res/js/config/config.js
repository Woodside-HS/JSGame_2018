const CONFIG = {
  INIT: function(){
    CONFIG.CANVAS_WIDTH = CONFIG.MAP_X_SIZE * CONFIG.TILE_SIZE;
    CONFIG.CANVAS_HEIGHT = CONFIG.MAP_Y_SIZE * CONFIG.TILE_SIZE;
  },
  CANVAS_NAME: "gameCanvas",
  FRAME_RATE: 60, //fps
  MAP_X_SIZE: 30,//measured in tiles
  MAP_Y_SIZE: 30,//measred in tiles
  TILE_SIZE: 30, //Measured in px
  CANVAS_WIDTH: 0, //To be reset later in the file
  CANVAS_HEIGHT: 0, //To be reset later in the filE
  GOAL_TILES:[//array of vectors correlating to goal x and y
    new Vector2D(0,0),
  ],
  BALL_RAD: 8,//measured in px
  BALL_COUNT: 1000,//number of total balls
  TILE_ACCELERATION: 5,//force applied by tiles, px/f^2
  LIMIT_VELOCITY: 7,//max ball speed, px/f
  DRAW_ARROWS: true//add those neat little arrows
};
