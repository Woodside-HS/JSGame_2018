/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Player extends Updateable {
  constructor(game) {
    super();
    this.game = game;
    this.loc = new InnerVector2D(0, 0);//pixel-relative position to map origin
    this.cloc = positionToGrid(this.loc); //cloc = Cellular LOCation
    this.v = new InnerVector2D(0, 0);//velocity, pixels/frame
    this.a = new InnerVector2D(0, 0);
    this.lastTile = this.cloc //to check when tile changes
    this.followCooldown = minion_config.follow_timer;
    this.followTimer = minion_config.follow_timer;
    this.hp = player_config.max_hp;
    this.energy = player_config.max_energy;
    this.dashCooldownTimer = player_config.dash_cooldown;
    this.image=player_config.image;
    this.size=player_config.size;
    this.shotCooldownTimer=player_config.shot_cooldown;
    this.projectiles=[];
  }
  init() {
    this.hasMoved=false;
    this.image.src=player_config.image_src;
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
    document.addEventListener("click", this.shoot);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
  }
  update() {
    //set max v
    var loc = this.loc.duplicate(); //to see if loc has changed
    this.maxV=player_config.max_speed;
    if(this.cloc.x >= 0 &&
       this.cloc.x < config.map_x_size &&
       this.cloc.y >= 0 &&
       this.cloc.y < config.map_y_size &&
       this.game.mapManager.map[this.cloc.x][this.cloc.y].isWater){
         this.maxV=player_config.water_speed;
    }

    this.hasMoved=true;
    this.shotCooldownTimer--;
    this.dashCooldownTimer--;
    if(this.energy<player_config.max_energy){
      this.energy+=player_config.energy_recovery_rate;
    }
    this.cloc = positionToGrid(this.loc);
//    this.game.mapManager.reveal();

    if(player_config.auto_fire&&this.mouseHeld){
      this.shoot();
    }

     //update projectiles
    for(let i=0; i<this.projectiles.length; i++){
      let bullet = this.projectiles[i];
      if(bullet.life<=0){
        this.projectiles.splice(i,1);
        i--;
        continue;
      }
      bullet.life--;

      if(player_config.bullet_acceleration){
        bullet.v.m*=player_config.bullet_acceleration;
        bullet.v.upComps();
      }
      if(player_config.bullet_distance/player_config.bullet_speed-bullet.life>player_config.accuracy_time){
        bullet.v.th+=(Math.random()-.5)*player_config.bullet_wander;
        bullet.v.upComps();
      }
      bullet.loc.add(bullet.v);

      for(let j=0; j<game.mapManager.towerManager.enemies.length; j++){
        let enemy=game.mapManager.towerManager.enemies[j]
        let diff=this.projectiles[i].loc.duplicate();
        diff.subtract(enemy.loc);
        if(diff.m<player_config.bullet_size+enemy.size/2){
          enemy.hp-=player_config.bullet_damage;
          this.projectiles.splice(i, 1);
          i--;
          break;
        }
      }
    }

    this.v.add(this.a);
    //set max velocity
    if (this.v.m > this.maxV) {
      this.v.m*=.5;
      this.v.upComps();
    }
    if(this.dashV) this.v.add(this.dashV);

    this.loc.add(this.v);//because v=ds/dt
    if(this.dashTimer<=0 && this.dashV){
      this.v=this.storedV;
      this.dashV=undefined;
      this.dashCooldownTimer=player_config.dash_cooldown;
    }


    //collision detection
    let vDir = this.v.duplicate(); //normalized version of velocity
    vDir.m = this.size / 2;
    vDir.upComps();
    let hitBoxPos = this.loc.duplicate();
    hitBoxPos.add(vDir);
    let hitboxCloc = positionToGrid(hitBoxPos);
    //check for a collision in the x direction

    if (
            hitboxCloc.x < 0 ||
            hitboxCloc.x >= config.map_x_size ||
            (this.game.mapManager.map[hitboxCloc.x][this.cloc.y].isOccupied &&
              !this.game.mapManager.map[hitboxCloc.x][this.cloc.y].isWater)
            ) {
      this.loc.subtract(this.v);//hold it!
      this.v.x = 0;//stop going that way
      this.v.upPols();
      this.loc.add(this.v);
    }
    //check for a collision in the y direction
    if (
            hitboxCloc.y < 0 ||
            hitboxCloc.y >= config.map_y_size ||
            (this.game.mapManager.map[this.cloc.x][hitboxCloc.y].isOccupied &&
              !this.game.mapManager.map[this.cloc.x][hitboxCloc.y].isWater)
            ) {
      this.loc.subtract(this.v);//hol up
      this.v.y = 0;//stop going that way
      this.v.upPols();
      this.loc.add(this.v);
    }



    if(!this.dashV) this.v.multiply(player_config.movement_loss);//gradual loss
    if(this.dashTimer>0) this.dashTimer--;
    if(loc.x != this.loc.x || loc.y != this.loc.y){
      if(playerStats.reveal == 'reveal1'){
        this.reveal1();
      }else if(playerStats.reveal == 'reveal2'){
        this.game.mapManager.reveal();
      }
    }
  }
  render() {
    this.game.context.save();
    this.game.context.translate(this.loc.x,this.loc.y);
    this.game.context.rotate(this.v.th+Math.PI/2);
    this.game.context.drawImage(this.image,-this.size/2,-this.size/2,this.size,this.size)
    this.game.context.restore();
    for(let i=0; i<this.projectiles.length; i++)
      this.projectiles[i].render();
    this.checkImportantLoc();
  }
  reveal1(){
    var cloc = positionToGrid(this.loc);
    var distSq = 50;
    var angleC = this.v.th + Math.PI/6;
    var angleCC = this.v.th - Math.PI/6;
    var angleToAdd = 0;
    if((angleC > Math.PI && angleCC < Math.PI)||(angleC > -Math.PI && angleCC < -Math.PI)){
      angleToAdd = 2*Math.PI;
      if(angleCC < 0){
        angleCC += angleToAdd;
      }
      if(angleC < 0){
        angleC += angleToAdd;
      }
    }
    var map = this.game.mapManager.map;
    for(let i = cloc.x - 16; i < cloc.x + 16; i++){
      for(let j = cloc.y - 16; j < cloc.y + 16; j++){
        if(map[i] && map[i][j]){
          var tile = map[i][j];
          var tileLoc = positionToGrid(tile.loc);
          var actualDistSq = ((cloc.x - tileLoc.x)*(cloc.x - tileLoc.x) + (cloc.y - tileLoc.y)*(cloc.y - tileLoc.y));
          if(actualDistSq <= distSq){
            var tileDirection = tile.loc.duplicate();
            tileDirection.subtract(this.loc);
            tileDirection.upPols();
            if(tileDirection.th < 0){
              tileDirection.th += angleToAdd;
            }
            if(tileDirection.th <= angleC && tileDirection.th >= angleCC){
              tile.seen = true;
              //console.log(Math.floor(tileDirection.th*180/Math.PI));
            }
          }
        }
      }
    }
  }
  dashTo(loc){
    if(this.dashCooldownTimer>0 || this.energy<player_config.dash_cost) return;
    this.energy-=player_config.dash_cost;
    let diff = loc.duplicate();
    diff.subtract(this.loc);
    diff.multiply(player_config.dash_speed);
    this.dashV=diff.duplicate();
    this.dashTimer=player_config.dash_time;
    this.storedV=this.v;
  }
  checkImportantLoc(){
    //returns improtant loc, if it is one
    if(game.mapManager.map[this.cloc.x][this.cloc.y].hasAnimal){
      //do something
      game.mapManager.map[this.cloc.x][this.cloc.y].hasAnimal=false;
      return 'animal';
    }
    if(game.mapManager.map[this.cloc.x][this.cloc.y].isStart){
      console.log('hello');
      this.game.context.fillStyle="white";
      this.game.context.font = "20px Georgia";
      this.game.context.fillText("[X] to leave",this.loc.x-this.size,this.loc.y-this.size);
      return 'start';
    }
  }
  docKeyDown(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case 'W':
        if (game.player.a.y != -1)
          game.player.a.y = -1;//go up
        break;
      case 'A':
        if (game.player.a.x != -1)
          game.player.a.x = -1;//go left
        break;
      case'S':
        if (game.player.a.y != 1)
          game.player.a.y = 1;//go down
        break;
      case'D':
        if (game.player.a.x != 1)
          game.player.a.x = 1;//go right
        break;
      case' ':
        let loc=game.mouseLocationAbsolute;
        let cloc=positionToGrid(loc);
        game.player.dashTo(game.mouseLocationAbsolute);
      break;
      case'X':
        if(gameState=='inner' && game.player.hasMoved && game.player.checkImportantLoc()=='start') gameState='outer'; //leave
      break;
    }
  }
  docKeyUp(e) {
    let key = String.fromCharCode(e.keyCode);
    switch (key) {
      case 'W':
        game.player.a.y = 0;//stop going up
        break;
      case 'A':
        game.player.a.x = 0;//stop going left
        break;
      case'S':
        game.player.a.y = 0;//stop going down
        break;
      case'D':
        game.player.a.x = 0;//stop going right
        break;
    }
  }
  mousedown(){
    game.player.mouseHeld=true;
  }
  mouseup(){
    game.player.mouseHeld=false;
  }
  shoot(e){
    if (game.player.shotCooldownTimer <= 0) {
      game.player.shotCooldownTimer = player_config.shot_cooldown;
      for(let i=0; i<player_config.spread_count; i++){
        let diff = game.mouseLocationAbsolute.duplicate();
        diff.subtract(game.player.loc);
        diff.m = player_config.bullet_speed;
        diff.th += (Math.random()-.5)*player_config.bullet_spread;
        diff.upComps();
        let projectile = {
          game: game,
          radius: player_config.bullet_size,
          loc: game.player.loc.duplicate(),
          v: diff,
          life: player_config.bullet_distance/diff.m,
          render: function() {
            this.game.context.fillStyle = player_config.bullet_color;
            this.game.context.beginPath();
            this.game.context.arc(
                    this.loc.x,
                    this.loc.y,
                    this.radius,
                    0,
                    2 * Math.PI);
            this.game.context.fill();
          }
        }
        game.player.projectiles.push(projectile);
      }
    }
  }
}
