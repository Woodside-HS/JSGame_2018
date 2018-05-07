class SplashScreen extends Updateable {
  constructor(game, data) {
    super();
    this.game=game;
    this.data = data;
    this.src = data.src;
    this.image = null;
  }
  init() {
    // this.image = new Image(config.canvas_width, config.canvas_height);
    // this.image.src = this.src;
    // issue 118 dont load this image every time
    this.image = Images.splash;
  }
  update(){
    this.data.update();
  }
  render() {
    if (this.data.isVisible) {
      this.game.context.drawImage(
              this.image,
              0,
              0,
              config.canvas_width,
              config.canvas_height
              );
    }
  }
}
