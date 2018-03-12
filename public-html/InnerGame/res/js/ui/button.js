
'use strict'

class Button extends Updateable {
  constructor(game, location, width, height, src0, src1) {
    super();
    this.game = game;
    this.loc = location;
    this.width = width;
    this.height = height;
    this.src0 = src0;
    this.src1 = src1;
    this.srcMode = false;
    this.image0 = new Image();
    this.image0.src = src0;
    this.image1 = new Image();
    this.image1.src = src1;
  }
  init() {
  }
  update() {
    if (this.game.mouseLocation) {
      if (this.game.mouseLocation.x > this.loc.x && this.game.mouseLocation.x < this.loc.x + this.width
              && this.game.mouseLocation.y > this.loc.y && this.game.mouseLocation.y < this.loc.y + this.height) {
        this.srcMode = true;
      } else
        this.srcMode = false;
    }
  }
  render() {
    if (this.srcMode) {
      this.game.context.drawImage(this.image0, this.loc.x, this.loc.y, this.width, this.height);
    } else
      this.game.context.drawImage(this.image1, this.loc.x, this.loc.y, this.width, this.height);
  }
}
