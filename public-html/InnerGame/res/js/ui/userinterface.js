class UserInterface extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.minimap = new Minimap(this.game);
    this.buttons = [];
    this.mouseHeld = false;
    this.minionMenu = new Menu(this.game, ui_elements.minion_menu);
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
    this.menus.push(this.minionMenu);
    if (config.debug_mode) {
      // test button
      let button = new Button(this.game, new Vector2D(20, 20), 20, 20, 'res/sprites/water.png', 'res/sprites/rock.png')
      button.onclick = function () {
        game.player.loc.add(new Vector2D((Math.random() - .5) * 100, (Math.random() - .5) * 100));
      }
      button.init();
      this.buttons.push(button);
    }
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
  setFollowers() {
    for (let i = 0; i < this.selectedMinions.length; i++) {
      let minion = this.selectedMinions[i];
      minion.followMode = true;
      minion.isSelected = false;
    }
    this.selectedMinions = [];
  }
  onclick() {
    if (game.userInterface.cursorMode == cursor_modes.moveTo
            && game.userInterface.selectedMinions.length > 0) {
      game.minionManager.sendMinions(game.userInterface.selectedMinions, positionToGrid(game.mouseLocationAbsolute));
      for (let i = 0; i < game.userInterface.selectedMinions.length; i++) {
        game.userInterface.selectedMinions[i].followMode = false;
        game.userInterface.selectedMinions[i].isSelected = false;
      }
      game.userInterface.selectedMinions = [];
    }
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
    game.context.fillStyle = 'rgba(255,255,255,.5)'
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
    if (!game.userInterface.minionMenu.isMouseOver && game.userInterface.cursorMode == cursor_modes.highlighting) {
      for (let i = 0; i < game.userInterface.selectedMinions.length; i++)
        game.userInterface.selectedMinions[i].isSelected = false;
      game.userInterface.selectedMinions = [];
    }



    if (game.userInterface.cursorMode == cursor_modes.highlighting) {
      let minions = game.minionManager.minions;
      let didSelect = false;
      for (let i = 0; i < minions.length; i++) {
        let x1 = game.userInterface.hlghtstartloc.x;
        let y1 = game.userInterface.hlghtstartloc.y;
        let x2 = game.mouseLocationAbsolute.x;
        let y2 = game.mouseLocationAbsolute.y;
        let x = minions[i].loc.x;
        let y = minions[i].loc.y;
        if (((x > x1 && x < x2) || (x < x1 && x > x2))
                && ((y > y1 && y < y2) || (y < y1 && y > y2))) {
          minions[i].isSelected = true;
          game.userInterface.selectedMinions.push(minions[i]);
          didSelect = true;
        }
      }
      if (didSelect) {
        game.userInterface.minionMenu.isOpen = true;
        game.userInterface.minionMenu.justOpened = true;
      }
    }
  }
  docKeyDown(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case ' ':
        if (game.minionManager.minions.length < minion_config.limit)
          game.minionManager.spawnMinion();
        break;
    }
  }

  docKeyUp(e) {
  }
}
