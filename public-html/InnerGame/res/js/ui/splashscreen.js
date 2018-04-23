class SplashScreen extends Updateable {
  constructor(src) {
    this.src = src;
    this.image = null;
    this.isVisible = false;
  }
  init() {
    this.image = new Image(config.canvas_width, config.canvas_height);
    this.image.src = this.src;
  }
  render() {
    if (this.isVisible) {
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