'use strict'

//haha what's an enum
const TILE_TYPES = {
  NULL: {
    MINIMAP_COLOR:"pink",
    IS_OCCUPIED:false
  },
  GRASS: {
    MINIMAP_COLOR: "#abdb8a",
    IS_OCCUPIED:false
  },
  ROCK: {
    MINIMAP_COLOR: "black",
    IS_OCCUPIED:true
  },
  WATER: {
    MINIMAP_COLOR: "blue",
    IS_OCCUPIED:true
  }
};
const TILE_CONFIG = {
  DRAW_GRIDLINES: false//TBD: implement this
};
