/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 class Player extends Updateable {
   constructor(game, location) {
     super();
     this.game = game;
     this.loc = new Vector2D(location.x,location.y);
     this.v = new Vector2D(0,0);
     this.fillStyle='rgba(255,0,0,1)'
     this.a = new Vector2D(0,0);
   }
   update(){
     this.v.add(this.a);
     //set max v
    if(this.v.m>PLAYER_CONFIG.MAX_SPEED){
      this.v.m=PLAYER_CONFIG.MAX_SPEED;
      this.v.upComps();
    }
     this.loc.add(this.v);
     this.v.multiply(.9);

   }
   render() {
     this.game.context.fillStyle = this.fillStyle;
     this.game.context.fillRect(this.loc.x, this.loc.y, PLAYER_CONFIG.SIZE, PLAYER_CONFIG.SIZE);
   }
 }
