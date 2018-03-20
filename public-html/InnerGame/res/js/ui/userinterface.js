class UserInterface extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.minimap = new Minimap(this.game);
    this.buttons=[];
    this.mouseHeld=false;
    this.minionMenu= new Menu(this.game, menu_config.test_menu);
    this.menus=[];
    this.menus.push(this.minionMenu);
    this.cursorMode=null;
    this.selectedMinions=[];
  }
  init() {
    this.minimap.init();
    document.addEventListener("click", this.onclick);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);

    if(config.debug_mode){
      // test button
      let button = new Button(this.game,new Vector2D(20,20),20,20,'res/sprites/water.png','res/sprites/rock.png')
      button.onclick= function(){
        game.player.loc.add(new Vector2D((Math.random()-.5)*100,(Math.random()-.5)*100));
      }
      button.init();
      this.buttons.push(button);
    }
  }
  update() {
    this.minimap.update();
    for(let i=0;i<this.menus.length;i++){
      if(this.menus[i].isOpen){
        this.menus[i].update();
      }
    }
    for(let i=0;i<this.buttons.length;i++){
      this.buttons[i].update();
    }
  }
  render() {
    //for things drawn directly to canvas
    if(this.cursorMode==cursor_modes.moveTo){
      this.game.context.fillStyle = "rgba(255,255,255,1)";
      this.game.context.fillText('+',game.mouseLocation.x-5,game.mouseLocation.y);
    }
    this.minimap.render();
    for(let i=0;i<this.menus.length;i++){
      if(this.menus[i].isOpen){
        this.menus[i].render();
      }
    }
    for(let i=0;i<this.buttons.length;i++){
      this.buttons[i].render();
    }

    //for things that exist on map
    this.game.context.save();
    this.game.context.translate(config.canvas_width / 2, config.canvas_height / 2);
    this.game.context.scale(config.scaling_factor_x, config.scaling_factor_y);
    this.game.context.translate(-this.game.player.loc.x, -this.game.player.loc.y);
    if(game.userInterface.cursorMode == cursor_modes.highlighting) this.dragging();
    this.game.context.restore();

  }
  onclick(){
    if(game.userInterface.cursorMode==cursor_modes.moveTo
      &&game.userInterface.selectedMinions.length>0){
      game.minionManager.sendMinions(game.userInterface.selectedMinions,positionToGrid(game.mouseLocationAbsolute));
    }


    let menus = game.userInterface.menus;
    for(let i=0;i<menus.length;i++){
      if(!menus[i].isMouseOver&&!menus[i].justOpened){
        menus[i].isOpen=false;
        continue;
      }
      menus[i].justOpened=false;
      let buttons = menus[i].buttons;
      for(let j=0;j<menus[i].buttons.length;j++){
        if(menus[i].buttons[j].srcMode) menus[i].buttons[j].onclick();
      }
    }
    let buttons = game.userInterface.buttons;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].srcMode)
      buttons[i].onclick();
    }

    game.userInterface.mouseHeld=false;
  }
  dragging() {
    game.context.fillStyle = 'rgba(255,255,255,.5)'
    let x1 = game.userInterface.hlghtstartloc.x;
    let y1 = game.userInterface.hlghtstartloc.y;
    let w = game.mouseLocationAbsolute.x - game.userInterface.hlghtstartloc.x;
    let h = game.mouseLocationAbsolute.y - game.userInterface.hlghtstartloc.y;
    game.context.fillRect(x1, y1, w, h);
  }
  mousedown() {
    game.userInterface.mouseHeld = true;
    if(!game.userInterface.cursorMode){
      game.userInterface.hlghtstartloc = game.mouseLocationAbsolute.duplicate();
      game.userInterface.cursorMode = cursor_modes.highlighting;
    }
  }
  mouseup(){
    if(config.debug_mode) console.log(game.mapManager.map[positionToGrid(game.mouseLocationAbsolute).x][positionToGrid(game.mouseLocationAbsolute).y])



    if(!game.userInterface.minionMenu.isMouseOver){
    for(let i=0;i<game.userInterface.selectedMinions.length;i++)
      game.userInterface.selectedMinions[i].isSelected=false;
    game.userInterface.selectedMinions=[];
    }

    if(game.userInterface.cursorMode==cursor_modes.highlighting){
      let minions = game.minionManager.minions;
      let didSelect = false;
      for(let i=0;i<minions.length;i++){
        let x1=game.userInterface.hlghtstartloc.x;
        let y1=game.userInterface.hlghtstartloc.y;
        let x2=game.mouseLocationAbsolute.x;
        let y2=game.mouseLocationAbsolute.y;
        let x = minions[i].loc.x;
        let y = minions[i].loc.y;
        if(((x>x1 && x<x2)||(x<x1 && x>x2))
        &&((y>y1 && y<y2)||(y<y1 && y>y2))){
          minions[i].isSelected=true;
          game.userInterface.selectedMinions.push(minions[i]);
          didSelect=true;
        }
      }
      if(didSelect){
        game.userInterface.minionMenu.isOpen=true;
        game.userInterface.minionMenu.justOpened=true;
      }
    }
    game.userInterface.cursorMode=null;
  }
}
