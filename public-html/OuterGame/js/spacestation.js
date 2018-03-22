//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;
  }

  render(){
    ctx.beginPath();
    ctx.moveTo(this.loc.x,this.loc.y);
    ctx.lineTo(this.loc.x+20,this.loc.y+30);
    ctx.lineTo(this.loc.x-20,this.loc.y+30);
    ctx.lineTo(this.loc.x,this.loc.y);
    ctx.fillStyle = "blue";
    ctx.fill();
  }


}


class Button{
  constructor(loc,size,name){
    this.loc = loc;
    this.size = size; //is a vector (width,height)
    this.name = name;
    this.text = name;
  }

  render(){
    ctx.fillStyle = "gray";
    ctx.fillRect(this.loc.x,this.loc.y,this.size.x,this.size.y);
    ctx.fillStyle="white";
    ctx.font = "10px Verdana";
    ctx.fillText(this.text,this.loc.x,this.loc.y);
  }

  changeText(newT){
    this.text = newT;
  }
}
