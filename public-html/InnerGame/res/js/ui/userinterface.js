class UserInterface extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.minimap = new Minimap(this.game);
    this.buttons = [];
    this.mouseHeld = false;
    this.menus = [];
    this.cursorMode = null;
    this.selectedMinions = [];
    this.bars = [];
  }
  init() {
    document.addEventListener("click", this.onclick);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
    let playerHealthbar = new Bar(this.game, ui_elements.player_healthbar);
    playerHealthbar.data.object = this.game.player;
    this.bars.push(playerHealthbar);
    this.minimap.init();
  }
  update() {
    this.minimap.update();
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].isOpen) {
        this.menus[i].update();
      }
    }
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].update();
    }
    for (let i = 0; i < this.bars.length; i++) {
      this.bars[i].update();
    }
  }
  render() {
    //for things drawn directly to canvas
    if (this.cursorMode == cursor_modes.moveTo) {
      this.game.context.fillStyle = "rgba(255,255,255,1)";
      this.game.context.fillText('+', game.mouseLocation.x - 5, game.mouseLocation.y);
    }
    this.minimap.render();
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].isOpen) {
        this.menus[i].render();
      }
    }
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].render();
    }
    for (let i = 0; i < this.bars.length; i++) {
      this.bars[i].render();
    }

    //for things that exist on map
    this.game.context.save();
    this.game.context.translate(config.canvas_width / 2, config.canvas_height / 2);
    this.game.context.scale(config.scaling_factor_x, config.scaling_factor_y);
    this.game.context.translate(-this.game.player.loc.x, -this.game.player.loc.y);
    if (game.userInterface.cursorMode == cursor_modes.highlighting)
      this.dragging();
    this.game.context.restore();

  }
  onclick() {
    game.userInterface.cursorMode = null;



    let menus = game.userInterface.menus;
    for (let i = 0; i < menus.length; i++) {
      if (!menus[i].isMouseOver && !menus[i].justOpened) {
        menus[i].isOpen = false;
        continue;
      }
      menus[i].justOpened = false;
      let buttons = menus[i].buttons;
      for (let j = 0; j < menus[i].buttons.length; j++) {
        if (menus[i].buttons[j].srcMode)
          menus[i].buttons[j].onclick();
      }
    }
    let buttons = game.userInterface.buttons;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].srcMode)
        buttons[i].onclick();
    }

    game.userInterface.mouseHeld = false;
  }
  dragging() {
    game.context.fillStyle = ui_config.dragging_color;
    let x1 = game.userInterface.hlghtstartloc.x;
    let y1 = game.userInterface.hlghtstartloc.y;
    let w = game.mouseLocationAbsolute.x - game.userInterface.hlghtstartloc.x;
    let h = game.mouseLocationAbsolute.y - game.userInterface.hlghtstartloc.y;
    game.context.fillRect(x1, y1, w, h);
  }
  mousedown() {
    game.userInterface.mouseHeld = true;
    if (!game.userInterface.cursorMode) {
      game.userInterface.hlghtstartloc = game.mouseLocationAbsolute.duplicate();
      game.userInterface.cursorMode = cursor_modes.highlighting;
    }
  }
  mouseup() {
  }
  docKeyDown(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case '': //shift key
        game.minionManager.followMouse = true;
        break;
    }
  }

  docKeyUp(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case '': //shift key
        game.minionManager.followMouse = false;
        break;
    }
  }
}
