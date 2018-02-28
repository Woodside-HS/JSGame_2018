'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var game;   // the global game object
var frameRate = 60;

function setup() {
  CONFIG.INIT();
  game = new Game();
  game.init();
  game.update();
  window.setInterval(draw, 1000 / frameRate);
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
    //  create the canvas
    this.canvas = document.getElementById(CONFIG.CANVAS_NAME);
    if (!this.canvas)
      throw "No valid canvas found!";
    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;
    this.canvas.click = function(e) {
      let mouseclocx = Math.floor(e.offsetX/CONFIG.TILE_SIZE);
      let mouseclocy = Math.floor(e.offsetX/CONFIG.TILE_SIZE);
      game.mapManager.towermanager.towers[mouseclocx][mouseclocy]= new Tower(game,new Vector2D(mouseclocx,mouseclocy));
    }

    //  create the context
    this.context = this.canvas.getContext("2d");
    if (!this.context)
      throw "No valid context found!";

  }
  init() {
    this.mapManager.init();
  }
  update() {
    this.mapManager.update();
  }
  render() {
    this.mapManager.render();
  }

}
