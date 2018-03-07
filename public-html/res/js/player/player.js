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
  init(){
    document.addEventListener("keydown", this.docKeyDown);
    document.addEventListener("keyup", this.docKeyUp);
  }
  update(){
    this.v.add(this.a);
    //set max v
    if(this.v.m>PLAYER_CONFIG.MAX_SPEED){
      this.v.m=PLAYER_CONFIG.MAX_SPEED;
      this.v.upComps();
    }
    this.loc.add(this.v);
    let vDir=this.v.duplicate();
    vDir.m=PLAYER_CONFIG.SIZE/2;
    vDir.upComps();
    let hitBoxPos = this.loc.duplicate();
    hitBoxPos.add(vDir);
    let cloc=positionToGrid(hitBoxPos);
    if(cloc.x<0||cloc.x>=CONFIG.MAP_X_SIZE||cloc.y<0||cloc.y>=CONFIG.MAP_X_SIZE||
      this.game.mapManager.map[cloc.x][cloc.y].tileType.IS_OCCUPIED){
        this.loc.subtract(this.v);
        //   this.v.multiply(-.5);
        this.v.multiply(0);
        this.loc.add(this.v);
      }
      this.v.multiply(.9);
    }
    render() {
      //for debugging purposes
      if(CONFIG.DEBUG_MODE){
        let vDir=this.v.duplicate();
        vDir.m=PLAYER_CONFIG.SIZE/2;
        vDir.upComps();
        vDir.add(this.loc);
        this.game.context.fillStyle = this.fillStyle;
        this.game.context.fillRect(vDir.x-PLAYER_CONFIG.SIZE/6, vDir.y-PLAYER_CONFIG.SIZE/6, PLAYER_CONFIG.SIZE/3, PLAYER_CONFIG.SIZE/3);
      }

      this.game.context.fillStyle = this.fillStyle;
      this.game.context.fillRect(this.loc.x-PLAYER_CONFIG.SIZE/2, this.loc.y-PLAYER_CONFIG.SIZE/2, PLAYER_CONFIG.SIZE, PLAYER_CONFIG.SIZE);
    }
    docKeyDown(e) {
      let key = String.fromCharCode(e.keyCode);
      switch(key){
        case 'W':
        if(game.player.a.y!=-1)
        game.player.a.y=-1;
        break;
        case 'A':
        if(game.player.a.x!=-1)
        game.player.a.x=-1;
        break;
        case'S':
        if(game.player.a.y!=1)
        game.player.a.y=1;
        break;
        case'D':
        if(game.player.a.x!=1)
        game.player.a.x=1;
        break;
      }
    }
    docKeyUp(e) {
      let key = String.fromCharCode(e.keyCode);
      switch(key){
        case 'W':
        game.player.a.y=0;
        break;
        case 'A':
        game.player.a.x=0;
        break;
        case'S':
        game.player.a.y=0;
        break;
        case'D':
        game.player.a.x=0;
        break;
      }
    }
  }
