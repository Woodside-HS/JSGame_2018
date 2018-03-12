'use strict'

/**Return the mean value of an array of numbers.
 * 
 * @param {Array} array - the array of values to be averaged
 * @returns {Number} the average value of array
 */
function average(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return total / array.length;
}

/**Return the magnitude of a triangle using its Cartesian components via the Pythagoran theorem
 * 
 * @param {Number} x the x-leg of the triangle
 * @param {Number} y the y-leg of the triangle
 * @returns {Number} the length
 */
function pyth(x, y) {
  return Math.sqrt(x * x + y * y);
}

/**Convert a relative canvas position to an integral grid location vector
 * 
 * @param {Vector2D or FastVector} vector - the location in pixels from the top left corner
 * @returns {Vector2D} the location of the point in terms of [i][j]
 */
function positionToGrid(vector) {
  return new Vector2D(
          Math.floor(vector.x / config.tile_size),
          Math.floor(vector.y / config.tile_size)
          );
}

/**Convert an integral grid location vector to its relative canvas position. 
 * 
 * @param {Vector2D or FastVector} vector - the location of the point in terms of [i][i]
 * @returns {Vector2D} the location of the point in pixels from the top left corner
 */
function gridToPositon(vector) {
  return  new Vector2D(
          vector.x * config.tile_size,
          vector.y * config.tile_size
          );
}

/**Return a random value between the two listed values. Min-inclusive.
 * 
 * @param {Number} min - lower bound of random value
 * @param {Number} max - upper bound of random value
 * @returns {Number} a random value
 */
function randIn(min, max) {
  return min + (Math.random() * (max - min));
}

/**Returns a random hex color string
 * 
 * @returns {String} hex color
 */
function getRandomColor() {
  let hexcodes = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexcodes[Math.floor(randIn(0, hexcodes.length))];
  }
  return color;
}

/**Return the square of the distance between two vectors
 * 
 * @param {Vector2D or FastVector} v1
 * @param {Vector2D or FastVector} v2
 * @returns {Number} the distance between the two
 */
function distsqrd(v1,v2){
  return Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2);
}

/**Normalize a Perlin noise function to be between 0 and 1
 * 
 * @param {Number} value - the value returned by the Perlin function
 * @returns {Number} the normal version of value
 */
function normalizePerlin(value) {
  let SQ2 = Math.sqrt(2);
  let output = value + (SQ2 / 2.0);
  return output / SQ2;
}
