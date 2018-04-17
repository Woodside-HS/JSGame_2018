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

const ui_elements = {
  player_healthbar: {
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
  }
};
