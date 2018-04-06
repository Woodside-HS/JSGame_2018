'use strict'

/**A child of vectors with direction features
 * 
 * 
 */
class PathTile extends FastVector {
  constructor(x, y) {
    super(x, y);
    this.direction = directions.null;
  }
}