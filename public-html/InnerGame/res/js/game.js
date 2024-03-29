'use strict'

// window.addEventListener('load', setup, false);
//
var game;
//
// /**Called once at the beginning of the game. Never called again.
//  * May be reused as setup for the Innergame alone.
//  * @returns void
//  */
// function setup() {
//   config.init();
//   game = new Game();
//   game.init();
//   // call draw according to frame rate
//   window.setInterval(draw, 1000 / config.frame_rate);
// }
//
// /**Called at every frame. Nothing else should be here other than update and render
//  *
//  * @returns void
//  */
// function draw() {
//   game.update();
//   game.render();
// }

/**The top level object. Don't add code to it unless you have to.
 *
 * @type Game
 */
class Game extends Updateable {
  constructor() {   // from setup()
    super();
    this.isPaused = false;
    this.planet = null;//to be overwritten later

    //managers and such
    this.mapManager = new MapManager(this);
    this.minionManager = new MinionManager(this);
    this.player = new Player(this);
    this.mask = new Mask(this);
    this.userInterface = new UserInterface(this);
    //  create the canvas
    this.canvas = canvas;
    if (!this.canvas)
      throw "No valid canvas found!";
    this.canvas.width = config.canvas_width;
    this.canvas.height = config.canvas_height;
    this.mouseLocationAbsolute = new InnerVector2D(0, 0);

    //tracks mouse position
    this.canvas.addEventListener("mousemove", this.mouseMove);

    //  create the context
    this.context = this.canvas.getContext("2d");
    if (!this.context)
      throw "No valid context found!";

  }
  init() {
    config.init();
    this.mapManager.init();
    this.minionManager.init();
  }
  startup(){//things that need to be called on start
    this.player.init();
    this.userInterface.init();
    this.mask.init();
  }
  update() {
    //update mouse location
    if (this.mouseLocation)
      this.mouseLocationAbsolute = convertToAbs(this.mouseLocation);

    //map, minion, and player behavior can be paused
    if (!this.isPaused) {
      this.mapManager.update();
      this.minionManager.update();
      this.player.update();
      this.mask.update();
    }

    this.userInterface.update();
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

    //translated bits
    this.mapManager.render();
    this.minionManager.render();
    this.player.render();
    this.mask.render();

    //return to normal
    this.context.restore();

    //always static
    this.userInterface.render();

    //cursor
    if(this.mouseLocation){
      this.context.fillStyle = 'rgba(0,0,200,1)'
      this.context.fillRect(this.mouseLocation.x-2,this.mouseLocation.y-2,4,4)
    }

    // if debug mode, display the observed frames per second
    if (config.debug_mode) {
        // borrowed from outer game
        var ctx = this.context;
        ctx.fillStyle = "white";
        ctx.font = "20px Georgia";
        ctx.fillText("FPS:" + realFPS, 20, 200);

    }
  }
  mouseMove(e) {
    if(!game) return;
    game.mouseLocation = new InnerVector2D(e.offsetX, e.offsetY)
    //convert to absolute
    game.mouseLocationAbsolute = convertToAbs(game.mouseLocation.duplicate());
  }
}
