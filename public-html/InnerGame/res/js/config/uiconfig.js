'use strict'

const ui_config = {
  minimap_tile_size: 1,
  minimap_border_stroke: 3,
  minimap_border_color: "#FFFFFF",
  dragging_color: 'rgba(255,255,255,.5)'
};
const cursor_modes = {
  highlighting: 'highlighting',
  moveTo: 'moveTo'
};
//haha what's an enum
const element_types = {
  bar: "bar",
  splash_screen: "splash",
  button: "button"
};
const ui_elements = {
  player_healthbar: {
    type: element_types.bar,
    positive_color: "#31d628",
    negative_color: "red",
    max_value: player_config.max_hp,
    object: null, //Will be reset in UserInterface.init()
    tracker: "hp",
    points: [
      new FastVector(30, 20),
      new FastVector(20, 30),
      new FastVector(200, 30),
      new FastVector(210, 20)
    ],
    border_stroke: 2,
    border_color: "#ffffff"
  },
  death_screen: {
    type: element_types.splash_screen,
    src: "../../sprites/grass.png",
    update: function(){
      
    }
  }
};
