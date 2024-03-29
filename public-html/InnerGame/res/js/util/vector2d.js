'use strict'

class InnerVector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.m = pyth(x, y);
    this.th = Math.atan2(y, x);
  }
  /**Update the components of the vector using its polar definition
   *
   * @returns null
   */
  upComps() {
    this.x = this.m * Math.cos(this.th);
    this.y = this.m * Math.sin(this.th);
  }
  /**Update the polar definition of the vector using its components
   *
   * @returns null
   */
  upPols() {
    this.m = pyth(this.x, this.y);
    this.th = Math.atan2(this.y, this.x);
  }
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.upPols();
  }
  multiply(x) {
    this.x *= x;
    this.y *= x;
    this.upPols();
  }
  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.upPols();
  }
  project(vec) {
    this.th = vec.th;
    this.m = this.x * vec.x + this.y * vec.y;
    this.upComps();
  }
  duplicate() {
    return new InnerVector2D(this.x, this.y);
  }
  toFastVector() {
    return new FastVector(this.x, this.y);
  }
}
