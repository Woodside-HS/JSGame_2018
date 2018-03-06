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
    this.mouseLocation = new Vector2D(0,0);
    //tracks mouse position
    this.canvas.onmousemove = function(e) {
      game.mouseLocation.x = e.offsetX;
      game.mouseLocation.y = e.offsetY;
    };


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
