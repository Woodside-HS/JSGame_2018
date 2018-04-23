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
    init: function(){
      this.object = game.player;
    },
    positive_color: "#31d628",
    negative_color: "red",
    max_value: player_config.max_hp,
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
  energy_meter: {
    type: element_types.bar,
    init: function(){
      this.object = game.player;
    },
    positive_color: "yellow",
    negative_color: "blue",
    max_value: player_config.max_energy,
    tracker: "energy",
    points: [
      new FastVector(25, 40),
      new FastVector(20, 45),
      new FastVector(100, 45),
      new FastVector(105, 40)
    ],
    border_stroke: 2,
    border_color: "#ffffff"
  },
  death_screen: {
    type: element_types.splash_screen,
    src: "../../sprites/grass.png",//temp for testing
    update: function(){
      
    }
  }
};
