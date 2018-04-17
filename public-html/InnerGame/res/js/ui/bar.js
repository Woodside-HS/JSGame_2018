'use strict'

class Bar extends Updateable {
  constructor(game, data) {
    super();
    this.game = game;
    this.data = data;
    this.trackValue = 1;
  }
  update() {
    this.trackValue = this.data.object[this.data.tracker] / this.data.max_value;
  }
  render() {
    //Draw border
    this.game.context.strokeStyle = this.data.border_color;
    this.game.context.lineWidth = 2 * this.data.border_stroke;
    this.game.context.beginPath();
    this.game.context.moveTo(this.data.points[0].x, this.data.points[0].y);
    for (let i = 0; i < this.data.points.length; i++) {
      this.game.context.lineTo(this.data.points[i].x, this.data.points[i].y);
    }
    this.game.context.lineTo(this.data.points[0].x, this.data.points[0].y);
    this.game.context.lineTo(this.data.points[1].x, this.data.points[1].y);
    this.game.context.stroke();

    //Draw negative
    this.game.context.fillStyle = this.data.negative_color;
    this.game.context.beginPath();
    this.game.context.moveTo(this.data.points[0].x, this.data.points[0].y);
    for (let i = 0; i < this.data.points.length; i++) {
      this.game.context.lineTo(this.data.points[i].x, this.data.points[i].y);
    }
    this.game.context.lineTo(this.data.points[0].x, this.data.points[0].y);
    this.game.context.fill();


    //Draw positive
    this.game.context.fillStyle = this.data.positive_color;
    this.game.context.beginPath();
    this.game.context.moveTo(this.data.points[0].x, this.data.points[0].y);
    for (let i = 0; i < this.data.points.length; i++) {
      if (i < 2) {
        this.game.context.lineTo(this.data.points[i].x, this.data.points[i].y);
      } else if (i === 2) {
        let scaledValue = this.data.points[i].duplicate();
        scaledValue.subtract(this.data.points[i - 1]);
        scaledValue.multiply(this.trackValue);
        scaledValue.add(this.data.points[i - 1]);
        this.game.context.lineTo(scaledValue.x, scaledValue.y);
      } else {
        let scaledValue = this.data.points[i].duplicate();
        scaledValue.subtract(this.data.points[i - 3]);
        scaledValue.multiply(this.trackValue);
        scaledValue.add(this.data.points[i - 3]);
        this.game.context.lineTo(scaledValue.x, scaledValue.y);
      }
    }
    this.game.context.lineTo(this.data.points[0].x, this.data.points[0].y);
    this.game.context.fill();
  }
}