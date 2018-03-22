//issue 54
class SpaceStation{
  constructor(loc){
    this.loc = loc;
    this.shopItems = [];

    this.loadShopItems();
  }

  render(){
    ctx.beginPath();
    ctx.moveTo(this.loc.x,this.loc.y);
    ctx.lineTo(this.loc.x+20,this.loc.y+30);
    ctx.lineTo(this.loc.x-20,this.loc.y+30);
    ctx.lineTo(this.loc.x,this.loc.y);
    ctx.fillStyle = "blue";
    ctx.fill();

    for(let i in this.buttons){
      this.shopItems[i].render(x,y); //
    }
  }

  loadShopItems(){
    //0
    var img0 = document.createElement("img");
    img0.src = "shopIMGS/0cookie.png";
    this.shopItems[0] = new ShopItem("Cookie",img0,1.55,true);
    //1
    var img1 = document.createElement("img");
    img1.src = "shopIMGS/1brownie.png";
    this.shopItems[1] = new ShopItem("Brownie",img1,2.35,true);
    //2
    var img2 = document.createElement("img");
    img2.src = "shopIMGS/2cupcake.png";
    this.shopItems[2] = new ShopItem("Cupcake",img2,3.10,true);
  }
}

class ShopItem{
  //each item needs its own section
  //each section should have:button to buy/sell, image, name, price

  constructor(name,image,price,buy){
    this.name = name; //string
    this.image = image; //image
    this.price = price; //number
    this.buy = buy; //boolean

    let bLoc = new Vector2D(5,20);
    let bSize = new Vector2D(10,5);
    this.button = new Button(bLoc,bSize,this.name);
  }

  render(x,y){ //x and y are where on canvas the item's section should be drawn
    //shopitems are rendered in spacestation render function
    ctx.beginPath();
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(x,y,20,30); //background box
    ctx.fillStyle="black";
    ctx.font = "5px Verdana";
    ctx.fillText(this.text,x+5,y+5); //name of item being bought/sold
    ctx.drawImg(this.image,x+5,y+10,10,10); //image
    ctx.fillText(this.text,x+5,y+20); //price
    this.button.render(x+10,y+20); //button
  }
}

class Button{
  constructor(loc,size,buy){
    this.loc = loc;
    this.size = size; //is a vector (width,height)

    if(buy){
      this.text = "Buy";
    } else{
      this.text = "Sell";
    }
  }

  render(x,y){
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
