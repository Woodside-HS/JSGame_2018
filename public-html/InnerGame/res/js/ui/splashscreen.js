class SplashScreen extends Updateable {
  constructor(src) {
    this.src = src;
    this.image = null;
    this.isVisible = false;
  }
  init() {

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