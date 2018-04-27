'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location; //cloc = Cellular LOCatIOn
    this.loc = new InnerVector2D(//pixel-relative position of top left corner to map origin
            this.cloc.x * config.tile_size,
            this.cloc.y * config.tile_size);
    // nulltype is not a real tile (nulltype overridden before init)
    // override done in map manager
    this.tileType = tile_types.nulltype;

    this.seen = false;
    this.normalVector = new InnerVector2D(0,0);
    this.quadNormal = new InnerVector2D(0,0);
    this.sourceloc = new FastVector(0, 0);
  }
  init() {
    this.image = this.tileType.image;
    this.image.src = this.tileType.image_src;
    this.isOccupied = this.tileType.is_occupied;
    if (this.tileType == tile_types.rock) {
      let src = this.getImage();
      this.sourceloc.x = rockSprites['frames'][src]['frame']['x'];
      this.sourceloc.y = rockSprites['frames'][src]['frame']['y'];
      this.sw = rockSprites['frames'][src]['frame']['w'];
      this.sh = rockSprites['frames'][src]['frame']['h'];
    }
  }
  render() {

    //draw sprite
    if (!this.seen) {
      this.game.context.fillStyle = "#000000";
      this.game.context.fillRect(this.loc.x-1, this.loc.y-1, config.tile_size+2, config.tile_size+2); //1 pixel bigger
    } else {
      switch(this.tileType) {
        case tile_types.grass:
          return;
          break;
        case tile_types.rock:
          this.game.context.drawImage(
            this.image, this.sourceloc.x, this.sourceloc.y, this.sw, this.sh,
            this.loc.x - 1, this.loc.y - 1, config.tile_size + 2, config.tile_size + 2);
          break;
        default:
          this.game.context.drawImage(this.image, this.loc.x, this.loc.y, config.tile_size, config.tile_size);
        }
      }
    }

  getImage() {
    let index = "";
    let x1 = this.quadNormal.x;
    let y1 = this.quadNormal.y;
    let y = this.normalVector.y;
    let x = this.normalVector.x;

    //check slope
    if (y == 0 && x == 0) {
      index += 'solid0'
      //finished
    } else if (x == 0 || (Math.abs(x) == 1 && Math.abs(y) == 2)) {
      index += 'h';
      if (y > 0)
        index += 'u';
      if (y < 0)
        index += 'l';
    } else if (y == 0 || (Math.abs(x) == 2 && Math.abs(y) == 1)) {
      index += 'v';
      if (x > 0)
        index += 'l';
      if (x < 0)
        index += 'r';
    } else if (y / x > 0) {
      index += 'dr';
      if (x > 0)
        index += 'u';
      if (x < 0)
        index += 'l';
      if (this.normalVector.m > 1.42)
        index += 'Small';
      if (this.normalVector.m < 1.42)
        index += 'Large';
    } else if (y / x < 0) {
      index += 'dl'
      if (x > 0)
        index += 'l';
      if (x < 0)
        index += 'u';
      if (this.normalVector.m > 1.42)
        index += 'Small';
      if (this.normalVector.m < 1.42)
        index += 'Large';
    }


    if (y != 0 || x != 0) {
      index += Math.floor(Math.random() * 5);
    }
    return index;
  }
}
