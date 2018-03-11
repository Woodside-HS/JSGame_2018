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
          Math.floor(vector.x / config.tile_size),
          Math.floor(vector.y / config.tile_size)
          );
}
function gridToPositon(vector) {
  return  new Vector2D(
          vector.x * config.tile_size,
          vector.y * config.tile_size
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
function distsqrd(v1,v2){
  return Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2);
}
function normalizePerlin(value) {
  let SQ2 = Math.sqrt(2);
  let output = value + (SQ2 / 2.0);
  return output / SQ2;
}
