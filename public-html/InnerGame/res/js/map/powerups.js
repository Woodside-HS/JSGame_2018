class PowerUpManager extends Updateable {
  constructor(game) {
    super();
    this.powerups = [];
    this.game = game;
  }
  init() {
    this.validStartTiles = this.game.mapManager.validStartTiles;

    //initialize powerups
    for(let i=0; i<map_config.powerup_count; i++){
      let index = Math.floor(Math.random()*this.validStartTiles.length);
      let type;
      switch (Math.floor(Math.random()*6)){
        case 0:
        type = 'hp'
        break;
        case 1:
        type = 'shield'
        break;
        case 2:
        type = 'money'
        break;
        case 3:
        type = 'damage'
        break;
        case 4:
        type = 'tech'
        break;
        case 5:
        type = 'damage'
        break;
        default:{
        }
      }
      this.validStartTiles[index].powerup= new PowerUp(this.game, type, this.validStartTiles[index].cloc, i);
      this.powerups[i]=this.validStartTiles[index].powerup
      this.validStartTiles[index].powerup.init();
      this.validStartTiles.splice(index,1);
    }
  }
  update() {
    for(let i=0; i<this.powerups.length; i++){
      this.powerups[i].index=i;
      this.powerups[i].update();
    }
  }
  render() {
    for(let i=0; i<this.powerups.length; i++){
      this.powerups[i].render();
    }
  }
  delete(powerup){
    this.powerups.splice(powerup.index,1);
  }
}
class PowerUp extends Updateable {
  constructor(game, type, cloc, index) {
    super();
    this.index=index;
    this.cloc=cloc;
    this.loc=gridToPositon(cloc);
    this.type=powerup_types[type]
    this.game = game;
    this.image = this.type.image;
  }
  init() {
    this.image.src=this.type.image_src;
  }
  update() {
  }
  render() {
    this.game.context.drawImage(this.image, this.loc.x, this.loc.y, config.tile_size, config.tile_size);
  }
}
