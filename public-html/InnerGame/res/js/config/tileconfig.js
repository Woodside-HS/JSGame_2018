'use strict'

//haha what's an enum
const tile_types = {
  init: function () {
    tile_types.grass.image.src = tile_types.grass.image_src;
    tile_types.rock.image.src = tile_types.rock.image_src;
    tile_types.water.image.src = tile_types.water.image_src;
  },
  nulltype: {
    minimap_color: new Color("pink"), //Color object
    is_occupied: false
  },
  grass: {
    minimap_color: new Color("#5ca33c"), //Color object
    is_occupied: false,
    image_src: '../InnerGame/res/sprites/grass.png',
    image: new Image()
  },
  rock: {
    minimap_color: new Color("#696e75"), //Color object
    is_occupied: true,
    image_src: '../InnerGame/res/sprites/rocks2c.png',
    image: new Image()
  },
  water: {
    minimap_color: new Color("#5ae1fc"), //Color object
    is_occupied: true,
    image_src: '../InnerGame/res/sprites/water.png',
    image: new Image()
  }
};
const tile_config = {
  gridline_stroke: 1,
  gridline_color: "#000000"
};
