
'use strict'

class Tower extends Updateable {
  constructor(game, location) {
    super();
    this.game = game;
    this.cloc = location;
    this.loc = new Vector2D(
            (this.cloc.x + .5) * config.tile_size,
            (this.cloc.y + .5) * config.tile_size);
    this.type = tower_types.nulltype;
    this.fillStyle = "rgba(255,255,0,1)";
    this.fontstyle = "rgba(0,0,255,1)";
    this.maxhp = tower_types.nulltype.hp;
    this.hp = this.maxhp;
    game.mapManager.map[this.cloc.x][this.cloc.y].isOccupied = true;
  }
  update() {
  }
  render() {
    if (this.hp <= 0)
      return;
    this.game.context.fillStyle = this.fillStyle;
    this.game.context.beginPath();
    this.game.context.arc(
            this.loc.x,
            this.loc.y,
            config.tile_size / 2,
            0,
            2 * Math.PI);
    this.game.context.fill();
    this.game.context.fillStyle = this.fontstyle;
    this.game.context.fillText(
            this.type.name,
            this.loc.x - config.tile_size / 2,
            this.loc.y);
    this.game.context.fillStyle = 'rgba(255,0,0,1)';
    this.game.context.fillRect(
            this.loc.x - config.tile_size / 2,
            this.loc.y + 3 * config.tile_size / 10,
            config.tile_size,
            config.tile_size / 5);
    this.game.context.fillStyle = 'rgba(0,255,0,1)';
    this.game.context.fillRect(
            this.loc.x - config.tile_size / 2,
            this.loc.y + 3 * config.tile_size / 10,
            this.hp / this.maxhp * config.tile_size,
            config.tile_size / 5);

  }

}
