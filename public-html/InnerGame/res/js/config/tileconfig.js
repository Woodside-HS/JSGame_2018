'use strict'

//haha what's an enum
const TILE_TYPES = {
  NULL: {
    minimap_color:"pink",
    IS_OCCUPIED:false
  },
  GRASS: {
    minimap_color: "#abdb8a",
    IS_OCCUPIED:false,
    IMAGE_SRC:'res/sprites/grass.png'
  },
  ROCK: {
    minimap_color: "black",
    IS_OCCUPIED:true,
    IMAGE_SRC:'res/sprites/rock.png'
  },
  WATER: {
    minimap_color: "blue",
    IS_OCCUPIED:true,
    IMAGE_SRC:'res/sprites/water.png'
  }
};
const TILE_CONFIG = {
  DRAW_GRIDLINES: false//TBD: implement this
};
