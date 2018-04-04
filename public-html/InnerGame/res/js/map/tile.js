'use strict'

class Tile extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location; //cloc = Cellular LOCatIOn
    this.loc = new Vector2D( //pixel-relative position of top left corner to map origin
            this.cloc.x * config.tile_size,
            this.cloc.y * config.tile_size);
            // nulltype is not a real tile (nulltype overridden before init)
            // override done in map manager
    this.tileType = tile_types.nulltype;
    this.normalVector = new Vector2D(0,0);
    this.quadNormal = new Vector2D(0,0);
    this.sourceloc = new FastVector(0,0);
  }
  init() {
    this.image = this.tileType.image;
    this.isOccupied = this.tileType.is_occupied;
    if(this.tileType==tile_types.rock){
      let src = this.getImage();
      this.sourceloc.x=rockSprites['frames'][src]['frame']['x'];
      this.sourceloc.y=rockSprites['frames'][src]['frame']['y'];
      this.sw=rockSprites['frames'][src]['frame']['w'];
      this.sh=rockSprites['frames'][src]['frame']['h'];

    }
  }
  render() {
    if (tile_config.draw_gridlines) {

      //background becomes gridline
      this.game.context.fillStyle = tile_config.gridline_color;
      this.game.context.fillRect(this.loc.x, this.loc.y, config.tile_size, config.tile_size);

      //draw the sprite
      if(this.tileType==tile_types.rock){
        this.game.context.drawImage(
          this.image,
          this.sourceloc.x,
          this.sourceloc.y,
          this.sw,
          this.sh,
          this.loc.x + tile_config.gridline_stroke / 2,
          this.loc.y + tile_config.gridline_stroke / 2,
          config.tile_size - tile_config.gridline_stroke / 2,
          config.tile_size - tile_config.gridline_stroke / 2
        );
      } else {
        this.game.context.drawImage(
          this.image,
          this.loc.x + tile_config.gridline_stroke / 2,
          this.loc.y + tile_config.gridline_stroke / 2,
          config.tile_size - tile_config.gridline_stroke / 2,
          config.tile_size - tile_config.gridline_stroke / 2
        );
      }
    } else {
      //draw sprite
      if(this.tileType==tile_types.rock){
        this.game.context.drawImage(
          this.image, this.sourceloc.x, this.sourceloc.y, this.sw, this.sh,
          this.loc.x, this.loc.y, config.tile_size, config.tile_size);
      } else {
      this.game.context.drawImage(this.image, this.loc.x, this.loc.y, config.tile_size, config.tile_size);
      }
    }
  }
  getImage(){
    let index="";
    let x1=this.quadNormal.x;
    let y1=this.quadNormal.y;
    let y=this.normalVector.y;
    let x=this.normalVector.x;

    //check slope
    if(y==0&&x==0){
      index+='solid0'
      //finished
    }
    else if(x==0||(Math.abs(x)==1&&Math.abs(y)==2)){
      index+='h';
      if(y>0) index+='u';
      if(y<0) index+='l';
    }
    else if(y==0||(Math.abs(x)==2&&Math.abs(y)==1)){
      index+='v';
      if(x>0) index+='l';
      if(x<0) index+='r';
    }
    else if(y/x>0){
      index+='dr';
      if(x>0) index+='u';
      if(x<0) index+='l';
      if(this.normalVector.m>1.42) index+='Small';
      if(this.normalVector.m<1.42) index+='Large';
    }
    else if(y/x<0){
      index+='dl'
      if(x>0) index+='l';
      if(x<0) index+='u';
      if(this.normalVector.m>1.42) index+='Small';
      if(this.normalVector.m<1.42) index+='Large';
    }


    if(y!=0||x!=0){
      index+= Math.floor(Math.random()*5);
    }
    return index;
  }
}
