'use strict'

//haha what's an enum
const tile_types = {
  init: function(){
    tile_types.grass.image.src=tile_types.grass.image_src;
    tile_types.rock.image.src=tile_types.rock.image_src;
    tile_types.water.image.src=tile_types.water.image_src;
  },
  nulltype: {
    minimap_color: "pink",
    is_occupied: false
  },
  grass: {
    minimap_color: "#abdb8a",
    is_occupied: false,
    image_src: 'res/sprites/grass.png',
    image: new Image()
  },
  rock: {
    minimap_color: "brown",
    is_occupied: true,
    image_src: 'res/sprites/rock.png',
    image: new Image()
  },
  water: {
    minimap_color: "blue",
    is_occupied: true,
    is_water: true,
    image_src: 'res/sprites/water.png',
    image: new Image()
  },
  foggy:{
    minimap_color: "grey",
    is_occupied: false,
  }
};
const tile_config = {
  draw_gridlines: false,
  gridline_stroke: 1,
  gridline_color: "black"
};
