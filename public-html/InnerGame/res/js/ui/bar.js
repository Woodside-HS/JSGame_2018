'use strict'

class Bar extends Updateable {
  constructor(game, data) {
    super();
    this.game = game;
    this.data = data;
    this.trackValue = 1;
    this.direction = null;
  }
  init() {
    this.direction = this.data.points[2].toFastVector();
    this.direction.substract(this.data.points[1]);
  }
  update() {
    this.trackValue = this.data.object[this.data.tracker] / this.data.max_value;
  }
  render() {
    this.game.context.fillStyle = this.data.negative_color;
    this.game.context.beginPath();
    this.game.context.moveTo(this.data.points[0].x, this.data.points[0].y);
    for (let i = 0; i < this.data.points.length; i++) {
      this.game.context.lineTo(this.data.points[i].x, this.data.points[i].y);
    }
    this.game.context.lineTo(this.data.points[0].x, this.data.points[0].y);
    this.game.context.fill();

    /*this.game.context.fillStyle = this.data.positive_color;
     this.game.context.beginPath();
     this.game.context.moveTo(this.data.points[0].x, this.data.points[0].y);
     for (let i = 0; i < this.data.points.length; i++) {
     if (i < 2) {
     this.game.context.lineTo(this.data.points[i].x, this.data.points[i].y);
     } else {
     let scaledValue = this.data.points[3].duplicate();
     scaledValue.multiply(this.trackValue);
     
     }
     }
     this.game.context.fill();*/
  }
}