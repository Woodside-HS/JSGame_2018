class UserInterface extends Updateable {
  constructor(game){
    super();
    this.game = game;
    this.minimap = new Minimap(this.game);
  }
  init(){
    this.minimap.init();
  }
  update(){
    this.minimap.update();
  }
  render(){
    this.minimap.render();
  }
}