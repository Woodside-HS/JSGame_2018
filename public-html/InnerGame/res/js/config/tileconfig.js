'use strict'

//haha what's an enum
const TILE_TYPES = {
  NULL: {
    MINIMAP_COLOR:"pink",
    IS_OCCUPIED:false
  },
  GRASS: {
    MINIMAP_COLOR: "#abdb8a",
    IS_OCCUPIED:false,
    IMAGE_SRC:'res/sprites/grass.png'
  },
  ROCK: {
    MINIMAP_COLOR: "black",
    IS_OCCUPIED:true,
    IMAGE_SRC:'res/sprites/rock.png'
  },
  WATER: {
    MINIMAP_COLOR: "blue",
    IS_OCCUPIED:true,
    IMAGE_SRC:'res/sprites/water.png'
  }
};
const TILE_CONFIG = {
  DRAW_GRIDLINES: false//TBD: implement this
};
