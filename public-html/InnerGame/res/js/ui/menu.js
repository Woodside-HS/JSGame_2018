'use strict'

class Menu extends Updateable{
  constructor(game, type) {
    super();
    this.game = game;
    this.menuType=type;
    this.loc = type.loc;
    this.width= type.width;
    this.height = type.height;
    this.src= type.src;
    this.img=new Image();
    this.img.src= this.src;
    this.buttons = [];
    this.isOpen=false;
    this.isMouseOver=false;
    for(let i=0;i<type.buttons.length;i++){
      let b = type.buttons[i];
      let button = new Button(this.game,b.loc,b.width,b.height,b.src0,b.src1);
      button.onclick= b.onclick;
      this.buttons.push(button);
    }
  }
  init(){
    for(let i=0;i<this.buttons.length;i++){
      this.buttons[i].init();
    }
  }
  update(){
    if(this.game.mouseLocation){
      if(this.game.mouseLocation.x>this.loc.x && this.game.mouseLocation.x<this.loc.x+this.width
        &&this.game.mouseLocation.y>this.loc.y && this.game.mouseLocation.y<this.loc.y+this.height){
          this.isMouseOver=true;
      } else this.isMouseOver=false;
    }
    for(let i=0;i<this.buttons.length;i++){
      this.buttons[i].update();
    }
  }
  render(){
    this.game.context.drawImage(this.img,this.loc.x,this.loc.y,this.width,this.height);
    for(let i=0;i<this.buttons.length;i++){
      this.buttons[i].render();
    }
  }
}
