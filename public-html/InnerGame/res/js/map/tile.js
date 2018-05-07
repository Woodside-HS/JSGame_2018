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
      this.normalVector = new InnerVector2D(0, 0);
      this.quadNormal = new InnerVector2D(0, 0);
      this.sourceloc = new FastVector(0, 0);
    }
    init() {
      this.animalImage = tile_config.animal_image;
      this.animalImage.src = tile_config.animal_image_src;
      this.image = this.tileType.image;
      this.image.src = this.tileType.image_src;
      this.isOccupied = this.tileType.is_occupied;
      this.isWater = this.tileType.is_water;
      if (this.tileType == tile_types.rock) {
        let src = this.getImageRock();
        this.sourceloc.x = rockSprites['frames'][src]['frame']['x'];
        this.sourceloc.y = rockSprites['frames'][src]['frame']['y'];
        this.sw = rockSprites['frames'][src]['frame']['w'];
        this.sh = rockSprites['frames'][src]['frame']['h'];
      }
      if (this.tileType == tile_types.water) {
        let src = this.getImageWater();
        this.sourceloc.x = waterSprites['frames'][src]['frame']['x'];
        this.sourceloc.y = waterSprites['frames'][src]['frame']['y'];
        this.sw = waterSprites['frames'][src]['frame']['w'];
        this.sh = waterSprites['frames'][src]['frame']['h'];
      }
    }
    render() {

      //draw sprite
      switch(this.tileType) {
        case tile_types.grass:;
        break;
        case tile_types.rock:
        this.game.context.drawImage(
          this.image, this.sourceloc.x, this.sourceloc.y, this.sw, this.sh,
          this.loc.x - 1, this.loc.y - 1, config.tile_size + 2, config.tile_size + 2);
          break;
        case tile_types.water:
        this.game.context.drawImage(
          this.image, this.sourceloc.x+1, this.sourceloc.y+1, this.sw-2, this.sh-2,
          this.loc.x - 1, this.loc.y - 1, config.tile_size + 2, config.tile_size + 2);
          break;
          default:
          this.game.context.drawImage(this.image, this.loc.x, this.loc.y, config.tile_size, config.tile_size);
        }
        if(this.hasAnimal||this.isStart){
          this.game.context.drawImage(this.animalImage, this.loc.x, this.loc.y, config.tile_size, config.tile_size);
        }
      }

      getImageRock() {
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
      getImageWater() {
        let index = "";
        let x1 = this.quadNormal.x;
        let y1 = this.quadNormal.y;
        let y = this.normalVector.y;
        let x = this.normalVector.x;

        //check slope
        if (y == 0 && x == 0) {
          index += 'solid'
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
        } else {index += Math.floor(Math.random() * 8);}
        return index;
      }
    }
