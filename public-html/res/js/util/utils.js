'use strict'

function average(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total / array.length;
}
function pyth(x, y) {
  return Math.sqrt(x * x + y * y);
}
function positionToGrid(vector) {
  return new Vector2D(
          Math.floor(vector.x / CONFIG.TILE_SIZE),
          Math.floor(vector.y / CONFIG.TILE_SIZE)
          );
}
function gridToPositon(vector) {
  return  new Vector2D(
          vector.x * CONFIG.TILE_SIZE,
          vector.y * CONFIG.TILE_SIZE
          );
}
function randIn(min, max) {
  return min + (Math.random() * (max - min));
}
function getRandomColor() {
  let hexcodes = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexcodes[Math.floor(randIn(0, hexcodes.length))];
  }
  return color;
}
function normalizePerlin(value) {
  let SQ2 = Math.sqrt(2);
  let output = value + (SQ2 / 2.0);
  return output / SQ2;
}
