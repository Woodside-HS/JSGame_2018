'use strict'

class Path {
  constructor(start, target) {
    this.start = new PathTile(start.x, start.y); //CLoc vector
    this.target = new PathTile(target.x, target.y); //CLoc vector
    this.map = [];
    for (let i = 0; i < config.map_x_size; i++) {
      this.map.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i].push(directions.null);
      }
    }
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
    while (open.length > 0) {
      for (let i=open.length-1; i>=0; i--) {
        let point = open[i];
        this.setTile(open, point, directions.northeast);
        this.setTile(open, point, directions.northwest);
        this.setTile(open, point, directions.southeast);
        this.setTile(open, point, directions.southwest);
        this.setTile(open, point, directions.north);
        this.setTile(open, point, directions.south);
        this.setTile(open, point, directions.east);
        this.setTile(open, point, directions.west);
        open.splice(i, 1);
        closed.push(point);

      }
    }
  }
  setTile(open, point, direction) {
    let tile = new PathTile(point.x - direction.x, point.y - direction.y);

    try {
      if (!game.mapManager.map[tile.x][tile.y].isOccupied &&
           !(this.map[tile.x][tile.y].x || this.map[tile.x][tile.y].y)) {
        open.push(tile);
        tile.direction = direction;
        this.map[tile.x][tile.y]=tile;

      }
    } catch (e) {//Out of bounds exceptions
    }
  }
}
