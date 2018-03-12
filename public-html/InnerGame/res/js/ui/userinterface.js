class UserInterface extends Updateable {
  constructor(game){
    super();
    this.game = game;
    this.minimap = new Minimap(this.game);
    this.buttons=[];
    this.mouseHeld=false;
  }
  init(){
    this.minimap.init();
    document.addEventListener("click", this.onclick);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    // test button
    if(config.debug_mode){
      let button = new Button(this.game,new Vector2D(20,20),20,20,'res/sprites/water.png','res/sprites/rock.png')
      button.onclick= function(){
        game.player.loc.add(new Vector2D((Math.random()-.5)*100,(Math.random()-.5)*100))
      }
      button.init();
      this.buttons.push(button);
    }
  }
  update(){
    this.minimap.update();
    for(var i=0;i<this.buttons.length;i++){
      this.buttons[i].update();
    }
  }
  render(){
    this.minimap.render();
    for(let i=0;i<this.buttons.length;i++){
      this.buttons[i].render();
    }

    //for things that exist on map
    this.game.context.save();
    this.game.context.translate(config.canvas_width / 2, config.canvas_height / 2);
    this.game.context.scale(config.scaling_factor_x, config.scaling_factor_y);
    this.game.context.translate(-this.game.player.loc.x, -this.game.player.loc.y);
    if(this.mouseHeld) this.dragging();
    this.game.context.restore();

  }
  onclick(){
    let buttons = game.userInterface.buttons;
    for(let i=0;i<buttons.length;i++){
      if(buttons[i].srcMode) buttons[i].onclick();
    }
  }
  dragging(){
    game.context.fillStyle='rgba(255,255,255,.5)'
    let x1=game.userInterface.hlghtstartloc.x;
    let y1=game.userInterface.hlghtstartloc.y;
    let w=game.mouseLocationAbsolute.x-game.userInterface.hlghtstartloc.x;
    let h=game.mouseLocationAbsolute.y-game.userInterface.hlghtstartloc.y;
    game.context.fillRect(x1,y1,w,h);
  }
  mousedown(){
    game.userInterface.hlghtstartloc=game.mouseLocationAbsolute.duplicate();
    game.userInterface.mouseHeld=true;
  }
  mouseup(){
    game.userInterface.mouseHeld=false;
    let minions = game.minionManager.minions;
    for(let i=0;i<minions.length;i++){
      let x1=game.userInterface.hlghtstartloc.x;
      let y1=game.userInterface.hlghtstartloc.y;
      let w=game.mouseLocationAbsolute.x-game.userInterface.hlghtstartloc.x;
      let h=game.mouseLocationAbsolute.y-game.userInterface.hlghtstartloc.y;
      let x = minions[i].loc.x;
      let y = minions[i].loc.y;
      if(((x>x1 && x<x1+h)||(x<x1 && x>x1+h))
        &&((x>x1 && x<x1+h)||(x<x1 && x>x1+h))){
          minions[i].isSelected=true;
        } else minions[i].isSelected=false;
    }
  }
}
