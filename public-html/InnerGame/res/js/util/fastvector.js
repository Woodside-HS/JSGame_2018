'use strict'

/**A faster version of InnerVector2D with fewer features. Never do a square root again!
 * 
 * 
 */
class FastVector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }
  multiply(x) {
    this.x *= x;
    this.y *= x;
  }
  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }
  getSquaredMag() {
    return this.x * this.x + this.y * this.y;
  }
  duplicate() {
    return new FastVector(this.x, this.y);
  }
  toInnerVector2D() {
    return new InnerVector2D(this.x, this.y);
  }
}