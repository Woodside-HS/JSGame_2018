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
    this.player = new Player(this,new Vector2D(50,50));
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
      mouseclocx = Math.floor(e.offsetX/CONFIG.TILE_SIZE);
      mouseclocy = Math.floor(e.offsetY/CONFIG.TILE_SIZE);
    }

    // //for debugging purposes, places objects on keypress
    document.onkeypress = function(e) {
      let key = String.fromCharCode(e.keyCode);
      switch(key){
        case 'q':
        game.minionManager.minions.push(new Minion(game,new Vector2D(mouselocx,mouselocy)));
        break;
        case '1':
        game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Tower(game,new Vector2D(mouseclocx,mouseclocy));
        break;
        case'2':
        game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Sniper(game,new Vector2D(mouseclocx,mouseclocy));
        break;
        case'3':
        game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Repeater(game,new Vector2D(mouseclocx,mouseclocy));
        break;
        case'4':
        game.mapManager.towermanager.towers[mouseclocx][mouseclocy] = new Spitter(game,new Vector2D(mouseclocx,mouseclocy));
        break;
      }
      switch(key){
        case 'w':
        if(game.player.v.y!=-1)
          game.player.v.y=-1;
        break;
        case 'a':
        if(game.player.v.x!=-1)
          game.player.v.x=-1;
        break;
        case's':
        if(game.player.v.y!=1)
          game.player.v.y=1;
        break;
        case'd':
        if(game.player.v.x!=1)
          game.player.v.x=1;
        break;
        default:
        game.player.v=new Vector2D(0,0);
      }
    }

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
    //mini screen translation
    this.context.save();
    this.context.translate(-this.player.loc.x+CONFIG.CANVAS_WIDTH/2,-this.player.loc.y+CONFIG.CANVAS_HEIGHT/2);
    this.mapManager.render();
    this.minionManager.render();
    this.player.render();
    this.context.restore();

    //always static
    this.userInterface.render();

  }

}
