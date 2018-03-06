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
    this.player = new Player(this,new Vector2D(200,200));
    //  create the canvas
    this.canvas = document.getElementById(CONFIG.CANVAS_NAME);
    if (!this.canvas)
      throw "No valid canvas found!";
    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;

    //tracks mouse position
    var mouselocx;
    var mouselocy;
    var mouseclocx;
    var mouseclocy;
    this.canvas.onmousemove = function(e) {
      mouselocx = e.offsetX;
      mouselocy = e.offsetY;
      //translate to absolute
      mouselocx += -CONFIG.CANVAS_WIDTH/2;
      mouselocy += -CONFIG.CANVAS_HEIGHT/2;
      mouselocx = mouselocx/CONFIG.SCALING_FACTOR_X;
      mouselocy = mouselocy/CONFIG.SCALING_FACTOR_Y;
      mouselocx += game.player.loc.x
      mouselocy += game.player.loc.y
      mouseclocx = Math.floor(mouselocx/CONFIG.TILE_SIZE);
      mouseclocy = Math.floor(mouselocy/CONFIG.TILE_SIZE);
    }

    // //for debugging purposes, places objects on keypress

    //  create the context
    this.context = this.canvas.getContext("2d");
    if (!this.context)
      throw "No valid context found!";

  }
  init() {
    this.mapManager.init();
    this.minionManager.init();
    this.userInterface.init();
    this.player.init();
  }
  update() {
    this.mapManager.update();
    this.minionManager.update();
    this.userInterface.update();
    this.player.update();
  }
  render() {
    //black background
    this.context.fillStyle='rgba(0,0,0,1)';
    this.context.fillRect(0,0,CONFIG.CANVAS_WIDTH,CONFIG.CANVAS_HEIGHT);

    //mini screen translation
    this.context.save();
    this.context.translate(CONFIG.CANVAS_WIDTH/2,CONFIG.CANVAS_HEIGHT/2);
    this.context.scale(CONFIG.SCALING_FACTOR_X,CONFIG.SCALING_FACTOR_Y);
    this.context.translate(-this.player.loc.x,-this.player.loc.y);
    this.mapManager.render();
    this.minionManager.render();
    this.player.render();
    this.context.restore();

    //always static
    this.userInterface.render();

  }

}
