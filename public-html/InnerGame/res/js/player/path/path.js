'use strict'

class Path {
  constructor(start, target) {
    this.start = new PathTile(start.x, start.y); //CLoc vector
    this.target = new PathTile(target.x, target.y); //CLoc vector
    this.map = [];
  }
  /**Set the clocs array to a list of tiles via the A* algorithm,
   * 
   * @returns void
   */
  aStar() {

  }
  /**Set the clocs array to a list of tiles via Dijkstra's method.
   * 
   * @returns void
   */
  dijkstra() {
    let open = [this.target];
    let closed = [];
    while (open.length >= 0) {
      for (let i = open.length - 1; i-- > -1; ) {
        let point = open[i];
        this.setTile(open, point, directions.north);
        this.setTile(open, point, directions.northeast);
        this.setTile(open, point, directions.northwest);
        this.setTile(open, point, directions.south);
        this.setTile(open, point, directions.southeast);
        this.setTile(open, point, directions.southwest);
        this.setTile(open, point, directions.east);
        this.setTile(open, point, directions.west);
        open.splice(i, 1);
        closed.push(open);
      }
    }
  }
  setTile(open, point, direction) {
    let tile = new PathTile(point.x + direction.x, point.y + direction.y);
    if (!this.game.mapManager.map[tile.x][tile.y].isOccupied &&
            tile.direction != directions.null) {
      open.push(tile);
      tile.direction = direction;
    }
  }
}