'use strict'

//haha what's an enum
const tile_types = {
  nulltype: {
    minimap_color: "pink",
    is_occupied: false
  },
  grass: {
    minimap_color: "#abdb8a",
    is_occupied: false,
    image_src: 'res/sprites/grass.png'
  },
  rock: {
    minimap_color: "black",
    is_occupied: true,
    image_src: 'res/sprites/rock.png'
  },
  water: {
    minimap_color: "blue",
    is_occupied: true,
    image_src: 'res/sprites/water.png'
  }
};
const tile_config = {
  draw_gridlines: false,
  gridline_stroke: 1,
  gridline_color: "#000000"
};
