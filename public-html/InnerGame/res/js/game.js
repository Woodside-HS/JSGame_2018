'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var game;   // the global game object

function setup() {
  /*
     initalize global config object
     top-level objects that needs to be configured
     when the program starts:: Located in the config folder
  */
  config.init();
  game = new Game();
  game.init();
  game.update();// all logic done at game level
  // call draw according to frame rate
  window.setInterval(draw, 1000 / config.frame_rate);
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
    this.player = new Player(this);
    //  create the canvas
    this.canvas = document.getElementById(config.canvas_name);
    if (!this.canvas)
      throw "No valid canvas found!";
    this.canvas.width = config.canvas_width;
    this.canvas.height = config.canvas_height;
    this.mouseLocationAbsolute = new Vector2D(0, 0);

    //tracks mouse position
    this.canvas.addEventListener("mousemove", this.mouseMove);

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
    //black background over everything
    this.context.fillStyle = config.background_color;
    this.context.fillRect(0, 0, config.canvas_width, config.canvas_height);

    //mini screen translation
    this.context.save();
    this.context.translate(config.canvas_width / 2, config.canvas_height / 2);
    this.context.scale(config.scaling_factor_x, config.scaling_factor_y);
    this.context.translate(-this.player.loc.x, -this.player.loc.y);
    this.mapManager.render();
    this.minionManager.render();
    this.player.render();
    this.context.restore();

    //always static
    this.userInterface.render();

  }
  mouseMove(e) {
    game.mouseLocation = new Vector2D(e.offsetX, e.offsetY)
    //convert to absolute
    game.mouseLocationAbsolute = game.mouseLocation.duplicate();
    game.mouseLocationAbsolute.add(new Vector2D(-config.canvas_width / 2, -config.canvas_height / 2));
    game.mouseLocationAbsolute.x *= 1 / config.scaling_factor_x;
    game.mouseLocationAbsolute.y *= 1 / config.scaling_factor_y;
    game.mouseLocationAbsolute.add(game.player.loc);
  }
}
