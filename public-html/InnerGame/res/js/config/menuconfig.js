const menu_config = {
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
  }
}
