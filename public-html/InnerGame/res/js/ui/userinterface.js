class UserInterface extends Updateable {
  constructor(game){
    super();
    this.game = game;
    this.minimap = new Minimap(this.game);
    this.buttons=[];
  }
  init(){
    this.minimap.init();
    document.addEventListener("click", this.onclick);

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
  }
  onclick(){
    let buttons = game.userInterface.buttons;
    for(let i=0;i<buttons.length;i++){
      if(buttons[i].srcMode) buttons[i].onclick();
    }
  }
}
