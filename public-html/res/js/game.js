'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var game;   // the global game object

function setup() {
  CONFIG.INIT();
  game = new Game();
  game.init();
  game.update();
  window.setInterval(draw, 1000 / CONFIG.FRAME_RATE);
}

function draw() {   // the animation loop
  game.update();
  game.render();
}

// Game is the top level object
class Game extends Updateable {
  constructor() {   // from setup()
    super();
    this.mapManager = new MapManager(this);
    this.minionManager = new MinionManager(this);
    this.userInterface = new UserInterface(this);
    //  create the canvas
    this.canvas = document.getElementById(CONFIG.CANVAS_NAME);
    if (!this.canvas)
      throw "No valid canvas found!";
    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;
    var mouselocx;
    var mouselocy;
    var mouseclocx;
    var mouseclocy;
    //tracks mouse position
    this.canvas.onmousemove = function(e) {
      mouselocx = e.offsetX;
      mouselocy = e.offsetY;
      mouseclocx = Math.floor(e.offsetX/CONFIG.TILE_SIZE);
      mouseclocy = Math.floor(e.offsetY/CONFIG.TILE_SIZE);
    }

    //for debugging purposes, places objects on keypress
    // document.onkeypress = function(e) {
    //   let key = String.fromCharCode(e.keyCode);
    //   console.log(key);
    //   switch(key){
    //     case 'q':
    //     console.log(new Vector2D(mouselocx,mouselocy));
    //     game.minionManager.minions.push(new Minion(game,new Vector2D(mouselocx,mouselocy)));
    //     break;
    //     case 'w':
    //     game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Tower(game,new Vector2D(mouseclocx,mouseclocy));
    //     break;
    //     case'e':
    //     game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Sniper(game,new Vector2D(mouseclocx,mouseclocy));
    //     break;
    //     case'r':
    //     game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Repeater(game,new Vector2D(mouseclocx,mouseclocy));
    //     break;
    //   }
    // }

    //  create the context
    this.context = this.canvas.getContext("2d");
    if (!this.context)
      throw "No valid context found!";

  }
  init() {
    this.mapManager.init();
    this.minionManager.init();
    this.userInterface.init();

  }
  update() {
    this.mapManager.update();
    this.minionManager.update();
    this.userInterface.update();

  }
  render() {
    this.mapManager.render();
    this.minionManager.render();
    this.userInterface.render();

  }

}
