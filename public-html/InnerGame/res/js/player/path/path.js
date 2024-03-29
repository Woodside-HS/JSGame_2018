'use strict'

class Path {
  constructor() {
    this.target = null;
    this.map = [];
    for (let i = 0; i < config.map_x_size; i++) {
      this.map.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i].push(new PathTile(directions.null));
      }
    }
  }
  wipe() {
    for (let i = 0; i < config.map_x_size; i++) {
      this.map.push([]);
      for (let j = 0; j < config.map_y_size; j++) {
        this.map[i].push(new PathTile(directions.null));
      }
    }
  }
  /**Set the clocs array to a list of tiles via Dijkstra's method.
   *
   * @returns void
   */
  dijkstra() {
    this.wipe();
    let open = [this.target];
    let closed = [];
    while (open.length > 0) {
      for (let i = open.length - 1; i >= 0; i--) {
        let point = open[i];
        //Cardinal after half-cardinal to prefer cardinal directions
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

    //inverted direction because goal-oriented
    let tile = new PathTile(point.x - direction.x, point.y - direction.y);

    try {
      if (this.map[tile.x][tile.y].direction === directions.null) {
        if(!game.mapManager.map[tile.x][tile.y].isOccupied || game.mapManager.map[tile.x][tile.y].isWater){
        open.push(tile);
        }
        tile.direction = direction;
        this.map[tile.x][tile.y] = tile;

      }
    } catch (e) {//Out of bounds exceptions
    }
  }
}
