
'use strict'

class Tower extends Updateable {
        constructor(game, location) {
                super();
                this.game = game;
                this.cloc = location;
                this.loc = new InnerVector2D(
                        (this.cloc.x) * config.tile_size,
                        (this.cloc.y) * config.tile_size);
                this.type = tower_types.nulltype;
                this.fillStyle = "rgba(255,255,0,1)";
                this.fontstyle = "rgba(0,0,255,1)";
                this.maxhp = tower_types.nulltype.hp;
                this.size = config.tile_size;
                this.hp = this.maxhp;
                game.mapManager.map[this.cloc.x][this.cloc.y].isOccupied = true;
                this.dir = 0;
                this.imageIndex = 0;
        }
        inRangeOf(loc) {
                let toVector = loc.duplicate();
                toVector.subtract(this.loc);
                return toVector.m <= this.range;
        }
        init() {
                if (this.type.imageid && (!this.type.images) && this.type.imageCount) {//on first run
                        this.type.images = [];
                        for (let i = 0; i < this.type.imageCount; i++) {
                                let currentImage = new Image();
                                currentImage.src = "../InnerGame/res/sprites/tower/" + this.type.imageid + "/" + i + ".png";
                                this.type.images.push(currentImage);
                        }
                }
        }
        update() {
                if (this.inRangeOf(this.game.player.loc)) {
                        this.imageIndex += 1;
                        this.imageIndex %= this.type.images.length;
                        this.image = this.type.images[this.imageIndex];
                }
        }
        render() {
                if (this.image) {
                        let toPlayer = this.game.player.loc.duplicate();
                        toPlayer.subtract(this.loc);
                        this.game.context.save();
                        this.game.context.translate(
                                this.loc.x + config.tile_size / 2,
                                this.loc.y + config.tile_size / 2
                        )
                        if (toPlayer.m <= this.type.range) {
                                this.dir = toPlayer.th;
                        }
                        if (this.type != tower_types.nulltype) {
                                this.game.context.rotate(toPlayer.th);
                        }
                        this.game.context.drawImage(
                                this.image,
                                - config.tile_size / 2,
                                - config.tile_size / 2,
                                config.tile_size,
                                config.tile_size
                        );
                        this.game.context.restore();
                } else {//draw the debug circle
                        if (this.hp <= 0)
                                return;
                        this.game.context.fillStyle = this.fillStyle;
                        this.game.context.beginPath();
                        this.game.context.arc(
                                this.loc.x+config.tile_size/2,
                                this.loc.y+config.tile_size/2,
                                0.45*config.tile_size,
                                0,
                                2 * Math.PI);
                        this.game.context.fill();
                        this.game.context.fillStyle = this.fontstyle;
                        this.game.context.fillText(
                                this.type.name,
                                this.loc.x,
                                this.loc.y);
                        
                }
                this.drawHealthbar();
        }
        drawHealthbar(){
                let upperLeft = new FastVector(
                        config.tile_size * 0.1,
                        config.tile_size * 0.7
                );
                let lowerRight = new FastVector(
                        config.tile_size*0.9,
                        config.tile_size*0.9
                );
                this.game.context.fillStyle = "#ff0000";
                this.game.context.fillRect(
                        this.loc.x+upperLeft.x,
                        this.loc.y+upperLeft.y,
                        lowerRight.x-upperLeft.x,
                        lowerRight.y-upperLeft.y
                );
                this.game.context.fillStyle = "#00ff00";
                this.game.context.fillRect(
                        this.loc.x+upperLeft.x,
                        this.loc.y+upperLeft.y,
                        this.hp/this.maxhp * (lowerRight.x-upperLeft.x),
                        lowerRight.y-upperLeft.y
                );
        }

}
