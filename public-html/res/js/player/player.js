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
   }
   update(){
     this.loc.add(this.v);
     this.v=new Vector2D(0,0);
   }
   render() {
     this.game.context.fillStyle = this.fillStyle;
     this.game.context.fillRect(this.loc.x, this.loc.y, PLAYER_CONFIG.SIZE, PLAYER_CONFIG.SIZE);
   }
 }
