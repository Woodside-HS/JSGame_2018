'use strict'

const ui_config = {
  minimap_tile_size: 1,
  minimap_border_stroke: 3,
  minimap_border_color: "#FFFFFF"
};
 const cursor_modes = {
   highlighting:'highlighting',
   moveTo:'moveTo'
 };
 
 const ui_elements = {
   minion_menu:{
    src:'res/sprites/water.png',
    loc: new Vector2D(0,100),
    width:100,
    height:100,
    buttons: [
      {
        src0:'res/sprites/grass.png',
        src1:'res/sprites/rock.png',
        loc: new Vector2D(20,125),
        width:20,
        height:20,
        onclick: function(){
          game.userInterface.cursorMode=cursor_modes.moveTo;
        }
      },
      {
        src0:'res/sprites/grass.png',
        src1:'res/sprites/rock.png',
        loc: new Vector2D(20,155),
        width:20,
        height:20,
        onclick: function(){
          game.userInterface.setFollowers();
        }
      }
    ]
  },
  player_healthbar:{
    positive_color: "#31d628",
    negative_color: "red",
    max_value: player_config.max_hp,
    object: null,//Will be reset in UserInterface.init()
    tracker: "hp",
    points: [
      new FastVector(30,20),
      new FastVector(20,30),
      new FastVector(200, 30),
      new FastVector(210, 20)
    ],
    border_stroke: 2,
    border_color: "#ffffff"
  }
 };
